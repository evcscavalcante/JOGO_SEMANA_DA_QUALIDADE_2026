# Missão Qualidade 2026 — Salum Construções | Obra Vale

**Tema:** Qualidade: Impulsionando o Desempenho.

Jogo interativo da Semana da Qualidade, com perguntas, sorteio proporcional à quantidade de cada prêmio, tickets numerados, controle de entrega e exportação de backups. As marcas Salum e Vale estão incorporadas ao HTML fornecido para o evento.

## Site online / offline

Após publicar em **GitHub Pages**, acesse o link uma vez **com internet** e aguarde o carregamento. O `sw.js` guarda os arquivos do jogo em cache. Depois, o site pode abrir **offline** no mesmo navegador e dispositivo, desde que o navegador não tenha apagado seus dados.

**O armazenamento é LOCAL:** os dados de prêmios, jogadores, sorteios, tickets e configuração ficam em `localStorage` do navegador, nunca no GitHub. Cada dispositivo/navegador tem dados **independentes**; não existe controle central de estoque nem prevenção global de participações duplicadas. Para um evento, use **um único computador principal** e exporte backups periódicos pelo painel Organização. Não use modo anônimo; não limpe os dados do site. O PIN inicial (`2026`) é local e não fornece segurança contra fraude, dado que o jogo é totalmente cliente.

É possível instalar como aplicativo pelo navegador quando o recurso estiver disponível. O acesso offline só começa a funcionar depois que o service worker instalar e cachear o jogo na primeira visita online. Alterar o código/versão do serviço poderá exigir uma visita online para atualizar o cache.

## Publicar em GitHub Pages

1. Envie os arquivos deste diretório para a raiz da branch **main** do repositório `evcscavalcante/JOGO_SEMANA_DA_QUALIDADE_2026` (ou use `publicar-no-github.ps1` no Windows, já autenticado no `gh`).
2. Abra [Settings → Pages](https://github.com/evcscavalcante/JOGO_SEMANA_DA_QUALIDADE_2026/settings/pages).
3. Em **Build and deployment**, escolha **Deploy from a branch**; **Branch: main**, pasta **/(root)**, **Save**.
4. Depois de publicado, acesse: https://evcscavalcante.github.io/JOGO_SEMANA_DA_QUALIDADE_2026/
5. Teste a experiência offline: abra online, espere o carregamento, feche a aba, desligue a internet e abra o mesmo endereço novamente. Faça um sorteio de teste antes do evento e exporte um backup.

Não precisa de Firebase, servidor, API nem GitHub Actions customizadas.

## Backup

**Organização → Segurança e backup → Exportar backup (.json)**. Para voltar aos dados, use **Restaurar backup**. Os dados de URLs `file://` anteriores não migram automaticamente para a origem `github.io`; importe um backup antes de continuar um evento existente.
