import Task from "../model/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate("user_id");
    return res.status(200).send(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const createtask = async (req, res) => {
  try {
    const { title, description, status, due_date, priority } = req.body;
    const user_id = req.user._id;

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
    const { task_id } = req.params;
    const user_id = req.user._id;
    const { title, description, status, due_date, priority } = req.body;
    const task = await Task.findById(task_id);
    if (!task) return res.status(400).json({ error: "no such task available" });

    task.title = title;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.due_date = due_date;
    task.user_id = user_id;
 
    await task.save();

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
    const { task_id } = req.params;
    await Task.deleteOne({ _id: task_id });

    return res.status(200).json({ msg: "delted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
