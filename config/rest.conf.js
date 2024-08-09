const envURL = require('./env.conf');

const api_endpoint = envURL[envURL.env].services.end_point;

module.exports = {
    endpoint: api_endpoint,
    prettyPrintJson: true,
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 200000
};
