import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../components/Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [user, setUser] = useState("user");
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const navigate = useNavigate();

    const token = localStorage.getItem('token');


    const headers = {
        Authorization: `Bearer ${token}`,
    };

    useEffect(() => {
        axios.get('https://backend-muf2.onrender.com/api/protected/dashboard', {
            headers: headers
        })
            .then(res => setUser(res.data.message))
            .catch(err => alert(err?.response?.data?.message || "Error fetching the dashboard"));
    }, []);

    useEffect(() => {
        axios.get('https://backend-muf2.onrender.com/api/protected/tasks', {
            headers: headers
        })
            .then(res => setTasks(res.data))
            .catch(err => alert(err?.response?.data?.message || "Error loading the tasks"));
    }, []);

    function addTask(e) {
        e.preventDefault();

        axios.post('https://backend-muf2.onrender.com/api/protected/tasks', { title }, { headers })
            .then(
                res => {
                    setTasks([...tasks, res.data]);
                    setTitle("");
                }
            )

            .catch(err =>
                alert(err?.response?.data?.message || "Error adding task")
            );

    }

    function updateTask(task) {
        const id = task._id
        axios.put(`https://backend-muf2.onrender.com/api/protected/tasks/${id}`,
            { status: task.status === "done" ? "pending" : "done" },
            { headers }
        ).then(res => {
            setTasks(tasks.map(t => t._id === id ? res.data : t));
        })
            .catch(err =>
                alert(err?.response?.data?.message || "Error updating task")
            );
    }

    function deleteTask(id) {

        axios
            .delete(`https://backend-muf2.onrender.com/api/protected/tasks/${id}`, { headers })
            .then(() => {
                setTasks(tasks.filter(t => t._id !== id));
            });

    }

    function saveEdit(id) {

        axios.put(
            `https://backend-muf2.onrender.com/api/protected/tasks/${id}`,
            { title: editTitle },
            { headers })
            .then(res => {
                setTasks(tasks.map(t => (t._id === id ? res.data : t)));
                setEditId(null);
                setEditTitle("");
            });

    }


    const completed = tasks.filter(t => t.status === "done").length;
    const pending = tasks.filter(t => t.status !== "done").length;

    function logout() {

        localStorage.removeItem("token");
        navigate("/login");
    }



    const styles = {
        form: {
            display: "flex",
            gap: "8px",
            marginBottom: "12px",
        },
        counter: {
            marginBottom: "10px",
            fontWeight: "bold",
        },
    };

    return (


        <div className="dashboard-page">
            <div className="dashboard">
                <div className="dashboard-header">
                    <h2>Dashboard</h2>
                    <button className="logout-btn" onClick={logout}>
                        Logout
                    </button>
                </div>

                <p> {user} </p>


                <div style={styles.counter}>
                    ✅ Done: {completed} | ⏳ Pending: {pending}
                </div>


                <form onSubmit={addTask} className="task-form" style={styles.form}>
                    <input
                        type="text"
                        placeholder="New task"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <button type="submit">Add Task</button>
                </form>

                <h3>Your Tasks</h3>

                <ul className="task-list">
                    {tasks.map(task => (
                        <li key={task._id} className="task-item">
                            {editId === task._id ? (
                                <>
                                    <input
                                        value={editTitle}
                                        onChange={e => setEditTitle(e.target.value)}
                                    />
                                    <div className="task-actions">
                                        <button
                                            className="btn-done"
                                            type="button"
                                            onClick={() => saveEdit(task._id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn-cancel"
                                            type="button"
                                            onClick={() => {
                                                setEditId(null);
                                                setEditTitle("");
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span
                                        className={`task-title ${task.status === "done" ? "task-done" : ""
                                            }`}
                                    >
                                        {task.title}
                                    </span>

                                    <div className="task-actions">
                                        <button
                                            className="btn-done"
                                            type="button"
                                            onClick={() => updateTask(task)}
                                        >
                                            {task.status === "done" ? "Undo" : "Done"}
                                        </button>

                                        <button
                                            className="btn-edit"
                                            type="button"
                                            onClick={() => {
                                                setEditId(task._id);
                                                setEditTitle(task.title);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn-delete"
                                            type="button"
                                            onClick={() => deleteTask(task._id)}
                                        >
                                            ✖
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

}

export default Dashboard;