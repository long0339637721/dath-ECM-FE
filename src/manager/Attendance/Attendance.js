import "./Attendance.css";
import {useState, useEffect, React} from 'react';
import { NavLink } from "react-router-dom";
import ReactDOM from 'react-dom';

function DtoS (ed) {
  var nextdate = String(ed.getFullYear()) + '-'
  if (Number(ed.getMonth()) < 9) {
    nextdate = nextdate + '0' + String(ed.getMonth() + 1) + '-'
  } else {
    nextdate = nextdate + String(ed.getMonth() + 1) + '-'
  }
  if (Number(ed.getDate()) < 10) {
    nextdate = nextdate + '0' + String(ed.getDate())
  } else {
    nextdate = nextdate + String(ed.getDate())
  }
  return nextdate
}

const foo = (str) => {
  var temp = new Date(str)
  return DtoS(temp)
}

const token = localStorage.getItem('token');
const myID = localStorage.getItem('id');
const toDate = new Date()

const Attendance = () => {

  const [lessonList, setLessonList] = useState([])

  const handleSubmit = async () => {
    var flag = false
    for (let i = 0; i <lessonList.length; i++) {
      flag = true
      if (lessonList[i].change === "1"){
        let res1 = await fetch('http://localhost:5000/lesson/' + lessonList[i].BID, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            'note': lessonList[i].note,
            'status': lessonList[i].status
          })
        });
        let res1json = await res1.json();
        console.log("update " + lessonList[i].BID + ": ", res1json)
      }
    }
    if (flag){
      alert("Attendance success")
      window.location.reload()
    }
  }

  const fetchData = async () => {
    
    let res1 = await fetch('http://localhost:5000/user/teacher/day/' + DtoS(toDate), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let res1json = await res1.json();
    res1json = res1json.users;
    var resfix = []
    for (var i = 0; i < res1json.length; i++) {
      if (true) {
        resfix.push({
          'TID': res1json[i].ID,
          'FullName': res1json[i].FullName,
          'BID': res1json[i].BID,
          'CID': res1json[i].CID,
          'CType': res1json[i].CType,
          'tbd': res1json[i].tiet_bat_dau,
          'room': res1json[i].Name,
          'status': res1json[i].status,
          'note': res1json[i].note,
          'change': "0"
        })
      }
    }
    setLessonList(resfix)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
  <>
    <div className='c1'>
      <div>
        <h3>Today's lessons</h3>
      </div>
      <div style={{marginRight:'20px'}}>
        <h6 style={{color:'blue'}}>{"Now: " + DtoS(new Date())}</h6>
      </div>
      {/* <NavLink to="/admin/class/addclass" ><button type='b1' >Add</button></NavLink> */}
    </div>
    <div className='c2'>
      <table width="95%" cellPadding="3" className="tablelist">
        <thead>
          <tr>
            <th className="th_left">Lesson ID</th>
            <th>Class ID</th>
            <th>Class Type</th>
            <th>Teacher</th>
            <th>Time frame</th>
            <th>Room</th>
            <th></th>
            <th className="th_right">Note</th>
          </tr>
        </thead>
        <tbody>
          {lessonList.map((c, index) =>
            <tr key={index}>
              <td className='tdhover'>
                <NavLink to={"/manager/attendanceStudent/" + c.CID + "/" + c.BID} style={{border:'0'}}>
                  {c.BID}
                </NavLink>
              </td>
              <td>{c.CID}</td>
              <td>{c.CType}</td>
              <td>{c.FullName}</td>
              <td>{(c.tbd + 5) + ":00 - " + (c.tbd + 6) + ":50"}</td>
              <td>{c.room}</td>
              <td>
                <select defaultValue={c.status} onChange={(e)=>{c.status = e.target.value; c.change = "1"}}>
                  <option value="N" disabled="disabled">--</option>
                  <option value="V">Vắng</option>
                  <option value="T">Trễ</option>
                  <option value="C">Có mặt</option>
                </select></td>
              <td>
                <input type="text" defaultValue={c.note} onChange={(e) => {c.note = e.target.value; c.change = "1"}}></input>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    <div className="c4" style={{marginTop:'15px'}}>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  </>
  )

}

export default Attendance;