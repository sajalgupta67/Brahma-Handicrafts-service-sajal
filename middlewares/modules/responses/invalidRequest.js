module.exports = function invalidRequest(message) {
    let response = {};
    this.status(422);
    response.data = null;
    response.message = message;
    response.isValid = false;
    console.log("++ Error Message, 422 ++ ", message);
    return this.send(response);
};