
/**
 * @api {get} /v1/todo/task/:id Get task by id
 * @apiName getTask
 * @apiGroup GET
 * @apiParam {string} id task id.
 * @apiSampleRequest http://localhost:8080/v1/todo/task/:id
 */

 const mongodbClient = require('../client/mongodb')

module.exports = async function getTask(req, res, next) {
  try {

    const { status, result} = await mongodbClient.getTask(req.params.id, req.params.userID);

    res.status(status);
    res.json({ result });

  } catch (error) {

    req.log.error(':: getTask :: Error getting task by id', error);

    res.status(error.status);
    res.json({ ...error.data });

  }

  next()
}
