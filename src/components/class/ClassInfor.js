import './Class.css'
import { useState, useEffect, React } from 'react';
import { NavLink } from "react-router-dom";
import Modal from 'react-modal';
import ReactModal from 'react-modal';
import AddNewStudentCom from './AddNewStudentCom';

ReactModal.setAppElement('#root');

const token = localStorage.getItem("token")
const myID = localStorage.getItem("id")
const role = localStorage.getItem("role")

function DtoS(ed) {
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

const ClassInfor = () => {

  const [teacherlist, setTeacherlist] = useState([])
  const [roomlist, setRoomlist] = useState([])
  const [studentList, setStudentList] = useState([])
  const [tempStudentList, setTempStudentList] = useState([])
  const [addNC, setAddNC] = useState(0)

  const [idbu, setIdbu] = useState()
  const [classlist, setClasslist] = useState([]);
  const [infor, setInfor] = useState({ 'CID': 'null' })
  const [teacher, setTeacher] = useState()
  const [lessonList, setLessonList] = useState([])

  const [lessonID, setLessonID] = useState()
  const [tid, setTid] = useState('null')
  const [rid1, setRid1] = useState(0)
  const [lessonS1, setLessonS1] = useState(new Date())
  const [tbd, setTbd] = useState(0)

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const handleRegister = async () => {
    if (tid === 'null') {
      alert('Please select teacher')
    } else if (rid1 === 0) {
      alert('Please select teacher')
    } else if (tbd < 2) {
      alert('Start at: Invalid value')
    } else {
      // taoj buổi học mới
      var addLesson = {
        "ID": lessonID,
        "CID": infor.CID,
        "RID": rid1,
        "TID": tid,
        "MID": myID,
        "Ngay": DtoS(lessonS1),
        "tiet_bat_dau": tbd,
        "so_tiet": "2",
        "ID_bu": idbu
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

      // cập nhật buổi học hiện có
      let res1 = await fetch('http://localhost:5000/lesson/' + idbu, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          'note': 'Registered',
          'status': 'C'
        })
      });
      let res1json = await res1.json();
      console.log("update " + idbu + ": ", res1json)
      window.location.reload()
    }
  }

  
  const handleAddStudent = async () => {
    for (let i = 0; i < tempStudentList.length; i++) {
      var url = 'http://localhost:5000/class/student/create'
      let res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          'SID': tempStudentList[i].SID,
          'CID': infor.CID
        })
      });
      let resjson = await res.json();
      console.log("Add student to class: ", resjson.message);
    }
    window.location.reload()
  }

  const fetchData = async () => {
    // list student of class-----------------------------------
    var url = 'http://localhost:5000/class/student/' + window.location.pathname.split('/')[3]
    let res = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson = await res.json();
    resjson = resjson.classes;
    if (resjson != "size = 0") {
      setClasslist(resjson)
    }

    // fetch class infor-----------------------------------
    var url2 = 'http://localhost:5000/class/' + window.location.pathname.split('/')[3]
    let res2 = await fetch(url2, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson2 = await res2.json();
    resjson2 = resjson2.Class;
    setInfor(resjson2)

    // fetch teacher name-----------------------------------
    var url3 = 'http://localhost:5000/user/' + resjson2.TID
    let res3 = await fetch(url3, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson3 = await res3.json();
    setTeacher(resjson3.user.FullName)

    // fetch lession list-----------------------------------
    var url4 = 'http://localhost:5000/class/lesson/' + resjson2.CID
    let res4 = await fetch(url4, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson4 = await res4.json();
    setLessonList(resjson4.classes)

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
    for (let i = 0; i < res1json.length; i++) {
      res1fix.push({
        'TID': res1json[i].TID,
        'FN': res1json[i].FullName
      })
    }
    setTeacherlist(res1fix)

    // fetch room list-----------------------------------
    let res6 = await fetch('http://localhost:5000/room/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson6 = await res6.json();
    resjson6 = resjson6.roomes;
    setRoomlist(resjson6)

    // fetch student list-----------------------------------
    // var url4 = 'http://localhost:5000/class/student/not/' + window.location.pathname.split('/')[3]
    var url4 = 'http://localhost:5000/student/all'
    let res7 = await fetch(url4, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson7 = await res7.json();
    resjson7 = resjson7.students;
    setStudentList(resjson7)
  }

  const AddNewStudent = () => {
    setAddNC(1)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className='c1'>
        <div><h3>Class Information</h3></div>
        <NavLink to={"/" + role + "/class"} ><button type='b1' >Back</button></NavLink>
      </div>
      <div className='c2'>
        <div className="container bootstrap snippets bootdey" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="panel-body inf-content" style={{ width: '50%', display: 'flex', justifyContent: 'center' }}>
            <div className="row" style={{ width: '100%', justifyContent: 'center' }}>
              <div className="col-md-6" style={{ width: '90%' }}>
                {/* <strong>Information</strong> */}
                <br />
                <div className="table-responsive">
                  <table className="table table-user-information" style={{ border: '0', textAlign: 'left' }}>
                    <tbody>
                      <tr>
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-asterisk text-primary" />
                            Class ID
                          </strong>
                        </td>
                        <td className="text-primary">{infor.CID}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-user  text-primary" />
                            Type
                          </strong>
                        </td>
                        <td className="text-primary">{infor.CType} </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-cloud text-primary" />
                            Des
                          </strong>
                        </td>
                        <td className="text-primary">{infor.Des}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>
                            <span className="glyphicon glyphicon-bookmark text-primary" />
                            Teacher
                          </strong>
                        </td>
                        <td className="text-primary">{infor.TID + " - " + teacher}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='c3' style={{ marginBottom: '1rem' }}>
        <div className='c1' style={{ paddingBottom: '0' }}>
          <h4>Student list</h4>
          <div>
            <button className='add-new-student' onClick={AddNewStudent}>Add new student</button>
            {addNC ? <AddNewStudentCom setAddNC={setAddNC} /> : <></>} {/* nút add new student đây nha m */}
            <button onClick={() => {
              if (role === "Teacher") {
                alert("You do not have permission to access this feature")
              } else {
                setShowModal(true)
              }
            }}>Add</button>
          </div>

        </div>
        <table width="95%" cellPadding="3" className='tablelist'>
          <thead>
            <tr>
              <th className="th_left">Student ID</th>
              <th>FullName</th>
              <th>Sex</th>
              <th>Bdate</th>
              <th className="th_right">Address</th>
            </tr>
          </thead>
          <tbody>
            {classlist.map((c, index) =>
              <tr key={index}>
                <td>{c.ID}</td>
                <td>{c.FullName}</td>
                <td>{c.Sex}</td>
                <td>{foo(c.Bdate)}</td>
                <td>{c.Address}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='c4'>
        <div className='c1' style={{ paddingBottom: '0' }}>
          <h4>Lesson list</h4>
        </div>
        <table width="95%" cellPadding="3" className='tablelist'>
          <thead>
            <tr>
              <th className="th_left">Lesson ID</th>
              <th>Room</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th className="th_right">Note</th>
            </tr>
          </thead>
          <tbody>
            {lessonList.map((c, index) => {
              if (foo(c.Ngay) === DtoS(new Date())) {
                return <tr key={index} style={{ backgroundColor: '#7777f980', color: '#0000ffcc' }}>
                  <td>{c.ID}</td>
                  <td>{c.RID}</td>
                  <td>{foo(c.Ngay)}</td>
                  <td>{(c.tiet_bat_dau + 5) + ":00 - " + (c.tiet_bat_dau + 6) + ":50"}</td>
                  <td>{c.status === 'N' ? "" : c.status}</td>
                  <td>{c.note}</td>
                </tr>
              } else {
                return <tr key={index}>
                  <td>{c.ID}</td>
                  <td>{c.RID}</td>
                  <td>{foo(c.Ngay)}</td>
                  <td>{(c.tiet_bat_dau + 5) + ":00 - " + (c.tiet_bat_dau + 6) + ":50"}</td>
                  <td>{(foo(c.Ngay) <= DtoS(new Date()))
                    ? ((c.status != 'V' && c.status != 'N') ? c.status : <button onClick={() => { setShowModal2(true); setIdbu(c.ID) }}>{c.status}</button>)
                    : ""}</td>
                  <td>{c.note}</td>
                </tr>
              }
            }
            )}
          </tbody>
        </table>
      </div>
      <Modal isOpen={showModal} style={{
        content: {
          maxWidth: '600px',
          borderRadius: '10px',
          padding: '20px',
          marginLeft: '10%',
          borderColor: '#75def3'
        }
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Add student</h2>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
        <table width="95%" cellPadding="3" className='tablelist'>
          <thead>
            <tr>
              <th className="th_left">Student ID</th>
              <th className="th_right">FullName</th>
            </tr>
          </thead>
          <tbody>
            {tempStudentList.map((c, index) =>
              <tr key={index}>
                <td>{c.SID}</td>
                <td>{c.FN}</td>
              </tr>
            )}
          </tbody>
        </table>
        <select
          value={'DEFAULT'}
          onChange={(e) => {
            console.log("Add student: " + e.target.value)
            tempStudentList.push({
              'SID': e.target.value.substring(0, 6),
              'FN': e.target.value.substring(6, e.target.value.end)
            })
            setStudentList(studentList.filter(student => student.SID !== e.target.value.substring(0, 6)))
          }}
        >
          <option disabled="disabled" value="DEFAULT">--Choose student--</option>
          {studentList.map((t, index) =>
            <option key={index} value={t.ID + t.FullName}>{t.ID + " - " + t.FullName}</option>
          )}
        </select>
        <button onClick={() => handleAddStudent()}>Submit</button>
      </Modal>
      <Modal isOpen={showModal2} style={{
        content: {
          maxWidth: '600px',
          borderRadius: '10px',
          padding: '20px',
          marginLeft: '10%',
          borderColor: '#75def3'
        }
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2>Register for a makeup session</h2>
          <button onClick={() => setShowModal2(false)}>Close</button>
        </div>
        <div className="panel">
          <div className="panel-body">
            <div className="form-group">
              <label className="control-label">Teacher:</label>
              <div className="col-sm-10">
                <select
                  value={tid}
                  className='form-control'
                  onChange={(e) => {
                    console.log("Teacher: " + e.target.value)
                    setTid(e.target.value)
                  }}
                >
                  <option disabled="disabled" value="null">--Choose teacher--</option>
                  {teacherlist.map((t, index) =>
                    <option key={index} value={t.TID}>{t.FN}</option>
                  )}
                </select>
              </div>
            </div>
          </div>
          <div className="panel-body">
            <div className="form-group">
              <label className="control-label">Room:</label>
              <div className="col-sm-10">
                <select
                  value={rid1}
                  className='form-control'
                  onChange={(e) => {
                    console.log("Room 1: " + e.target.value)
                    setRid1(e.target.value)
                  }}
                >
                  <option disabled="disabled" value="0">--Choose room--</option>
                  {roomlist.map((t, index) =>
                    <option key={index} value={t.RID}>{t.Name}</option>
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
                  type="Date"
                  className='form-control'
                  placeholder="Start date"
                  value={DtoS(lessonS1)}
                  onChange={(e) => {
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
                  placeholder="Begin at"
                  value={tbd}
                  onChange={(e) => {
                    if (e.target.value < 1 || e.target.value > 10) {
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
          <button onClick={() => { handleRegister() }}>Submit</button>
        </div>
      </Modal>
    </>
  );
}

export default ClassInfor