import React, { useState } from 'react';
import TodoApp from './components/Todo/TodoApp';
import UserForm from './components/Forms/UserForm';
import MultiProgressBar from './components/Progress/MultiProgressBar';
import CountdownTimer from './components/Timer/CountdownTimer';
import SearchList from './components/Search/SearchList';

function App() {
  const [activeTab, setActiveTab] = useState(1);

  const renderTask = () => {
    switch(activeTab) {
      case 1: return <TodoApp />;
      case 2: return <UserForm />;
      case 3: return <MultiProgressBar />;
      case 4: return <CountdownTimer />;
      case 5: return <SearchList />;
      default: return <TodoApp />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
           <h1 >Assingment Dashboard</h1>
           <p className="text-slate-500 mt-2">React Internship Tasks 1-5</p>
        </header>
        
        <nav className="flex flex-wrap justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map(num => (
            <button
              key={num}
              onClick={() => setActiveTab(num)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeTab === num 
                  ? 'bg-blue-600 text-white shadow-md scale-105' 
                  : 'bg-white text-slate-600 hover:bg-slate-200'
              }`}
            >
              Task {num}
            </button>
          ))}
        </nav>

        <main className="transition-all duration-300 ease-in-out">
          {renderTask()}
        </main>
      </div>
    </div>
  );
}

export default App;