const Todo = require('../../models/todo');

exports.addedTodo = (req, res) => {
           console.log(req.body ,"this is added todo");
    const { title, description , due_date , user_id } = req.body;
   
   
   Todo.create({ title, description , due_date , user_id })
   
      .then((todo) => {
         res.status(201).json(todo);
       })
   
       .catch((err) => {
         console.error(err);
         res.status(500).json({ error: 'error in add todo' });
       });
   };
   
   
   
   