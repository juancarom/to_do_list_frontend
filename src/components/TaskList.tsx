import React from 'react';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

interface TaskListProps {
    tasks: Task[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id} style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => onToggle(task.id)}
                        style={{ marginRight: '10px' }}
                    />
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none', flexGrow: 1 }}>
                        {task.title}
                    </span>
                    <button onClick={() => onDelete(task.id)}>Eliminar</button>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
