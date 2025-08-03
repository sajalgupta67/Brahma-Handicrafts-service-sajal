const models = require('../models').getModels();
const userModel = models.user;

async function create(data) {
    try {
        let response = await userModel.create(data);
        return response;
    } catch (error) {
        throw error;
    }
}

async function getAll() {
    console.log('Fetching all users');
    try {
        let filter = {
            order: [
                ['created_at', 'DESC']
            ]
        }

        let response = await userModel.findAll(filter);
        return response;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    create,
    getAll
}