import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending', dueDate: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const res = await axios.get(`http://localhost:5000/tasks/${id}`);
        const fetchedTask = res.data;
        // Ensure the dueDate is in the correct format for the input field
        if (fetchedTask.dueDate) {
          fetchedTask.dueDate = new Date(fetchedTask.dueDate).toISOString().split('T')[0];
        }
        setTask(fetchedTask);
      };
      fetchTask();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/tasks/${id}`, task);
    } else {
      await axios.post('http://localhost:5000/tasks', task);
    }
    navigate('/');
  };

  return (
    <div className="container"> {/* Wrap form in container for Bootstrap spacing */}
      <h1>{id ? 'Edit Task' : 'New Task'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3"> {/* Add margin-bottom for spacing */}
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <select
            className="form-select"
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In-Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">Due Date:</label>
          <input
            type="date"
            className="form-control"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
