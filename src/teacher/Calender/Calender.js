import './Calender.css';
import React from 'react'
import { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from 'moment'
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import { NavLink } from 'react-router-dom';
import "react-big-calendar/lib/css/react-big-calendar.css";

ReactModal.setAppElement('#root');

const localizer = momentLocalizer(moment);

const token = localStorage.getItem("token")
const myID = localStorage.getItem("id")

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


function Calender() {
  
  const [teacherlist, setTeacherlist] = useState([])
  const [roomlist, setRoomlist] = useState([])

  const [lessonID, setLessonID] = useState()
  const [tid, setTid] = useState('null')
  const [rid1, setRid1] = useState(0)
  const [lessonS1 , setLessonS1] = useState(new Date())
  const [tbd, setTbd] = useState(0)
  
  const [userlist, setUserlist] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('null')

  const handleRegister = async () => {
    if (rid1 === 0) {
      alert('Please select teacher')
    } else if (tbd < 2) {
      alert('Start at: Invalid value')
    } else {
      var addLesson = {
        "ID": lessonID,
        "CID": selectedEvent.CID,
        "RID": rid1,
        "TID": myID,
        "MID": selectedEvent.MID,
        "Ngay": DtoS(lessonS1),
        "tiet_bat_dau": tbd,
        "so_tiet": "2",
        "ID_bu": selectedEvent.ID
      }
      console.log("data: ", addLesson)
      let reply = await fetch('http://localhost:5000/lesson/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(addLesson)
      })
      reply = await reply.json()
      console.log("Add lesson: " + reply.message)
      alert(reply.message)
      window.location.reload()
    }
  }

  const fetchData = async () => {
    
    // fetch teacher list-----------------------------------
    let res1 = await fetch('http://localhost:5000/user/teacher/all', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let res1json = await res1.json();
    res1json = res1json.users;
    var res1fix = []
    for(let i = 0; i < res1json.length; i++){
      res1fix.push({
        'TID': res1json[i].TID,
        'FN': res1json[i].FullName
      })
    }
    setTeacherlist(res1fix)

    // fetch room list-----------------------------------
    let res4 = await fetch('http://localhost:5000/room/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson4 = await res4.json();
    resjson4 = resjson4.roomes;
    setRoomlist(resjson4)

    // fetch new lession id-----------------------------------
    let res5 = await fetch('http://localhost:5000/lesson/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
    let res5json = await res5.json()
    res5json = res5json.lessons
    let max = res5json.reduce((prev, current) => {
      return (prev.ID > current.ID) ? prev : current
    });
    setLessonID(String(Number(max.ID) + 1))
    
    // fetch lessons list-----------------------------------
    let res = await fetch('http://localhost:5000/lesson/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson = await res.json();
    resjson = resjson.lessons;

    var resfix = []
    for (let i = 0; i < resjson.length; i++) {
      if (resjson[i].TID != myID){
        continue
      }

      var inforClass = await fetch('http://localhost:5000/class/' + resjson[i].CID, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      let inforClassJson = await inforClass.json();
      inforClassJson = inforClassJson.Class;

      var inforTeacher = await fetch('http://localhost:5000/user/' + resjson[i].TID, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      let inforTeacherJson = await inforTeacher.json();
      inforTeacherJson = inforTeacherJson.user;

      var inforRoom = await fetch('http://localhost:5000/room/' + resjson[i].RID, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      let inforRoomJson = await inforRoom.json();
      inforRoomJson = inforRoomJson.Room;

      resfix.push({
        'start': new Date(foo(resjson[i].Ngay) + ' ' + `${Number.parseInt(resjson[i].tiet_bat_dau) + 5}:00:00`),
        'end': new Date(foo(resjson[i].Ngay) + ' ' + `${Number.parseInt(resjson[i].tiet_bat_dau) + 6}:50:00`),
        'title': inforClassJson.CType + ' - ' + resjson[i].CID,
        'ID': resjson[i].ID,
        'CID': resjson[i].CID,
        'MID': resjson[i].MID,
        'type': inforClassJson.CType,
        'teacher': inforTeacherJson.FullName,
        'room': inforRoomJson.Name,
        'status': resjson[i].status,
        'note': resjson[i].note,
      })
    }
    // console.log(resfix)
    setUserlist(resfix)
  }

  function eventStyleGetter(event) {
    console.log("style")
    switch (event.type) {
      case '1A':
        return {
          style: {
            backgroundColor: 'red'
          }
        };
      case '2A':
        return {
          style: {
            backgroundColor: 'blue'
          }
        };
      case '3A':
        return {
          style: {
            backgroundColor: '#999'
          }
        };
      case '4A':
        return {
          style: {
            backgroundColor: '#eee'
          }
        };
      default:
        return {};
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <div style={{width:'95%'}}>
        <Calendar 
          localizer={localizer} 
          events={userlist} 
          style={{ height: "100%",width: "100%"}} 
          eventStyleGetter={eventStyleGetter}
          views={['week', "day"]}
          min={new Date(0, 0, 0, 6, 0)}
          max={new Date(0, 0, 0, 17, 0)}
          onSelectEvent={(event)=>{
            setSelectedEvent(event);
            setShowModal(true);
          }}
          defaultView="week" />
      </div>
      <Modal isOpen={showModal} style={{
        content: {
          maxWidth: '600px',
          borderRadius : '10px',
          padding : '20px',
          marginLeft: '10%',
          borderColor: '#75def3'
        }
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>Lesson information</h2>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
        <ul className="event-details">
          <li>Teacher: {selectedEvent.teacher}</li>
          <li>Room: {selectedEvent.room}</li>
          <li>Status: {selectedEvent.status}</li>
          <li>Note: {selectedEvent.note}</li>
          <li 
            onClick={() => {setShowModal(false);setShowModal2(true)}}
            style={{color:'blue'}}
          >Register for a makeup session</li>
          <li><NavLink to={"/teacher/infor/" + selectedEvent.CID}>More about this class</NavLink></li>

        </ul>
      </Modal>
      <Modal isOpen={showModal2} style={{
        content: {
          maxWidth: '600px',
          borderRadius : '10px',
          padding : '20px',
          marginLeft: '10%',
          borderColor: '#75def3'
        }
      }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>Register for a makeup session</h2>
          <button onClick={() => setShowModal2(false)}>Close</button>
        </div>
        <div className="panel">
          <div className="panel-body">
            <div className="form-group">
              <label className="control-label">Room:</label>
              <div className="col-sm-10">
              <select
                value = {rid1}
                className='form-control'
                onChange={(e) => {
                  console.log("Room 1: " + e.target.value)
                  setRid1(e.target.value)
                }}
              >
                <option disabled = "disabled"  value="0">--Choose room--</option>
                {roomlist.map((t, index) => 
                  <option key = {index} value = {t.RID}>{t.Name}</option>
                )}
              </select>
              </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="control-label">Date:</label>
              <div className="col-sm-10">
              <input
                type = "Date"
                className='form-control'
                placeholder = "Start date"
                value = {DtoS(lessonS1)}
                onChange = {(e) => {
                  console.log("Date: " + e.target.value)
                  var temp = new Date(e.target.value)
                  setLessonS1(temp)
                }}
              ></input>
              </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="control-label">Begin at:</label>
              <div className="col-sm-10">
              <input 
                type="number" 
                className='form-control'
                placeholder = "Begin at"
                value={tbd}
                onChange={(e) => {
                  if (e.target.value < 1 || e.target.value > 10){
                    alert("Invalid number. Please re-enter")
                  } else {
                    setTbd(e.target.value)
                    console.log("Begin at: " + e.target.value)
                  }
                }}
              ></input>
              </div>
            </div>
          </div>
        </div>
        <div className='button_contener'>
          <button onClick={() => {handleRegister()}}>Submit</button>
        </div>
      </Modal>
    </>
  )
}

export default Calender