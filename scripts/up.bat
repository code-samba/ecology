@echo off
setlocal

:: Verifica o diretório do script atual
set DIR=%~dp0

if "%1"=="prod" (
    docker compose -f "%DIR%..\docker-compose-prod.yml" --env-file "%DIR%..\.env" up
) else (
    docker compose -f "%DIR%..\docker-compose-local.yml" --env-file "%DIR%..\.env-local" up --build
)

endlocal