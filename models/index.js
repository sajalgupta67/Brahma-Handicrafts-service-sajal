let models = {};
let db;
module.exports = {
    use: function (db) {
        db.setModels(__dirname);
        this.db = db;
    },
    getModels: function () {
        console.log('models', models);
        console.log('models dd', this.db.models);
        return this.db.models;
    }
}