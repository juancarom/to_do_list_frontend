import React, { useState } from 'react';

interface AddTaskProps {
    onAdd: (title: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
    const [title, setTitle] = useState('');

    const handleAdd = () => {
        if (title.trim()) {
            onAdd(title);
            setTitle('');
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Nueva tarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button onClick={handleAdd}>Agregar</button>
        </div>
    );
};

export default AddTask;