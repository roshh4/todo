import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';
console.log('hi');
const NoteList = () => {
    const [todos, setTodos] = useState([]);
    console.log('hi');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:3002/all');
                const todosData = await response.json();

                const formattedTodos = todosData.map(todo => ({
                    ...todo,
                    createdAt: new Date(todo.createdAt),
                    updatedAt: new Date(todo.updatedAt),
                }));

                setTodos(formattedTodos);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTodos();
    }, []);
    return (
        <div className="container">
          <div className="todos-container">
            {todos.map(todo => (
             <Link to={`/note/${todo._id}`} key={todo._id} className="todo-tile">
             <p>{todo.content.length >= 191 ? `${todo.content.slice(0, 191)}...` : todo.content}</p>
             <h2>{todo.title}</h2>
           </Link>
           
            ))}
          </div>
          <Link to='/'>
            <button className="hp">go to home page</button>
          </Link>
        </div>
      );
      
};

export default NoteList;