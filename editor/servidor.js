/*
 * Servidor local do editor — só escuta em 127.0.0.1.
 * Não precisa de dependências: usa apenas o Node.
 *
 *   node editor/servidor.js
 *   abre http://127.0.0.1:8099
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFile } = require('child_process');

const RAIZ = path.resolve(__dirname, '..');
const PORTA = 8099;
const REPO = 'https://github.com/AndreSF2000/ementa-mrpizza.git';

const TIPOS = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.mp4': 'video/mp4',
    '.txt': 'text/plain; charset=utf-8'
};

function responderJSON(res, codigo, dados) {
    const corpo = JSON.stringify(dados);
    res.writeHead(codigo, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(corpo),
        'Cache-Control': 'no-store'
    });
    res.end(corpo);
}

function lerCorpo(req, limite = 40 * 1024 * 1024) {
    return new Promise((resolve, reject) => {
        const partes = [];
        let tamanho = 0;
        req.on('data', (c) => {
            tamanho += c.length;
            if (tamanho > limite) { reject(new Error('Demasiado grande')); req.destroy(); return; }
            partes.push(c);
        });
        req.on('end', () => resolve(Buffer.concat(partes)));
        req.on('error', reject);
    });
}

/* Nome de ficheiro seguro, sem acentos nem caminhos */
function nomeSeguro(nome) {
    return path.basename(String(nome || 'imagem.png'))
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9._-]/g, '-')
        .replace(/-+/g, '-')
        .toLowerCase();
}

function executar(comando, args, opcoes = {}) {
    return new Promise((resolve) => {
        execFile(comando, args, {
            cwd: opcoes.cwd || RAIZ,
            timeout: opcoes.timeout || 120000,
            env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: '0' })
        }, (erro, stdout, stderr) => {
            resolve({ ok: !erro, erro: erro ? String(erro.message) : '', stdout: stdout || '', stderr: stderr || '' });
        });
    });
}

/* Copia ficheiros/pastas do projeto para a cópia do repositório */
function copiar(origem, destino) {
    if (!fs.existsSync(origem)) return false;
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.cpSync(origem, destino, { recursive: true });
    return true;
}

async function publicar() {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'mrpizza-'));
    const log = [];

    try {
        log.push('A obter a versão atual do GitHub…');
        let r = await executar('git', ['clone', '--depth', '1', REPO, tmp]);
        if (!r.ok) {
            log.push('Falhou o clone: ' + (r.stderr || r.erro));
            return { ok: false, log };
        }

        const ficheiros = ['index.html', 'decoracoes.json', 'precario.html', 'efeitos.js'];
        for (const f of ficheiros) {
            if (copiar(path.join(RAIZ, f), path.join(tmp, f))) log.push('Copiado ' + f);
        }

        for (const pasta of ['decoracoes']) {
            if (copiar(path.join(RAIZ, pasta), path.join(tmp, pasta))) log.push('Copiada a pasta ' + pasta);
        }

        // O preçário passou a viver no index.html (?mode=price); o precario.html
        // fica só como ponte para o link antigo não ficar em branco na TV.
        // O editor é uma ferramenta local: não vai para o site público
        for (const ficheiroAntigo of ['Abrir editor.cmd', 'editor']) {
            const antigo = path.join(tmp, ficheiroAntigo);
            if (fs.existsSync(antigo)) {
                fs.rmSync(antigo, { recursive: true, force: true });
                log.push('Removido ' + ficheiroAntigo + ' do site');
            }
        }

        r = await executar('git', ['add', '-A'], { cwd: tmp });
        if (!r.ok) { log.push('git add: ' + (r.stderr || r.erro)); return { ok: false, log }; }

        const estado = await executar('git', ['status', '--porcelain'], { cwd: tmp });
        if (!estado.stdout.trim()) {
            log.push('Nada para publicar — o site já está igual.');
            return { ok: true, log, semAlteracoes: true };
        }

        r = await executar('git', ['commit', '-m', 'Atualizar ecrãs e decorações (editor)'], { cwd: tmp });
        if (!r.ok) { log.push('git commit: ' + (r.stderr || r.erro)); return { ok: false, log }; }

        log.push('A enviar para o GitHub…');
        r = await executar('git', ['push', 'origin', 'HEAD:main'], { cwd: tmp });
        if (!r.ok) {
            log.push('git push: ' + (r.stderr || r.erro));
            return { ok: false, log };
        }

        log.push('Publicado. O site demora cerca de 1 minuto a atualizar.');
        return { ok: true, log };
    } finally {
        try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) {}
    }
}

const servidor = http.createServer(async (req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);

    /* ---- API ---- */
    if (req.method === 'POST') {
        try {
            if (url === '/api/carregar') {
                const nome = nomeSeguro(req.headers['x-nome'] || 'imagem.png');
                const corpo = await lerCorpo(req);
                if (!corpo.length) return responderJSON(res, 400, { ok: false, erro: 'Ficheiro vazio' });

                const pasta = path.join(RAIZ, 'decoracoes');
                fs.mkdirSync(pasta, { recursive: true });
                fs.writeFileSync(path.join(pasta, nome), corpo);
                return responderJSON(res, 200, { ok: true, ficheiro: 'decoracoes/' + nome });
            }

            if (url === '/api/guardar') {
                const corpo = await lerCorpo(req, 2 * 1024 * 1024);
                const dados = JSON.parse(corpo.toString('utf8'));
                dados.versao = String(Date.now());
                fs.writeFileSync(path.join(RAIZ, 'decoracoes.json'), JSON.stringify(dados, null, 2) + '\n');
                return responderJSON(res, 200, { ok: true, versao: dados.versao });
            }

            if (url === '/api/publicar') {
                const resultado = await publicar();
                return responderJSON(res, resultado.ok ? 200 : 500, resultado);
            }
        } catch (e) {
            return responderJSON(res, 500, { ok: false, erro: String(e.message || e) });
        }

        res.writeHead(404);
        return res.end('404');
    }

    /* ---- Ficheiros ---- */
    let rel = url === '/' ? '/editor/editor.html' : url;
    const ficheiro = path.join(RAIZ, rel);

    if (!ficheiro.startsWith(RAIZ)) {
        res.writeHead(403);
        return res.end('403');
    }

    fs.stat(ficheiro, (erro, st) => {
        if (erro || !st.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            return res.end('Não encontrado: ' + rel);
        }

        const tipo = TIPOS[path.extname(ficheiro).toLowerCase()] || 'application/octet-stream';
        const cabecalhos = {
            'Content-Type': tipo,
            'Content-Length': st.size,
            'Cache-Control': 'no-cache',
            'Last-Modified': new Date(st.mtimeMs).toUTCString(),
            'ETag': '"' + st.mtimeMs + '-' + st.size + '"',
            'Accept-Ranges': 'bytes'
        };

        if (req.method === 'HEAD') {
            res.writeHead(200, cabecalhos);
            return res.end();
        }

        const intervalo = req.headers.range;
        if (intervalo) {
            const m = /bytes=(\d*)-(\d*)/.exec(intervalo);
            const inicio = m && m[1] ? parseInt(m[1], 10) : 0;
            const fim = m && m[2] ? parseInt(m[2], 10) : st.size - 1;
            res.writeHead(206, Object.assign(cabecalhos, {
                'Content-Range': 'bytes ' + inicio + '-' + fim + '/' + st.size,
                'Content-Length': fim - inicio + 1
            }));
            return fs.createReadStream(ficheiro, { start: inicio, end: fim }).pipe(res);
        }

        res.writeHead(200, cabecalhos);
        fs.createReadStream(ficheiro).pipe(res);
    });
});

servidor.listen(PORTA, '127.0.0.1', () => {
    console.log('Editor: http://127.0.0.1:' + PORTA);
});
