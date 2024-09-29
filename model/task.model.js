import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
    },
    due_date: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_table",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("tasks", taskSchema);

export default Task;
