import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
  const [value, setValue] = useState({
    name: '',
    email: '',
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8081/student', value)
      .then(res => {
        console.log(res);
        navigate('/'); 
      })
      .catch(err => console.log(err));
  };
  

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        
        <form onSubmit={handleSubmit}>
          <h2>Add A Student</h2>

          <div className='mb-2'>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder='enter the name'
              className='form-control'
              onChange={e => setValue({ ...value, name: e.target.value })}  // Fix: Change 'oncChange' to 'onChange'
            />
          </div>

          <div className='mb-2'>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder='enter the email'
              className='form-control'
              onChange={e => setValue({ ...value, email: e.target.value })}  // Fix: Change 'oncChange' to 'onChange'
            />
          </div>

          <button className='btn btn-success' type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Create;
