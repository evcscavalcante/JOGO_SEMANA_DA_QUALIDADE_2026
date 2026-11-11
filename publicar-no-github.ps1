# Rode no PowerShell, dentro da pasta extraída. É preciso Git e GitHub CLI (gh) autenticado.
$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
if (-not (Get-Command git -ErrorAction SilentlyContinue)) { throw 'Instale o Git primeiro.' }
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw 'Instale o GitHub CLI (gh) primeiro: https://cli.github.com/' }
gh auth status
if ($LASTEXITCODE -ne 0) { throw 'Primeiro autentique: gh auth login' }
gh auth setup-git
if ($LASTEXITCODE -ne 0) { throw 'Falha em gh auth setup-git' }
if (-not (Test-Path '.git')) { git init -b main }
$allRemotes = @(git remote)
if ($allRemotes -contains 'origin') {
  $origin = git remote get-url origin
  if ($origin -notmatch 'evcscavalcante/JOGO_SEMANA_DA_QUALIDADE_2026(?:\.git)?$') { throw 'Esta pasta já tem um origin diferente; não será alterado.' }
} else {
  git remote add origin 'https://github.com/evcscavalcante/JOGO_SEMANA_DA_QUALIDADE_2026.git'
}
git add index.html sw.js icon.svg manifest.webmanifest README.md .nojekyll publicar-no-github.ps1
if ($LASTEXITCODE -ne 0) { throw 'Erro ao adicionar arquivos' }
git diff --cached --quiet
if ($LASTEXITCODE -ne 0) { git -c user.name='EvCS Qualidade' -c user.email='evcscavalcante@users.noreply.github.com' commit -m 'feat: publicar jogo da Semana da Qualidade para Pages e offline' }
if ($LASTEXITCODE -ne 0) { throw 'Falha no commit' }
git branch -M main
if ($LASTEXITCODE -ne 0) { throw 'Falha ao selecionar a branch main' }
git push -u origin main
if ($LASTEXITCODE -ne 0) { throw 'Push falhou; confira permissões de escrita/credenciais e mudanças no repo' }
Write-Host 'Enviado. Ative Pages em Settings > Pages > Deploy from a branch > main / (root).' -ForegroundColor Green
