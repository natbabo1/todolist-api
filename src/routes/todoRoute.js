const router = require("express").Router();
const todoController = require("../controllers/todoController");

router
  .route("/")
  .get(todoController.getAllTodos)
  .post(todoController.createTodo);

router
  .route("/:todoId")
  .get(todoController.getTodo)
  .patch(todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
