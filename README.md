# todolist-api for BeDee Job application testing


## API

### GET /todos : get all todos
#### query: title, completed
#### response: {todos: [ {id, title, completed, date}, ...]
__
### POST /todos : create todo
#### request(JSON): { title, date, completed? }
#### response: {todo: {id, title, completed, date}
__
### GET /todo/:todoId : get todo by todo id
#### params: todoId
#### response: {todo: {id, title, completed, date}
__
### PATCH /todo/:todoId : update todo
#### params: todoId
#### request(JSON): {title?, completed?, date?}
#### response: {todo: {id, title, completed, date}
__
### DELETE /todo/:todoId : delete todo
#### params: todoId
#### response: {message: "done"}
