import React, {useEffect} from 'react';
import axios from 'axios';

function Admin() {
    useEffect(()=> {
        axios.get('http://localhost:5000/api/admin', {
            headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
    })
    .then(res => alert(res.data.message))
    .catch(err => alert(err.response.data.message || "Error fetching the dashboard"));
    }, []);

    return(
        <div>
            <h2>Admin Panel</h2>
            <p>Welcome to the admin Portal!</p>
        </div>
    );
}

export default Admin;