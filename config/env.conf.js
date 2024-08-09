const envConf = {
    'env': process.env.E2E_ENV || 'int',
    'int': {
        'web': {
            host_url: 'https://automationexercise.com/'
        },
        'services': {
            end_point: 'https://graphqlzero.almansi.me/api'
        },
        'servers': {
            end_point: 'https://dummyapi.online/api/'
        }
    }
};

module.exports = envConf;