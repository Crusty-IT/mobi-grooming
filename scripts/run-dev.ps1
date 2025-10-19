# Runs Next.js dev and Netlify proxy in two terminals
param(
  [int]$WaitSeconds = 3
)

Write-Host "Starting Next.js dev server (port 3000)..."
Start-Process -FilePath "powershell" -ArgumentList "-NoExit", "npm run dev" -WorkingDirectory (Split-Path $MyInvocation.MyCommand.Path -Parent | Split-Path -Parent)

Write-Host "Waiting $WaitSeconds seconds for Next.js to boot..."
Start-Sleep -Seconds $WaitSeconds

Write-Host "Starting Netlify dev proxy (port 8888 -> 3000)..."
Set-Location (Split-Path $MyInvocation.MyCommand.Path -Parent | Split-Path -Parent)
netlify dev
