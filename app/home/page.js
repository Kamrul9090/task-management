"use client"

import { useEffect, useState } from "react";
import ShowTask from "../task/showTask";

const Page = () => {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'To Do'
    });

    // Load tasks from local storage on initial render
    useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            setTaskList(JSON.parse(storedTasks));
        }
    }, []);

    // Update local storage whenever taskList changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskList));
    }, [taskList]);

    // Add a new task
    const addTask = () => {
        if (newTask.title.trim() !== '') {
            setTaskList([...taskList, newTask]);
            setNewTask({
                title: '',
                description: '',
                status: 'To Do'
            });
        }
    };

    // Edit an existing task
    const editTask = (index, updatedTask) => {
        const updatedTasks = [...taskList];
        updatedTasks[index] = updatedTask;
        setTaskList(updatedTasks);
    };

    // Delete a task
    const deleteTask = (index) => {
        const updatedTasks = [...taskList];
        updatedTasks.splice(index, 1);
        setTaskList(updatedTasks);
    };

    return (
        <div>
            <div className="text-center">
                <h1>Task Manager</h1>
                <h2>Add a new task:</h2>
            </div>
            <div className="flex flex-col w-80 space-y-5 text-black">
                <input
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                    }
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                    }
                ></textarea>
                <select
                    className="text-black"
                    value={newTask.status}
                    onChange={(e) =>
                        setNewTask({ ...newTask, status: e.target.value })
                    }
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <button onClick={addTask}>Add Task</button>
            </div>
            <h2>Task List:</h2>
            {taskList.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {taskList.map((task, index) => (
                        <li key={index}>
                            <input
                                type="text"
                                value={task.title}
                                onChange={(e) =>
                                    editTask(index, { ...task, title: e.target.value })
                                }
                            />
                            <textarea
                                value={task.description}
                                onChange={(e) =>
                                    editTask(index, { ...task, description: e.target.value })
                                }
                            ></textarea>
                            <select
                                value={task.status}
                                onChange={(e) =>
                                    editTask(index, { ...task, status: e.target.value })
                                }
                            >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                            <button onClick={() => deleteTask(index)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Page;