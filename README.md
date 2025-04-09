# Ecology
Sistema de automação sustentável

## Instalação para desenvolvimento

### Dependências

Garanta que o NodeJS, PNPM e Docker estejam instalados corretamente.

### Configurações

É importante que você modifique seu `/etc/hosts` (Linux), e adicione as seguintes linhas:

```bash
127.0.0.1   ecology.local
127.0.0.1   api.inveet.local
127.0.0.1   pgadmin.inveet.local
```

### Inicialização

Execute o script `up.sh` (Linux) ou `up.bat` (Windows).

### Finalização

Se tudo ocorrer bem, o sistema estará disponível em `http://ecology.local`.
