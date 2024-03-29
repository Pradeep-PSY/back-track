
const { Router } = require("express");
const TaskModel = require("../Model/TaskModel");
const authentication = require("../Middleware/Authentication");
const taskController = Router();

taskController.post("/create",authentication, async (req, res) => {
    const {task_name,userId,task_details,task_completed,sub_task} = req.body;
    // console.log(userId)
    const task = new TaskModel({task_name,task_details,task_completed,sub_task,userId});
    // console.log(task);
    await task.save();
    res.send(task)
})

taskController.get("/",authentication, async (req, res)=>{
    const {userId} = req.body;
    const task = await TaskModel.find({userId});
    console.log(task);
    res.send(task)
})

module.exports=taskController;