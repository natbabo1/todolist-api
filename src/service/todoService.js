const fs = require("fs/promises");
const { title } = require("process");
const { v4: uuidv4 } = require("uuid");
const { getYYYYMMDD } = require("../utils/dateFormatter");
const ServerError = require("../utils/ServerError");

const readTodosFile = async () => {
  const file = await fs.readFile("src/db/todos.json", "utf-8");

  return JSON.parse(file);
};

const writeTodosFile = async (data) => {
  await fs.writeFile("src/db/todos.json", JSON.stringify(data), "utf-8");
};

exports.createTodo = async ({ title, date, completed = false }) => {
  if (!title || typeof title !== "string" || title.trim() === "") {
    throw new ServerError(400, "title must be provided");
  }
  if (!date || isNaN(new Date(date).getTime())) {
    throw new ServerError(400, "date must be provided and correct format");
  }
  if (typeof completed !== "boolean") {
    throw new ServerError(400, "completed must be boolean");
  }

  const todos = await readTodosFile();
  const newTodo = {
    id: uuidv4(),
    date: getYYYYMMDD(new Date(date)),
    title,
    completed
  };

  todos.push(newTodo);

  await writeTodosFile(todos);

  return newTodo;
};

exports.updateTodo = async ({ todoId, title, date, completed }) => {
  if (!todoId) {
    throw new ServerError(400, "id must be provided");
  }
  const todos = await readTodosFile();
  const todoIdx = todos.findIndex((item) => item.id === todoId);

  if (todoIdx === -1) {
    throw new ServerError(400, "todo does not exist");
  }

  const todo = todos[todoIdx];

  if (title) {
    if (typeof title !== "string" || title.trim() === "") {
      throw new ServerError(400, "title must be a string and not empty");
    }
    todo.title = title;
  }
  if (date) {
    if (isNaN(new Date(date).getTime())) {
      throw new ServerError(400, "date must be correct format");
    }
    todo.date = getYYYYMMDD(new Date(date));
  }
  if (completed) {
    if (typeof completed !== "boolean") {
      throw new ServerError(400, "completed must be boolean");
    }
    todo.completed = completed;
  }

  todos[todoIdx] = todo;

  await writeTodosFile(todos);

  return todo;
};

exports.deleteTodo = async (todoId) => {
  const todos = await readTodosFile();
  const newTodos = todos.filter((item) => item.id !== todoId);
  await writeTodosFile(newTodos);
  return;
};

exports.getTodos = async ({ title, completed = null }) => {
  const toBooleanCompleted = completed
    ? completed.toLowerCase() === "true"
      ? true
      : completed.toLowerCase() === "false"
      ? false
      : null
    : null;

  const todos = await readTodosFile();

  const newTodos = todos.filter((item) => {
    const isContainTitle =
      !title || item.title?.toLowerCase().includes(title.toLowerCase());
    const isCompelte =
      completed === null || item.completed === toBooleanCompleted;
    return isContainTitle && isCompelte;
  });
  return newTodos;
};

exports.getTodoById = async (todoId) => {
  const todos = await readTodosFile();

  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    throw new ServerError(400, "todo does not exist");
  }

  return todo;
};
