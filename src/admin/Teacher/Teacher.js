import "./Teacher.css";
import React from 'react'
import { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom";
import AddNewTeacherCom from "./AddNewTeacherCom";

const token = localStorage.getItem("token")

export default function Teacher() {
  const [addNC, setAddNC] = useState(0)
  const [userlist, setUserlist] = useState([])
  useEffect(() => {
    const fetchData = async() =>{
      fetch('http://localhost:5000/user/teacher/all', {
        method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      })
        .then(resp => resp.json())
        .then(data =>{
          if (data.users)
            setUserlist(data.users)
        })
    }
    fetchData()
  }, [])

  return (
    <>
    <div className='c1'>
        <div></div>
        <button className='add-new-student' onClick={() => setAddNC(1)}>Add new teacher</button>
    </div>
      {addNC ? <AddNewTeacherCom setAddNC={setAddNC} /> : <></>}
    <div className='c2'>
      <table width="95%" cellPadding="3" className="tablelist">
        <thead>
          <tr>
            <th className="th_left">User ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Sex</th>
            <th>Birth Day</th>
            <th className="th_right">Address</th>
          </tr>
        </thead>
        <tbody>
          {userlist.map((c, index) =>
            <tr key={index}>
              <td>{c.ID}</td>
              <td>{c.FullName}</td>
              <td>{c.Email}</td>
              <td>{c.Sex}</td>
              <td>{c.Bdate.substr(0, 10)}</td>
              <td>{c.Address}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
  );
}
