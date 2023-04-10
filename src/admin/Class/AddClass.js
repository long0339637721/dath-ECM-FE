import './AddClass.js'
import React from 'react'
import { useState, useEffect } from 'react'

function AddClass () {
  // form step ----------------------------
  const [step, setStep] = useState(1)
  // teacher, student list ----------------------------
  const [teacherlist, setTeacherlist] = useState([])
  const [managerlist, setManagerlist] = useState([])
  const [studentlist, setStudentlist] = useState([])

  const fetchData = async () => {
    let res = await fetch('http://localhost:5000/user/teacher/all');
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

    let res2 = await fetch('http://localhost:5000/student/all');
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

    let res3 = await fetch('http://localhost:5000/user/manager/all');
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
  }

  useEffect (()=>{
    fetchData();
  },[]);

  var today = String(new Date().getFullYear()) + '-'
  if (Number(new Date().getMonth()) < 10) {
    today = today + '0' + String(new Date().getMonth()) + '-'
  } else {
    today = today + String(new Date().getMonth()) + '-'
  }
  if (Number(new Date().getDate()) < 10) {
    today = today + '0' + String(new Date().getDate())
  } else {
    today = today + String(new Date().getDate())
  }

  const [ok, setOk] = useState(false)
  const [cid, setCid] = useState('000000')
  const [sobuoi, setSobuoi] = useState(16)
  const [numS, setNumS] = useState(50)
  const [dateS, setDateS] = useState(today)
  const [dateE, setDateE] = useState(today)
  const [ctype, setCtype] = useState('null')
  const [tid, setTid] = useState('null')
  const [mid, setMid] = useState('null')
  const [des, setDes] = useState('null')
  const [studentClass, setStudentClass] = useState([])
  const [buoi1, setBuoi1] = useState(0)
  const [buoi2, setBuoi2] = useState(0)
  const [lessonid, setLessonid] = useState(0)
  const [rid, setRid] = useState(0)
  const [lessonS , setLessonS] = useState(0)
  

  // fetch('http://localhost:5000/class/create', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     'CID':'000003',
  //     'So_buoi':16,
  //     'NumStudent': 50,
  //     'DateS':'2022-04-01',
  //     'DateE':'2022-06-09',
  //     'Ctype':'3A',
  //     'TID':'111121',
  //     'Des':'cc'
  //   })
  // })

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
      let f = await fetch('http://localhost:5000/class/all')
      let fjson = await f.json()
      fjson = fjson.classes
      if (fjson.length > 0) {
        var tempID = await fjson[fjson.length - 1].CID
        var newID = await String(Number(tempID) + 1)
        setCid(newID)
      }
      else {
        setCid("3111111")
      }
  
      var res = {
        'CID':cid,
        'So_buoi':sobuoi,
        'NumStudent':numS,
        'DateS':dateS,
        'DateE':dateE,
        'CType':ctype,
        'TID':tid,
        'Des':des
      }
      console.log(res)
      let reply = await fetch('http://localhost:5000/class/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(res)
      })
      reply = await reply.json()
      console.log("Add class: " + reply.message)

      var res2 = []
      for (var i = 0; i < studentClass.length; i++) {
        res2.push({
          'CID': cid,
          'SID': studentClass[i].SID
        })
      }
      let reply2 = await fetch('http://localhost:5000/class/student/create', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(res2)
      })
      reply2 = await reply2.json()
      console.log("Add students: " + reply2.message)
      if (reply2.message == "Create success"){
        setOk(true)
      }
    }
  }

  switch (step) {
    case 1:
      return (
        <>
          <div>
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
                }
              }}
            ></input>
            <br/>
            Start: <input
              type = "date"
              placeholder = "Start date"
              value = {dateS}
              onChange = {(e) => {
                console.log("DateS: " + e.target.value)
                setDateS(e.target.value)
              }}
            ></input>
            <br/>
            End: <input
              type = "date"
              placeholder = "End date"
              value = {dateE}
              onChange = {(e) => {
                console.log("DateE: " + e.target.value)
                setDateE(e.target.value)
              }}
            ></input>
            <br/>
            Class Type: <select
              // defaultValue={'DEFAULT'}
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
              // defaultValue={'DEFAULT'}
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
              // defaultValue={'DEFAULT'}
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
          </div>
          {/* <button onClick={() => onSubmit()}>Submit</button> */}
          <button onClick={() => {
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
          }}>Continue</button>
        </>
      )
    case 2:
      return (
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
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={() => setStep(3)}>Continue</button>
        </>
      )
    case 3:
      return (
        <>
          <div>
            Class: {ctype}, Teacher: {tid}
            <select
              // defaultValue={'DEFAULT'}
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
          </div>
          <button onClick={() => setStep(2)}>Back</button>
          {/* <button onClick={() => {
            if (!buoi1 || !buoi2 || !lessonS || !lessonid || !rid) {
              alert("Please enter full information")
            } else {
              while (!ok) {
                onSubmit()
              }
              setStep(4)
            }
          }}>Submit</button> */}
          <button onClick={() =>{
            while (ok === false) {
              onSubmit()
            }
            setStep(4)
          }}>Submit</button>
        </>
      )
    case 4:
      return (
        <>
          <h6>Create success</h6>
        </>
      )
  }
}

export default AddClass