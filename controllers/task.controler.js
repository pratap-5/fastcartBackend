import Task from "../model/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json({ tasks });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const createtask = async (req, res) => {
  try {
    const { title, description, status, due_date, priority } = req.body;
    const user_id = req.User;

    const newTask = new Task({
      title,
      description,
      status,
      due_date,
      priority,
      user_id,
    });

    if (newTask) {
      await newTask.save();
      return res.status(200).json({
        title,
        description,
        status,
        due_date,
        priority,
        user_id,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
export const updateTask = async (req, res) => {
  try {
    const taskId = req.params;
    const user_id = req.User;
    const { title, description, status, due_date, priority } = req.body;
    const task = await Task.findById(taskId);
    if (!task) return res.status(400).json({ error: "no such task available" });

    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.due_date = due_date;
    task.user_id = user_id;

    return res.status(200).json({
      title: task.title,
      description: task.description,
      status: task.status,
      due_date: task.due_date,
      priority: task.priority,
      user_id: task.user_id,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};



export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params;
    await Task.deleteOne({ _id: taskId });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
