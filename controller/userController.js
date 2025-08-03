const sequelize = require('../config/db').sequelize;
const userService = require('../services/userService');

module.exports = {
    create: async (req, res) => {
             const data = req.body;
             if (!data.name || !data.mobile || !data.email) {
                return res.status(400).json({ message: 'Name, mobile, and email are required.' });
            }

             try {
            let response = await userService.create(data);
            response = JSON.parse(JSON.stringify(response));
            
            return res.ok(response);
        } catch (error) {
            return res.badRequest(error);
        }
        },

    getAll: async (req, res) => {
        try {
            const users = await userService.getAll();
            console.log('users', res.error);
            return res.send({users, status: 200});
        } catch (error) {
            return res.serverError(error);
        }
}
}