import './login.css'
import React from 'react'
import { useState, useEffect } from 'react'

export default function Login() {

  // var toD = new Date()
  // var endD = new Date()
  // // endD.setMonth(endD.getMonth() + 2)
  // endD.setDate(endD.getDate() + 3)

  // const [cid, setCid] = useState("311112")
  // const [sobuoi, setSobuoi] = useState(16)
  // const [dateS, setDateS] = useState(toD)
  // const [dateE, setDateE] = useState(endD)
  // const [tid, setTid] = useState("111125")
  // const [mid, setMid] = useState("111119")
  // const [lessonid, setLessonid] = useState("600000")
  // const [buoi1, setBuoi1] = useState(3)
  // const [buoi2, setBuoi2] = useState(7)
  // const [rid1, setRid1] = useState("400002")
  // const [rid2, setRid2] = useState("400002")
  // const [lessonS1 , setLessonS1] = useState(2)
  // const [lessonS2 , setLessonS2] = useState(2)

  // const onSubmit = async () => {
    
  //   var nowdate = toD.getDay()
  //   if (buoi1 > buoi2) {
  //     var temp = buoi1
  //     setBuoi1(buoi2)
  //     setBuoi2(temp)
  //   }
  //   var i = 0
  //   while (i < sobuoi){
      
  //     var d1 = t - b1
  //     var d2 = t - b2
  //   }

  //   for (var i = 0; i < sobuoi; i++) {

  //   }
    
  //   var res = {
  //     'ID': "000000",
  //     'CID': "311112",
  //     'RID': "400002",
  //     'TID': "111125",
  //     'MID': "111119",
  //     'Ngay': DtoS(toD),
  //     'tiet_bat_dau': 8,
  //     'so_tiet': 2
  //   }
  //   console.log(res)
  //   let reply = await fetch('http://localhost:5000/lesson/create', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(res)
  //   })
  //   reply = await reply.json()
  //   console.log("Add lesson: " + reply.message)
  // }

  const [username, setUsername] = useState(false)
  const [pass, setPass] = useState(false)

  const fetchLogin = async () => {
    var res = {
      'username': username,
      'password': pass
    }
    console.log("info login: ", JSON.stringify(res))
    let reply = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(res)
    })
    reply = await reply.json()
    console.log(reply)
    if (reply.result == 'fail'){
      alert(reply.message)
      // location.reload()
    }
    else {
      localStorage.setItem('token', reply.accessToken)
      localStorage.setItem('role', reply.role)
      localStorage.setItem('id', reply.ID)
      localStorage.setItem('username', username)
      localStorage.setItem('password', pass)
      // check and route to ...
      if (reply.role == 'Admin') {
        window.location.pathname = '/admin';
      } else if (reply.role == 'Manager') {
        window.location.pathname = '/manager';
      } else {
        window.location.pathname = '/teacher';
      }
      console.log(localStorage.getItem('token'))
    } 
  }

  return (
  <>
    <div className="containerlogin bootstrap snippets bootdey">
      <div className="header1">
        <ul className="nav1 nav-pills pull-right">
          <li>
            <a href="#">&nbsp;</a>
          </li>
        </ul>
        <h3 className="text-muted prj-name">English Center Management</h3>
      </div>
      <div style={{ height: "auto", minHeight: 300, display:'flex', alignItems:'center', justifyContent:'left'}} className="jumbotron">
        <div className="col-md-4" style={{textAlign:'right'}}>
          <img
            className="img-responsive center-block img-user"
            src="https://bootdey.com/img/Content/Manbrown2.png"
          />
        </div>
        <div className="col-md-6 form-content" style={{width:'35%'}}>
          <form
            acceptCharset="utf-8"
            method="post"
            id="UserLoginForm"
            className="form-signin"
            action=""
          >
            <h1 className="form-signin-heading text-muted">Login</h1>
            <input
              type="text"
              id="username"
              autoFocus="autofocus"
              placeholder="Username"
              className="form-control"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="form-control"
              name="password"
              onChange={(e) => setPass(e.target.value)}
            />
            <button type="button" className="btn btn-lg btn-info btn-block" onClick={() => {
              if (!username){
                alert("Please fill username")
              } else if (!pass) {
                alert("Please fill password")
              }
              else {
                fetchLogin()
              }
            }}>
              <i className="fa fa-share" />
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
    <div className="col-md-12">
      <div className="container bootstrap snippets bootdey" style={{maxWidth:'1500px'}}>
        <footer className="footer">
          <p>© A+ English</p>
        </footer>
      </div>
    </div>
  </>
  )
}