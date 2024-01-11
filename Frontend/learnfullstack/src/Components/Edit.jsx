import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [value, setValue] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8081/read/${id}`)
      .then(res => {
        setValue({
          name: res.data[0].name,
          email: res.data[0].email
        });
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`http://localhost:8081/edit/${id}`, value)
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
          <h2>Update</h2>

          <div className='mb-2'>
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder='enter the name'
              className='form-control'
              value={value.name || ''}
              onChange={e => setValue(prevState => ({ ...prevState, name: e.target.value }))}
            />
          </div>

          <div className='mb-2'>
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder='enter the email'
              className='form-control'
              value={value.email || ''}
              onChange={e => setValue(prevState => ({ ...prevState, email: e.target.value }))}
            />
          </div>

          <button className='btn btn-success' type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
