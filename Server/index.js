require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("Failed to connect", err));


app.get('/api/tasks', (req, res) => { 
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.status(500).json(err));
});


app.post('/api/tasks', (req, res) => {
    const { task, description = '' } = req.body;

    if (!task || task.trim() === '') {
        return res.status(400).json({ message: 'Task name is required.' });
    }

    TodoModel.create({
        task: task.trim(),
        description: description.trim(),
    })
        .then(result => res.status(201).json(result))
        .catch(err => res.status(500).json(err));
});

app.put('/api/tasks/update/:id', (req, res) => {
    const { id } = req.params;
    const { task, description, completed } = req.body;
    const updates = { updatedAt: new Date() };

    if (typeof task === 'string') {
        if (task.trim() === '') {
            return res.status(400).json({ message: 'Task name cannot be empty.' });
        }

        updates.task = task.trim();
    }

    if (typeof description === 'string') {
        updates.description = description.trim();
    }

    if (typeof completed === 'boolean') {
        updates.completed = completed;
    }

    TodoModel.findByIdAndUpdate(id, updates, { new: true, runValidators: true })
        .then(result => {
            if (!result) {
                return res.status(404).json({ message: 'Task not found.' });
            }

            return res.json(result);
        })
        .catch(err => res.status(500).json(err));
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

app.delete('/api/tasks/:id', (req, res) => {
    const { id } = req.params;
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => console.error("Failed to delete task", err));
});
