import './Class.css'
import React from 'react'
import { useEffect, useState } from 'react'
import { render } from '@testing-library/react'
import { Route, Routes } from "react-router-dom"
import Teacher from './Teacher'


function Class() {

  const [classlist, setClasslist] = useState([])
  useEffect(() => {
    const fetchData = async() =>{
      fetch('http://localhost:3000/class/all')
        .then(resp => resp.json())
        .then(data =>{
          setClasslist(data.classes)
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
            <th>Class ID</th>
            <th>Type</th>
            <th>Des</th>
            <th>Teacher</th>
            <th>Start</th>
            <th>Sessions</th>
          </thead>
          <tbody>
            {classlist.map((c) =>
              <tr>
                <td>{c.CID}</td>
                <td>{c.CType}</td>
                <td>{c.Des}</td>
                {/* <td>{c.TID}</td> */}
                <td>{getT(c.TID)}</td>
                {/* {(id) => {
                  var teacher
                  fetch('http://localhost:3000/user/' + id)
                    .then(resp => resp.json())
                    .then(data =>{
                      teacher = (data.user.FullName)
                    })
                  return <td>{teacher}</td>
                }} */}
                <td>{c.DateS.substr(0, 10)}</td>
                <td>{c.So_buoi}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='c3'>
        <button type='b1' >add</button>
      </div>
    </>
  );
}

var teacher
function getT(id){
  // var teacher = "cc"
  fetch('http://localhost:3000/user/' + id)
    .then(resp => resp.json())
    .then(data =>{
      teacher = (data.user.FullName)
    })
  return teacher
}

export default Class