import "./Student.css";
import React from 'react'
import { useEffect, useState } from 'react'

const token = localStorage.getItem("token")

export default function Student() {

  const [studentList, setStudentList] = useState([])
  const [studentListFix, setStudentListFix] = useState([])

  const handleFilterSex = (value) => {
    if (value === 'All'){
      setStudentListFix(studentList)
    } else {
      var temp = []
      for (var i = 0; i < studentList.length; i++) {
        if (studentList[i].Sex === value) {
          temp.push(studentList[i]);
        }
      }
      setStudentListFix(temp)
    }
  }

  const handleFilterType = (value) => {
    if (value === 'All'){
      setStudentListFix(studentList)
    } else {
      var temp = []
      for (var i = 0; i < studentList.length; i++) {
        if (studentList[i].Class.search(value) != -1) {
          temp.push(studentList[i]);
        }
      }
      setStudentListFix(temp)
    }
  }

  const fetchData = async() =>{
    let res = await fetch('http://localhost:5000/student/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson = await res.json();
    resjson = resjson.students;
    
    var resfix = []

    for(let i = 0; i < resjson.length; i++){
      var ofClass = ""
      try {
        let tn = await fetch('http://localhost:5000/student/class/' + resjson[i].ID, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        })
        if (!tn.ok){
          throw new Error('Students not in any class');
        }
        let tnjson = await tn.json();
        tnjson = tnjson.students
        for(let j = 0; j < tnjson.length; j++){
          ofClass = ofClass + ' ' + tnjson[j].CType
        }
      } catch (error) {
        console.error('Fetch API error:', error);
      }

      resfix.push({
        'ID': resjson[i].ID,
        'FullName': resjson[i].FullName,
        'Email': resjson[i].Email,
        'Sex': resjson[i].Sex,
        'Bdate': resjson[i].Bdate,
        'Address': resjson[i].Address,
        'Class': ofClass
      })
    }
    
    setStudentList(resfix)
    setStudentListFix(resfix)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div className='c1'>
        <div>
          <label style={{marginRight:'15px'}}>Sex:</label>
          <select className='filterbox' defaultValue={'0A'} onChange={(e) => handleFilterSex(e.target.value)}>
            <option value = 'All'>All</option>
            <option value = 'M'>Male</option>
            <option value = 'F'>Female</option>
          </select>
          <label style={{marginRight:'15px', marginLeft:'30px'}}>Class:</label>
          <select className='filterbox' defaultValue={'0A'} onChange={(e) => handleFilterType(e.target.value)}>
            <option value = 'All'>All</option>
            <option value = '1A'>1A</option>
            <option value = '2A'>2A</option>
            <option value = '3A'>3A</option>
            <option value = '4A'>4A</option>
          </select>
        </div>
        {/* <NavLink to="/admin/class/addclass" ><button type='b1' >Add</button></NavLink> */}
      </div>
      <div className='c2'>
        <table width="95%" cellPadding="3" className="tablelist">
          <thead>
            <tr>
              <th className="th_left">Student ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Sex</th>
              <th>Birth Day</th>
              <th>Address</th>
              <th className="th_right">Class</th>
            </tr>
          </thead>
          <tbody>
            {studentListFix.map((c, index) =>
              <tr key={index}>
                <td>{c.ID}</td>
                <td>{c.FullName}</td>
                <td>{c.Email}</td>
                <td>{c.Sex}</td>
                <td>{c.Bdate.substr(0, 10)}</td>
                <td>{c.Address}</td>
                <td>{c.Class}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
  </>
  );
}