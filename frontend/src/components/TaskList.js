import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get('http://localhost:5000/tasks');
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const markAsComplete = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/tasks/${id}`, { status: 'completed' });
      setTasks(tasks.map(task => (task._id === id ? { ...task, status: 'completed' } : task)));
    } catch (error) {
      console.error('Failed to mark task as complete', error);
    }
  };

  return (
    <div className="container"> {/* Wrap content in container for Bootstrap spacing */}
      <div className="d-flex justify-content-between mb-3"> {/* Align title and link horizontally */}
        <h1>Tasks</h1>
        <Link to="/new" className="btn btn-primary">Create New Task</Link>
      </div>
      <ul className="list-group">  {/* Use Bootstrap's list-group for styling */}
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h2>{task.title}</h2>
              <p>Status: {task.status}</p>
              <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            </div>
            <div className="d-flex flex-column align-items-start"> {/* Group edit, mark as complete, and delete buttons */}
              {task.status === 'completed' ? (
                <span className="badge bg-success mb-2" style={{ fontSize: '16px' }}>Completed</span>
              ) : (
                <>
                  <Link to={`/edit/${task._id}`} className="btn btn-secondary mb-2 d-flex justify-content-between align-items-center" style={{ fontSize: '24px' }}>
                    <MdEdit />
                  </Link>
                  <button onClick={() => markAsComplete(task._id)} className="btn btn-success mb-2 d-flex justify-content-between align-items-center" style={{ fontSize: '24px' }}>
                    <IoMdDoneAll />
                  </button>
                  <button onClick={() => deleteTask(task._id)} className="btn btn-danger d-flex justify-content-between align-items-center" style={{ fontSize: '24px' }}>
                    <MdDelete />
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
