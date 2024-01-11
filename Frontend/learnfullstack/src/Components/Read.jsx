import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Read() {
    const { id } = useParams();
    const [student, setStudent] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/read/${id}`)
            .then(res => {
                console.log(res);
                setStudent(res.data[0]);
            })
            .catch(err => console.log(err));
    }, [id]);

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
        
                    <h2>Student Details</h2>
                        <div className='mb-2'>
                                ID: {student.id}
                        </div>

                        <div className='mb-2'>
                                Name: {student.name}
                        </div>

                        <div className='mb-2'>
                                Email: {student.email}
                        </div>

                <Link to="/" className='btn btn-sm btn-primary mx-2'>Back</Link>
                <Link to={`/edit/${student.id}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
            </div>
        </div>
    );
}

export default Read;
