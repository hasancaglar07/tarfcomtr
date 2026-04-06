@echo off
chcp 65001 >nul
title TARF Akademi - Geliştirme Sunucusu
color 0A

echo ========================================
echo   TARF Akademi Geliştirme Sunucusu
echo ========================================
echo.
echo Sunucu başlatılıyor...
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

:: npm kontrol et
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [HATA] npm bulunamadı!
    echo Lütfen Node.js'i yeniden yükleyin.
    echo.
    pause
    exit /b 1
)

echo [BILGI] Node.js ve npm bulundu.
echo [BILGI] Sunucu başlatılıyor (varsayilan): http://localhost:3000
echo [BILGI] 3000 doluysa Next.js otomatik 3001, 3002... porta gecer.
echo [BILGI] Gercek adres icin terminaldeki "Local:" satirini kullanin.
echo.
echo Sunucuyu durdurmak için: CTRL + C
echo ========================================
echo.

npm run dev

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [HATA] Sunucu başlatılamadı!
    echo.
    pause
)
