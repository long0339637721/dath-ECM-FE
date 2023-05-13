import './Class.css'
import {useState, useEffect, React} from 'react';
import { NavLink } from "react-router-dom";

const token = localStorage.getItem("token")
const myID = localStorage.getItem("id");
const role = localStorage.getItem("role")

const Class = () => {

  const [classlist, setClasslist] = useState([]);
  const [classlistFix, setClasslistFix] = useState([]);
  const [teacherList, setTeacherList] = useState([]);

  const handleFilterType = (value) => {
    if (value === '0A'){
      setClasslistFix(classlist)
    } else {
      var temp = []
      for (var i = 0; i < classlist.length; i++) {
        if (classlist[i].CType === value) {
          temp.push(classlist[i]);
        }
      }
      setClasslistFix(temp)
    }
  }

  const handleFilterTeacher = (value) => {
    if (value === 'All'){
      setClasslistFix(classlist)
    } else {
      var temp = []
      for (var i = 0; i < classlist.length; i++) {
        if (classlist[i].TN === value) {
          temp.push(classlist[i]);
        }
      }
      setClasslistFix(temp)
    }
  }
  
  const fetchData = async () => {
    let res = await fetch('http://localhost:5000/class/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson = await res.json();
    resjson = resjson.classes;

    var resfix = []
    for(let i = 0; i < resjson.length; i++){
      if (role === "Teacher"){
        if (resjson[i].TID != myID){
          continue
        }
      }

      var teachername = 'null';
      let tn = await fetch('http://localhost:5000/user/' + resjson[i].TID, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      })
      let tnjson = await tn.json();
      teachername = tnjson.user.FullName;
      resfix.push({
        'CID': resjson[i].CID,
        'CType': resjson[i].CType,
        'Des': resjson[i].Des,
        'TN': teachername,
        'DateS': resjson[i].DateS,
        'So_buoi': resjson[i].So_buoi
      })
    }
    setClasslist(resfix)
    setClasslistFix(resfix)

    // fetch teacher list-----------------------------------
    let res1 = await fetch('http://localhost:5000/user/teacher/all', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson1 = await res1.json();
    resjson1 = resjson1.users;
    var resfix1 = []
    for(let i = 0; i < resjson1.length; i++){
      resfix1.push({
        'TID': resjson1[i].TID,
        'FN': resjson1[i].FullName
      })
    }
    setTeacherList(resfix1)
  }

  useEffect (()=>{
    fetchData();
  },[]);

  return (
    <>
      <div className='c1'>
        <div>
          <label style={{marginRight:'15px'}}>Class Type:</label>
          <select className='filterbox' defaultValue={'0A'} onChange={(e) => handleFilterType(e.target.value)}>
            <option value = '0A'>All</option>
            <option value = '1A'>1A</option>
            <option value = '2A'>2A</option>
            <option value = '3A'>3A</option>
            <option value = '4A'>4A</option>
          </select>
          <label style={{marginRight:'15px', marginLeft:'30px'}}>Teacher:</label>
          <select className='filterbox' defaultValue={'All'}onChange={(e) => handleFilterTeacher(e.target.value)}>
            <option value = 'All'>All</option>
            {teacherList.map((c, index) => 
              <option id={index} value={c.FN}>{c.FN}</option>
            )}
          </select>
        </div>
        <NavLink to="/admin/class/addclass" ><button type='b1' >Add</button></NavLink>
      </div>
      <div className='c2'>
        <table width="95%" cellPadding="3" className="tablelist">
          <thead>
            <tr>
              <th className="th_left">Class ID</th>
              <th>Type</th>
              <th>Description</th>
              <th>Teacher</th>
              <th>Start</th>
              <th className="th_right">Sessions</th>
            </tr>
          </thead>
          <tbody>
            {classlistFix.map((c, index) =>
              <tr key={index}>
                <td className='tdhover'><NavLink to={"/"+role+"/infor/" + c.CID} style={{border:'0'}}>{c.CID}</NavLink></td>
                <td>{c.CType}</td>
                <td>{c.Des}</td>
                <td>{c.TN}</td>
                <td>{c.DateS.substr(0, 10)}</td>
                <td>{c.So_buoi}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Class