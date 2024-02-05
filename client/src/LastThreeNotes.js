// TilesContainer.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TilesContainer = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('http://localhost:3002/three');
        const todosData = await response.json();

        const formattedTodos = todosData.map(todo => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
        }));

        const recentThreeTodos = formattedTodos.slice(0, 3);
        setTodos(recentThreeTodos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div>
    <div class= "recents" ><p>Recent Notes</p></div>
    <div className="Page1cont">
      {todos.map(todo => (
        <Link to={`/note/${todo._id}`} key={todo._id} className="hometile">
          <p>{`${todo.content.split('').slice(0, 37).join("")}...`}</p>
          <h2>{todo.title}</h2>
          {/* <p>Last Updated At: {new Date(todo.updatedAt).toLocaleString()}</p> */}
        </Link>
      ))}
      
    <div><Link to="/note_list"><button class="view_all">view all</button></Link></div>
    </div>
    </div>
  );
};
export default TilesContainer;
