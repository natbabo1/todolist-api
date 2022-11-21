const todoService = require("../service/todoService");

exports.getAllTodos = async (req, res, next) => {
  try {
    const { title, completed } = req.query;
    const todos = await todoService.getTodos({ title, completed });
    res.status(200).json({ todos });
  } catch (err) {
    next(err);
  }
};

exports.getTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = await todoService.getTodoById(todoId);

    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { title, date, completed } = req.body;
    const todo = await todoService.createTodo({ title, date, completed });

    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const { title, date, completed } = req.body;

    const todo = await todoService.updateTodo({
      todoId,
      title,
      date,
      completed
    });

    res.status(200).json({ todo });
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    await todoService.deleteTodo(todoId);

    res.status(200).json({ message: "done" });
  } catch (err) {
    next(err);
  }
};
