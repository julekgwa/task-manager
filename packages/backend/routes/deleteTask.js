 /**
 * @api {delete} /v1/todo/task/:id Get task by id
 * @apiName deleteTask
 * @apiGroup DELETE
 * @apiParam {string} id task id.
 * @apiSampleRequest http://localhost:8080/v1/todo/task/:id
 */

  const mongodbClient = require('../client/mongodb')

module.exports = async function deleteTask(req, res, next) {

  try {

    const { status, result} = await mongodbClient.deleteTask(req.params.id, req.params.userID);

    res.status(status);
    res.json({ result });

  } catch (error) {

    req.log.error(':: deleteTask :: Error deleting a task', error);

    res.status(error.status || 500);
    res.json({ ...error.data });

  }
  next()
}
