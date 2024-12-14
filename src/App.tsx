import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import './index.css';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

const App: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/tasks').then((response) => {
            setTasks(response.data as Task[]);
        });
    }, []);

    const addTask = (title: string) => {
        axios.post('http://localhost:3000/api/tasks', { title }).then((response) => {
            setTasks([...tasks, response.data as Task]);
        });
    };

    const toggleTask = (id: number) => {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            axios.put(`http://localhost:3000/api/tasks/${id}`, { completed: !task.completed }).then(() => {
                setTasks(
                    tasks.map((t) =>
                        t.id === id ? { ...t, completed: !t.completed } : t
                    )
                );
            });
        }
    };

    const deleteTask = (id: number) => {
        axios.delete(`http://localhost:3000/api/tasks/${id}`).then(() => {
            setTasks(tasks.filter((t) => t.id !== id));
        });
    };

    return (
        <div className="container">
            <h1>Lista de Tareas</h1>
            <AddTask onAdd={addTask} />
            <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
        </div>
    );
};

export default App;
