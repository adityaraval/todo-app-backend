const db = require('../db');
const {
  create_todo,
  update_todo,
  delete_todo,
  get_todo,
  complete_todo,
  get_all_todo,
} = require('./queries');

const { ErrorHandler } = require('../utils/errorUtils');
const _ = require('lodash');

const createTodo = async (userId, todoObject) => {
  try {
    return await db.execute(create_todo, [
        todoObject.date,
        todoObject.title,
        false,
        userId]
    );
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const updateTodo = async (userId, todoId, todoObject) => {
  try {
    const found_todo = await db.execute(get_todo, [todoId,userId]);
    if (!_.isEmpty(found_todo[0])) {
      return await db.execute(update_todo, [todoObject.title,
        todoObject.date,
        todoId,
        userId
      ]);
    } else {
      throw new ErrorHandler(404,`Todo not found with ${todoId}`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const completeTodo = async (userId, todoId) => {
  try {
    const found_todo = await db.execute(get_todo, [todoId,userId]);
    if (!_.isEmpty(found_todo[0])) {
      return await db.execute(complete_todo, [true,
        todoId,
        userId
      ]);
    } else {
      throw new ErrorHandler(404,`Todo not found with ${todoId}`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const deleteTodo = async (userId, todoId) => {
  try {
    const found_todo = await db.execute(get_todo, [todoId,userId]);
    if (!_.isEmpty(found_todo[0])) {
      return await db.execute(delete_todo, [todoId,userId]);
    } else {
      throw new ErrorHandler(404,`Todo not found with ${todoId}`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const getTodoById = async (userId, todoId) => {
  try {
    const found_todo = await db.execute(get_todo, [todoId,userId]);
    if (!_.isEmpty(found_todo[0])) {
      return found_todo[0][0];
    } else {
      throw new ErrorHandler(404,`Todo not found with ${todoId}`);
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

const getAllTodo = async (userId) => {
  try {
    const found_todo = await db.execute(get_all_todo, [userId]);
    if (!_.isEmpty(found_todo[0])) {
      return found_todo[0];
    } else {
      return [];
    }
  } catch (e) {
    throw new ErrorHandler(e.statusCode || 500, e.message);
  }
}

module.exports = {
  createTodo,
  updateTodo,
  completeTodo,
  deleteTodo,
  getTodoById,
  getAllTodo,
}