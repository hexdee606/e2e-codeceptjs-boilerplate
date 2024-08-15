const envURL = require('./env.conf');

const gql_endpoint = envURL[envURL.env].gql.end_point;

module.exports = {
    endpoint: gql_endpoint,
    defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 200000
};
