import "./Attendance.css";

// export default function Attendance() {
//   return <h1>Attendance</h1>
// }

import {useState, useEffect, React} from 'react';
import ReactDOM from 'react-dom';

const Attendance = () => {
    const [classes, setClass] = useState([]);
    const [student, setStudent] = useState([]);
    const [lesson, setLesson] = useState([]);

    const fetchData = async () => {
        let resClass = await fetch('http://localhost:5000/class/all');
        let dataClass = await resClass.json();
        dataClass = dataClass.classes;
        // console.log(dataClass)

        var listResult = [];
        for(let i = 0; i < dataClass.length; i++){
            console.log('i = ',i,', classID = ',dataClass[i].CID)
            /// Lấy ra tên giáo viên dạy
            let resTeacher = await fetch('http://localhost:5000/user/' + String(dataClass[i].TID));
            let dataTeacher = await resTeacher.json();
            let nameTeacher = dataTeacher.user.FullName;
            /////Lấy ra các buổi học của lớp đó
            let resLesson = await fetch('http://localhost:5000/class/lesson/' + String(dataClass[i].CID));
            let dataLesson = await resLesson.json();
            dataLesson = dataLesson.classes;
            console.log('danh sach buoi hoc: ',dataLesson);
            var latest_BID = 'cc';  // id buổi học gần đây nhất
            var today = new Date();
            for(let j = 0; j < dataLesson.length; j++) {
                if(Date(dataLesson[j].Ngay) >= today){latest_BID = dataLesson[j].ID; break;}
            }
            console.log('buoi hoc gan day nhat: ',latest_BID)
            // Lấy ra số lượng thành viên có mặt của buổi học gần nhất
            let resPresent = await fetch('http://localhost:5000/lesson/all'); //sẽ thay đổi link, lấy ra số lượng thành viên tham gia vào buổi học gần nhất
            let dataPresent = await resPresent.json();
            dataPresent = dataPresent.lessons; //// sẽ đổi theo kết quả link truy cập
            var Present_of_latestLesson = 0;
            if(dataClass[i].DateE < today)Present_of_latestLesson = -1;
            else {
              for (let j = 0; j < dataPresent.length; j++){
                if(dataPresent[j].BID === latest_BID ){Present_of_latestLesson = dataPresent[j].Present; break;}
            }
            }
            /// Kết quả
            listResult.push({"CID": dataClass[i].CID, "CType": dataClass[i].CType, "Teacher": nameTeacher, "Present": Present_of_latestLesson, "NumStudent": dataClass[i].NumStudent, "latest_BID": latest_BID})
        }
        setClass(listResult);
    }
    useEffect (()=>{
      fetchData();
      },[]);
    //////////////////////Layer danh sách students ////////////////
    const list_student = (CID, BID) =>{
    
      const fetchInfo = async() => {
        let resStudent = await fetch(''); /////Thêm link lấy ra danh sách học sinh của một lớp với ID = CID
        let dataStudent = await resStudent.json();
        dataStudent = dataStudent.student;

        let resPresent = await fetch('') /// Thêm link lấy ra kết quả điểm danh của một buổi học gần nhất = BID
        let dataPresent = await resPresent.json();

        var listStudent = [];
        for(let i = 0; i < dataStudent.length; i++){
          let resultPresent = '';
          let resultNote = '';
          for(let j = 0; j < dataPresent.length; j++){
            if(dataStudent[i].ID === dataPresent[j].SID) {resultPresent = dataPresent[j].status; resultNote = dataPresent[j].note}
          }
          listStudent.push({"ID": dataStudent[i].ID, "Name": dataStudent[i].FullName, "Sex": dataStudent[i].Sex, "Phone": dataStudent[i].Phone, "Present": resultPresent, "Note": resultNote});
        }
        return listStudent;
      }
      const getInfo = async ()=>{
        let res = await fetchInfo();
        setStudent(res);
      }
      getInfo();
      ///////////////////// Hiển thị một student //////////////
      const a_student = (ID, Name, CID)=>{
        const fetchLesson = async () => {
          let resLesson = await fetch(''); ////// Lấy ra các buổi học của một class có CID nhập vào
          let dataLesson = await resLesson.json();
          dataLesson = dataLesson.lesson;
          var resultPresent = [];
          var today = new Date();
          var thu = '';
          for(let i=0; i<dataLesson.length; i++) {
            var p = Date(dataLesson[i].Ngay).getDay();
            if(p === 0) thu = 'Sunday';
            else if(p === 1) thu = 'Monday';
            else if(p === 2) thu = 'Tuesday';
            else if(p === 3) thu = 'Wednesday';
            else if(p === 4) thu = 'Thursday';
            else if(p === 5) thu = 'Friday';
            else if(p === 6) thu = 'Saturday';
            if(Date(dataLesson[i].Ngay) < today){
              let resLearn = await fetch('');  ///// Lấy ra danh sách các học sinh trong buổi học có BID = dataLesson[i].ID
              let dataLearn = await resLearn.json();
              dataLearn = dataLearn.lesson;
              for(let j=0; j<dataLearn.length;j++) {
                if(dataLearn[j].SID===ID){
                  resultPresent.push({"Thu": thu, "Date": dataLesson[i].Ngay, "Status":dataLearn[j].status, "Note": dataLearn[j].note })
                  break;
                }
              }
            }
            else {
              resultPresent.push({"Thu": thu, "Date": dataLesson[i].Ngay, "Status": "Soon", "Note": "" })
            }
          }
          setLesson(resultPresent);
        }
        fetchLesson();
        ReactDOM.render(<>
          <div className = "Name_of_teacher">Kết quả điểm danh của {Name} trong lớp {CID}</div>
          <div className="List_Lesson">
          {
            lesson.map((t) => {
             if(t.status === 'Soon'){
              return (
                <div className = "Present_Lesson bgWhite">
                <div className = "Time_Lesson">
                <p className = "Time_Thu">{t.Thu}</p>
                <p className = "Time_Day">{t.Date}</p>
                </div>
                <div className = "Note_Lesson">{t.Note}</div>
                </div>
              )
             }
             else if(t.status === 'V'){
              return (
                <div className = "Present_Lesson bgRed">
                <div className = "Time_Lesson">
                <p className = "Time_Thu">{t.Thu}</p>
                <p className = "Time_Day">{t.Date}</p>
                </div>
                <div className = "Note_Lesson">{t.Note}</div>
                </div>
              )
             }
             else if(t.status === 'T'){
              return (
                <div className = "Present_Lesson bgYellow">
                <div className = "Time_Lesson">
                <p className = "Time_Thu">{t.Thu}</p>
                <p className = "Time_Day">{t.Date}</p>
                </div>
                <div className = "Note_Lesson">{t.Note}</div>
                </div>
              )
             }
             else {
              return (
                <div className = "Present_Lesson bgGreen">
                <div className = "Time_Lesson">
                <p className = "Time_Thu">{t.Thu}</p>
                <p className = "Time_Day">{t.Date}</p>
                </div>
                <div className = "Note_Lesson">{t.Note}</div>
                </div>
              )
             }
            })
          }
          </div>
          </>, document.getElementById('a_student'))
      }

      
      ReactDOM.render(
      <>
      <button id = "back" onClick = {() => {document.getElementById('listStudent').style.display = "flex";
        document.getElementById('a_student').style.display = "none"; document.getElementById('back').style.display = "none";}}>Go Back</button>
      <div id = "listStudent">
      <div className = "Name_of_teacher">List Student of class {CID}</div>
      <div className = "Search_Presence_Teacher">
        <input type="text" className = "CTypeSearch" id = "find_name" placeholder='Tìm tên học sinh'></input>
        <select className = "CTypeSearch" id = "find_sex">
        <option value = "null" className='TextSearch'>Sex</option>
        <option value = "Male" className='TextSearch'>Male</option>
        <option value = "Female" className='TextSearch'>Female</option>
        </select>
        <div>
        <input type = "checkbox" id = "absent" />Show only the absent
        </div>
        <button type = "button" className='Button_Search' onClick = {async ()=> {
          var data = await fetchInfo();
          var newData = [];
          let name = document.getElementById("find_name").value;
          let sex = document.getElementById("find_sex").value;
          let absent = document.getElementById("absent").value;
          console.log(name);
          console.log(sex);
          console.log(absent);
          if(name){
            for(let i = 0; i <data.length; i++){
              if(data[i].Name === name)newData.push(data[i]);
            }
          }
          else if(sex!== "null"){
            for(let i = 0; i <data.length; i++){
              if(data[i].Sex === sex)newData.push(data[i]);
            }
          }
          else if(absent){
            for(let i = 0; i <data.length; i++){
              if(data[i].Present === 'V')newData.push(data[i]);
            }
          }
          else newData = data;
          setStudent(newData);
        }
      }>Tìm kiếm</button>
      </div>
      <div className = "NameColumn backgroundBlue">
      <p className = "Text_NameColumn colorWhite">ID</p>
      <p className = "Text_NameColumn colorWhite">Name</p>
      <p className = "Text_NameColumn colorWhite">Sex</p>
      <p className = "Text_NameColumn colorWhite">Phone</p>
      <p className = "Text_NameColumn colorWhite">Present</p>
      <p className = "Text_NameColumn colorWhite">Note</p>
      </div>
      {student.map((t) => {
        return (
        <div className = "NameColumn editRows" onClick ={ () => { document.getElementById('listStudent').style.display = "none";
        document.getElementById('a_student').style.display = "flex"; document.getElementById('back').style.display = "flex";
         a_student(t.ID, t.Namet, CID);}} style = {{cursor: 'pointer'}}>
        <p className = "Text_NameColumn margin_ID">{t.ID}</p>
        <p className = "Text_NameColumn margin_FullName">{t.Name}</p>
        <p className = "Text_NameColumn margin_Sex">{t.Sex}</p>
        <p className = "Text_NameColumn margin_CID">{t.Phone}</p>
        <p className = "Text_NameColumn margin_CID">{t.Present}</p>
        <p className = "Text_NameColumn margin_CID">{t.Note}</p>
        </div>
    )
      })}
      </div>
      <div className = "a_student"></div>
      </>,
      document.getElementById('list_student')
    )
    }

    return (
        <>
        <button id = "back" onClick = {() => {document.getElementById('list_classes').style.display = "flex";
        document.getElementById('list_student').style.display = "none"; document.getElementById('back').style.display = "none";}}>Go Back</button>
        
        <div id = "list_classes">
        <div className = "Search_Presence_Teacher">
          <input type = "text" className = "TextSearch" id = "find_CID" placeholder = "Theo mã lớp học" />
          <input type = "text" className = "TextSearch" id = "find_Teacher" placeholder = "Theo tên giáo viên" />
          <select className = "CTypeSearch" id = "find_CType">
            <option value = "null" className='TextSearch'>Tất cả</option>
            <option value = "1A" className='TextSearch'>1A</option>
            <option value = "2A" className='TextSearch'>2A</option>
            <option value = "3A" className='TextSearch'>3A</option>
            <option value = "4A" className='TextSearch'>4A</option>
          </select>
          <button className='Button_Search' onClick ={ async () => {
            var data = fetchData();
              var newData = [];
              let CID = document.getElementById('find_CID').value;
              let teacher = document.getElementById('find_Teacher').value;
              let CType = document.getElementById('find_CType').value;
              console.log(CID);
              console.log(teacher);
              console.log(CType);
              if(CID){
                for(let i = 0; i <data.length; i++)
                  if(data[i].CID === CID) newData.push(data[i]);
              }
              else if(teacher){ 
                for(let i = 0; i <data.length; i++) 
                  if(data[i].Teacher === teacher) newData.push(data[i]);
              }
              else if(CType!=="null"){
                for(let i = 0; i < data.length; i++) 
                  if(data[i].CType ===CType) newData.push(data[i]);
              }
              else newData = data;
              console.log(newData);
              setClass(newData);
            document.getElementById('find_CID').value = "";
            document.getElementById('find_Teacher').value = "";
            document.getElementById('find_CType').value = "null";
            }
          }
          >Tìm kiếm</button>
        </div>
        
        <div className = "NameColumn backgroundBlue">
          <p className = "Text_NameColumn colorWhite">ID of Class</p>
          <p className = "Text_NameColumn colorWhite">Type</p>
          <p className = "Text_NameColumn colorWhite">Teacher</p>
          <p className = "Text_NameColumn colorWhite">Present</p>
          <p className = "Text_NameColumn colorWhite">Statistical</p>
        </div>
        {classes.map((t) => {
          return (
          <div className = "NameColumn editRows" onClick ={ () => { document.getElementById('list_classes').style.display = "none";
          document.getElementById('list_student').style.display = "flex"; document.getElementById('back').style.display = "flex";
           list_student(t.ID, t.latest_BID);}} style = {{cursor: 'pointer'}}>
          <p className = "Text_NameColumn margin_ID">{t.CID}</p>
          <p className = "Text_NameColumn margin_CType">{t.CType}</p>
          <p className = "Text_NameColumn margin_teacher">{t.Teacher}</p>
          {(t.Present=== -1)? <p className = "Text_NameColumn margin_Present">Finish</p> : <p className = "Text_NameColumn margin_Present">{t.Present}/{t.NumStudent}</p>}
          <p className = "Text_NameColumn margin_Statis">Statistical</p>
      </div>
      )
        })}
        </div>
        <div id = "list_student"></div>
        </>
      )
}

export default Attendance;