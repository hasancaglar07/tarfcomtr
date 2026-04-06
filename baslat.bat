@echo off
chcp 65001 >nul
title TARF Akademi - Geliştirme Sunucusu
color 0A

echo ========================================
echo   TARF Akademi Geliştirme Sunucusu
echo ========================================
echo.

:: Node.js kontrol et
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] Node.js bulunamadı!
    echo Lütfen Node.js'i yükleyin: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [BILGI] Sunucu başlatılıyor...
echo [BILGI] Varsayilan adres: http://localhost:3000
echo [BILGI] 3000 doluysa Next.js otomatik 3001, 3002... porta gecer.
echo [BILGI] Gercek adres icin terminaldeki "Local:" satirini kullanin.
echo.
echo Sunucuyu durdurmak için: CTRL + C
echo ========================================
echo.

:: Sunucuyu doğrudan başlat (dev-reset atla)
npx next dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [HATA] Sunucu başlatılamadı!
    echo.
    pause
)
