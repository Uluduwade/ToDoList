const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    task: { type: String, required: true },
    completed: { type: Boolean, default: false },
    description: { type: String, default: "" },
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
});
const TodoModel=mongoose.model('Todo', todoSchema);
module.exports=TodoModel;