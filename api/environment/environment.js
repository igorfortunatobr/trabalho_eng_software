const ENVIRONMENT = {
    ERROR_REASONS_CODE:
    {
        EXPIRED_TOKEN: 'EXPIRED_TOKEN',
        AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
        EMPTY_TOKEN: 'EMPTY_TOKEN'
    },
    ERROR_REASONS_TEXT:
    {
        EXPIRED_TOKEN: 'Token expirado! Faça login novamente.',
        AUTHENTICATION_ERROR: 'Falha na autenticação do token.',
        EMPTY_TOKEN: 'Token de autenticação não fornecido'
    },
    TRANSACTION_TYPES: {
        1: 'DESPESA',
        2: 'RECEITA'
    }
}

module.exports = ENVIRONMENT;