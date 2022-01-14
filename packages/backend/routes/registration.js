/**
 * @api {post} /v1/todo/registration User registration
 * @apiName userRegistration
 * @apiGroup POST
 * @apiParam {string} name user's name.
 * @apiParam {string} email user's email.
 * @apiParam {string} password user's password.
 * @apiSampleRequest http://localhost:8080/v1/todo/registration
 * @apiParamExample {json} Request:
 * {
 *   "name": "Junius",
 *    "email": "phuti@gmail.com",
 *    "password": "Testing1",
 * }
 */

const mongodbClient = require('../client/mongodb');

module.exports = async function userRegistration(req, res, next) {
  try {
    const { status, result } = await mongodbClient.registration(req.body);

    res.status(status);
    res.json({ result });
  } catch (error) {
    req.log.error(':: userRegistration :: Error adding a sub task', error);

    res.status(error.status || 500);
    res.json({ ...error.data });
  }
  next();
};
