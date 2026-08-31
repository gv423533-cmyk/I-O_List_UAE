# Painel de Canais de Instrumentos — Versão de Produção

## O que tem aqui
- `index.html` — o app completo (mesma interface do protótipo, agora conectado ao Firestore em tempo real)
- `manifest.json` — configuração do PWA (permite "instalar" o app no celular/desktop)
- `sw.js` — service worker (deixa o app instalável e abre mais rápido)
- `icon-192.png` / `icon-512.png` — ícones do PWA
- `firestore.rules` — regras de segurança para colar no console do Firebase

## Passo 1 — Colar as regras de segurança no Firebase
1. No console do Firebase, vá em **Firestore Database → Regras**
2. Apague o conteúdo atual e cole o conteúdo do arquivo `firestore.rules`
3. Clique em **Publicar**

## Passo 2 — Subir os arquivos no GitHub
1. Abra o repositório `I-O_List_UAE` no GitHub
2. Clique em **Add file → Upload files**
3. Arraste os 5 arquivos: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`
4. Role para baixo e clique em **Commit changes**

## Passo 3 — Acessar o app
Depois de alguns minutos (o GitHub Pages leva um tempinho para publicar), o app estará em:

```
https://gv423533-cmyk.github.io/I-O_List_UAE/
```

## Passo 4 — Importar os dados reais
1. Abra o link acima
2. Clique em **"Importar planilhas"**
3. Selecione os arquivos CSV — pode ser de todas as 9 FCS de uma vez, ou só de algumas
4. Confirme a importação

**Importante — a importação é por estação (FCS), não geral:** ao importar, o app substitui **apenas os canais das estações presentes nos arquivos selecionados**. As demais estações já carregadas e todo o histórico de alterações **não são afetados**. Isso permite importar aos poucos — por exemplo, importar 8 estações agora e, mais tarde, importar só a Casa de Força separadamente, sem perder nada do que já foi carregado.

A partir daí, qualquer técnico que acessar esse mesmo link (de qualquer dispositivo, incluindo celular) vai ver os mesmos dados, em tempo real, com o histórico de alterações completo.

## Instalar como app (PWA)
- **No celular (Android/iPhone):** abra o link no navegador → menu → "Adicionar à tela inicial" / "Instalar app"
- **No computador (Chrome/Edge):** ícone de instalação na barra de endereço, ou menu → "Instalar Painel de Canais"

## Notificação via Telegram
Já está ativa neste `index.html` — toda edição ou troca de canal salva com sucesso
dispara uma mensagem para o grupo do Telegram configurado.

**Atenção de segurança:** como este é um app estático (GitHub Pages, sem servidor
próprio), o token do bot fica visível para quem inspecionar o código-fonte da
página (`Ctrl+U` no navegador). Isso foi uma escolha consciente (Opção A, mais
simples) — mantenha o repositório de uso estritamente interno da empresa. Se
algum dia quiser eliminar essa exposição, dá para migrar o envio para uma
Cloud Function do Firebase (que mantém o token em segredo), sem precisar
refazer o resto do app.

## Próximos passos possíveis
- Login individual por técnico (hoje o acesso é compartilhado, sem usuário/senha)
- Migrar o envio do Telegram para uma Cloud Function (token deixa de ficar exposto)
