const envConf = {
    'env': process.env.E2E_ENV || 'int',
    'int': {
        'web': {
            host_url: 'https://automationexercise.com'
        },
        'restApi': {
            end_point: 'https://petstore.swagger.io/v2'
        },
        'gql': {
            end_point: 'https://graphqlzero.almansi.me/api'
        }
    }
};

module.exports = envConf;