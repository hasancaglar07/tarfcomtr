@echo off
echo ====================================
echo Next.js Frontend Baslatma Scripti
echo ====================================
echo.

REM Node.js kontrol
echo [1/3] Node.js kontrolu yapiliyor...
node --version
if errorlevel 1 (
    echo HATA: Node.js bulunamadi!
    echo Node.js kurmaniz gerekiyor: https://nodejs.org
    pause
    exit /b 1
)
echo ✓ Node.js OK
echo.

REM npm kontrol
echo [2/3] npm kontrolu yapiliyor...
npm --version
if errorlevel 1 (
    echo HATA: npm bulunamadi!
    pause
    exit /b 1
)
echo ✓ npm OK
echo.

REM npm install
echo [3/3] Frontend bagimliliklari kuruluyor...
if not exist "node_modules\" (
    echo node_modules klasoru yok, npm install calistiriliyor...
    npm install
    if errorlevel 1 (
        echo HATA: npm install basarisiz!
        pause
        exit /b 1
    )
) else (
    echo ✓ node_modules klasoru mevcut, atlaniyor
)
echo.

REM .env.local check
echo .env.local dosyasi kontrol ediliyor...
if not exist ".env.local" (
    echo .env.local olusturuluyor...
    echo NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1 > .env.local
    echo ✓ .env.local olusturuldu
) else (
    echo ✓ .env.local mevcut
)
echo.

REM Next.js dev server
echo ====================================
echo Frontend: http://localhost:3000
echo ====================================
echo.
echo Turkce:  http://localhost:3000/tr
echo English: http://localhost:3000/en
echo Arabic:  http://localhost:3000/ar
echo.
echo CTRL+C ile durdurun
echo.

npm run dev