/**
 * 200 (OK) Response
 *
 * Usage:
 * return res.ok();
 * return res.ok(data);
 * return res.ok(data, 'auth/login');
 *
 * @param  {Object} data
 * @param  {String|Object} options
 *          - pass string to render specified view
 */

module.exports = function sendOK(data, options) {

  let response = {};
  this.status(200);
  response.data = data;
  console.log('Response Data:', response.data);
  if (options && options.message) {
    response.message = options.message;
  }

  return this.send(response);
};