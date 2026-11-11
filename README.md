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

## Banco de perguntas (11/11/2026)

O jogo possui **41 perguntas**: 12 originais e 29 diferentes extraídas das cinco fotografias enviadas para a Semana da Qualidade. Fotos repetidas foram desconsideradas. Em cada partida são sorteadas três questões diferentes, e as opções são embaralhadas.

Consulte [PERGUNTAS_CADASTRADAS.md](./PERGUNTAS_CADASTRADAS.md) para ver as novas perguntas e os gabaritos. Algumas alternativas encobertas por reflexos nas fotos foram reconstituídas mantendo os gabaritos informados. A periodicidade de verificação de trenas e níveis citada em um cartão deve ser confirmada no plano da obra, não tratada como regra universal.

A versão do cache offline foi atualizada para `missao-qualidade-salum-vale-v2-perguntas`. Acesse o site com internet para receber a versão nova; dados já salvos no navegador permanecem no mesmo armazenamento local.

## Roleta da Qualidade (v3)
 
O sorteio agora é apresentado em uma **roleta animada com os logotipos oficiais Salum Construções e Vale alternados**, usando as imagens incorporadas ao HTML. A roleta é visual: a probabilidade real permanece `winChance` (%) e, havendo vitória, o prêmio é selecionado proporcionalmente à quantidade restante em estoque; a posição dos logos na roleta **não determina** se alguém ganhou.
 
Após clicar em **Girar a roleta**, o navegador reproduz música curta de suspense e efeitos sintetizados com Web Audio. Ao concluir, anuncia em voz de português (pt-BR) frases de vitória ou não vitória usando a API `speechSynthesis`, com botão **Repetir anúncio em áudio** na tela de resultado. Existe controle **Som e voz ligados/desligados** e preferência local no navegador. A trilha é original, sintetizada e não depende de rede. **A voz depende da disponibilidade de vozes no sistema/navegador:** em alguns aparelhos a fala pode não funcionar sem internet; o resultado e o ticket continuam visíveis. Respeita preferência de movimento reduzido.
 
Atualize o jogo pelo endereço publicado **com internet** ao menos uma vez para instalar o novo cache `missao-qualidade-salum-vale-v3-roleta-audio`. O localStorage anterior e os tickets existentes não são apagados pela atualização.

## Layout de evento em tela cheia (v4)

Em desktop com pelo menos 1024 px de largura e 680 px de altura, as telas de introdução, perguntas, roleta e resultado foram organizadas para ocupar a área disponível com menos rolagem: formulário junto à apresentação, quiz com espaçamento compacto, roleta em duas colunas e ticket ao lado do anúncio. Em telas grandes (largura mínima de 1450 px e altura de 700 px), aparecem dois banners verticais com os logotipos **originais** Salum (esquerda) e Vale (direita), compartilhando as mesmas imagens locais incorporadas ao jogo. Não é necessário baixar imagens externas.

Telas pequenas, zoom alto e orientação retrato mantêm rolagem quando necessária, sem ocultar dados dos tickets nem campos. O painel de organização e a tabela de resultados preservam rolagem própria para acesso a todas as funções. Na impressão, os banners e a estrutura de tela cheia ficam desativados e somente o ticket permanece visível.

O armazenamento `localStorage`, a versão do banco de dados, o cálculo de chance de ganhar, a roleta, os sons e os tickets não foram alterados. O service worker usa o cache `missao-qualidade-salum-vale-v4-tela-cheia`: abra o jogo **com internet** para receber a atualização antes de usá-lo offline.
