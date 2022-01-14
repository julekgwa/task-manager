'use strict';
const Joi = require('joi');

function validateUser(req, res, next) {
  const Schema = Joi.object().keys({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  const { error } = Schema.validate(req.body);

  try {
    JSON.parse(JSON.stringify(req.body));

    if (error) {
      res.status(400);
      res.json(invalidParamMessage(error.details));
      return;
    }
  } catch (err) {
    res.status(400);
    res.json({ error: 'invalid params passed in' });
    return;
  }

  next();
}

function validateLogin(req, res, next) {
  const Schema = Joi.object().keys({
    password: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
  });

  const { error } = Schema.validate(req.body);

  try {
    JSON.parse(JSON.stringify(req.body));

    if (error) {
      res.status(400);
      res.json(invalidParamMessage(error.details));
      return;
    }
  } catch (err) {
    res.status(400);
    res.json({ error: 'Incorrect email or password.' });
    return;
  }

  next();
}

const invalidParamMessage = (details) => {
  if (
    !Array.isArray(details) ||
    (Array.isArray(details) && details.length < 1)
  ) {
    return {
      error: 'invalid params passed in',
    };
  }

  const errorDetails = details[0];

  if (errorDetails.message) {
    return {
      error: errorDetails.message,
    };
  }

  if (errorDetails.context) {
    return {
      error: `${context.key} is required`,
    };
  }

  return {
    error: 'invalid params passed in',
  };
};

const pathSchema = Joi.object().keys({
  id: Joi.string().required(),
  userID: Joi.string().required()
});

const pathParamsValidator = (req, res, next) => {
  const { error } = pathSchema.validate(req.params);
  if (error) {
    res.status(400);
    res.json({ error: 'id is required' });
    return;
  }
  next();
};

const bodySchema = Joi.object().keys({
  title: Joi.string().required(),
  dueDate: Joi.string().required(),
  status: Joi.boolean().required(),
  id: Joi.string(),
  tasks: Joi.array(),
  rootId: Joi.any(),
  userId: Joi.string()
});

const bodyPayloadValidator = (req, res, next) => {
  const { error } = bodySchema.validate(req.body);

  try {
    JSON.parse(JSON.stringify(req.body));

    if (error) {
      res.status(400);
      res.json(invalidParamMessage(error.details));
      return;
    }
  } catch (err) {
    res.status(400);
    res.json({ error: 'invalid params passed in' });
    return;
  }

  next();
};

module.exports = {
  bodyPayloadValidator,
  pathParamsValidator,
  validateUser,
  validateLogin,
};
