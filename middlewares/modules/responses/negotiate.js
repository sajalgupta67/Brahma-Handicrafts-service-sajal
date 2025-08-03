module.exports = function negotiate(error) {
    console.log(error);

    
    let data = {};
    let status = 500;
    if (error && error.status) {
        status = error.status;
    }

    data.status = status;
    data.error = true;

    if (error && error.name == 'SequelizeUniqueConstraintError') {
        let e = error.errors[0];
        data.message = e.message;
    }



    this.status(status);
    return this.send({
        data
    });
};