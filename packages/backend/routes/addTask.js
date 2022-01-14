/**
 * @api {post} /v1/todo/task Add new task
 * @apiName addTask
 * @apiGroup POST
 * @apiParam {string} title task title.
 * @apiParam {boolean} status task status, true for completed.
 * @apiParam {string} dueDate task due date.
 * @apiSampleRequest http://localhost:8080/v1/todo/task
 * @apiParamExample {json} Request:
 * {
 *   "title": "Learn Java",
 *    "status": false,
 *    "dueDate": "1584827999999"
 * }
 */

const mongodbClient = require('../client/mongodb');

module.exports = async function addTask(req, res, next) {
  try {
    const { status, result } = await mongodbClient.addTask({
      ...req.body,
      userId: req.params.userID,
    });

    res.status(status);
    res.json({ result });
  } catch (error) {
    req.log.error(':: addTask :: Error adding a new task', error);

    res.status(error.status || 500);
    res.json({ ...error.data });
  }

  next();
};
