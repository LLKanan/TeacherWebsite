import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import TableComponent from '../components/TableComponent';
import '../components/css/main.css';
import { useAccessToken } from '../components/js/main';

const Teachers = () => {
  const { accessToken } = useAccessToken();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div>
      <div className='topnav'>
        <a href='/teachers/'>Student Information</a>
        <a href='/teachers/addStudent'>Add Student</a>
        <a href='/teachers/deleteStudent'>Delete Student</a>
        <div className='userWidget'>
          <span>Logged in as: {username}</span>
        </div>
      </div>
      <div>
        <TableComponent />
      </div>
      <Outlet />
    </div>
  );
}

export default Teachers;
