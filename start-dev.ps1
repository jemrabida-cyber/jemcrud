# Quick Start Script for JemCRUD Application

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  JemCRUD - Starting Development Mode  " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠️  Warning: .env file not found!" -ForegroundColor Yellow
    Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✅ .env file created. Please update it with your database credentials." -ForegroundColor Green
        Write-Host "Press any key to continue after updating .env file..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    } else {
        Write-Host "❌ .env.example not found. Please create .env manually." -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# Start Backend
Write-Host "🚀 Starting NestJS Backend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run start:dev"
Start-Sleep -Seconds 2

# Start Frontend
Write-Host "🚀 Starting React Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C in each terminal to stop the servers" -ForegroundColor Gray
Write-Host "========================================" -ForegroundColor Cyan
