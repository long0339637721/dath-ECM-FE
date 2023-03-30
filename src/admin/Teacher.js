import "./Teacher.css";
import React from 'react'
import { useEffect, useState } from 'react'

export default function Teacher() {

  const [userlist, setUserlist] = useState([])
  useEffect(() => {
    const fetchData = async() =>{
      fetch('http://localhost:3000/user/all')
        .then(resp => resp.json())
        .then(data =>{
          setUserlist(data.users)
        })
    }
    fetchData()
  }, [])

  return (
    <>
    <div className='c1'>filter</div>
    <div className='c2'>
      <table width="95%" cellpadding="3" >
        <thead>
          <th>User ID</th>
          <th>Full Name</th>
          <th>Email</th>
          <th>Sex</th>
          <th>Birth Day</th>
          <th>Address</th>
        </thead>
        <tbody>
          {userlist.map((c) =>
            <tr>
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
    <div className='c3'>
      <button type='b1' >add</button>
      <button type='b1' >change pass</button>
    </div>
  </>
  );
}