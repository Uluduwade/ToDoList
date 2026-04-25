import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    LuArrowDown,
    LuArrowUp,
    LuFileText,
    LuListTodo,
    LuPencil,
    LuSave,
    LuTrash2,
    LuX,
} from 'react-icons/lu';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editTask, setEditTask] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const apiBaseUrl = 'http://localhost:5000/api/tasks';

    useEffect(() => {
        axios.get(apiBaseUrl)
            .then(result => setTasks(result.data))
            .catch(err => console.log(err));
    }, [apiBaseUrl]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function handleDescriptionChange(event) {
        setNewDescription(event.target.value);
    }

    const handleAdd = () => {
        if (newTask.trim() !== '') {
            axios.post(apiBaseUrl, { task: newTask, description: newDescription })
            .then(result => {
                setTasks(t => [...t, result.data]);
                setNewTask('');
                setNewDescription('');
            })
            .catch(err => console.log(err));
        }
    };

    const startEdit = (task) => {
        setEditingTaskId(task._id);
        setEditTask(task.task);
        setEditDescription(task.description || '');
    };

    const cancelEdit = () => {
        setEditingTaskId(null);
        setEditTask('');
        setEditDescription('');
    };

    const saveEdit = (id) => {
        if (editTask.trim() === '') {
            return;
        }

        axios.put(`${apiBaseUrl}/update/${id}`, {
            task: editTask,
            description: editDescription,
        })
        .then(result => {
            setTasks(currentTasks =>
                currentTasks.map(task => (task._id === id ? result.data : task))
            );
            cancelEdit();
        })
        .catch(err => console.log(err));
    };

    const toggleComplete = (task) => {
        axios.put(`${apiBaseUrl}/update/${task._id}`, {
            completed: !task.completed,
        })
        .then(result => {
            setTasks(currentTasks =>
                currentTasks.map(currentTask =>
                    currentTask._id === task._id ? result.data : currentTask
                )
            );
        })
        .catch(err => console.log(err));
    };

    const deleteTask = (id) => {
        axios.delete(`${apiBaseUrl}/${id}`)
        .catch(err => console.log(err));

        const updatedTasks = tasks.filter(task => task._id !== id);
        setTasks(updatedTasks);
    };

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
            [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
            [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    return(
       <div className='to-do-list'>
        
        <h1>To-Do List</h1>
        <div className='add-task-form'>
            <div className='tg-input-group'>
                <label className='tg-input-label' htmlFor='task-name'>
                    Task Name
                </label>
                <div className='tg-input-wrap'>
                    <span className='tg-input-icon'>
                        <LuListTodo />
                    </span>
                    <input
                        id='task-name'
                        className='tg-input'
                        type='text'
                        placeholder='Enter task name'
                        value={newTask}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className='tg-input-group'>
                <label className='tg-input-label' htmlFor='task-description'>
                    Description
                </label>
                <div className='tg-input-wrap'>
                    <span className='tg-input-icon'>
                        <LuFileText />
                    </span>
                    <input
                        id='task-description'
                        className='tg-input'
                        type='text'
                        placeholder='Enter description (optional)'
                        value={newDescription}
                        onChange={handleDescriptionChange}
                    />
                </div>
            </div>
            <button className='add-button' onClick={handleAdd}>
                Add Task
            </button>
        </div>
        <ol>
            
            {tasks.map((todoItem, index) => (
                <li
                    key={todoItem._id}
                    className={`todo-item ${todoItem.completed ? 'completed' : ''}`}
                >
                    <input
                        type='checkbox'
                        checked={todoItem.completed}
                        onChange={() => toggleComplete(todoItem)}
                        aria-label={`Mark ${todoItem.task} as completed`}
                    />

                    {editingTaskId === todoItem._id ? (
                        <div className='edit-fields'>
                            <input
                                type='text'
                                value={editTask}
                                onChange={event => setEditTask(event.target.value)}
                                placeholder='Task name'
                            />
                            <input
                                type='text'
                                value={editDescription}
                                onChange={event => setEditDescription(event.target.value)}
                                placeholder='Description'
                            />
                        </div>
                    ) : (
                        <div className='task-content'>
                            <span className='task-title'>{todoItem.task}</span>
                            {todoItem.description ? (
                                <span className='task-description'>{todoItem.description}</span>
                            ) : null}
                        </div>
                    )}

                    <div className='task-actions'>
                        {editingTaskId === todoItem._id ? (
                            <>
                                <button
                                    className='edit-button'
                                    onClick={() => saveEdit(todoItem._id)}
                                >
                                    <LuSave /> Save
                                </button>
                                <button className='cancel-button' onClick={cancelEdit}>
                                    <LuX /> Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                className='edit-button'
                                onClick={() => startEdit(todoItem)}
                            >
                                <LuPencil /> Edit
                            </button>
                        )}

                        <button
                            className='move-button'
                            onClick={() => moveTaskUp(index)}
                            title='Move Up'
                        >
                            <LuArrowUp /> Up
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskDown(index)}
                            title='Move Down'
                        >
                            <LuArrowDown /> Down
                        </button>
                        <button
                            className='del-button'
                            onClick={() => deleteTask(todoItem._id)}
                        >
                            <LuTrash2 /> Delete
                        </button>
                    </div>
                </li>
            ))}
        </ol>
       </div>
    )
}

export default ToDoList;
