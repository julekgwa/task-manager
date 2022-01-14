/**
 * @api {put} /v1/todo/task Update Task
 * @apiName updateTask
 * @apiGroup PUT
 * @apiParam {string} title task title.
 * @apiParam {boolean} status task status, true for completed.
 * @apiParam {string} dueDate task due date.
 * @apiParam {string} id task id.
 * @apiParam {array} [tasks] optional tasks.
 * @apiSampleRequest http://localhost:8080/v1/todo/task
 *  @apiParamExample {json} Request:
 * {
 *   "title": "Learn Java",
 *    "status": false,
 *    "dueDate": "1584827999999",
 *    "id": "task id"
 * }
 */

const mongodbClient = require('../client/mongodb');

module.exports = async function updateTask(req, res, next) {
  try {
    const { status, result } = await mongodbClient.updateTask({
      ...req.body,
      userId: req.params.userID,
    });

    res.status(status);
    res.json({ result });
  } catch (error) {
    req.log.error(':: updateTask :: Error updating task', error);

    res.status(error.status || 500);
    res.json({ ...error.data });
  }
  next();
};
