import React from 'react';
import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ task, onToggle, onDelete }) => {
  const priorityColors = {
    High: 'text-red-500',
    Medium: 'text-yellow-500',
    Low: 'text-green-500',
  };

  return (
    <li className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 transition-all">
      <div 
        className="flex items-center gap-3 cursor-pointer flex-1" 
        onClick={() => onToggle(task.id)}
      >
        {task.completed ? (
          <CheckCircle className="text-green-500" size={20} />
        ) : (
          <Circle className="text-gray-400" size={20} />
        )}
        
        <div className={task.completed ? "line-through text-gray-400" : ""}>
          <p className="font-medium">{task.text}</p>
          <span className={`text-xs font-semibold ${priorityColors[task.priority]}`}>
            {task.priority} Priority
          </span>
        </div>
      </div>
      
      <button 
        onClick={() => onDelete(task.id)} 
        className="text-gray-400 hover:text-red-600 transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </li>
  );
};

export default TodoItem;