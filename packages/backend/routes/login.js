/**
 * @api {post} /v1/todo/login User login
 * @apiName userLogin
 * @apiGroup POST
 * @apiParam {string} email user's email.
 * @apiParam {string} password user's password.
 * @apiSampleRequest http://localhost:8080/v1/todo/login
 * @apiParamExample {json} Request:
 * {
 *    "email": "phuti@gmail.com",
 *    "password": "Testing1",
 * }
 */

const mongodbClient = require('../client/mongodb');

module.exports = async function userLogin(req, res, next) {
  try {
    const { status, result } = await mongodbClient.login(req.body);

    res.status(status);
    res.json({ result });
  } catch (error) {
    req.log.error(':: userLogin :: Error adding a sub task', error);

    res.status(error.status || 500);
    res.json({ error: error.message });
  }
  next();
};
