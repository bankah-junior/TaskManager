import {  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TodoForm from './pages/TodoForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo-form" element={<TodoForm />} />
      </Routes>
    </Router>
  );
}

export default App;