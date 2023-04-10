import './Class.css'
import {useState, useEffect, React} from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react'
import { Route, Routes } from "react-router-dom"

// function Class() {

//   const [classlist, setClasslist] = useState([])
//   useEffect(() => {
//     const fetchData = async() =>{
//       fetch('http://localhost:5000/class/all')
//         .then(resp => resp.json())
//         .then(data =>{
//           setClasslist(data.classes)
//         })
//     }
//     fetchData()
//   }, [])
  
//   return (
//     <>
//       <div className='c1'>filter</div>
//       <div className='c2'>
//         <table width="95%" cellPadding="3" >
//           <thead>
//             <tr>
//               <th>Class ID</th>
//               <th>Type</th>
//               <th>Des</th>
//               <th>Teacher</th>
//               <th>Start</th>
//               <th>Sessions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {classlist.map((c) =>
//               <tr>
//                 <td>{c.CID}</td>
//                 <td>{c.CType}</td>
//                 <td>{c.Des}</td>
//                 <td>{c.TID}</td>
//                 <td>{c.DateS.substr(0, 10)}</td>
//                 <td>{c.So_buoi}</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className='c3'>
//         <button type='b1' >add</button>
//       </div>
//     </>
//   );
// }

const Class = () => {

  const [classlist, setClasslist] = useState([]);
  const fetchData = async () => {
    let res = await fetch('http://localhost:5000/class/all');
    let resjson = await res.json();
    resjson = resjson.classes;

    var resfix = []
    for(let i = 0; i < resjson.length; i++){
      var teachername = 'null';
      let tn = await fetch('http://localhost:5000/user/' + resjson[i].TID)
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
  }

  useEffect (()=>{
    fetchData();
  },[]);

  return (
    <>
      <div className='c1'>filter</div>
      <div className='c2'>
        <table width="95%" cellPadding="3" >
          <thead>
            <tr>
              <th>Class ID</th>
              <th>Type</th>
              <th>Des</th>
              <th>Teacher</th>
              <th>Start</th>
              <th>Sessions</th>
            </tr>
          </thead>
          <tbody>
            {classlist.map((c) =>
              <tr>
                <td>{c.CID}</td>
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
      <div className='c3'>
        <button type='b1' >add</button>
      </div>
    </>
  );
}

export default Class