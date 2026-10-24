EDITOR MR. PIZZA
================

Abrir
-----
Duplo-clique em "Abrir editor.cmd" (na pasta principal do projeto).
Abre no browser em http://127.0.0.1:8099

Épocas prontas
--------------
- Halloween, Natal, Páscoa, Verão, São Valentim, Ano Novo e Outono, já feitas
  e testadas nos dois ecrãs. Um clique aplica o kit; o segundo clique confirma
  a substituição das decorações que estiverem lá.
- As figuras (abóbora, árvore, coelho, ovos, estrela…) são desenhos vetoriais
  guardados em "efeitos.js": não ocupam espaço, ficam nítidas em qualquer TV
  e não podem partir-se como uma imagem.
- Os efeitos (neve, morcegos, pétalas, confetes, fogos…) são animações leves,
  desenhadas na hora, e dão uma "rajada" quando o vídeo dos menus muda de slide.
- "Limpar decorações" volta ao ecrã normal (também pede segundo clique).
- Depois de aplicar um kit podes arrastar, redimensionar, apagar peças ou
  trocar em que ecrãs aparecem.

O que faz
---------
- Pré-visualização real dos dois ecrãs (TV1 · menus, TV2 · preçário).
- Arrastar camadas para mover; canto verde para redimensionar.
- "Adicionar imagem" envia um PNG (idealmente com fundo transparente)
  para a pasta "decoracoes/" e cria uma camada.
- Escolher em que ecrãs a decoração aparece (TV1, TV2 ou ambos).
- "Guardar" grava em decoracoes.json (só no PC).
- "Publicar no site" envia tudo para o GitHub. As TVs atualizam-se
  sozinhas ao fim de ~1 minuto, com o aviso de 5 segundos.

Notas
-----
- O servidor só escuta em 127.0.0.1: ninguém de fora lhe chega.
- É preciso ter o git instalado e com sessão iniciada no GitHub
  (o mesmo que já é usado para publicar).
- O chef animado aparece no editor como imagem parada; na TV tem movimento.
- "efeitos.js" é o ficheiro com as figuras e os efeitos: é usado pelo site e
  pelo editor, por isso o que vês aqui é igual ao que aparece na TV.
- "Delete" remove a camada selecionada.
- Para fechar o editor: fecha o browser e a janela "Editor MR Pizza"
  (ou reinicia o PC).
