/*
 * efeitos.js — figuras vetoriais, efeitos animados e kits de épocas.
 * Usado tanto pelos ecrãs (index.html) como pelo editor (editor/editor.html),
 * para o que vês no editor ser exatamente o que aparece na TV.
 */
(function (global) {
    'use strict';

    /* ------------------------------------------------------------------
       FIGURAS — arte vetorial, sem ficheiros: fica nítida em qualquer TV
       ------------------------------------------------------------------ */
    let contador = 0;
    function uid(prefixo) {
        contador += 1;
        return prefixo + contador;
    }

    const FIGURAS = {
        /* ---------- Halloween ---------- */
        abobora() {
            const u = uid('pk');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="${u}a" cx="42%" cy="30%" r="78%">
                        <stop offset="0" stop-color="#ffcf87"/>
                        <stop offset=".45" stop-color="#ff9a2e"/>
                        <stop offset="1" stop-color="#c4570a"/>
                    </radialGradient>
                    <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#79c94e"/>
                        <stop offset="1" stop-color="#2f6b1c"/>
                    </linearGradient>
                </defs>
                <ellipse cx="100" cy="128" rx="88" ry="62" fill="url(#${u}a)"/>
                <ellipse cx="46" cy="128" rx="22" ry="56" fill="#d9660a" opacity=".35"/>
                <ellipse cx="154" cy="128" rx="22" ry="56" fill="#d9660a" opacity=".35"/>
                <ellipse cx="100" cy="122" rx="32" ry="52" fill="#ffb957" opacity=".35"/>
                <path d="M100 66c-3-16 1-27 10-35 4-4 9-7 13-8-4 13-6 28-7 43z" fill="url(#${u}b)"/>
                <path d="M62 100h28l-14 19z" fill="#3a1c05"/>
                <path d="M110 100h28l-14 19z" fill="#3a1c05"/>
                <path d="M58 132c9 4 12 12 10 21 9-7 14-7 22 0 9-7 14-7 22 0 9-7 14-7 22 0-2-9 1-17 10-21"
                      fill="none" stroke="#3a1c05" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>
            </svg>`;
        },

        morcego() {
            const u = uid('bt');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#3b3b52"/>
                        <stop offset="1" stop-color="#111118"/>
                    </linearGradient>
                </defs>
                <g fill="url(#${u}a)">
                    <ellipse cx="100" cy="104" rx="15" ry="20"/>
                    <path d="M100 90C86 74 62 68 40 76c9 5 14 13 12 22 8-4 17-2 22 5 4-8 10-11 26-13z"/>
                    <path d="M100 90c14-16 38-22 60-14-9 5-14 13-12 22-8-4-17-2-22 5-4-8-10-11-26-13z"/>
                    <path d="M88 86l-8-16 13 7zM112 86l8-16-13 7z"/>
                </g>
                <circle cx="94" cy="99" r="2.6" fill="#ff6b5a"/>
                <circle cx="106" cy="99" r="2.6" fill="#ff6b5a"/>
            </svg>`;
        },

        teia() {
            const u = uid('wb');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#eaf6ff" stroke-linecap="round" opacity=".55">
                    <path d="M0 0 200 0M0 0 200 74M0 0 200 152M0 0 152 200M0 0 74 200M0 0 0 200" stroke-width="2.4"/>
                    <path d="M34 0Q34 34 0 34M72 0Q72 72 0 72M116 0Q116 116 0 116M164 0Q164 164 0 164" stroke-width="2"/>
                </g>
            </svg>`;
        },

        fantasma() {
            const u = uid('gh');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#ffffff"/>
                        <stop offset="1" stop-color="#cdd8ff"/>
                    </linearGradient>
                </defs>
                <path d="M100 26c33 0 57 25 57 59v68c0 10-12 14-18 6l-11-14-11 20c-4 7-14 7-18 0l-11-20-11 20c-4 7-14 7-18 0l-11-20-11 14c-6 8-18 4-18-6V85c0-34 24-59 57-59z"
                      fill="url(#${u}a)" opacity=".92"/>
                <circle cx="82" cy="92" r="7.5" fill="#2b2b44"/>
                <circle cx="118" cy="92" r="7.5" fill="#2b2b44"/>
                <ellipse cx="100" cy="116" rx="8" ry="6" fill="#2b2b44" opacity=".65"/>
            </svg>`;
        },

        /* ---------- Natal ---------- */
        arvore() {
            const u = uid('tr');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#3aa35a"/>
                        <stop offset="1" stop-color="#0b5227"/>
                    </linearGradient>
                    <radialGradient id="${u}b">
                        <stop offset="0" stop-color="#ffe9a3" stop-opacity=".55"/>
                        <stop offset="1" stop-color="#ffe9a3" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="100" cy="110" r="90" fill="url(#${u}b)"/>
                <rect x="92" y="152" width="16" height="32" rx="5" fill="#6b3e1f"/>
                <path d="M100 36 146 106 54 106z" fill="url(#${u}a)"/>
                <path d="M100 66 160 136 40 136z" fill="#2b8a4a"/>
                <path d="M100 98 172 158 28 158z" fill="#1b6a37"/>
                <circle cx="72" cy="122" r="4.2" fill="#ff6b6b"/>
                <circle cx="128" cy="120" r="4.2" fill="#7ee0ff"/>
                <circle cx="92" cy="142" r="4" fill="#ffd34d"/>
                <circle cx="118" cy="146" r="4" fill="#ff6b6b"/>
                <circle cx="148" cy="148" r="3.6" fill="#ffd34d"/>
                <circle cx="56" cy="146" r="3.6" fill="#7ee0ff"/>
                <path d="M100 14l5.5 15 16 1.4-12.4 10.2 4 15.6L100 48l-13.1 8.2 4-15.6L78.5 30.4l16-1.4z" fill="#ffd54a"/>
            </svg>`;
        },

        floco() {
            const u = uid('sw');
            const braços = [0, 60, 120, 180, 240, 300].map((a) => `
                <g transform="rotate(${a} 100 100)">
                    <path d="M100 22V178" stroke-width="7"/>
                    <path d="M100 48l-14-13M100 48l14-13M100 74l-11-10M100 74l11-10M100 152l-14 13M100 152l14 13" stroke-width="5"/>
                </g>`).join('');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <g fill="none" stroke="#e8f7ff" stroke-linecap="round" opacity=".92">${braços}</g>
                <circle cx="100" cy="100" r="9" fill="#ffffff" opacity=".9"/>
            </svg>`;
        },

        luzes() {
            const cores = ['#ff5f5f', '#ffd93d', '#6ee7a8', '#61c8ff', '#c58fff'];
            let cabos = '';
            let bolbos = '';
            for (let i = 0; i < 22; i++) {
                const x = 34 + i * 71;
                const y = 44 + Math.round(20 * Math.sin(i * 0.85));
                cabos += `<line x1="${x}" y1="18" x2="${x}" y2="${y - 15}" stroke="#2a2a33" stroke-width="4"/>`;
                const cor = cores[i % cores.length];
                bolbos += `
                    <circle cx="${x}" cy="${y}" r="20" fill="${cor}" opacity=".16"/>
                    <circle cx="${x}" cy="${y}" r="13" fill="${cor}"/>
                    <circle cx="${x - 4}" cy="${y - 5}" r="4" fill="#ffffff" opacity=".55"/>`;
            }
            return `<svg viewBox="0 0 1600 150" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 18H1600" stroke="#2a2a33" stroke-width="6" stroke-linecap="round"/>
                ${cabos}${bolbos}
            </svg>`;
        },

        presente() {
            const u = uid('gf');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#f24257"/>
                        <stop offset="1" stop-color="#b21f31"/>
                    </linearGradient>
                    <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#ffd76a"/>
                        <stop offset="1" stop-color="#e3a516"/>
                    </linearGradient>
                </defs>
                <rect x="36" y="88" width="128" height="86" rx="10" fill="url(#${u}a)"/>
                <rect x="24" y="62" width="152" height="34" rx="9" fill="#ef3b50"/>
                <rect x="90" y="62" width="20" height="112" fill="url(#${u}b)"/>
                <path d="M100 62C84 30 46 24 42 42c-4 16 28 22 58 20z" fill="url(#${u}b)"/>
                <path d="M100 62c16-32 54-38 58-20 4 16-28 22-58 20z" fill="url(#${u}b)"/>
                <circle cx="100" cy="60" r="10" fill="#ffe89a"/>
            </svg>`;
        },

        estrela(o) {
            const u = uid('st');
            const cor = (o && o.cor) || '#ffd15c';
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="${u}a">
                        <stop offset="0" stop-color="#fff8d6"/>
                        <stop offset=".55" stop-color="${cor}"/>
                        <stop offset="1" stop-color="#e79a12"/>
                    </radialGradient>
                    <radialGradient id="${u}b">
                        <stop offset="0" stop-color="${cor}" stop-opacity=".45"/>
                        <stop offset="1" stop-color="${cor}" stop-opacity="0"/>
                    </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="98" fill="url(#${u}b)"/>
                <path d="M100 22 122 74 178 79 136 117 148 172 100 143 52 172 64 117 22 79 78 74z" fill="url(#${u}a)"/>
            </svg>`;
        },

        /* ---------- Páscoa ---------- */
        ovo(o) {
            const u = uid('eg');
            const cor = (o && o.cor) || '#ffc2d9';
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#fff4f9"/>
                        <stop offset="1" stop-color="${cor}"/>
                    </linearGradient>
                    <clipPath id="${u}b">
                        <path d="M100 18c34 0 62 40 62 78 0 44-28 78-62 78s-62-34-62-78c0-38 28-78 62-78z"/>
                    </clipPath>
                </defs>
                <path d="M100 18c34 0 62 40 62 78 0 44-28 78-62 78s-62-34-62-78c0-38 28-78 62-78z" fill="url(#${u}a)"/>
                <g clip-path="url(#${u}b)" fill="none" stroke-linecap="round">
                    <path d="M34 112c18 13 36 13 55 0s37-13 55 0" stroke="#ff9ec4" stroke-width="12"/>
                    <path d="M30 150c18 13 36 13 55 0s37-13 55 0" stroke="#a99bff" stroke-width="9" opacity=".85"/>
                </g>
                <circle cx="78" cy="72" r="7" fill="#ffd166"/>
                <circle cx="118" cy="58" r="5" fill="#7fd6a9"/>
                <circle cx="104" cy="86" r="6" fill="#8ecbff"/>
            </svg>`;
        },

        coelho() {
            const u = uid('rb');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#ffffff"/>
                        <stop offset="1" stop-color="#e5e1f7"/>
                    </linearGradient>
                </defs>
                <g fill="url(#${u}a)">
                    <ellipse cx="78" cy="62" rx="17" ry="46" transform="rotate(-13 78 62)"/>
                    <ellipse cx="122" cy="62" rx="17" ry="46" transform="rotate(13 122 62)"/>
                    <ellipse cx="100" cy="142" rx="52" ry="46"/>
                </g>
                <g fill="#ffc7d9">
                    <ellipse cx="78" cy="62" rx="7" ry="31" transform="rotate(-13 78 62)"/>
                    <ellipse cx="122" cy="62" rx="7" ry="31" transform="rotate(13 122 62)"/>
                </g>
                <circle cx="82" cy="134" r="6.5" fill="#3a3a4a"/>
                <circle cx="118" cy="134" r="6.5" fill="#3a3a4a"/>
                <path d="M92 150h16l-8 9z" fill="#ff9ab5"/>
                <path d="M100 159v6M100 165c-4 6-12 5-13 0M100 165c4 6 12 5 13 0" stroke="#c9c2e0" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>`;
        },

        flor(o) {
            const u = uid('fl');
            const cor = (o && o.cor) || '#fff6b0';
            let petalas = '';
            for (let i = 0; i < 8; i++) {
                petalas += `<ellipse cx="100" cy="54" rx="17" ry="30" fill="${cor}" transform="rotate(${i * 45} 100 100)"/>`;
            }
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="${u}a">
                        <stop offset="0" stop-color="#ffe28a"/>
                        <stop offset="1" stop-color="#f4a72c"/>
                    </radialGradient>
                </defs>
                ${petalas}
                <circle cx="100" cy="100" r="24" fill="url(#${u}a)"/>
            </svg>`;
        },

        /* ---------- Verão / Valentim ---------- */
        sol() {
            const u = uid('su');
            let raios = '';
            for (let i = 0; i < 12; i++) {
                raios += `<line x1="100" y1="26" x2="100" y2="52" stroke="#ffc94d" stroke-width="9" stroke-linecap="round" transform="rotate(${i * 30} 100 100)"/>`;
            }
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <radialGradient id="${u}a">
                        <stop offset="0" stop-color="#fff3b0"/>
                        <stop offset=".62" stop-color="#ffc94d"/>
                        <stop offset="1" stop-color="#ff9f1c"/>
                    </radialGradient>
                </defs>
                <circle cx="100" cy="100" r="66" fill="#ffc94d" opacity=".18"/>
                ${raios}
                <circle cx="100" cy="100" r="44" fill="url(#${u}a)"/>
            </svg>`;
        },

        coracao() {
            const u = uid('hr');
            return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stop-color="#ff9fb6"/>
                        <stop offset="1" stop-color="#d81b52"/>
                    </linearGradient>
                </defs>
                <path d="M100 174S20 126 20 76c0-30 22-52 50-52 17 0 31 9 40 23 9-14 23-23 40-23 28 0 50 22 50 52 0 50-80 98-80 98z"
                      fill="url(#${u}a)"/>
                <ellipse cx="70" cy="62" rx="16" ry="11" fill="#ffffff" opacity=".35" transform="rotate(-26 70 62)"/>
            </svg>`;
        },
    };

    function svgFigura(nome, cor) {
        const figura = FIGURAS[nome];
        return figura ? figura({ cor: cor }) : '';
    }

    /* ------------------------------------------------------------------
       EFEITOS — partículas em canvas, leves o suficiente para uma TV
       ------------------------------------------------------------------ */
    const EFEITOS = ['neve', 'morcegos', 'brilhos', 'confetes', 'coracoes', 'petalas', 'bolhas', 'folhas', 'fogos'];

    const NOMES_EFEITO = {
        neve: 'Neve',
        morcegos: 'Morcegos',
        brilhos: 'Brilhos',
        confetes: 'Confetes',
        coracoes: 'Corações',
        petalas: 'Pétalas',
        bolhas: 'Bolhas',
        folhas: 'Folhas',
        fogos: 'Fogos de artifício'
    };

    function iniciarEfeito(nome, host, opcoes) {
        const op = opcoes || {};
        const canvas = document.createElement('canvas');
        canvas.className = 'efeito-canvas';
        host.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        let w = 1;
        let h = 1;
        let ligado = true;
        let ultimo = performance.now();
        let relogio = 0;
        let proximoFoguete = 800;

        const particulas = [];
        const foguetes = [];
        const claroes = [];
        const ambiente = [];
        const cache = new Map();

        function escala() { return Math.max(0.62, Math.min(1.45, w / 1500)); }
        function sorteio(min, max) { return min + Math.random() * (max - min); }
        function escolha(lista) { return lista[(Math.random() * lista.length) | 0]; }

        /* ------------------------------------------------------------------
           Sprites: cada partícula é desenhada uma vez num canvas pequeno e
           depois só é copiada. Dá contornos suaves e brilho sem gastar CPU.
           ------------------------------------------------------------------ */
        const PALETA = {
            neve: ['235,246,255', '214,236,255', '255,255,255'],
            brilho: ['255,226,160', '255,244,214', '255,205,120'],
            coracao: ['255,120,155', '255,160,190', '255,90,130'],
            petala: ['255,158,196', '255,185,214', '247,127,174', '255,210,228'],
            folha: ['224,122,31', '198,90,18', '232,165,49', '168,67,12'],
            confete: ['226,58,80', '24,150,94', '47,107,216', '242,167,18', '139,92,246', '236,72,153'],
            bolha: ['220,244,255', '186,228,255'],
            fogo: ['255,110,60', '255,64,120', '96,190,255', '255,206,90', '172,120,255', '96,240,190', '255,244,214'],
            bokeh: {
                neve: '190,220,255',
                brilhos: '255,214,150',
                fogos: '255,205,150',
                coracoes: '255,130,160',
                petalas: '255,190,210',
                bolhas: '150,215,255',
                folhas: '255,180,110',
                confetes: '255,225,170'
            }
        };

        function sprite(tipo, raio, cor) {
            const chave = tipo + ':' + Math.round(raio * 10) + ':' + (cor || '');
            const guardado = cache.get(chave);
            if (guardado) return guardado;

            const lado = Math.max(12, Math.ceil(raio * 4));
            const c = document.createElement('canvas');
            c.width = lado;
            c.height = lado;

            const g = c.getContext('2d');
            g.translate(lado / 2, lado / 2);
            g.scale(2, 2);

            desenharSprite(g, tipo, raio, cor || '255,255,255');

            cache.set(chave, c);
            return c;
        }

        function desenharSprite(g, tipo, r, cor) {
            switch (tipo) {
                case 'disco': {
                    const grad = g.createRadialGradient(0, 0, 0, 0, 0, r);
                    grad.addColorStop(0, 'rgba(' + cor + ',1)');
                    grad.addColorStop(0.45, 'rgba(' + cor + ',.85)');
                    grad.addColorStop(1, 'rgba(' + cor + ',0)');
                    g.fillStyle = grad;
                    g.beginPath();
                    g.arc(0, 0, r, 0, 6.3);
                    g.fill();
                    break;
                }

                case 'floco': {
                    g.strokeStyle = 'rgba(' + cor + ',.95)';
                    g.lineWidth = Math.max(1, r * 0.17);
                    g.lineCap = 'round';
                    g.shadowColor = 'rgba(' + cor + ',.9)';
                    g.shadowBlur = r * 1.6;
                    for (let i = 0; i < 6; i++) {
                        g.save();
                        g.rotate(i * Math.PI / 3);
                        g.beginPath();
                        g.moveTo(0, 0);
                        g.lineTo(0, -r * 0.9);
                        g.stroke();
                        g.beginPath();
                        g.moveTo(0, -r * 0.48);
                        g.lineTo(r * 0.3, -r * 0.7);
                        g.moveTo(0, -r * 0.48);
                        g.lineTo(-r * 0.3, -r * 0.7);
                        g.stroke();
                        g.restore();
                    }
                    g.shadowBlur = 0;
                    g.fillStyle = 'rgba(255,255,255,.95)';
                    g.beginPath();
                    g.arc(0, 0, r * 0.14, 0, 6.3);
                    g.fill();
                    break;
                }

                case 'brilho': {
                    const halo = g.createRadialGradient(0, 0, 0, 0, 0, r);
                    halo.addColorStop(0, 'rgba(255,255,255,.92)');
                    halo.addColorStop(0.16, 'rgba(' + cor + ',.75)');
                    halo.addColorStop(0.55, 'rgba(' + cor + ',.18)');
                    halo.addColorStop(1, 'rgba(' + cor + ',0)');
                    g.fillStyle = halo;
                    g.beginPath();
                    g.arc(0, 0, r, 0, 6.3);
                    g.fill();

                    const raios = g.createLinearGradient(0, -r, 0, r);
                    raios.addColorStop(0, 'rgba(255,255,255,0)');
                    raios.addColorStop(0.5, 'rgba(255,255,255,.9)');
                    raios.addColorStop(1, 'rgba(255,255,255,0)');
                    g.fillStyle = raios;
                    g.fillRect(-r * 0.055, -r, r * 0.11, r * 2);
                    g.fillRect(-r, -r * 0.055, r * 2, r * 0.11);
                    break;
                }

                case 'bokeh': {
                    const grad = g.createRadialGradient(0, 0, 0, 0, 0, r);
                    grad.addColorStop(0, 'rgba(' + cor + ',.16)');
                    grad.addColorStop(0.68, 'rgba(' + cor + ',.11)');
                    grad.addColorStop(0.85, 'rgba(' + cor + ',.19)');
                    grad.addColorStop(1, 'rgba(' + cor + ',0)');
                    g.fillStyle = grad;
                    g.beginPath();
                    g.arc(0, 0, r, 0, 6.3);
                    g.fill();
                    break;
                }

                case 'coracao': {
                    g.shadowColor = 'rgba(' + cor + ',.85)';
                    g.shadowBlur = r * 0.9;
                    const grad = g.createLinearGradient(0, -r, 0, r);
                    grad.addColorStop(0, 'rgba(255,190,210,.95)');
                    grad.addColorStop(0.55, 'rgba(' + cor + ',.92)');
                    grad.addColorStop(1, 'rgba(' + cor + ',.75)');
                    g.fillStyle = grad;
                    g.beginPath();
                    g.moveTo(0, r * 0.78);
                    g.bezierCurveTo(-r * 1.25, -r * 0.06, -r * 0.58, -r * 1.02, 0, -r * 0.3);
                    g.bezierCurveTo(r * 0.58, -r * 1.02, r * 1.25, -r * 0.06, 0, r * 0.78);
                    g.fill();
                    g.shadowBlur = 0;
                    break;
                }

                case 'petala': {
                    const grad = g.createLinearGradient(0, -r, 0, r);
                    grad.addColorStop(0, 'rgba(255,255,255,.55)');
                    grad.addColorStop(0.5, 'rgba(' + cor + ',.92)');
                    grad.addColorStop(1, 'rgba(' + cor + ',.6)');
                    g.fillStyle = grad;
                    g.shadowColor = 'rgba(' + cor + ',.45)';
                    g.shadowBlur = r * 0.8;
                    g.beginPath();
                    g.moveTo(0, -r);
                    g.bezierCurveTo(r * 0.85, -r * 0.55, r * 0.7, r * 0.6, 0, r);
                    g.bezierCurveTo(-r * 0.7, r * 0.6, -r * 0.85, -r * 0.55, 0, -r);
                    g.fill();
                    g.shadowBlur = 0;
                    break;
                }

                case 'folha': {
                    const grad = g.createLinearGradient(0, -r, 0, r);
                    grad.addColorStop(0, 'rgba(' + cor + ',.95)');
                    grad.addColorStop(1, 'rgba(' + cor + ',.7)');
                    g.fillStyle = grad;
                    g.shadowColor = 'rgba(0,0,0,.35)';
                    g.shadowBlur = r * 0.5;
                    g.beginPath();
                    g.moveTo(-r, 0);
                    g.quadraticCurveTo(-r * 0.2, -r * 0.85, r, 0);
                    g.quadraticCurveTo(-r * 0.2, r * 0.85, -r, 0);
                    g.fill();
                    g.shadowBlur = 0;
                    g.strokeStyle = 'rgba(255,255,255,.32)';
                    g.lineWidth = Math.max(0.8, r * 0.08);
                    g.beginPath();
                    g.moveTo(-r * 0.8, 0);
                    g.lineTo(r * 0.75, 0);
                    g.stroke();
                    break;
                }

                case 'bolha': {
                    const grad = g.createRadialGradient(0, 0, r * 0.2, 0, 0, r);
                    grad.addColorStop(0, 'rgba(' + cor + ',.05)');
                    grad.addColorStop(0.82, 'rgba(' + cor + ',.10)');
                    grad.addColorStop(1, 'rgba(' + cor + ',.55)');
                    g.fillStyle = grad;
                    g.beginPath();
                    g.arc(0, 0, r, 0, 6.3);
                    g.fill();
                    g.strokeStyle = 'rgba(255,255,255,.55)';
                    g.lineWidth = Math.max(0.9, r * 0.09);
                    g.beginPath();
                    g.arc(0, 0, r * 0.96, 0, 6.3);
                    g.stroke();
                    g.fillStyle = 'rgba(255,255,255,.75)';
                    g.beginPath();
                    g.ellipse(-r * 0.34, -r * 0.38, r * 0.17, r * 0.11, -0.7, 0, 6.3);
                    g.fill();
                    break;
                }

                case 'confete': {
                    /* fita metalizada: cor sólida, com um brilho branco ao centro */
                    g.fillStyle = 'rgba(' + cor + ',.97)';
                    g.fillRect(-r, -r * 0.26, r * 2, r * 0.52);
                    const brilho = g.createLinearGradient(-r, 0, r, 0);
                    brilho.addColorStop(0, 'rgba(255,255,255,0)');
                    brilho.addColorStop(0.45, 'rgba(255,255,255,.7)');
                    brilho.addColorStop(0.62, 'rgba(255,255,255,0)');
                    g.fillStyle = brilho;
                    g.fillRect(-r, -r * 0.26, r * 2, r * 0.52);
                    break;
                }

                case 'flash': {
                    const grad = g.createRadialGradient(0, 0, 0, 0, 0, r);
                    grad.addColorStop(0, 'rgba(255,255,255,.9)');
                    grad.addColorStop(0.3, 'rgba(' + cor + ',.55)');
                    grad.addColorStop(1, 'rgba(' + cor + ',0)');
                    g.fillStyle = grad;
                    g.beginPath();
                    g.arc(0, 0, r, 0, 6.3);
                    g.fill();
                    break;
                }

                default:
                    break;
            }
        }

        /* ------------------------------------------------------------------
           Partículas
           ------------------------------------------------------------------ */
        function nova(tipo, inicial) {
            const z = 0.45 + Math.random() * 0.95;    // profundidade (perto/longe)

            switch (tipo) {
                case 'neve':
                    return {
                        z: z,
                        x: sorteio(-30, w + 30),
                        y: inicial ? sorteio(-h, h) : sorteio(-80, -10),
                        r: sorteio(1.7, 3.3) * z,
                        vy: sorteio(13, 27) * z,
                        fase: sorteio(0, 6.3),
                        giro: sorteio(0, 6.3),
                        vg: sorteio(-0.5, 0.5),
                        a: Math.min(1, 0.34 + z * 0.55),
                        cor: escolha(PALETA.neve)
                    };

                case 'morcegos':
                    return {
                        z: z,
                        x: inicial ? sorteio(0, w) : (Math.random() < 0.5 ? -70 : w + 70),
                        y: sorteio(h * 0.06, h * 0.55),
                        r: sorteio(11, 22) * (0.7 + z * 0.5),
                        vx: (Math.random() < 0.5 ? 1 : -1) * sorteio(38, 82),
                        fase: sorteio(0, 6.3),
                        a: Math.min(1, 0.55 + z * 0.4)
                    };

                case 'brilhos':
                    return {
                        z: z,
                        x: sorteio(0, w),
                        y: sorteio(0, h),
                        r: sorteio(6, 15) * (0.6 + z * 0.55),
                        cor: escolha(PALETA.brilho),
                        vel: sorteio(0.35, 1.25),
                        fase: sorteio(0, 6.3),
                        vx: sorteio(-5, 5),
                        vy: sorteio(-7, -1),
                        a: 1
                    };

                case 'confetes':
                    return {
                        z: z,
                        x: sorteio(-10, w + 10),
                        y: inicial ? sorteio(-h, h) : sorteio(-90, -10),
                        r: sorteio(4.5, 8.2) * (0.7 + z * 0.45),
                        vy: sorteio(34, 78) * z,
                        vx: sorteio(-16, 16) * z,
                        rot: sorteio(0, 6.3),
                        vr: sorteio(-2.6, 2.6),
                        fase: sorteio(0, 6.3),
                        cor: escolha(PALETA.confete),
                        a: 0.75 + z * 0.25
                    };

                case 'coracoes':
                    return {
                        z: z,
                        x: sorteio(-10, w + 10),
                        y: inicial ? sorteio(0, h) : h + sorteio(30, 110),
                        r: sorteio(7, 15) * (0.6 + z * 0.5),
                        vy: -sorteio(15, 34) * z,
                        fase: sorteio(0, 6.3),
                        cor: escolha(PALETA.coracao),
                        a: 0.35 + z * 0.5
                    };

                case 'petalas':
                    return {
                        z: z,
                        x: sorteio(-10, w + 10),
                        y: inicial ? sorteio(-h, h) : sorteio(-80, -10),
                        r: sorteio(5, 10) * (0.7 + z * 0.45),
                        vy: sorteio(18, 42) * z,
                        vx: sorteio(-12, 12) * z,
                        rot: sorteio(0, 6.3),
                        vr: sorteio(-1.4, 1.4),
                        fase: sorteio(0, 6.3),
                        cor: escolha(PALETA.petala),
                        a: 0.55 + z * 0.38
                    };

                case 'bolhas':
                    return {
                        z: z,
                        x: sorteio(0, w),
                        y: inicial ? sorteio(0, h) : h + sorteio(30, 120),
                        r: sorteio(8, 20) * (0.6 + z * 0.5),
                        vy: -sorteio(16, 40) * z,
                        fase: sorteio(0, 6.3),
                        cor: escolha(PALETA.bolha),
                        a: 0.3 + z * 0.4
                    };

                case 'folhas':
                    return {
                        z: z,
                        x: sorteio(-10, w + 10),
                        y: inicial ? sorteio(-h, h) : sorteio(-80, -10),
                        r: sorteio(7, 14) * (0.7 + z * 0.45),
                        vy: sorteio(24, 52) * z,
                        vx: sorteio(-22, 22) * z,
                        rot: sorteio(0, 6.3),
                        vr: sorteio(-1.8, 1.8),
                        fase: sorteio(0, 6.3),
                        cor: escolha(PALETA.folha),
                        a: 0.55 + z * 0.4
                    };

                default:
                    return null;
            }
        }

        const BASE = {
            neve: 78, morcegos: 7, brilhos: 30, confetes: 40, coracoes: 20,
            petalas: 30, bolhas: 18, folhas: 26, fogos: 0
        };

        function medir() {
            const ret = host.getBoundingClientRect();
            const nw = Math.max(1, Math.round(ret.width));
            const nh = Math.max(1, Math.round(ret.height));
            if (nw === w && nh === h) return;

            /* se o elemento ainda não tinha tamanho quando arrancou (editor),
               volta a encher as partículas quando o tamanho real é conhecido */
            const eraMinusculo = w < 40 || h < 40;

            w = nw;
            h = nh;
            canvas.width = w;
            canvas.height = h;

            if (eraMinusculo && w > 40 && h > 40) {
                particulas.length = 0;
                ambiente.length = 0;
                encher();
            }
        }

        function encher() {
            const total = BASE[nome] || 26;
            for (let i = 0; i < total; i++) {
                const p = nova(nome, true);
                if (p) particulas.push(p);
            }

            /* bokeh: luzes desfocadas ao fundo, dão profundidade */
            const corBokeh = PALETA.bokeh[nome];
            if (corBokeh) {
                const quantos = nome === 'brilhos' || nome === 'fogos' ? 6 : 4;
                for (let i = 0; i < quantos; i++) {
                    ambiente.push({
                        x: sorteio(0, w), y: sorteio(0, h),
                        r: sorteio(55, 150),
                        vx: sorteio(-6, 6), vy: sorteio(-4, 4),
                        a: sorteio(0.05, 0.11),
                        cor: corBokeh
                    });
                }
            }
        }

        /* ------------------------------------------------------------------
           Fogos de artifício: foguete a subir, rasto e rebentamento
           ------------------------------------------------------------------ */
        function lancarFoguete() {
            foguetes.push({
                x: sorteio(w * 0.14, w * 0.86),
                y: h * 1.03,
                vy: -sorteio(h * 0.55, h * 0.85),
                alvo: sorteio(h * 0.10, h * 0.32),
                cor: escolha(PALETA.fogo),
                rasto: []
            });
        }

        function rebentar(x, y, cor) {
            claroes.push({ x: x, y: y, t: 0, cor: cor });

            const total = Math.round(86 * Math.min(1.6, escala() * 1.2));
            for (let i = 0; i < total; i++) {
                const ang = (i / total) * Math.PI * 2 + sorteio(-0.05, 0.05);
                const vel = sorteio(90, 245) * escala();
                particulas.push({
                    x: x, y: y,
                    vx: Math.cos(ang) * vel,
                    vy: Math.sin(ang) * vel,
                    r: sorteio(2, 3.4) * escala(),
                    cor: Math.random() < 0.25 ? escolha(PALETA.fogo) : cor,
                    a: 1,
                    vida: sorteio(1.35, 2.1),
                    vidaTotal: 2.1
                });
            }
        }

        /* ------------------------------------------------------------------
           Desenho
           ------------------------------------------------------------------ */
        function morcegoForma(x, y, r, a, bater) {
            ctx.save();
            ctx.globalAlpha = a;
            ctx.translate(x, y);

            const sobe = Math.sin(bater) * r * 0.5;

            ctx.fillStyle = '#1b1b26';
            ctx.shadowColor = 'rgba(150,170,255,.35)';
            ctx.shadowBlur = r * 1.1;

            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-r * 0.5, -r * 0.5 - sobe, -r * 1.1, -r * 0.5 + sobe, -r * 1.55, -r * 0.18 + sobe * 0.7);
            ctx.bezierCurveTo(-r * 1.05, r * 0.02, -r * 0.95, r * 0.28, -r * 1.12, r * 0.5 + sobe * 0.25);
            ctx.bezierCurveTo(-r * 0.62, r * 0.3, -r * 0.42, r * 0.5, -r * 0.3, r * 0.62);
            ctx.bezierCurveTo(-r * 0.12, r * 0.34, -r * 0.08, r * 0.2, 0, r * 0.18);
            ctx.bezierCurveTo(r * 0.08, r * 0.2, r * 0.12, r * 0.34, r * 0.3, r * 0.62);
            ctx.bezierCurveTo(r * 0.42, r * 0.5, r * 0.62, r * 0.3, r * 1.12, r * 0.5 + sobe * 0.25);
            ctx.bezierCurveTo(r * 0.95, r * 0.28, r * 1.05, r * 0.02, r * 1.55, -r * 0.18 + sobe * 0.7);
            ctx.bezierCurveTo(r * 1.1, -r * 0.5 + sobe, r * 0.5, -r * 0.5 - sobe, 0, 0);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.strokeStyle = 'rgba(186,204,255,.28)';
            ctx.lineWidth = Math.max(0.7, r * 0.07);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(0, 0, r * 0.16, r * 0.26, 0, 0, 6.3);
            ctx.fill();

            ctx.restore();
        }

        function pintar(p) {
            switch (nome) {
                case 'neve': {
                    const tipo = p.z > 0.95 ? 'floco' : 'disco';
                    const raio = tipo === 'floco' ? p.r * 1.35 : p.r;
                    const sp = sprite(tipo, tipo === 'floco' ? Math.max(2.4, p.r * 1.35) : Math.max(1.6, p.r), p.cor);
                    ctx.globalAlpha = p.a;
                    if (p.z > 0.95) {
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate(p.giro);
                        ctx.drawImage(sp, -raio, -raio, raio * 2, raio * 2);
                        ctx.restore();
                    } else {
                        ctx.drawImage(sp, p.x - raio, p.y - raio, raio * 2, raio * 2);
                    }
                    break;
                }

                case 'morcegos':
                    morcegoForma(p.x, p.y, p.r, p.a, relogio * 8 + p.fase);
                    break;

                case 'brilhos': {
                    const cintila = 0.35 + 0.65 * Math.pow(Math.abs(Math.sin(relogio * p.vel + p.fase)), 1.6);
                    const raio = p.r * (0.7 + 0.5 * cintila);
                    const sp = sprite('brilho', Math.max(4, raio), p.cor);
                    ctx.globalCompositeOperation = 'lighter';
                    ctx.globalAlpha = cintila;
                    ctx.drawImage(sp, p.x - raio, p.y - raio, raio * 2, raio * 2);
                    ctx.globalCompositeOperation = 'source-over';
                    break;
                }

                case 'confetes': {
                    const sp = sprite('confete', Math.max(2, p.r), p.cor);
                    const dobra = Math.max(0.38, Math.abs(Math.cos(p.rot * 1.15)));
                    ctx.save();
                    ctx.globalAlpha = p.a;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot * 0.35);
                    ctx.scale(Math.max(0.12, dobra), 1);
                    ctx.drawImage(sp, -p.r, -p.r, p.r * 2, p.r * 2);
                    ctx.restore();
                    break;
                }

                case 'coracoes': {
                    const sp = sprite('coracao', Math.max(4, p.r), p.cor);
                    ctx.globalAlpha = p.a;
                    ctx.drawImage(sp, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
                    break;
                }

                case 'petalas': {
                    const sp = sprite('petala', Math.max(4, p.r), p.cor);
                    const dobra = Math.cos(p.rot * 1.1);
                    ctx.save();
                    ctx.globalAlpha = p.a;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot * 0.5);
                    ctx.scale(Math.max(0.25, Math.abs(dobra)), 1);
                    ctx.drawImage(sp, -p.r, -p.r, p.r * 2, p.r * 2);
                    ctx.restore();
                    break;
                }

                case 'bolhas': {
                    const sp = sprite('bolha', Math.max(6, p.r), p.cor);
                    ctx.globalAlpha = p.a;
                    ctx.drawImage(sp, p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
                    break;
                }

                case 'folhas': {
                    const sp = sprite('folha', Math.max(5, p.r), p.cor);
                    const dobra = Math.cos(p.rot * 1.3);
                    ctx.save();
                    ctx.globalAlpha = p.a;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot * 0.4);
                    ctx.scale(Math.max(0.2, Math.abs(dobra)), 1);
                    ctx.drawImage(sp, -p.r, -p.r, p.r * 2, p.r * 2);
                    ctx.restore();
                    break;
                }

                case 'fogos': {
                    const cauda = 0.055;
                    ctx.globalAlpha = Math.min(1, p.a);
                    ctx.strokeStyle = 'rgba(' + p.cor + ',' + Math.min(1, p.a) + ')';
                    ctx.lineWidth = Math.max(1.6, p.r);
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(p.x - p.vx * cauda, p.y - p.vy * cauda);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();

                    ctx.fillStyle = 'rgba(255,255,255,' + Math.min(1, p.a) * 0.9 + ')';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, Math.max(0.9, p.r * 0.62), 0, 6.3);
                    ctx.fill();
                    break;
                }

                default:
                    break;
            }
        }

        /* ------------------------------------------------------------------
           Animação
           ------------------------------------------------------------------ */
        function atualizar(dt) {
            relogio += dt;

            if (nome === 'fogos') {
                proximoFoguete -= dt * 1000;
                if (proximoFoguete <= 0) {
                    proximoFoguete = sorteio(2100, 3600);
                    lancarFoguete();
                }

                for (let i = claroes.length - 1; i >= 0; i--) {
                    claroes[i].t += dt;
                    if (claroes[i].t > 0.5) claroes.splice(i, 1);
                }

                for (let i = foguetes.length - 1; i >= 0; i--) {
                    const f = foguetes[i];
                    f.y += f.vy * dt;
                    f.rasto.push([f.x, f.y]);
                    if (f.rasto.length > 14) f.rasto.shift();

                    if (f.y <= f.alvo) {
                        rebentar(f.x, f.y, f.cor);
                        foguetes.splice(i, 1);
                    }
                }
            }

            for (const b of ambiente) {
                b.x += b.vx * dt;
                b.y += b.vy * dt;
                if (b.x < -b.r) b.x = w + b.r;
                if (b.x > w + b.r) b.x = -b.r;
                if (b.y < -b.r) b.y = h + b.r;
                if (b.y > h + b.r) b.y = -b.r;
            }

            for (let i = particulas.length - 1; i >= 0; i--) {
                const p = particulas[i];

                switch (nome) {
                    case 'neve':
                        p.y += p.vy * dt;
                        p.x += (Math.sin(relogio * 0.55 + p.fase) * 14 + 7) * dt * p.z;
                        p.giro += p.vg * dt;
                        if (p.y > h + 14) {
                            p.y = -14;
                            p.x = sorteio(-30, w + 30);
                        }
                        break;

                    case 'morcegos':
                        p.x += p.vx * dt;
                        p.y += Math.sin(relogio * 1.2 + p.fase) * 12 * dt;
                        if (p.vx > 0 && p.x > w + 90) {
                            p.x = -90;
                            p.y = sorteio(h * 0.05, h * 0.55);
                        }
                        if (p.vx < 0 && p.x < -90) {
                            p.x = w + 90;
                            p.y = sorteio(h * 0.05, h * 0.55);
                        }
                        break;

                    case 'brilhos':
                        p.x += (p.vx + Math.sin(relogio * 0.5 + p.fase) * 4) * dt;
                        p.y += p.vy * dt;
                        if (p.y < -20) p.y = h + 20;
                        break;

                    case 'confetes':
                        p.y += p.vy * dt;
                        p.x += (p.vx + Math.sin(relogio * 0.9 + p.fase) * 22) * dt;
                        p.rot += p.vr * dt;
                        if (p.y > h + 24) {
                            p.y = -24;
                            p.x = sorteio(-10, w + 10);
                        }
                        break;

                    case 'coracoes':
                        p.y += p.vy * dt;
                        p.x += Math.sin(relogio * 0.8 + p.fase) * 16 * dt;
                        if (p.y < -50) {
                            p.y = h + sorteio(20, 60);
                            p.x = sorteio(0, w);
                        }
                        break;

                    case 'petalas':
                        p.y += p.vy * dt;
                        p.x += (p.vx + Math.sin(relogio * 0.7 + p.fase) * 26) * dt;
                        p.rot += p.vr * dt;
                        if (p.y > h + 24) {
                            p.y = -24;
                            p.x = sorteio(-10, w + 10);
                        }
                        break;

                    case 'bolhas':
                        p.y += p.vy * dt;
                        p.x += Math.sin(relogio * 0.6 + p.fase) * 14 * dt;
                        if (p.y < -50) {
                            p.y = h + sorteio(20, 60);
                            p.x = sorteio(0, w);
                        }
                        break;

                    case 'folhas':
                        p.y += p.vy * dt;
                        p.x += (p.vx + Math.sin(relogio * 0.65 + p.fase) * 32) * dt;
                        p.rot += p.vr * dt;
                        if (p.y > h + 26) {
                            p.y = -26;
                            p.x = sorteio(-10, w + 10);
                        }
                        break;

                    case 'fogos':
                        p.x += p.vx * dt;
                        p.y += p.vy * dt;
                        p.vy += 105 * dt;
                        p.vx *= 0.985;
                        p.vy *= 0.985;
                        p.vida -= dt;
                        p.a = Math.max(0, p.vida / p.vidaTotal);
                        if (p.vida <= 0) particulas.splice(i, 1);
                        break;

                    default:
                        break;
                }
            }
        }

        function desenharAmbiente() {
            for (const b of ambiente) {
                const sp = sprite('bokeh', b.r, b.cor);
                ctx.globalAlpha = b.a;
                ctx.drawImage(sp, b.x - b.r, b.y - b.r, b.r * 2, b.r * 2);
            }
            ctx.globalAlpha = 1;
        }

        function desenharFoguetes() {
            ctx.globalCompositeOperation = 'lighter';

            /* clarão do rebentamento */
            for (const c of claroes) {
                const raio = 34 + c.t * 210;
                const sp = sprite('flash', 90, c.cor);
                ctx.globalAlpha = Math.max(0, 0.34 * (1 - c.t / 0.5));
                ctx.drawImage(sp, c.x - raio, c.y - raio, raio * 2, raio * 2);
            }

            for (const f of foguetes) {
                for (let i = 1; i < f.rasto.length; i++) {
                    const [x0, y0] = f.rasto[i - 1];
                    const [x1, y1] = f.rasto[i];
                    const t = i / f.rasto.length;
                    ctx.globalAlpha = t * 0.5;
                    ctx.strokeStyle = 'rgba(' + f.cor + ',.9)';
                    ctx.lineWidth = 1.6 * t + 0.6;
                    ctx.lineCap = 'round';
                    ctx.beginPath();
                    ctx.moveTo(x0, y0);
                    ctx.lineTo(x1, y1);
                    ctx.stroke();
                }

                ctx.globalAlpha = 0.95;
                ctx.fillStyle = '#fff8e6';
                ctx.beginPath();
                ctx.arc(f.x, f.y, 2.4, 0, 6.3);
                ctx.fill();
            }
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = 1;
        }

        function passo(agora) {
            if (!ligado) return;

            const dt = Math.min(0.05, (agora - ultimo) / 1000);
            ultimo = agora;

            medir();
            ctx.clearRect(0, 0, w, h);

            atualizar(dt);
            desenharAmbiente();

            for (const p of particulas) pintar(p);

            if (nome === 'fogos') desenharFoguetes();

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';

            requestAnimationFrame(passo);
        }

        medir();
        encher();
        requestAnimationFrame((t) => { ultimo = t; passo(t); });

        function rajada() {
            if (!ligado) return;

            if (nome === 'fogos') { lancarFoguete(); return; }

            if (nome === 'brilhos') {
                for (const p of particulas) {
                    if (Math.random() < 0.55) {
                        p.x = sorteio(0, w);
                        p.y = sorteio(0, h);
                        p.r = sorteio(7, 18) * escala();
                    }
                }
                return;
            }

            const extra = Math.round((BASE[nome] || 20) * 0.55);
            for (let i = 0; i < extra && particulas.length < 260; i++) {
                const p = nova(nome, false);
                if (!p) break;

                if (nome === 'neve' || nome === 'confetes' || nome === 'petalas' || nome === 'folhas') {
                    p.y = sorteio(-h * 0.4, -8);
                    p.vy *= 1.8;
                }
                if (nome === 'coracoes' || nome === 'bolhas') {
                    p.y = h + sorteio(10, 70);
                    p.vy *= 1.8;
                }
                particulas.push(p);
            }
        }

        return {
            rajada: rajada,
            parar: function () { ligado = false; canvas.remove(); }
        };
    }

    /* ------------------------------------------------------------------
       KITS — épocas prontas a aplicar no editor
       ------------------------------------------------------------------ */
    const KITS = {
        halloween: {
            nome: 'Halloween',
            icone: '🎃',
            descricao: 'Abóboras, morcegos e teia no canto',
            camadas: [
                { nome: 'Morcegos a voar', tipo: 'efeito', efeito: 'morcegos', ecras: ['video', 'preco'], sincronizar: true },
                { nome: 'Teia', tipo: 'figura', figura: 'teia', x: 0, y: 0, largura: 13, opacidade: .5, ecras: ['video', 'preco'] },
                { nome: 'Abóbora', tipo: 'figura', figura: 'abobora', x: 0.4, y: 88.5, largura: 8, rotacao: -8, anim: 'flutuar', ecras: ['video', 'preco'] },
                { nome: 'Abóbora pequena', tipo: 'figura', figura: 'abobora', x: 93, y: 1.2, largura: 6, rotacao: 10, anim: 'flutuar', ecras: ['video', 'preco'] },
                { nome: 'Fantasma', tipo: 'figura', figura: 'fantasma', x: 20, y: 0.5, largura: 5.5, anim: 'flutuar', opacidade: .95, ecras: ['video', 'preco'] }
            ]
        },

        natal: {
            nome: 'Natal',
            icone: '🎄',
            descricao: 'Neve, luzes no topo e árvore',
            camadas: [
                { nome: 'Neve', tipo: 'efeito', efeito: 'neve', ecras: ['video', 'preco'], sincronizar: true },
                { nome: 'Luzes de Natal', tipo: 'figura', figura: 'luzes', x: 0, y: 0, largura: 100, opacidade: .95, ecras: ['video', 'preco'] },
                { nome: 'Árvore', tipo: 'figura', figura: 'arvore', x: 0.4, y: 63, largura: 6.5, anim: 'balancar', ecras: ['video', 'preco'] },
                { nome: 'Presente', tipo: 'figura', figura: 'presente', x: 84, y: 91, largura: 6, rotacao: 4, anim: 'flutuar', ecras: ['video', 'preco'] },
                { nome: 'Estrela', tipo: 'figura', figura: 'estrela', x: 0.6, y: 1.5, largura: 4.5, anim: 'pulsar', ecras: ['video', 'preco'] }
            ]
        },

        pascoa: {
            nome: 'Páscoa',
            icone: '🐣',
            descricao: 'Coelho, ovos e pétalas',
            camadas: [
                { nome: 'Pétalas', tipo: 'efeito', efeito: 'petalas', ecras: ['video', 'preco'], sincronizar: true },
                { nome: 'Coelho', tipo: 'figura', figura: 'coelho', x: 92.5, y: 66, largura: 7.5, anim: 'flutuar', ecras: ['video', 'preco'] },
                { nome: 'Ovo pequeno', tipo: 'figura', figura: 'ovo', cor: '#c9e4ff', x: 0.4, y: 88, largura: 5.5, rotacao: -10, anim: 'flutuar', ecras: ['video', 'preco'] },
                { nome: 'Ovo', tipo: 'figura', figura: 'ovo', x: 84, y: 92, largura: 4.5, rotacao: 8, anim: 'balancar', ecras: ['video', 'preco'] },
                { nome: 'Flor', tipo: 'figura', figura: 'flor', x: 92, y: 1.5, largura: 5, anim: 'girar', ecras: ['video', 'preco'] }
            ]
        },

        verao: {
            nome: 'Verão',
            icone: '☀️',
            descricao: 'Sol, bolhas e flores',
            camadas: [
                { nome: 'Bolhas', tipo: 'efeito', efeito: 'bolhas', ecras: ['video', 'preco'], sincronizar: true },
                { nome: 'Sol', tipo: 'figura', figura: 'sol', x: 92.5, y: 1.2, largura: 7, anim: 'girar', ecras: ['video', 'preco'] },
                { nome: 'Flor', tipo: 'figura', figura: 'flor', cor: '#ffd6e8', x: 92.5, y: 89, largura: 5, anim: 'balancar', ecras: ['video', 'preco'] },
                { nome: 'Flor pequena', tipo: 'figura', figura: 'flor', cor: '#ffe9a3', x: 0.5, y: 1.5, largura: 4.5, anim: 'balancar', ecras: ['video', 'preco'] }
            ]
        },

        valentim: {
            nome: 'São Valentim',
            icone: '💗',
            descricao: 'Corações a subir',
            camadas: [
                { nome: 'Corações', tipo: 'efeito', efeito: 'coracoes', ecras: ['video', 'preco'], sincronizar: true },
                { nome: 'Coração', tipo: 'figura', figura: 'coracao', x: 92.5, y: 1.5, largura: 6, anim: 'pulsar', ecras: ['video', 'preco'] },
                { nome: 'Coração pequeno', tipo: 'figura', figura: 'coracao', x: 0.5, y: 90, largura: 4.5, rotacao: -14, anim: 'flutuar', opacidade: .85, ecras: ['video', 'preco'] }
            ]
        },

        anonovo: {
            nome: 'Ano Novo',
            icone: '🎆',
            descricao: 'Fogos de artifício e confetes',
            camadas: [
                { nome: 'Fogos de artifício', tipo: 'efeito', efeito: 'fogos', ecras: ['video', 'preco'] },
                { nome: 'Confetes', tipo: 'efeito', efeito: 'confetes', ecras: ['video', 'preco'], sincronizar: true },
                { nome: 'Estrela', tipo: 'figura', figura: 'estrela', x: 0.6, y: 1.5, largura: 4.5, anim: 'pulsar', ecras: ['video', 'preco'] },
                { nome: 'Estrela', tipo: 'figura', figura: 'estrela', x: 93.5, y: 1.5, largura: 4, anim: 'pulsar', ecras: ['video', 'preco'] }
            ]
        },

        outono: {
            nome: 'Outono',
            icone: '🍂',
            descricao: 'Folhas a cair',
            camadas: [
                { nome: 'Folhas', tipo: 'efeito', efeito: 'folhas', ecras: ['video', 'preco'], sincronizar: true },
                { nome: 'Brilhos', tipo: 'efeito', efeito: 'brilhos', ecras: ['video', 'preco'], opacidade: .5 }
            ]
        }
    };

    global.svgFigura = svgFigura;
    global.FIGURAS = FIGURAS;
    global.iniciarEfeito = iniciarEfeito;
    global.EFEITOS = EFEITOS;
    global.NOMES_EFEITO = NOMES_EFEITO;
    global.KITS = KITS;
})(window);
