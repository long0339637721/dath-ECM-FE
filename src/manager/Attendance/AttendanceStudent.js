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


const AttendanceStudent = () => {

    const [lessonList, setLessonList] = useState([])

    const myCID = window.location.pathname.split('/')[3]
    const myBID = window.location.pathname.split('/')[4]

    const handleSubmit = async () => {
        for (let i = 0; i < lessonList.length; i++) {
            var url = 'http://localhost:5000/lesson/hoc/' + myBID + '-' + lessonList[i].ID
            let res1 = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "note": lessonList[i].note,
                    "status": lessonList[i].status
                })
            });
            let res1json = await res1.json();
            console.log("Update status" + i + ": " + res1json.message);
        }
    }

    const fetchData = async () => {
        // fetch student list----------------------------
        let res1 = await fetch('http://localhost:5000/class/student/' + myCID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });
        let res1json = await res1.json();
        res1json = res1json.classes;
        // setLessonList(res1json)
        var resfix = []

        // fetch hoc list----------------------------
        let res2 = await fetch('http://localhost:5000/lesson/hoc/' + myBID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });
        let res2json = await res2.json();
        if (res2json.size == 0){
            for (let i = 0; i < res1json.length; i++) {
                let temp = await fetch('http://localhost:5000/lesson/hoc/create', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        'BID': myBID,
                        'SID': res1json[i].ID,
                        'note': ""
                    })
                });
                let tempjson = await temp.json()
                console.log("create hoc N: ", tempjson)
            }
        }
        var res3 = await fetch('http://localhost:5000/lesson/hoc/' + myBID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
        });
        var res3json = await res3.json();
        res3json = res3json.lessons
        
        for (var i = 0; i < res1json.length; i++) {
            resfix.push({
                'ID':  res1json[i].ID,
                'FullName': res1json[i].FullName,
                'Sex': res1json[i].Sex,
                'Phone': res1json[i].Phone,
                'status': res3json[i].status,
                'note': res3json[i].note
            })
        }
        setLessonList(resfix)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
    <>
        <div className='c1'>
            <div><h3>Attendance students</h3></div>
            {/* <NavLink to="/admin/class/addclass" ><button type='b1' >Add</button></NavLink> */}
            <NavLink to="/teacher/attendance" ><button type='b1' >Back</button></NavLink>
        </div>
        <div className='c2'>
            <table width="95%" cellPadding="3" className="tablelist">
                <thead>
                    <tr>
                        <th className="th_left">ID</th>
                        <th>Full name</th>
                        <th>Sex</th>
                        <th>Phone</th>
                        <th></th>
                        <th className="th_right">Note</th>
                    </tr>
                </thead>
                <tbody>
                    {lessonList.map((c, index) =>
                        <tr key={index}>
                            <td>{c.ID}</td>
                            <td>{c.FullName}</td>
                            <td>{c.Sex}</td>
                            <td>{c.Phone}</td>
                            <td>
                                <select defaultValue={c.status} onChange={(e)=>{c.status = e.target.value}}>
                                    <option value="N" disabled="disabled">--</option>
                                    <option value="V">Vắng</option>
                                    <option value="T">Trễ</option>
                                    <option value="C">Có mặt</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" defaultValue={c.note} onChange={(e)=>{c.note = e.target.value}}></input>
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

export default AttendanceStudent;