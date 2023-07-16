'use client'
import { useEffect, useState } from "react";
import ShowTask from "./showTask";

const Task = () => {
    const [taskList, setTaskList] = useState([]);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'To Do',
    });


    // Update local storage whenever taskList changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(taskList))
    }, [taskList]);


    // load task list from localStorage
    useEffect(() => {
        const storedTaskList = localStorage.getItem('tasks');
        if (storedTaskList) {
            setTaskList(JSON.parse(storedTaskList))
        }
    }, []);

    // add a new Task
    const addTask = () => {
        setTaskList([...taskList, newTask]);
        setNewTask({
            title: '',
            description: '',
            status: 'To Do',
        });

    }
    // remove task list
    const deleteTask = (index) => {
        const filter = taskList.filter((element, i) => i !== index);
        setTaskList(filter)
    }

    // const deleteTask = (index) => {
    //     const filter = taskList.splice(index, 1);
    //     setTaskList(filter);
    // }

    const editTask = (i) => {
        const findEditTask = taskList.find((element, index) => index === i);
        const filter = taskList.filter((element) => element !== findEditTask);
        console.log(filter);
        if (findEditTask) {
            setNewTask({
                title: findEditTask.title,
                description: findEditTask.description,
                status: findEditTask.status
            })
            setTaskList([...filter]);
        }

    }

    // Edit an existing task
    // const editTask = (index, updatedTask) => {
    //     const updatedTasks = [...taskList];
    //     updatedTasks[index] = updatedTask;
    //     setTaskList(updatedTasks);
    //     setEditIndex(-1);
    // };


    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center py-5">Task Management</h1>
            <div>
                <h1 className="font-semibold text-red-800 text-center">Add A Task</h1>
                <div className="flex justify-between">
                    <input
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} type="text" placeholder="title" className="w-80 h-auto outline-none border-2 border-red-400 px-5 rounded-md" />
                    <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} className="w-80 h-auto outline-none border-2 border-red-400 px-5 rounded-md" placeholder="description"></textarea>
                    <select className="outline-none border-2 border-red-400 px-5 rounded-md font-bold"
                        value={newTask.status}
                        onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                    >
                        <option value="to-do">To Do</option>
                        <option value="progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <button onClick={addTask} className="bg-red-800 text-white p-2 rounded-md font-bold">Add Task</button>
                </div>
            </div>

            <div>
                <div>
                    <ShowTask taskList={taskList} deleteTask={deleteTask} editTask={editTask}></ShowTask>
                </div>
            </div>
        </div>
    );
};

export default Task;