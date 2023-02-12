const { Router } = require("express");
const OthersModel = require("../Model/OthersModel");
const authentication = require("../Middleware/Authentication");
const othersController = Router();

othersController.post("/create",authentication, async (req, res) => {
  const { task_name,userId, task_details, task_completed, sub_task } = req.body;
  
  // console.log(userId)
  const task = new OthersModel({
    task_name,
    task_details,
    task_completed,
    sub_task,
    userId,
  });
  //   console.log(task);
  await task.save();
  res.send(task);
});

othersController.get("/",authentication, async (req, res) => {
  const {userId} = req.body;
  const task = await OthersModel.find({ userId });
  //   console.log(task);
  res.send(task);
});

othersController.patch("/:taskId/update",authentication, async (req, res) => {
  const { taskId } = req.params;
  const {userId} = req.body;
  const task = await OthersModel.findOneAndUpdate(
    { _id: taskId, userId },
    req.body,
    { new: true }
  );

  return res.send({ message: "successfully updated", task });
});

othersController.delete("/:taskId/delete",authentication, async (req, res) => {
  const { taskId } = req.params;
  const {userId} = req.body;
  await OthersModel.findOneAndDelete({ _id: taskId, userId });
  return res.send({ taskId }); 
});

module.exports = othersController;
