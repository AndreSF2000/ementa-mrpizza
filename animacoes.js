/* ------------------------------------------------------------------
   ANIMAÇÕES DA LOGO — leitor partilhado pela TV e pelo editor
   ------------------------------------------------------------------
   Cada animação é um clipe curto (WebM com transparência). O leitor
   mostra a logotipo original, passa para o primeiro clipe com um
   esbatimento, encadeia os clipes pela ordem escolhida no editor e,
   no fim, volta à logo original.

   Uso:
     const leitor = Animacoes.criarLeitor(elemento, config, opcoes);
     leitor.atualizar(config);   // recomeça com a config nova
     leitor.reiniciar();         // volta ao princípio
     leitor.parar();

   config = {
     versao: '123',
     proporcao: 0.973,
     // id do clipe que faz de «logo original» entre as animações
     logoBase: 'mrpizza-logo',
     transicao: { duracao: 0.6, logoInicial: 2.4, esperaLogo: 4, voltarLogo: true },
     clips: [{ id, nome, webm, duracao, ativo }]
   }
   ------------------------------------------------------------------ */
(function (global) {

    const OMISSAO = {
        duracao: 0.6,
        logoInicial: 2.4,
        esperaLogo: 4,
        voltarLogo: true
    };

    const LOGO = 'logotipo-chef.png';
    /* O mesmo desenho com o balanço já gravado: além de dar vida à logo,
       mantém uma reprodução sempre ativa no ecrã do preçário (é o que
       mantém a TV acordada, tal como o vídeo dos menus faz na TV1). */
    const LOGO_VIDEO = 'logotipo-animado.webm';
    /* A pasta MR Pizza é a escolha de origem para a logo que aparece
       entre as animações (a «original»). */
    const TEMA_DA_LOGO = 'mrpizza';

    /* TVs (LG webOS e afins). Aqui o vídeo vai para um plano de hardware à
       parte: um <video> — mesmo escondido — abre um «buraco» retangular no
       ecrã onde se vê o que está nesse plano (o vídeo do preçário da
       camada anti-standby, que fica por baixo: era o retângulo de fundo à
       volta da logo). Além disso só há um descodificador, que a camada
       anti-standby ocupa: os vídeos da logo ficavam PARADOS e o canvas
       pintava 0 fotogramas. Por isso, na TV, a logo é sempre feita com as
       imagens animadas (WebP com transparência a sério), sem vídeo nenhum.
       ?imagem=0 força o vídeo, para testes. */
    const NA_TV = /web0s|webos|netcast|smart-?tv|tizen|hbbtv/i.test(navigator.userAgent || '');

    /* ------------------------------------------------------------------
       SUPERFÍCIE DE PINTURA — recorte do fundo verde
       ------------------------------------------------------------------
       Cada clipe traz um fundo verde próprio para recorte. O vídeo em si
       nunca é mostrado: desenha-se cada fotograma num <canvas>, apagam-se
       os pixels verdes e é o canvas que fica no ecrã.

       É assim porque o browser da TV descodifica bem o vídeo mas ignora o
       canal de transparência — a logo aparecia dentro de um retângulo
       opaco por cima da ementa. Aqui o recorte é feito pelo próprio site,
       por isso depende só dos pixels, e não do que a TV faz com o alfa.

       A largura do canvas começa em 384 px e desce sozinha se o aparelho
       não acompanhar (o recorte custa CPU; numa TV fraca isso conta).
       ------------------------------------------------------------------ */

    const superficies = [];
    let aPintar = false;
    let ultimoPintado = 0;
    let fotogramas = 0;   // contador para o diagnóstico da TV
    let larguraMax = 384;
    let custoPintura = 0;

    /* Tabela para desfazer a mistura sem uma divisão por pixel */
    const INVERSO = new Float32Array(256);
    for (let a = 1; a < 256; a++) INVERSO[a] = 255 / a;

    /* Apaga o fundo verde do fotograma.

       Um pixel de borda é uma mistura do desenho com o fundo verde. O
       quanto de verde diz qual era a transparência, e a cor repõe-se
       desfazendo essa mistura — assim as bordas ficam suaves e sem o
       halo verde que sobrava quando só se limpava o canal do verde. */
    function recortarVerde(g, largura, altura) {
        const img = g.getImageData(0, 0, largura, altura);
        const d = img.data;

        /* Todos os clipes têm fundo verde até aos cantos. Se o canto vier de
           outra cor, o fotograma ainda está a ser escrito pelo descodificador
           (acontece logo depois de saltar para o início) e aparece como uma
           faixa colorida no topo: este não se mostra. */
        if (d[1] - (d[0] > d[2] ? d[0] : d[2]) < 30) return false;

        for (let i = 0; i < d.length; i += 4) {
            const r = d[i];
            const v = d[i + 1];
            const az = d[i + 2];

            // Só o verde vivo do fundo conta: o desenho do chef não tem
            // verde nenhum, por isso o que é neutro fica inteiro.
            const verde = v - (r > az ? r : az);
            if (verde <= 10) continue;

            if (verde >= 255) {
                d[i + 3] = 0;       // fundo puro
                continue;
            }

            const opaco = 255 - verde;
            const inv = INVERSO[opaco];
            d[i + 3] = opaco;
            d[i] = r * inv;
            d[i + 1] = (v - (255 - opaco)) * inv;
            d[i + 2] = az * inv;
        }

        g.putImageData(img, 0, 0);
        return true;
    }

    /* Rascunho: o fotograma é preparado aqui e só passa à tela visível
       depois de recortado. Assim um fotograma recusado não apaga o que já
       está no ecrã (nem deixa ver o verde à espera do seguinte). */
    function rascunhoDe(tela, largura, altura) {
        let c = tela._rascunho;
        if (!c) {
            c = document.createElement('canvas');
            c._ctx = c.getContext('2d', { willReadFrequently: true });
            tela._rascunho = c;
        }
        if (c.width !== largura || c.height !== altura) {
            c.width = largura;
            c.height = altura;
        }
        return c;
    }

    function pintarFotograma(video, tela) {
        const c = video.videoWidth;
        const a = video.videoHeight;
        if (!c || !a) return false;

        const largura = Math.min(c, larguraMax);
        const altura = Math.max(1, Math.round(a * (largura / c)));

        const inicio = performance.now();

        const r = rascunhoDe(tela, largura, altura);
        const gr = r._ctx;
        gr.clearRect(0, 0, largura, altura);
        gr.drawImage(video, 0, 0, largura, altura);
        if (!recortarVerde(gr, largura, altura)) return false;

        if (tela.width !== largura || tela.height !== altura) {
            tela.width = largura;
            tela.height = altura;
        }

        if (!tela._ctx) tela._ctx = tela.getContext('2d');
        const g = tela._ctx;
        g.clearRect(0, 0, largura, altura);
        g.drawImage(r, 0, 0);

        const gasto = performance.now() - inicio;
        custoPintura = custoPintura ? custoPintura * 0.85 + gasto * 0.15 : gasto;
        return true;
    }

    let pedidoPintura = 0;
    let ultimoTique = 0;
    let erroPintura = '';

    function proximaPintura() {
        pedidoPintura = requestAnimationFrame(pintar);
    }

    /* Se o ciclo de pintura morreu (a TV deixou de dar fotogramas ao
       requestAnimationFrame), volta a ser lançado — sempre um só. */
    function relancarPintura() {
        if (!superficies.length) return;
        aPintar = true;
        if (pedidoPintura) cancelAnimationFrame(pedidoPintura);
        proximaPintura();
    }

    function pintar() {
        pedidoPintura = 0;
        if (!aPintar) return;
        ultimoTique = performance.now();
        if (document.hidden) return proximaPintura();

        const agora = performance.now();
        if (agora - ultimoPintado < 28) return proximaPintura();
        ultimoPintado = agora;

        for (let i = superficies.length - 1; i >= 0; i--) {
            const s = superficies[i];
            if (!s.tela.isConnected) { superficies.splice(i, 1); continue; }
            if (s.video.paused || s.video.readyState < 2) continue;
            // durante um salto, o browser pode entregar um fotograma a meio de
            // ser escrito (aparece uma faixa de cor no topo): espera-se pelo
            // próximo
            if (s.video.seeking) continue;
            if (s.tela.style.opacity === '0') continue;
            /* Um erro aqui (descodificador perdido, canvas recusado) matava o
               ciclo inteiro para sempre: fica registado e segue-se. */
            let pintou = false;
            try { pintou = pintarFotograma(s.video, s.tela); } catch (e) { erroPintura = String((e && e.name) || e); }
            if (!pintou) continue;
            s.pintou = true;
            s.tela._fotogramas = (s.tela._fotogramas || 0) + 1;
            fotogramas++;
        }

        global.__animPintura = {
            fotogramas,
            largura: larguraMax,
            custo: Math.round(custoPintura),
            erro: erroPintura
        };

        // aparelho lento: baixa a resolução em vez de deixar o vídeo aos saltos
        if (custoPintura > 42 && larguraMax > 192) larguraMax -= 64;

        if (!superficies.length) { aPintar = false; return; }
        proximaPintura();
    }

    function criarSuperficie(video) {
        const tela = document.createElement('canvas');
        tela.className = video.className;
        tela.setAttribute('aria-hidden', 'true');
        tela.style.opacity = '0';
        video.parentNode.insertBefore(tela, video.nextSibling);
        // o vídeo em bruto (com o fundo verde) nunca se vê
        video.style.visibility = 'hidden';
        video.style.opacity = '0';
        video._tela = tela;

        superficies.push({ video: video, tela: tela, pintou: false });

        if (!aPintar) {
            aPintar = true;
            proximaPintura();
        }
        return tela;
    }

    /* O que se vê (e o que leva com as transições) é a tela, não o vídeo */
    function estilo(video) {
        return video._tela || video;
    }

    function criarLeitor(host, config, opcoes) {
        const op = opcoes || {};
        let cfg = normalizar(config || {});

        host.innerHTML = '';
        host.classList.add('leitor-logo');

        /* Na TV começa-se logo em modo imagem, sem criar vídeo nenhum (ver
           NA_TV): nem por um instante pode haver um <video> no ecrã. */
        const pedidoVideo = /[?&]imagem=0(&|$)/.test(location.search);
        let modoImagem = false;

        let logo = null;
        let telaLogo = null;
        let camadas = [];

        let qual = 0;
        let indice = -1;
        let ligado = false;
        let timers = [];
        let geracao = 0;      // cada reinício invalida as tarefas do ciclo anterior

        /* A logo original é um vídeo em ciclo (balanço lento). O PNG fica
           como cartaz, para nunca se ver um espaço vazio. */
        function criarVideos() {
            logo = document.createElement('video');
            logo.className = 'logo-original';
            logo.muted = true;
            logo.loop = true;
            logo.playsInline = true;
            logo.autoplay = true;
            logo.preload = 'auto';
            logo.poster = LOGO;
            logo.setAttribute('muted', '');
            logo.setAttribute('playsinline', '');
            logo.src = enderecoDaLogo();
            host.appendChild(logo);

            telaLogo = criarSuperficie(logo);
            telaLogo.style.opacity = '1';

            arrancarLogo();
            logo.addEventListener('loadeddata', arrancarLogo);
            logo.addEventListener('canplay', arrancarLogo);

            camadas = [camada(), camada()];
            global.__animModo = 'video';
            global.__animFallback = false;
        }

        function arrancarLogo() {
            if (!logo) return;
            const p = logo.play();
            if (p && p.catch) p.catch(() => {});
        }

        function camada() {
            const v = document.createElement('video');
            v.className = 'clipe-logo';
            v.muted = true;
            v.playsInline = true;
            v.preload = 'auto';
            v.setAttribute('muted', '');
            v.setAttribute('playsinline', '');
            host.appendChild(v);
            criarSuperficie(v);
            return v;
        }

        function normalizar(c) {
            const t = Object.assign({}, OMISSAO, c.transicao || {});
            /* todos os clipes (mesmo os desligados: um deles pode estar a
               fazer de logo original entre as animações) */
            const todos = (Array.isArray(c.clips) ? c.clips : [])
                .filter((d) => d && d.webm)
                .map((d) => ({
                    id: d.id || d.nome || 'clipe',
                    nome: d.nome || '',
                    webm: d.webm,
                    /* A mesma animação em imagem animada (WebP), para os
                       aparelhos que não sabem desenhar vídeo num canvas. */
                    webp: d.webp || String(d.webm || '').replace(/\.webm$/i, '.webp'),
                    ativo: d.ativo !== false,
                    tema: String(d.tema || '').toLowerCase(),
                    duracao: Math.max(0.4, Number(d.duracao) || 2),
                    natural: Math.max(0.4, Number(d.natural) || Number(d.duracao) || 2.5)
                }));
            const clips = todos.filter((d) => d.ativo);

            /* A logo entre animações: a escolhida no editor ou, se essa
               já não existir, a que vive na pasta MR Pizza. */
            let logoBase = String(c.logoBase || '');
            if (!todos.filter((d) => d.id === logoBase).length) {
                const padrao = todos.filter((d) => d.tema === TEMA_DA_LOGO)[0];
                logoBase = padrao ? padrao.id : '';
            }

            return {
                logoBase,
                todos,
                versao: c.versao || '',
                proporcao: Number(c.proporcao) || 0.973,
                zoom: Math.max(0.6, Math.min(2, Number(c.zoom) || 1)),
                pausa: Math.max(0, Math.min(20, c.pausa == null ? 2.5 : (Number(c.pausa) || 0))),
                transicao: {
                    duracao: Math.max(0, Math.min(2, Number(t.duracao))),
                    logoInicial: Math.max(0, Math.min(20, Number(t.logoInicial))),
                    esperaLogo: Math.max(0.5, Math.min(30, Number(t.esperaLogo))),
                    voltarLogo: t.voltarLogo !== false
                },
                clips
            };
        }

        function limparTimers() {
            timers.forEach((id) => clearTimeout(id));
            timers = [];
        }

        function depois(ms, fn) {
            const id = setTimeout(() => {
                timers = timers.filter((t) => t !== id);
                if (ligado) fn();
            }, Math.max(0, ms));
            timers.push(id);
            return id;
        }

        function url(base) {
            return base + (base.includes('?') ? '&' : '?') + 'v=' + encodeURIComponent(cfg.versao || '1');
        }

        function clipeDaLogo() {
            return (cfg.todos || []).filter((d) => d.id === cfg.logoBase)[0];
        }

        /* A logo que aparece entre as animações: o clipe escolhido no
           editor, ou o balanço gravado se não houver escolha. */
        function enderecoDaLogo() {
            const base = clipeDaLogo();
            return url(base ? base.webm : LOGO_VIDEO);
        }

        function fundo(visivel) {
            if (!logo) return;
            const d = cfg.transicao.duracao;
            const alvo = estilo(logo);
            alvo.style.transition = d > 0 ? 'opacity ' + d + 's ease-in-out' : 'none';
            alvo.style.opacity = visivel ? '1' : '0';
        }

        function esbater(video, visivel, duracao) {
            const d = duracao == null ? cfg.transicao.duracao : duracao;
            const alvo = estilo(video);
            alvo.style.transition = d > 0 ? 'opacity ' + d + 's ease-in-out' : 'none';
            alvo.style.opacity = visivel ? '1' : '0';
        }

        function pararCamadas() {
            camadas.forEach((v) => {
                try { v.pause(); } catch (e) {}
                estilo(v).style.opacity = '0';
            });
        }

        /* ------------------------------------------------------------------
           VIGILANTE DO VÍDEO
           ------------------------------------------------------------------
           Corre sempre (não só no arranque) e não é cancelado pelos
           reinícios do ciclo. Se o canvas deixar de receber fotogramas —
           vídeo pausado pela TV, descodificador perdido, ciclo de pintura
           morto — tenta recuperar (play, depois recarregar o ficheiro) e,
           se ao fim de 12 s continuar sem nada, passa ao modo imagem, que
           não depende de vídeo nenhum e nunca mostra um retângulo.
           ------------------------------------------------------------------ */
        function fotogramasMeus() {
            let n = telaLogo ? (telaLogo._fotogramas || 0) : 0;
            camadas.forEach((v) => { if (v._tela) n += v._tela._fotogramas || 0; });
            return n;
        }

        let vistos = -1;
        let desde = performance.now();
        let recarregou = false;
        let desligado = 0;

        const vigilante = setInterval(() => {
            if (!host.isConnected) {
                // leitor abandonado (o editor refez o palco): deixa de vigiar
                if (++desligado > 30) clearInterval(vigilante);
                return;
            }
            desligado = 0;
            if (!ligado || modoImagem) return;

            const agora = performance.now();
            if (document.hidden) { desde = agora; return; }
            if (agora - ultimoTique > 3000) relancarPintura();

            const n = fotogramasMeus();
            if (n !== vistos) { vistos = n; desde = agora; recarregou = false; return; }

            const parado = agora - desde;
            if (logo && logo.paused) { registar('logo-parada'); arrancarLogo(); }
            if (parado > 6000 && !recarregou && logo) {
                recarregou = true;
                registar('recarregar-logo');
                try { logo.load(); } catch (e) {}
                arrancarLogo();
            }
            if (parado > 12000) entrarModoImagem('sem pintura há ' + Math.round(parado / 1000) + ' s');
        }, 2000);

        /* ------------------------------------------------------------------
           MODO IMAGEM
           ------------------------------------------------------------------
           As mesmas animações em imagens animadas (WebP) com transparência a
           sério, que qualquer browser sabe pintar — sem vídeo, sem canvas,
           sem recorte. É o modo da TV e a reserva de qualquer aparelho onde
           o vídeo falhe.

           A logo original é a versão WebP do clipe escolhido para isso (a
           MR Pizza animada). Enquanto descarrega — ou se faltar — fica o PNG
           com o balanço em CSS: nunca um espaço vazio.
           ------------------------------------------------------------------ */
        let base = null;
        let camadasImg = [];

        function esbaterImg(el, visivel) {
            if (!el) return;
            const d = cfg.transicao.duracao;
            el.style.transition = d > 0 ? 'opacity ' + d + 's ease-in-out' : 'none';
            el.style.opacity = visivel ? '1' : '0';
        }

        function criarCamadaImg() {
            const img = document.createElement('img');
            img.className = 'clipe-logo';
            img.alt = '';
            img.style.position = 'absolute';
            img.style.inset = '0';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'contain';
            img.style.opacity = '0';
            img.style.pointerEvents = 'none';
            img.style.transformOrigin = '50% 48.5%';
            host.appendChild(img);
            return img;
        }

        /* Põe na base a logo animada; só troca depois de o ficheiro chegar */
        function porBase() {
            const clip = clipeDaLogo();
            const quer = clip ? url(clip.webp) : '';
            if (base._quer === quer) return;
            base._quer = quer;

            base.className = 'logo-original logo-a-vivo';
            base.src = LOGO;
            global.__animBase = 'png';
            if (!quer) return;

            const pre = new Image();
            pre.onload = () => {
                if (base._quer !== quer) return;
                base.className = 'logo-original';   // a animação já traz o movimento
                base.src = quer;
                global.__animBase = 'webp';
            };
            pre.onerror = () => registar('base-falhou', clip.id);
            pre.src = quer;
        }

        function entrarModoImagem(motivo) {
            if (modoImagem) return;
            modoImagem = true;
            global.__animModo = 'imagem';
            global.__animFallback = false;
            registar('modo-imagem', motivo || '');

            /* Os vídeos saem mesmo do ecrã (e largam o descodificador): na
               LG, um <video> escondido continuava a abrir o retângulo. */
            const meus = [logo].concat(camadas).filter(Boolean);
            for (let i = superficies.length - 1; i >= 0; i--) {
                if (meus.indexOf(superficies[i].video) < 0) continue;
                try { superficies[i].tela.remove(); } catch (e) {}
                superficies.splice(i, 1);
            }
            meus.forEach((v) => {
                v.onplaying = null;
                v.onerror = null;
                try { v.pause(); } catch (e) {}
                try { v.removeAttribute('src'); v.load(); } catch (e) {}
                try { v.remove(); } catch (e) {}
            });
            logo = null;
            telaLogo = null;
            camadas = [];

            base = document.createElement('img');
            base.alt = '';
            base.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;' +
                'object-fit:contain;opacity:1;pointer-events:none';
            host.appendChild(base);

            camadasImg = [criarCamadaImg(), criarCamadaImg()];

            if (ligado) iniciar();
        }

        function iniciarImagem() {
            porBase();
            camadasImg.forEach((c) => {
                c.onload = null;
                c.onerror = null;
                c.style.transform = cfg.zoom === 1 ? '' : 'scale(' + cfg.zoom + ')';
                c.style.transition = 'none';
                c.style.opacity = '0';
                c.removeAttribute('src');
            });
            esbaterImg(base, true);
            indice = -1;
            avisar(-1, null);
            depois(cfg.transicao.logoInicial * 1000, () => passoImagem(0));
        }

        function passoImagem(i) {
            if (!ligado || !modoImagem) return;
            if (!cfg.clips.length) { esbaterImg(base, true); return; }

            if (i >= cfg.clips.length) {
                esbaterImg(base, true);
                camadasImg.forEach((c) => esbaterImg(c, false));
                indice = -1;
                avisar(-1, null);
                // pelo menos 1 s: se todas as imagens falharem, não fica num ciclo sem fim
                depois(Math.max(1, cfg.pausa) * 1000, () => passoImagem(0));
                return;
            }

            const clip = cfg.clips[i];
            const camada = camadasImg[i % 2];
            const g = geracao;
            indice = i;

            const entrar = () => {
                if (!ligado || !modoImagem || g !== geracao) return;
                registar('imagem', clip.id);
                esbaterImg(camada, true);
                esbaterImg(base, false);
                avisar(i, clip);

                depois(Math.max(0.6, clip.duracao) * 1000, () => {
                    if (!ligado || g !== geracao) return;
                    esbaterImg(camada, false);
                    esbaterImg(base, true);
                    indice = -1;
                    avisar(-1, null);
                    /* Já invisível, larga a imagem: deixa de gastar CPU e, da
                       próxima vez, a animação começa do primeiro fotograma
                       (com o mesmo src, continuava a meio). */
                    depois((cfg.transicao.duracao + 0.15) * 1000, () => {
                        if (g === geracao && camada.style.opacity === '0') camada.removeAttribute('src');
                    });
                    depois(cfg.pausa * 1000, () => {
                        if (g !== geracao) return;
                        passoImagem(i + 1);
                    });
                });
            };

            /* Só uma entrada por clipe: o onload e o «já está em cache»
               podiam disparar os dois e o clipe aparecia duas vezes. */
            let marcado = false;
            const marcar = () => { if (marcado) return; marcado = true; depois(120, entrar); };
            const saltar = (porque) => {
                if (marcado || g !== geracao) return;
                marcado = true;
                registar(porque, clip.id);
                passoImagem(i + 1);
            };

            camada.onload = marcar;
            camada.onerror = () => saltar('imagem-falhou');
            camada.src = url(clip.webp);
            if (camada.complete && camada.naturalWidth) marcar();
            // rede lenta ou pedido perdido: o ciclo nunca fica preso à espera
            depois(15000, () => saltar('imagem-demorou'));

            /* A seguinte já vai sendo descarregada enquanto esta passa */
            const seguinte = cfg.clips[i + 1];
            if (seguinte) { const pre = new Image(); pre.src = url(seguinte.webp); }
        }

        function avisar(i, clip) {
            if (typeof op.aoMudar !== 'function') return;
            try { op.aoMudar(i, clip); } catch (e) {}
        }

        function registar(evento, extra) {
            const t = Math.round(performance.now());
            const l = global.__animLog;
            if (Array.isArray(l)) {
                l.push({ t, evento, indice, extra: extra || '' });
                if (l.length > 80) l.shift();
            }
            /* O mesmo, no registo geral que aparece no ecrã da TV */
            const g = global.__logs;
            if (Array.isArray(g)) {
                g.push({ t, nivel: 'anim', texto: evento + (extra ? ' ' + extra : '') + (indice >= 0 ? ' #' + indice : '') });
                if (g.length > 60) g.shift();
            }
        }

        function tocar(posicao, restante, fade) {
            if (!ligado) return;
            if (modoImagem) return;   // o ciclo é feito por imagens
            if (!cfg.clips.length) { fundo(true); return; }

            indice = posicao % cfg.clips.length;
            const clip = cfg.clips[indice];
            const g = geracao;
            const T = fade == null ? cfg.transicao.duracao : fade;
            registar('tocar', clip.id);

            const entrada = camadas[qual];
            const saida = camadas[1 - qual];

            let arrancou = false;

            const entrar = () => {
                if (arrancou || !ligado || g !== geracao) return;

                // Se o browser travou a reprodução, não vale a pena mostrar
                // um fotograma parado no ecrã.
                if (entrada.paused) {
                    const nova = entrada.play();
                    if (nova && nova.catch) nova.catch(() => {});
                    if (entrada.paused) return falhar();
                }

                arrancou = true;
                registar('entrar', clip.id);

                esbater(entrada, true, T);
                fundo(false);
                esbater(saida, false, T);

                avisar(indice, clip);

                depois(Math.max(0.3, T) * 1000 + 60, () => {
                    try { saida.pause(); } catch (e) {}
                });

                /*
                 * Tempo de ecrã deste clipe:
                 *  - cabe no ficheiro  → sai para o seguinte ao fim do tempo escolhido
                 *  - é mais longo que o ficheiro → repete-o com esbatimento em vez
                 *    de saltar do fim para o princípio (sem quebra de frame)
                 */
                const dwell = restante == null ? clip.duracao : restante;
                const duracaoFicheiro = Number(entrada.duration) || clip.natural || 2.5;
                const disponivel = Math.max(0.4, duracaoFicheiro - T);
                const janela = Math.max(0.3, Math.min(disponivel, dwell));
                const inicioJanela = performance.now();

                const avancar = () => {
                    if (g !== geracao) return;
                    qual = 1 - qual;
                    const falta = dwell - janela;

                    // Só repete o clipe se o tempo escolhido for maior que o ficheiro
                    if (falta > 0.35 && dwell > duracaoFicheiro + 0.05) {
                        return tocar(indice, falta, Math.max(0.4, cfg.transicao.duracao));
                    }

                    const seguinte = indice + 1;
                    if (seguinte >= cfg.clips.length) {
                        if (cfg.transicao.voltarLogo) return reiniciarCiclo();
                        return descanso(() => tocar(0));
                    }

                    descanso(() => tocar(seguinte));
                };

                /*
                 * Pausa: a logo volta a ficar parada entre animações.
                 * É isto que impede a sequência de ser movimento sem fim:
                 * animação → logo parada → animação → …
                 */
                const descanso = (seguinte) => {
                    if (cfg.pausa <= 0) return seguinte();
                    if (g !== geracao) return;

                    const Tfade = cfg.transicao.duracao;
                    fundo(true);
                    camadas.forEach((v) => esbater(v, false, Tfade));
                    avisar(-1, null);

                    // só pára a descodificação depois de a camada já estar invisível
                    depois((Tfade + 0.15) * 1000, () => {
                        camadas.forEach((v) => { try { v.pause(); } catch (e) {} });
                    });

                    depois(cfg.pausa * 1000, () => {
                        if (g !== geracao) return;
                        seguinte();
                    });
                };

                /*
                 * A saída é marcada pelo tempo do próprio vídeo, não por um
                 * relógio paralelo: assim a dissolvência começa sempre no
                 * ponto certo, mesmo que a descodificação atrase no início.
                 */
                const vigiar = () => {
                    if (!ligado || g !== geracao) return;

                    const decorrido = (performance.now() - inicioJanela) / 1000;
                    const tempoVideo = entrada.currentTime;

                    if (entrada.ended || tempoVideo >= janela - 0.06 || decorrido > janela + 2.5) {
                        return avancar();
                    }

                    depois(70, vigiar);
                };

                depois(70, vigiar);
            };

            const falhar = () => {
                if (arrancou || !ligado || g !== geracao) return;
                registar('falhar', clip.id);
                // Este clipe não abre (formato em falta no browser):
                // salta para o seguinte, sem deixar um retângulo no ecrã.
                estilo(entrada).style.opacity = '0';
                if (cfg.clips.length > 1 && indice + 1 < cfg.clips.length) return tocar(indice + 1);
                fundo(true);
            };

            let jaArrancou = false;

            const arrancar = () => {
                if (jaArrancou || !ligado || g !== geracao) return;
                jaArrancou = true;
                const p = entrada.play();
                if (p && p.catch) p.catch(() => depois(500, entrar));
            };

            entrada.loop = false;
            entrada.src = url(clip.webm);
            entrada.onplaying = () => depois(140, entrar);
            entrada.onerror = falhar;

            // Se esta camada já tinha este clipe, volta-se ao início sem
            // recarregar o ficheiro (o load() obrigaria a descarregar outra vez
            // e atrasava o esbatimento quase um segundo).
            try {
                if (entrada.currentTime > 0.02) {
                    entrada.pause();
                    entrada.currentTime = 0;
                    entrada.addEventListener('seeked', arrancar, { once: true });
                    depois(350, arrancar);
                } else {
                    arrancar();
                }
            } catch (e) {
                arrancar();
            }

            // rede de segurança, caso o browser nunca dispare 'playing'
            depois(2600, () => { if (!arrancou) falhar(); });
        }

        function reiniciarCiclo() {
            registar('reiniciarCiclo');
            geracao++;
            limparTimers();
            pararCamadas();
            fundo(true);
            indice = -1;
            avisar(-1, null);

            // A pausa entre animações também serve de descanso no fim da volta
            const espera = cfg.pausa > 0 ? cfg.pausa : cfg.transicao.esperaLogo;
            depois(espera * 1000, () => tocar(0));
        }

        function iniciar() {
            registar('iniciar');
            geracao++;
            ligado = true;
            limparTimers();
            host.style.aspectRatio = String(cfg.proporcao);
            if (modoImagem) return iniciarImagem();

            /* Se a logo escolhida para entre as animações mudou, troca-se
               já o ficheiro, sem esperar por um recarregamento. */
            const desejada = enderecoDaLogo();
            if (logo.getAttribute('src') !== desejada) {
                logo.src = desejada;
                const p = logo.play();
                if (p && p.catch) p.catch(() => {});
            }
            camadas.forEach((v) => { v.onplaying = null; v.onerror = null; });
            pararCamadas();
            fundo(true);

            /* As animações são ampliadas em volta do centro do desenho (48,5%
             * da altura), por isso crescem sem sair do sítio. */
            camadas.forEach((v) => {
                const c = estilo(v);
                c.style.transformOrigin = '50% 48.5%';
                c.style.transform = cfg.zoom === 1 ? '' : 'scale(' + cfg.zoom + ')';
            });

            depois(cfg.transicao.logoInicial * 1000, () => tocar(0));
        }

        function parar() {
            ligado = false;
            limparTimers();
            pararCamadas();
        }

        if (op.modoImagem) entrarModoImagem('pedido');
        else if (NA_TV && !pedidoVideo) entrarModoImagem('TV');
        else criarVideos();

        iniciar();

        /*
         * O browser pode recusar o primeiro play — por exemplo quando a
         * logo é criada ainda fora do ecrã (é o que acontecia no palco do
         * editor, onde a logo ficava a imagem parada). Insiste-se pouco
         * depois, na primeira interação e quando o ecrã volta. (Depois
         * disso, quem vigia é o vigilante.)
         */
        const insistir = () => {
            if (!logo || !logo.isConnected) return;
            if (logo.paused) arrancarLogo();
        };
        [400, 1500, 4000, 9000].forEach((ms) => depois(ms, insistir));
        document.addEventListener('pointerdown', insistir, { once: true });
        document.addEventListener('keydown', insistir, { once: true });
        document.addEventListener('visibilitychange', () => { if (!document.hidden) insistir(); });

        return {
            host,
            parar,
            reiniciar: iniciar,
            atualizar: (novo) => { cfg = normalizar(novo || {}); iniciar(); },
            estado: () => ({ indice, total: cfg.clips.length, ligado, modo: modoImagem ? 'imagem' : 'video' }),
            config: () => cfg
        };
    }

    global.Animacoes = { criarLeitor };
})(window);
