@echo off
REM Setup script para desarrollo local (Windows)

echo.
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo Kodo Development Setup
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo.

REM Backend setup
echo.
echo [1/5] Setting up backend...
cd backend

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found. Install Python 3.9+
    exit /b 1
)

REM Create venv
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate venv
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt

REM Copy .env
if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
)

cd ..

REM Frontend setup
echo.
echo [2/5] Setting up frontend...
cd frontend

REM Check Node
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found. Install Node 18+
    exit /b 1
)

REM Install dependencies
if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install
)

REM Copy .env
if not exist ".env" (
    echo Creating .env from .env.example...
    copy .env.example .env
)

cd ..

echo.
echo.
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo SETUP COMPLETE!
echo ^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*^*
echo.
echo Next steps:
echo   1. Backend: cd backend ^& venv\Scripts\activate ^& python main.py
echo   2. Frontend: cd frontend ^& npm run dev
echo.
pause
