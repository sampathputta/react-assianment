import React, { useState } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import TodoItem from './TodoItem';
import FilterControls from './FilterControls';

const TodoApp = () => {
  const [tasks, setTasks] = useLocalStorage('todo-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('all');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task = {
      id: Date.now(),
      text: newTask,
      completed: false,
      priority,
    };
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
      
      {/* Inline Form */}
      <form onSubmit={addTask} className="flex gap-2 mb-4">
        <input 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task..." 
          className="flex-1 p-2 border rounded focus:ring-2 ring-blue-500 outline-none"
        />
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)} 
          className="p-2 border rounded bg-white"
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">
          Add
        </button>
      </form>

      <FilterControls filter={filter} setFilter={setFilter} />

      <ul className="space-y-2">
        {filteredTasks.length > 0 ? (
          filteredTasks.map(task => (
            <TodoItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">No tasks found</p>
        )}
      </ul>
    </div>
  );
};

export default TodoApp;