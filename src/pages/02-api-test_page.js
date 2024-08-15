const api_test_model = require("../model/02-api-test_model");

class api_test_page extends Helper {
    constructor(config) {
        super(config);
    }

    async updateApiTestModel(data) {
        api_test_model.username = data[0]['username'];
        api_test_model.firstName = data[0]['firstName'];
        api_test_model.lastName = data[0]['lastName'];
        api_test_model.email = data[0]['email'];
        api_test_model.password = data[0]['password'];
        api_test_model.phone = data[0]['phone'];
    }
}

module.exports = new api_test_page();