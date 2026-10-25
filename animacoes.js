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

    function criarLeitor(host, config, opcoes) {
        const op = opcoes || {};
        let cfg = normalizar(config || {});

        host.innerHTML = '';
        host.classList.add('leitor-logo');

        const logo = document.createElement('img');
        logo.className = 'logo-original';
        logo.alt = '';
        logo.src = LOGO;
        logo.style.opacity = '1';
        host.appendChild(logo);

        const camadas = [camada(), camada()];

        let qual = 0;
        let indice = -1;
        let ligado = false;
        let timers = [];
        let geracao = 0;      // cada reinício invalida as tarefas do ciclo anterior

        function camada() {
            const v = document.createElement('video');
            v.className = 'clipe-logo';
            v.muted = true;
            v.playsInline = true;
            v.preload = 'auto';
            v.setAttribute('muted', '');
            v.setAttribute('playsinline', '');
            v.style.opacity = '0';
            host.appendChild(v);
            return v;
        }

        function normalizar(c) {
            const t = Object.assign({}, OMISSAO, c.transicao || {});
            const clips = (Array.isArray(c.clips) ? c.clips : [])
                .filter((d) => d && d.ativo !== false && d.webm)
                .map((d) => ({
                    id: d.id || d.nome || 'clipe',
                    nome: d.nome || '',
                    webm: d.webm,
                    duracao: Math.max(0.4, Number(d.duracao) || 2),
                    natural: Math.max(0.4, Number(d.natural) || Number(d.duracao) || 2.5)
                }));

            return {
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

        function fundo(visivel) {
            const d = cfg.transicao.duracao;
            logo.style.transition = d > 0 ? 'opacity ' + d + 's ease-in-out' : 'none';
            logo.style.opacity = visivel ? '1' : '0';
        }

        function esbater(video, visivel, duracao) {
            const d = duracao == null ? cfg.transicao.duracao : duracao;
            video.style.transition = d > 0 ? 'opacity ' + d + 's ease-in-out' : 'none';
            video.style.opacity = visivel ? '1' : '0';
        }

        function pararCamadas() {
            camadas.forEach((v) => {
                try { v.pause(); } catch (e) {}
                v.style.opacity = '0';
            });
        }

        function avisar(i, clip) {
            if (typeof op.aoMudar !== 'function') return;
            try { op.aoMudar(i, clip); } catch (e) {}
        }

        function registar(evento, extra) {
            const l = global.__animLog;
            if (!Array.isArray(l)) return;
            l.push({ t: Math.round(performance.now()), evento, indice, extra: extra || '' });
            if (l.length > 80) l.shift();
        }

        function tocar(posicao, restante, fade) {
            if (!ligado) return;
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
                // salta para o seguinte, sem deixar um retângulo verde no ecrã.
                entrada.style.opacity = '0';
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
            camadas.forEach((v) => { v.onplaying = null; v.onerror = null; });
            pararCamadas();
            fundo(true);
            host.style.aspectRatio = String(cfg.proporcao);

            /* As animações são ampliadas em volta do centro do desenho (48,5%
             * da altura), por isso crescem sem sair do sítio. */
            camadas.forEach((v) => {
                v.style.transformOrigin = '50% 48.5%';
                v.style.transform = cfg.zoom === 1 ? '' : 'scale(' + cfg.zoom + ')';
            });

            depois(cfg.transicao.logoInicial * 1000, () => tocar(0));
        }

        function parar() {
            ligado = false;
            limparTimers();
            pararCamadas();
        }

        iniciar();

        return {
            host,
            parar,
            reiniciar: iniciar,
            atualizar: (novo) => { cfg = normalizar(novo || {}); iniciar(); },
            estado: () => ({ indice, total: cfg.clips.length, ligado }),
            config: () => cfg
        };
    }

    global.Animacoes = { criarLeitor };
})(window);
