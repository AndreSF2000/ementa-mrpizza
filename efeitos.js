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

    function sorteio(min, max) { return min + Math.random() * (max - min); }

    function iniciarEfeito(nome, host, opcoes) {
        const op = opcoes || {};
        const canvas = document.createElement('canvas');
        canvas.className = 'efeito-canvas';
        host.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particulas = [];
        let w = 1;
        let h = 1;
        let ligado = true;
        let ultimo = performance.now();
        let relogio = 0;
        let proximoFogo = 400;

        function medir() {
            const r = host.getBoundingClientRect();
            const nw = Math.max(1, Math.round(r.width));
            const nh = Math.max(1, Math.round(r.height));
            if (nw === w && nh === h) return;
            w = nw;
            h = nh;
            canvas.width = w;
            canvas.height = h;
        }

        /* ---------- criação de partículas ---------- */
        const CORES_CONFETE = ['#ff5f5f', '#ffd93d', '#6ee7a8', '#61c8ff', '#c58fff', '#ff9f68'];
        const CORES_FOLHA = ['#e07a1f', '#c85a12', '#e8a531', '#a8430c', '#f0b541'];
        const CORES_PETALA = ['#ff9ec4', '#ffb3d1', '#f77fae', '#ffc9de'];

        function nova(tipo, inicial) {
            switch (tipo) {
                case 'neve':
                    return {
                        x: sorteio(-20, w + 20), y: inicial ? sorteio(-h, h) : sorteio(-60, -10),
                        r: sorteio(2.2, 5.2) * escala(), vy: sorteio(20, 52) * escala(),
                        fase: sorteio(0, 6.3), a: sorteio(.55, 1)
                    };
                case 'morcegos':
                    return {
                        x: inicial ? sorteio(0, w) : (Math.random() < .5 ? -60 : w + 60),
                        y: sorteio(h * .06, h * .55),
                        r: sorteio(13, 24) * escala(),
                        vx: (Math.random() < .5 ? 1 : -1) * sorteio(45, 95) * escala(),
                        fase: sorteio(0, 6.3), a: .92
                    };
                case 'brilhos':
                    return {
                        x: sorteio(0, w), y: sorteio(0, h),
                        r: sorteio(4, 11) * escala(), fase: sorteio(0, 6.3),
                        vel: sorteio(.6, 1.9), a: 1
                    };
                case 'confetes':
                    return {
                        x: sorteio(-10, w + 10), y: inicial ? sorteio(-h, h) : sorteio(-80, -10),
                        r: sorteio(3.5, 7) * escala(), vy: sorteio(55, 130) * escala(),
                        vx: sorteio(-25, 25) * escala(), rot: sorteio(0, 6.3), vr: sorteio(-3, 3),
                        cor: CORES_CONFETE[(Math.random() * CORES_CONFETE.length) | 0], a: .75
                    };
                case 'coracoes':
                    return {
                        x: sorteio(0, w), y: inicial ? sorteio(0, h) : h + sorteio(20, 90),
                        r: sorteio(10, 22) * escala(), vy: -sorteio(20, 48) * escala(),
                        fase: sorteio(0, 6.3), a: sorteio(.55, .9)
                    };
                case 'petalas':
                    return {
                        x: sorteio(-10, w + 10), y: inicial ? sorteio(-h, h) : sorteio(-70, -10),
                        r: sorteio(7, 14) * escala(), vy: sorteio(22, 55) * escala(),
                        vx: sorteio(-18, 18) * escala(), rot: sorteio(0, 6.3), vr: sorteio(-1.6, 1.6),
                        cor: CORES_PETALA[(Math.random() * CORES_PETALA.length) | 0], a: .85
                    };
                case 'bolhas':
                    return {
                        x: sorteio(0, w), y: inicial ? sorteio(0, h) : h + sorteio(20, 80),
                        r: sorteio(6, 22) * escala(), vy: -sorteio(28, 70) * escala(),
                        fase: sorteio(0, 6.3), a: sorteio(.25, .6)
                    };
                case 'folhas':
                    return {
                        x: sorteio(-10, w + 10), y: inicial ? sorteio(-h, h) : sorteio(-70, -10),
                        r: sorteio(9, 18) * escala(), vy: sorteio(30, 70) * escala(),
                        vx: sorteio(-30, 30) * escala(), rot: sorteio(0, 6.3), vr: sorteio(-2, 2),
                        cor: CORES_FOLHA[(Math.random() * CORES_FOLHA.length) | 0], a: .95
                    };
                case 'fogos':
                    return {
                        x: 0, y: 0, r: sorteio(2, 4) * escala(), vx: 0, vy: 0,
                        cor: CORES_CONFETE[(Math.random() * CORES_CONFETE.length) | 0],
                        a: 1, vida: 1.4
                    };
                default:
                    return null;
            }
        }

        function escala() { return Math.max(0.65, Math.min(1.5, w / 1500)); }

        const BASE = {
            neve: 90, morcegos: 7, brilhos: 42, confetes: 42, coracoes: 24,
            petalas: 42, bolhas: 20, folhas: 28, fogos: 0
        };

        function encher() {
            const total = (BASE[nome] || 30);
            for (let i = 0; i < total; i++) {
                const p = nova(nome, true);
                if (p) particulas.push(p);
            }
        }

        /* ---------- desenho ---------- */
        function estrela(x, y, r, a) {
            ctx.globalAlpha = a;
            ctx.fillStyle = '#fff6cf';
            ctx.beginPath();
            ctx.moveTo(x, y - r);
            ctx.quadraticCurveTo(x + r * .18, y - r * .18, x + r, y);
            ctx.quadraticCurveTo(x + r * .18, y + r * .18, x, y + r);
            ctx.quadraticCurveTo(x - r * .18, y + r * .18, x - r, y);
            ctx.quadraticCurveTo(x - r * .18, y - r * .18, x, y - r);
            ctx.fill();
        }

        function coracao(x, y, r, a) {
            ctx.globalAlpha = a;
            ctx.fillStyle = '#ff5c85';
            ctx.beginPath();
            ctx.moveTo(x, y + r * .8);
            ctx.bezierCurveTo(x - r * 1.3, y - r * .1, x - r * .6, y - r * 1.05, x, y - r * .35);
            ctx.bezierCurveTo(x + r * .6, y - r * 1.05, x + r * 1.3, y - r * .1, x, y + r * .8);
            ctx.fill();
        }

        function morcegoForma(x, y, r, a, bater) {
            ctx.save();
            ctx.globalAlpha = a;
            ctx.fillStyle = '#15151c';
            ctx.translate(x, y);
            const sobe = Math.sin(bater) * r * .45;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.quadraticCurveTo(-r * .7, -r * .55 - sobe, -r * 1.5, -r * .25 + sobe);
            ctx.quadraticCurveTo(-r * 1.05, r * .1, -r * 1.2, r * .45 + sobe);
            ctx.quadraticCurveTo(-r * .6, r * .25, -r * .35, r * .55);
            ctx.quadraticCurveTo(0, r * .25, 0, r * .15);
            ctx.quadraticCurveTo(0, r * .25, r * .35, r * .55);
            ctx.quadraticCurveTo(r * .6, r * .25, r * 1.2, r * .45 + sobe);
            ctx.quadraticCurveTo(r * 1.05, r * .1, r * 1.5, -r * .25 + sobe);
            ctx.quadraticCurveTo(r * .7, -r * .55 - sobe, 0, 0);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(0, 0, r * .17, r * .26, 0, 0, 6.3);
            ctx.fill();
            ctx.restore();
        }

        function pintar(p) {
            switch (nome) {
                case 'neve':
                    ctx.globalAlpha = p.a;
                    ctx.fillStyle = '#f2fbff';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, 6.3);
                    ctx.fill();
                    break;
                case 'morcegos':
                    morcegoForma(p.x, p.y + Math.sin(relogio * 1.4 + p.fase) * 14, p.r, p.a, relogio * 9 + p.fase);
                    break;
                case 'brilhos':
                    estrela(p.x, p.y, p.r * (0.55 + 0.55 * Math.abs(Math.sin(relogio * p.vel + p.fase))),
                        .35 + .6 * Math.abs(Math.sin(relogio * p.vel + p.fase)));
                    break;
                case 'confetes':
                    ctx.save();
                    ctx.globalAlpha = p.a;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.fillStyle = p.cor;
                    ctx.fillRect(-p.r, -p.r * .45, p.r * 2, p.r * .9);
                    ctx.restore();
                    break;
                case 'coracoes':
                    coracao(p.x, p.y, p.r, p.a);
                    break;
                case 'petalas':
                    ctx.save();
                    ctx.globalAlpha = p.a;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.fillStyle = p.cor;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.r, p.r * .55, 0, 0, 6.3);
                    ctx.fill();
                    ctx.restore();
                    break;
                case 'bolhas':
                    ctx.globalAlpha = p.a;
                    ctx.strokeStyle = '#dff3ff';
                    ctx.lineWidth = Math.max(1.2, p.r * .12);
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, 6.3);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.arc(p.x - p.r * .35, p.y - p.r * .35, p.r * .18, 0, 6.3);
                    ctx.fillStyle = '#ffffff';
                    ctx.fill();
                    break;
                case 'folhas':
                    ctx.save();
                    ctx.globalAlpha = p.a;
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.rot);
                    ctx.fillStyle = p.cor;
                    ctx.beginPath();
                    ctx.moveTo(-p.r, 0);
                    ctx.quadraticCurveTo(0, -p.r * .75, p.r, 0);
                    ctx.quadraticCurveTo(0, p.r * .75, -p.r, 0);
                    ctx.fill();
                    ctx.restore();
                    break;
                case 'fogos':
                    ctx.globalAlpha = Math.max(0, p.a);
                    ctx.fillStyle = p.cor;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, 6.3);
                    ctx.fill();
                    break;
                default:
                    break;
            }
        }

        /* ---------- animação ---------- */
        function atualizar(dt) {
            relogio += dt;

            if (nome === 'fogos') {
                proximoFogo -= dt * 1000;
                if (proximoFogo <= 0) {
                    proximoFogo = sorteio(1600, 3000);
                    explodir();
                }
            }

            for (let i = particulas.length - 1; i >= 0; i--) {
                const p = particulas[i];

                switch (nome) {
                    case 'neve':
                        p.y += p.vy * dt;
                        p.x += Math.sin(p.fase + relogio * 1.1) * 22 * dt;
                        if (p.y > h + 8) { p.y = -10; p.x = sorteio(-20, w + 20); }
                        break;
                    case 'morcegos':
                        p.x += p.vx * dt;
                        if (p.vx > 0 && p.x > w + 80) { p.x = -80; p.y = sorteio(h * .05, h * .55); }
                        if (p.vx < 0 && p.x < -80) { p.x = w + 80; p.y = sorteio(h * .05, h * .55); }
                        break;
                    case 'brilhos':
                        break;
                    case 'confetes':
                        p.y += p.vy * dt;
                        p.x += (p.vx + Math.sin(relogio * 1.6 + p.rot) * 30) * dt;
                        p.rot += p.vr * dt;
                        if (p.y > h + 20) { p.y = -20; p.x = sorteio(-10, w + 10); }
                        break;
                    case 'coracoes':
                        p.y += p.vy * dt;
                        p.x += Math.sin(p.fase + relogio * 1.3) * 26 * dt;
                        if (p.y < -60) { p.y = h + 40; p.x = sorteio(0, w); }
                        break;
                    case 'petalas':
                        p.y += p.vy * dt;
                        p.x += (p.vx + Math.sin(relogio * 1.4 + p.fase) * 34) * dt;
                        p.rot += p.vr * dt;
                        if (p.y > h + 20) { p.y = -20; p.x = sorteio(-10, w + 10); }
                        break;
                    case 'bolhas':
                        p.y += p.vy * dt;
                        p.x += Math.sin(p.fase + relogio * 1.1) * 18 * dt;
                        if (p.y < -40) { p.y = h + 40; p.x = sorteio(0, w); }
                        break;
                    case 'folhas':
                        p.y += p.vy * dt;
                        p.x += (p.vx + Math.sin(relogio * 1.2 + p.fase) * 40) * dt;
                        p.rot += p.vr * dt;
                        if (p.y > h + 25) { p.y = -25; p.x = sorteio(-10, w + 10); }
                        break;
                    case 'fogos':
                        p.x += p.vx * dt;
                        p.y += p.vy * dt;
                        p.vy += 90 * dt;
                        p.vx *= 0.988;
                        p.vy *= 0.988;
                        p.vida -= dt;
                        p.a = Math.max(0, p.vida / 1.4);
                        if (p.vida <= 0) particulas.splice(i, 1);
                        break;
                    default:
                        break;
                }
            }
        }

        function explodir() {
            /* Rebentam sempre na faixa de cima, longe dos preços */
            const x = sorteio(w * .12, w * .88);
            const y = sorteio(h * .06, h * .28);
            const cor = CORES_CONFETE[(Math.random() * CORES_CONFETE.length) | 0];
            const total = Math.round(36 * Math.min(1.5, escala() * 1.2));
            for (let i = 0; i < total; i++) {
                const ang = (i / total) * Math.PI * 2 + sorteio(-.08, .08);
                const vel = sorteio(60, 150) * escala();
                particulas.push({
                    x: x, y: y, r: sorteio(1.6, 3.1) * escala(),
                    vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
                    cor: cor, a: 1, vida: sorteio(.9, 1.3)
                });
            }
        }

        function passo(agora) {
            if (!ligado) return;
            const dt = Math.min(.05, (agora - ultimo) / 1000);
            ultimo = agora;
            medir();
            ctx.clearRect(0, 0, w, h);
            atualizar(dt);
            for (const p of particulas) pintar(p);
            ctx.globalAlpha = 1;
            requestAnimationFrame(passo);
        }

        medir();
        encher();
        requestAnimationFrame((t) => { ultimo = t; passo(t); });

        /* Rajada: usada quando o vídeo muda de slide */
        function rajada() {
            if (!ligado) return;
            if (nome === 'fogos') { explodir(); return; }
            if (nome === 'brilhos') {
                for (const p of particulas) {
                    p.x = sorteio(0, w);
                    p.y = sorteio(0, h);
                    p.r = sorteio(4, 13) * escala();
                }
                return;
            }
            const extra = Math.round((BASE[nome] || 20) * .5);
            for (let i = 0; i < extra && particulas.length < 240; i++) {
                const p = nova(nome, false);
                if (!p) break;
                if (nome === 'neve' || nome === 'confetes' || nome === 'petalas' || nome === 'folhas') {
                    p.y = sorteio(-h * .35, -10);
                    p.vy = (p.vy || 40) * 2;
                }
                if (nome === 'coracoes' || nome === 'bolhas') {
                    p.y = h + sorteio(10, 60);
                    p.vy = (p.vy || -40) * 2;
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
