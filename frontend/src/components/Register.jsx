import React, { useState } from 'react';
import axios from 'axios';
import login from '../components/Login';
import "../components/login.css";

function Register() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user');

    const register = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register',
                { email, name, username, password, role });
            alert("Registeration successful");
        } catch (err) {
            alert(err?.response?.data?.message || "Registeration failed");
        }
    };
    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Register</h2>
                <input
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="role-group">
                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="user"
                            checked={role === "user"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        User
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="role"
                            value="admin"
                            checked={role === "admin"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                        Admin
                    </label>
                </div>
                <button onClick={register}>Register new user</button>
                <a href="/login">already have an account? Login</a>
            </div>
        </div>
    );
}
export default Register;