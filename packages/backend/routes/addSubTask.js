  /**
 * @api {post} /v1/todo/subtask Add subtask
 * @apiName addSubTask
 * @apiGroup POST
 * @apiParam {string} title task title.
 * @apiParam {boolean} status task status, true for completed.
 * @apiParam {string} dueDate task due date.
 * @apiParam {string} id root task id.
 * @apiSampleRequest http://localhost:8080/v1/todo/subtask
 * @apiParamExample {json} Request:
 * {
 *   "title": "Learn Java",
 *    "status": false,
 *    "dueDate": "1584827999999",
 *    "rootId": "some root id"
 * }
 */

const mongodbClient = require('../client/mongodb')

 module.exports = async function addSubTask(req, res, next) {

  try {

    const { status, result} = await mongodbClient.addSubTask({
      ...req.body,
      id: req.body.rootId,
      userId: req.params.userID
    });

    res.status(status);
    res.json({ result })

  } catch (error) {

    req.log.error(':: addSubTask :: Error adding a sub task', error);

    res.status(error.status || 500);
    res.json({ ...error.data });
  }
  next()
}
