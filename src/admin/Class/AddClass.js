import './AddClass.js'
import React from 'react'
import { useState, useEffect } from 'react'

const token = localStorage.getItem("token")

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

function AddClass () {
  
  //today---------------------------------------------
  var startD = new Date()
  var endD = new Date()
  endD.setMonth(endD.getMonth() + 2)
  //form step -----------------------------------------
  const [step, setStep] = useState(1)
  //user, room list -----------------------------------
  const [teacherlist, setTeacherlist] = useState([])
  const [managerlist, setManagerlist] = useState([])
  const [studentlist, setStudentlist] = useState([])
  const [roomlist, setRoomlist] = useState([])
  //data of new class----------------------------------
  const [cid, setCid] = useState('000000')
  const [sobuoi, setSobuoi] = useState(16)
  const [numS, setNumS] = useState(50)
  const [dateS, setDateS] = useState(startD)
  const [dateE, setDateE] = useState(endD)
  const [ctype, setCtype] = useState('null')
  const [tid, setTid] = useState('null')
  const [mid, setMid] = useState('null')
  const [des, setDes] = useState('null')
  const [studentClass, setStudentClass] = useState([])
  const [lessonid, setLessonid] = useState(1)
  const [buoi1, setBuoi1] = useState(7)
  const [buoi2, setBuoi2] = useState(7)
  const [rid1, setRid1] = useState(0)
  const [rid2, setRid2] = useState(0)
  const [lessonS1 , setLessonS1] = useState(0)
  const [lessonS2 , setLessonS2] = useState(0)
  //check----------------------------------------------
  const [confirmPassword, setConfirmPassword] = useState('')
  const [robot, setRobot] = useState(true)
  const [create, setCreate] = useState(false)

  const fetchData = async () => {
    // fetch teacher list-----------------------------------
    let res = await fetch('http://localhost:5000/user/teacher/all', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson = await res.json();
    resjson = resjson.users;
    var resfix = []
    for(let i = 0; i < resjson.length; i++){
      resfix.push({
        'TID': resjson[i].TID,
        'FN': resjson[i].FullName
      })
    }
    setTeacherlist(resfix)

    // fetch student list-----------------------------------
    let res2 = await fetch('http://localhost:5000/student/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson2 = await res2.json();
    resjson2 = resjson2.students;
    var resfix2 = []
    for(let i = 0; i < resjson2.length; i++){
      resfix2.push({
        'SID': resjson2[i].ID,
        'FN': resjson2[i].FullName
      })
    }
    setStudentlist(resfix2)

    // fetch manager list-----------------------------------
    let res3 = await fetch('http://localhost:5000/user/manager/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });
    let resjson3 = await res3.json();
    resjson3 = resjson3.users;
    var resfix3 = []
    for(let i = 0; i < resjson3.length; i++){
      resfix3.push({
        'MID': resjson3[i].MID,
        'FN': resjson3[i].FullName
      })
    }
    setManagerlist(resfix3)

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
    
    // fetch new class id-----------------------------------
    let f = await fetch('http://localhost:5000/class/all', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    })
    let fjson = await f.json()
    fjson = fjson.classes
    var tempID = fjson[fjson.length - 1].CID
    setCid(String(Number(tempID) + 1))

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
    setLessonid(String(Number(max.ID) + 1))
  }

  useEffect (()=>{
    fetchData();
  },[]);

  const onSubmit = async () => {
    if (!(numS > 0)){
      alert('Please enter max students')
    } else if (!(sobuoi > 0)) {
      alert('Please enter number of sessions')
    } else if (ctype === 'null') {
      alert('Please select type of class')
    } else if (tid === 'null') {
      alert('Please select teacher')
    } else {
      //create class------------------------------------
      var res = {
        'CID':cid,
        'So_buoi':sobuoi,
        'NumStudent':numS,
        'DateS':DtoS(dateS),
        'DateE':DtoS(dateE),
        'CType':ctype,
        'TID':tid,
        'Des':des
      }
      console.log(res)
      let reply = await fetch('http://localhost:5000/class/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(res)
      })
      reply = await reply.json()
      console.log("Add class: " + reply.message)
      if (reply.message == 'Create success'){
        setCreate(true)
      }

      //add student------------------------------------
      for (var i = 0; i < studentClass.length; i++) {
        var res2 = {
          'CID': cid,
          'SID': studentClass[i].SID
        }
        let reply2 = await fetch('http://localhost:5000/class/student/create', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(res2)
        })
        reply2 = await reply2.json()
        console.log("Add students " + i +": " + reply2.message)
      }

      //create lesson------------------------------------
      let j = 0
      while (j < sobuoi || j > 50) {
        if (tempdate.getDay() == buoi1) {
          var addLesson = {
            "ID": String(Number(lessonid) + j),
            "CID": cid,
            "RID": rid1,
            "TID": tid,
            "MID": mid,
            "Ngay": DtoS(tempdate),
            "tiet_bat_dau": lessonS1,
            "so_tiet": "2"
          }
          let reply3 = await fetch('http://localhost:5000/lesson/create', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(addLesson)
          })
          reply3 = await reply3.json()
          console.log("Add lesson " + j +": " + reply3.message)
          j = j + 1
        } else if (tempdate.getDay() == buoi2) {
          var addLesson = {
            "ID": String(Number(lessonid) + j),
            "CID": cid,
            "RID": rid2,
            "TID": tid,
            "MID": mid,
            "Ngay": DtoS(tempdate),
            "tiet_bat_dau": lessonS2,
            "so_tiet": "2"
          }
          let reply3 = await fetch('http://localhost:5000/lesson/create', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(addLesson)
          })
          reply3 = await reply3.json()
          console.log("Add lesson " + j +": " + reply3.message)
          j = j + 1
        }
        tempdate.setDate(tempdate.getDate() + 1)
      }
    }
  }
  var tempdate = new Date(dateS)
  const test = async () => {
    let j = 0
    while (j < sobuoi) {
      if (tempdate.getDay() == buoi1) {
        var addLesson = {
          "ID": String(Number(lessonid) + j),
          "CID": cid,
          "RID": rid1,
          "TID": tid,
          "MID": mid,
          "Ngay": DtoS(tempdate),
          "tiet_bat_dau": lessonS1,
          "so_tiet": "2"
        }
        console.log("add lesson ", j, ": ", addLesson)
        j = j + 1
      } else if (tempdate.getDay() == buoi2) {
        var addLesson = {
          "ID": String(Number(lessonid) + j),
          "CID": cid,
          "RID": rid2,
          "TID": tid,
          "MID": mid,
          "Ngay": DtoS(tempdate),
          "tiet_bat_dau": lessonS2,
          "so_tiet": "2"
        }
        console.log("add lesson ", j, ": ", addLesson)
        j = j + 1
      }
      tempdate.setDate(tempdate.getDate() + 1)
    }
  }

  switch (step) {
    case 1: return (
    <>
      {/* <div>
        Des: <input 
          type="text" 
          placeholder = "Description"
          value = {des === 'null' ? "Description" : des}
          onChange={(e) => {
            console.log("Des: " + e.target.value)
            setDes(e.target.value)
          }}
        ></input>
        <br/>
        Max students: <input 
          type="number" 
          placeholder = "Max students"
          value={numS}
          onChange={(e) => {
            if (e.target.value < 0){
              alert("Invalid number. Please re-enter")
            } else {
              setNumS(e.target.value)
              console.log("Num stdents: " + e.target.value)
            }
          }}
        ></input>
        <br/>
        Number of sessions: <input 
          type="number" 
          placeholder = "Number of sessions"
          value={sobuoi}
          onChange={(e) => {
            if (e.target.value < 0){
              alert("Invalid number. Please re-enter")
            } else {
              setSobuoi(e.target.value)
              console.log("Num sessions: " + e.target.value)
              var temp1 = new Date(dateS)
              var m = (e.target.value % 8 === 0) ? 
                      (e.target.value / 8) : 
                      (e.target.value / 8 + 1)
              temp1.setMonth(temp1.getMonth() + m)
              setDateE(temp1)
            }
          }}
        ></input>
        <br/>
        Start: <input
          type = "Date"
          placeholder = "Start date"
          value = {DtoS(dateS)}
          onChange = {(e) => {
            console.log("DateS: " + e.target.value)
            var temp = new Date(e.target.value)
            var temp2 = new Date(e.target.value)
            setDateS(temp)
            var m = (sobuoi % 8 === 0) ? 
                    (sobuoi / 8) : 
                    (sobuoi / 8 + 1)
            temp2.setMonth(temp.getMonth() + m)
            setDateE(temp2)
          }}
        ></input>
        {" "}to: {dateE.toLocaleDateString()}
        <br/>
        Class Type: <select
          value = {ctype}
          onChange={(e) => {
            console.log("Class Type: " + e.target.value)
            setCtype(e.target.value)
          }}
        >
          <option disabled = "disabled"  value="null" style={{color: "#666666"}}>--Choose class type--</option>
          <option value="1A">1A</option>
          <option value="2A">2A</option>
          <option value="3A">3A</option>
          <option value="4A">4A</option>
        </select>
        <br/>
        Teacher: <select
          value = {tid}
          onChange={(e) => {
            console.log("Teacher: " + e.target.value)
            setTid(e.target.value)
          }}
        >
          <option disabled = "disabled"  value="null">--Choose teacher--</option>
          {teacherlist.map((t, index) => 
            <option key = {index} value = {t.TID}>{t.FN}</option>
          )}
        </select>
        <br/>
        Manager: <select
          value = {mid}
          onChange={(e) => {
            console.log("Manager: " + e.target.value)
            setMid(e.target.value)
          }}
        >
          <option disabled = "disabled"  value="null">--Choose manager--</option>
          {managerlist.map((t, index) => 
            <option key = {index} value = {t.MID}>{t.FN}</option>
          )}
        </select>
        <br/>
        <br/>
      </div> */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap-theme.min.css"
        integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
        crossOrigin="anonymous"
      />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
      <div className="container bootstrap snippets bootdeys">
        <div className="row">
          <div className="col-xs-12 col-sm-9">
            <form className="form-horizontal">
              <div className="panel panel-default">
                <div className="panel-body text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar6.png"
                    className="img-circle profile-avatar"
                    alt="User avatar"
                  />
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Class info</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Description</label>
                    <div className="col-sm-10">
                    <input 
                      type="text" 
                      placeholder = "Description"
                      value = {des === 'null' ? "Description" : des}
                      className="form-control"
                      onChange={(e) => {
                        console.log("Des: " + e.target.value)
                        setDes(e.target.value)
                      }}
                    ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Max students</label>
                    <div className="col-sm-10">
                      <input 
                        type="number" 
                        placeholder = "Max students"
                        value={numS}
                        className="form-control"
                        onChange={(e) => {
                          if (e.target.value < 0){
                            alert("Invalid number. Please re-enter")
                          } else {
                            setNumS(e.target.value)
                            console.log("Num stdents: " + e.target.value)
                          }
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Number of sessions</label>
                    <div className="col-sm-10">
                      <input 
                        type="number" 
                        placeholder = "Number of sessions"
                        value={sobuoi}
                        className="form-control"
                        onChange={(e) => {
                          if (e.target.value < 0){
                            alert("Invalid number. Please re-enter")
                          } else {
                            setSobuoi(e.target.value)
                            console.log("Num sessions: " + e.target.value)
                            var temp1 = new Date(dateS)
                            var m = (e.target.value % 8 === 0) ? 
                                    (e.target.value / 8) : 
                                    (e.target.value / 8 + 1)
                            temp1.setMonth(temp1.getMonth() + m)
                            setDateE(temp1)
                          }
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Class type</label>
                    <div className="col-sm-10">
                      <select
                        value = {ctype}
                        className="form-control"
                        onChange={(e) => {
                          console.log("Class Type: " + e.target.value)
                          setCtype(e.target.value)
                        }}
                      >
                        <option disabled = "disabled"  value="null" style={{color: "#666666"}}>--Choose class type--</option>
                        <option value="1A">1A</option>
                        <option value="2A">2A</option>
                        <option value="3A">3A</option>
                        <option value="4A">4A</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Start day</label>
                    <div className="col-sm-10">
                      <input
                        type = "Date"
                        placeholder = "Start date"
                        value = {DtoS(dateS)}
                        className="form-control"
                        onChange = {(e) => {
                          console.log("DateS: " + e.target.value)
                          var temp = new Date(e.target.value)
                          var temp2 = new Date(e.target.value)
                          setDateS(temp)
                          var m = (sobuoi % 8 === 0) ? 
                                  (sobuoi / 8) : 
                                  (sobuoi / 8 + 1)
                          temp2.setMonth(temp.getMonth() + m)
                          setDateE(temp2)
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">To:</label>
                    <div className="col-sm-10" style={{textAlign: 'left', paddingTop: '7px', paddingLeft: '15px'}}>
                      {dateE.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Member</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Teacher</label>
                    <div className="col-sm-10">
                      <select
                        value = {tid}
                        className="form-control"
                        onChange={(e) => {
                          console.log("Teacher: " + e.target.value)
                          setTid(e.target.value)
                        }}
                      >
                        <option disabled = "disabled"  value="null">--Choose teacher--</option>
                        {teacherlist.map((t, index) => 
                          <option key = {index} value = {t.TID}>{t.FN}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Manager</label>
                    <div className="col-sm-10">
                      <select
                        value = {mid}
                        className="form-control"
                        onChange={(e) => {
                          console.log("Manager: " + e.target.value)
                          setMid(e.target.value)
                        }}
                      >
                        <option disabled = "disabled"  value="null">--Choose manager--</option>
                        {managerlist.map((t, index) => 
                          <option key = {index} value = {t.MID}>{t.FN}</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Student</label>
                    <div className="col-sm-10" style={{textAlign: 'left', paddingTop: '7px', paddingLeft: '15px'}}>
                      {studentClass.length + " / " + numS}
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">Security</h4>
                </div>
                <div className="panel-body">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">
                      Confirm password
                    </label>
                    <div className="col-sm-10">
                      <input type="password" className="form-control" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                      <div className="checkbox">
                        <input type="checkbox" id="checkbox_1" checked={!robot} onChange={() => {setRobot(!robot)}}/>
                        <label htmlFor="checkbox_1">I am not a robot</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="col-sm-10 col-sm-offset-2">
                      <button type="button" className="btn btn-primary"  onClick={() => {
                        if (!(numS > 0)){
                          alert('Please enter max students')
                        } else if (!(sobuoi > 0)) {
                          alert('Please enter number of sessions')
                        } else if (ctype === 'null') {
                          alert('Please select type of class')
                        } else if (tid === 'null') {
                          alert('Please select teacher')
                        } else if (mid === 'null') {
                          alert('Please select manager')
                        } else if (confirmPassword != localStorage.getItem("password")) {
                          alert('Invalid password')
                        } else if (robot) {
                          alert('You are a robot?')
                        } else {
                          setStep(2)
                        }
                      }}>Continue</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <button onClick={() => onSubmit()}>Submit</button> */}
      {/* <button onClick={() => {
        if (!(numS > 0)){
          alert('Please enter max students')
        } else if (!(sobuoi > 0)) {
          alert('Please enter number of sessions')
        } else if (ctype === 'null') {
          alert('Please select type of class')
        } else if (tid === 'null') {
          alert('Please select teacher')
        } else if (mid === 'null') {
          alert('Please select manager')
        } else {
          setStep(2)
        }
      }}>Continue</button> */}
    </>
    )
    case 2: return (
    <>
      <div>
        Class: {ctype}, Teacher: {tid}
        <table width="95%" cellPadding="3" >
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Full Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {studentClass.map((c, index) =>
              <tr key = {index}>
                <td>{c.SID}</td>
                <td>{c.FN}</td>
                <td>
                  <button onClick={() => {
                    setStudentClass(studentClass.filter(student => student.SID !== c.SID))
                    studentlist.push({
                      'SID': c.SID,
                      'FN': c.FN
                    })
                  }}>x</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <select
          value = {'DEFAULT'}
          onChange={(e) => {
            if (studentClass.length >= numS){
              alert('The class was full of students')
            }
            else {
              console.log("Add student: " + e.target.value)
              studentClass.push({
                'SID': e.target.value.substring(0, 6),
                'FN': e.target.value.substring(6, e.target.value.end)
              })
              setStudentlist(studentlist.filter(student => student.SID !== e.target.value.substring(0, 6)))
            }
          }}
        >
          <option disabled = "disabled"  value="DEFAULT">--Choose student--</option>
          {studentlist.map((t, index) => 
            <option key = {index} value = {t.SID + t.FN}>{t.FN}</option>
          )}
        </select>
      </div>
      <button className='btn btn-primary' onClick={() => setStep(1)}>Back</button>
      <button className='btn btn-primary' onClick={() => setStep(3)}>Continue</button>
    </>
    )
    case 3: return (
    <>
      <div>
        Class: {ctype}, Teacher: {tid} <br/>
        Buoi 1: <select
          value = {buoi1}
          onChange={(e) => {
            if (e.target.value === buoi2){
              alert("Please choose another date")
            } else {
              console.log("Buoi 1: " + e.target.value)
              setBuoi1(e.target.value)
            }
          }}
        >
          <option disabled = "disabled"  value="7">--Choose date--</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
          <option value="0">Sunday</option>
        </select>
        {" "} at: <input 
          type="number" 
          placeholder = "Begin at"
          value={lessonS1}
          length = "100"
          onChange={(e) => {
            if (e.target.value < 1 || e.target.value > 10){
              alert("Invalid number. Please re-enter")
            } else {
              setLessonS1(e.target.value)
              console.log("Begin 1 at: " + e.target.value)
            }
          }}
        ></input>
        {" "} room: <select
          value = {rid1}
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
        <br/>
        <br/>
        Buoi 2: <select
          value = {buoi2}
          onChange={(e) => {
            if (e.target.value === buoi1){
              alert("Please choose another date")
            } else {
              console.log("Buoi 2: " + e.target.value)
              setBuoi2(e.target.value)
            }
          }}
        >
          <option disabled = "disabled"  value="7">--Choose date--</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
          <option value="6">Saturday</option>
          <option value="0">Sunday</option>
        </select>
        {" "} at: <input 
          type="number" 
          placeholder = "Begin at"
          value={lessonS2}
          onChange={(e) => {
            if (e.target.value < 1 || e.target.value > 10){
              alert("Invalid number. Please re-enter")
            } else {
              setLessonS2(e.target.value)
              console.log("Begin 2 at: " + e.target.value)
            }
          }}
        ></input>
        {" "} room: <select
          value = {rid2}
          onChange={(e) => {
            console.log("Room 2: " + e.target.value)
            setRid2(e.target.value)
          }}
        >
          <option disabled = "disabled"  value="0">--Choose room--</option>
          {roomlist.map((t, index) => 
            <option key = {index} value = {t.RID}>{t.Name}</option>
          )}
        </select>
        <br/>
        <br/>
      </div>
      <button onClick={() => setStep(2)}>Back</button>
      <button onClick={() => {
        if ((buoi1 == 7) || (buoi2 == 7) || !lessonS1 || !lessonS2 || !rid1 || !rid2) {
          alert("Please enter full information")
        } else {
          setTimeout(() => onSubmit(), 500)
          setStep(4)
        }
      }}>Submit</button>
      {/* <button onClick={() => test()}>Test</button> */}
    </>
    )
    case 4: if (create){
      return (
        <>
          <h6>Create success</h6>
          <button onClick={() =>{
            window.location.reload()
            setStep(1)
          }}
          >Return</button>
        </>
      )
    } else {
      return (
        <>
          <h6>Create failure</h6>
          <button onClick={() =>{
            window.location.reload()
            setStep(1)
          }}
          >Return</button>
        </>
      )
    }

  }
}

export default AddClass