const { Router } = require("express");
const NotesModel = require("../Model/NotesModel");
const authentication = require("../Middleware/Authentication");
const notesController = Router();

notesController.post("/create",authentication, async (req, res) => {
  const { note,userId } = req.body;
  // console.log(userId)
  const task = new NotesModel({
    note,
    userId,
  });
  //   console.log(task);
  await task.save();
  res.send(task);
});


notesController.get("/",authentication, async (req, res) => {
  const {userId} = req.body;
  const task = await NotesModel.find({ userId });
  //   console.log(task);
  res.send(task);
});

notesController.patch("/:noteId/update",authentication, async (req, res) => {
  const { noteId } = req.params;
  const {userId} = req.body;
  const task = await NotesModel.findOneAndUpdate(
    { _id: noteId, userId },
    req.body,
    { new: true }
  );

  return res.send({ message: "successfully updated", task });
});

notesController.delete("/:noteId/delete",authentication, async (req, res) => {
  const { noteId } = req.params;
  const {userId} = req.body;
  await NotesModel.findOneAndDelete({ _id: noteId, userId });
  return res.send({ noteId }); 
});

module.exports = notesController;
