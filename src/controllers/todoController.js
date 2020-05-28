const {
  createTodo,
  updateTodo,
  completeTodo,
  getTodoById,
  getAllTodo,
  deleteTodo
} = require('../services/todoService');


const create = async (req, res, next) => {
  try {
    await createTodo(req.user.id,req.body);
    return res.status(200).send({
      message: "Todo created successfully"
    });
  } catch (e) {
    next(e)
  }
}

const get = async (req, res, next) => {
  try {
    const todo = await getTodoById(req.user.id,req.params.id);
    return res.status(200).send(todo);
  } catch (e) {
    next(e)
  }
}

const getAll = async (req, res, next) => {
  try {
    const todos = await getAllTodo(req.user.id);
    return res.status(200).send({todos});
  } catch (e) {
    next(e)
  }
}


const update = async (req, res, next) => {
  try {
    await updateTodo(req.user.id,req.params.id,req.body);
    return res.status(200).send({
      message: "Todo updated successfully"
    });
  } catch (e) {
    next(e)
  }
}

const complete = async (req, res, next) => {
  try {
    const todo = await completeTodo(req.user.id,req.params.id,req.body);
    return res.status(200).send({
      todo,
      message: "Todo completed successfully"
    });
  } catch (e) {
    next(e)
  }
}

const remove = async (req, res, next) => {
  try {
    await deleteTodo(req.user.id,req.params.id);
    return res.status(200).send({
      message: "Todo deleted successfully"
    });
  } catch (e) {
    next(e)
  }
}

module.exports = {
  create,
  get,
  getAll,
  update,
  complete,
  remove
}