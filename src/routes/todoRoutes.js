const express = require('express');
const router = express.Router();

const {
  create,
  update,
  remove,
  get,
  getAll,
  complete
} = require('../controllers/todoController');

const { authenticate } = require('../middlewares/auth')

//express joi validator
const validator = require('express-joi-validation').createValidator({
  passError: true
});
const {

  validateTodoCreate,
  validateTodoUpdate,
  validateTodoParams
} = require('../utils/validationUtils');

router.post('/',
  validator.body(validateTodoCreate), authenticate, create);

router.put('/:id',
  validator.params(validateTodoParams),
  validator.body(validateTodoUpdate), authenticate, update);

router.delete('/:id',
  validator.params(validateTodoParams),
 authenticate, remove);

router.get('/:id',
  validator.body(validateTodoParams), authenticate, get);

router.get('/', authenticate, getAll);

router.put('/completed/:id',
  validator.params(validateTodoParams), authenticate, complete);

module.exports = router;