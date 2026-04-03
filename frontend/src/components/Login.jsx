import React, { useState } from 'react';
import axios from 'axios';
import "../components/login.css";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("user");

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login',
                { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('role', res.data.role);
            alert("Login successful");
            if (res.data.role == 'admin') {
                window.location = '/admin';

            } else {
                window.location = '/dashboard';
            }

        } catch (err) {
            alert(err.response.data.message || "Login failed");
        }
    };
    return (
        <div className="login-page">
            <div className="login-card">
                <a href="/register">Hit register if you dont have an account</a>
                <h2>Login</h2>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='password'
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

                <button onClick={login}>Login</button>
            </div>

        </div>
    );
}

export default Login;