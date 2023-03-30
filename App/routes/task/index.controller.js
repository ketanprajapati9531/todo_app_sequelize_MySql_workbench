
const Task = require('../../models/task');
const User = require('../../models/userModel');


   
// Assign a task to a user with a specific folder and file name
exports.createTask = async (req, res) => {
    try {
      const { taskName, taskDescription, userEmail, folderName, fileName, fileExtension } = req.body;
      console.log(req.body);
      // Find the user by their email
      const user = await User.findOne({
        where: {
          email: userEmail
        }
      });
  
      // Create a new task and associate it with the user
      const task = await Task.create({
        name: taskName,
        description: taskDescription
      });
  
      await user.addTask(task);
  
      // Create a new folder and associate it with the task
      const folder = await Folder.create({
        name: folderName
      });
  
      await task.setFolder(folder);
  
      // Create a new file and associate it with the folder and task
      const file = await File.create({
        name: fileName,
        extension: fileExtension
      });
  
      await folder.addFile(file);
      await task.addFile(file);
  
      res.status(201).json({ task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  