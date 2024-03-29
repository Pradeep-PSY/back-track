const { Router } = require("express");
const ProfessionalModel = require("../Model/ProfessionalModel");
const authentication = require("../Middleware/Authentication");
const professionalController = Router();

professionalController.post("/create",authentication, async (req, res) => {
  const { task_name,userId, task_details, task_completed, sub_task } = req.body;
  // console.log(userId)
  const task = new ProfessionalModel({
    task_name,
    task_details,
    task_completed,
    sub_task,
    userId,
  });
  console.log(task);
  await task.save();
  res.send(task);
});

professionalController.get("/",authentication, async (req, res) => {
  const {userId} = req.body;
  const task = await ProfessionalModel.find({ userId });
  console.log(task);
  res.send(task);
});

professionalController.patch("/:taskId/update",authentication,async (req, res)=>{
    const { taskId } = req.params;
    const {userId} = req.body;
    const task = await ProfessionalModel.findOneAndUpdate(
      { _id: taskId,userId },
      req.body,
      { new: true }
    );
  
    return res.send({  task });
})

professionalController.delete("/:taskId/delete",authentication,async (req, res)=>{
    const { taskId } = req.params; 
    const {userId} = req.body;
  await ProfessionalModel.findOneAndDelete({ _id: taskId,userId });
  return res.send({ taskId});
})

module.exports = professionalController;
