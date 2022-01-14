/**
 * @api {get} /v1/todo/:userID/tasks Get all tasks
 * @apiName getTasks
 * @apiParam {string} userID user id
 * @apiGroup GET
 * @apiSampleRequest http://localhost:8080/v1/todo/:userID/tasks
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "message": "Cant find task for userId"
 *     }
 */

 const mongodbClient = require('../client/mongodb')

module.exports = async function getAllTasks(req, res, next) {

  try {

    req.log.debug(':: getAllTasks :: Starting a request to get all tasks');

    const { status, result } = await mongodbClient.getAllTasks(req.params.userID);

    req.log.debug(':: getAllTasks :: Successfully finished getting all tasks');

    res.status(status);
    res.json({ result });

  } catch (error) {

    req.log.error(':: getAllTasks :: Error getting tasks', error);

    res.status(error.status);
    res.json({ ...error.data });
  }

  next();
}
