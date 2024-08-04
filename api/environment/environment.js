const ENVIRONMENT = {
    ERROR_REASONS_CODE:
    {
        EXPIRED_TOKEN: 'EXPIRED_TOKEN',
        AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
        EMPTY_TOKEN: 'EMPTY_TOKEN',
        DATA_EMPTY: 'DATA_EMPTY',
        USER_DUPLICATE: 'USER_DUPLICATE',
        INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
        FORBIDDEN_REGISTER: 'FORBIDDEN_REGISTER'
    },
    ERROR_REASONS_TEXT:
    {
        EXPIRED_TOKEN: 'Token expirado! Faça login novamente.',
        AUTHENTICATION_ERROR: 'Falha na autenticação do token.',
        EMPTY_TOKEN: 'Token de autenticação não fornecido',
        DATA_EMPTY: 'Existem informações que não foram preenchidas.',
        USER_DUPLICATE: 'Já existe um usuário registrado com este e-mail.',
        INVALID_CREDENTIALS: 'Credenciais inválidas',
        FORBIDDEN_REGISTER: 'Você não pode editar registros de outro usuário.'
    },
    TRANSACTION_TYPES: {
        1: 'DESPESA',
        2: 'RECEITA'
    }
}

module.exports = ENVIRONMENT;