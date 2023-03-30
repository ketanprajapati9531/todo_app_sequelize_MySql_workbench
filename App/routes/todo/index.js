// routes/todo.js

const express = require('express');
const router = express.Router();
const db = require('../../models/todo');

const todoController = require('./index.controller.js');

router.post('/addtodo', todoController.addedTodo);



/*
Index route 

So, when the client sends a GET request to the root URL path of the web application, 
the server retrieves all the Todo objects from the database and sends them to the client 
for display in the todoIndex view.
*/

router.get('/', async (req, res) => {
  const todos = await db.findAll();

  res.render('todoIndex', { 
     pageTitle: 'Admin Dashboard',
      todos: todos
  });
});


/*
//Create route
this code block listens for a POST request to the root URL (/), 
creates a new todo item in the database with the specified properties, and redirects the user 
to the todo index page.
*/
router.post('/', async (req, res) => {
  const { title, description, due_date } = req.body;
  const todo = await db.Todo.create({
    title,
    description,
    due_date,
    is_complete: false
  });
  res.redirect('/todoIndex');
});





/*
Update route
this code updates a todo item in the database with new values from the request body. 
The code first finds the corresponding todo item by its ID, updates its fields to the new values, 
saves the changes to the database, and sends a success message back to the client.
*/
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, is_complete } = req.body;
  const todo = await db.Todo.findByPk(id);
  todo.title = title;
  todo.description = description;
  todo.due_date = due_date;
  todo.is_complete = is_complete;
  await todo.save();
  res.send('Success');
});


/*
Delete route
This code is defining a route for deleting a todo item. It listens to a DELETE request at the URL 
path '/:id', where ':id' is the ID of the todo item to be deleted.

When a DELETE request is received at this route, it retrieves the todo item from the database 
using its ID, then calls the .destroy() method on the object to delete it from the database. 
Finally, it sends a response with the message 'Success' to indicate that the delete operation 
was successful.
*/
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await db.Todo.findByPk(id);
  await todo.destroy();
  res.send('Success');
});

module.exports = router;





