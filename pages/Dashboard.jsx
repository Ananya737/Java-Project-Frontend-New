// Dashboard.jsx
import { useEffect, useState } from 'react';
import "../Css/AdminDashboard.css"
import API from './api';
import { useNavigate } from 'react-router-dom';
import {  Link } from 'react-router-dom'; 
function Dashboard() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  useEffect(() => {
    const token = localStorage.getItem('token');
    // const role = localStorage.getItem('role');

    if (!token) {
      navigate('/login'); // Not logged in, redirect to login
      return;
    }

    const fetchDashboard = async () => {
      try {
        let res;
        if (role === 'ROLE_ADMIN') {
          res = await API.get('/admin/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
          });
        } else if (role === 'ROLE_USER') {
          res = await API.get('/user/dashboard', {
            headers: { Authorization: `Bearer ${token}` }
          });
        }
        setMsg(res.data);
      } catch (err) {
        console.error(err);
        setMsg('Token invalid or expired');
        localStorage.clear();
        navigate('/login');
      }
    };

    fetchDashboard();
  }, []);

  return (
    <>
    <div  id='wholeAdminContainer'>
      <h2 id='adminDashboard'>Dashboard</h2>
      <p id='message' >{msg}</p>



      {role === 'ROLE_ADMIN' && (
        <div id='btnContainer'>
        <p className='link'>  <Link to="/product" >Add Product</Link> <br/></p>
        <p className='link'>  <Link to="/admin/orders">Manage Orders</Link></p>
        </div>
      )}

  

      <button onClick={() => {
        localStorage.clear();
        navigate('/login');
      }}
      className='logoutBtn'>Logout</button>
    </div>
    </>
  );
}

export default Dashboard;
