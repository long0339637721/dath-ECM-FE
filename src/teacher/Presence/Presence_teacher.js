import './Presence_teacher.css';
import {useState, useEffect, React} from 'react'
import ReactDOM from 'react-dom';
//import {FaChartSimple} from 'react-icons/fa';
const token = localStorage.getItem("token")
var listThu = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function Go_Back(){
  document.getElementById('list_teacher').style.display = "flex";
  document.getElementById('a_teacher').style.display = "none"; 
  document.getElementById('back').style.display = "none";
}
function fetchData(getLink,callback){
  fetch(getLink,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    },
  })
  .then(function(response){
    return response.json();
  })
  .then(callback)
}

function filter_week(today, fromDay, data, absent){
  var getDate;
  var newData = [];
  data.map(function(t){
    
    getDate = new Date(t.Ngay.substring(10,0));
    console.log(getDate);
    console.log(fromDay);
    console.log(today);
    if(fromDay <= getDate && getDate <= today) {
      console.log(t);
      if(absent){
        if (t.status === "V")newData.push(t);
      }
      else newData.push(t);
    }
    return 0;
  })
  return newData;
}

function filter_month(today, data, absent){
  var fromDay =new Date(today.getFullYear(), today.getMonth(), 1);
  var getDate;
  var newData = [];
  data.map(function(t){
    getDate =new Date(t.Ngay.substring(10,0));
    if(fromDay <= getDate && getDate <= today) {
      if(absent){
        if (t.status === "V")newData.push(t);
      }
    else newData.push(t);
    }
    return 0;
  })
  return newData;
}

function find_Time(data){
        var newData = [];
       
        let week = document.getElementById('find_week').value;
        let month = document.getElementById('find_month').value;
        let date = document.getElementById('find_date').value;
        let absent = document.getElementById('absent').checked;
        
        var today = new Date();
        var fromDay;
        if(week!=="null"){
            if(week === "Tuần hiện tại"){
              var a = new Date(today.getTime() - today.getTime()%86400000);
              if(today.getDay() === 0){fromDay =new Date(a.getTime() - 86400000*6);}
              else if(today.getDay() === 1){fromDay = today;}
              else if(today.getDay() === 2){fromDay =new Date(a.getTime() - 86400000*1);}
              else if(today.getDay() === 3){fromDay =new Date(a.getTime() - 86400000*2);}
              else if(today.getDay() === 4){fromDay =new Date(a.getTime() - 86400000*3);}
              else if(today.getDay() === 5){fromDay =new Date(a.getTime() - 86400000*4);}
              else if(today.getDay() === 6){fromDay =new Date(a.getTime() - 86400000*5);}
              newData = filter_week(today, fromDay, data, absent);
            }
            else if(week === "1 Tuần"){
              today = new Date(today.getTime() - today.getTime()%86400000);
              if(today.getDay() === 0){today =new Date(today.getTime() - 86400000*7);}
              else if(today.getDay() === 1){today =new Date(today.getTime() - 86400000*1);}
              else if(today.getDay() === 2){today =new Date(today.getTime() - 86400000*2);}
              else if(today.getDay() === 3){today =new Date(today.getTime() - 86400000*3);}
              else if(today.getDay() === 4){today =new Date(today.getTime() - 86400000*4);}
              else if(today.getDay() === 5){today =new Date(today.getTime() - 86400000*5);}
              else if(today.getDay() === 6){today =new Date(today.getTime() - 86400000*6);}
              fromDay =new Date(today.getTime() - 86400000*6);
              newData = filter_week(today, fromDay, data, absent);
            }
            else if(week === "2 Tuần"){
              today = new Date(today.getTime() - today.getTime()%86400000);
              if(today.getDay() === 0){today =new Date(today.getTime() - 86400000*14);}
              else if(today.getDay() === 1){today =new Date(today.getTime() - 86400000*8);}
              else if(today.getDay() === 2){today =new Date(today.getTime() - 86400000*9);}
              else if(today.getDay() === 3){today =new Date(today.getTime() - 86400000*10);}
              else if(today.getDay() === 4){today =new Date(today.getTime() - 86400000*11);}
              else if(today.getDay() === 5){today =new Date(today.getTime() - 86400000*12);}
              else if(today.getDay() === 6){today =new Date(today.getTime() - 86400000*13);}
              fromDay =new Date(today.getTime() - 86400000*6);
              newData = filter_week(today, fromDay, data, absent);
            }
            else if(week === "3 Tuần"){
              today = new Date(today.getTime() - today.getTime()%86400000);
              if(today.getDay() === 0){today = new Date(today.getTime() - 86400000*21);}
              else if(today.getDay() === 1){today =new Date(today.getTime() - 86400000*15);}
              else if(today.getDay() === 2){today =new Date(today.getTime() - 86400000*16);}
              else if(today.getDay() === 3){today =new Date(today.getTime() - 86400000*17);}
              else if(today.getDay() === 4){today =new Date(today.getTime() - 86400000*18);}
              else if(today.getDay() === 5){today =new Date(today.getTime() - 86400000*19);}
              else if(today.getDay() === 6){today =new Date(today.getTime() - 86400000*20);}
              fromDay =new Date(today.getTime() - 86400000*6);
              newData = filter_week(today, fromDay, data, absent);
            }
            else if(week === "4 Tuần"){
              today = new Date(today.getTime() - today.getTime()%86400000);
              if(today.getDay() === 0){today =new Date(today.getTime() - 86400000*28);}
              else if(today.getDay() === 1){today =new Date(today.getTime() - 86400000*22);}
              else if(today.getDay() === 2){today =new Date(today.getTime() - 86400000*23);}
              else if(today.getDay() === 3){today =new Date(today.getTime() - 86400000*24);}
              else if(today.getDay() === 4){today =new Date(today.getTime() - 86400000*25);}
              else if(today.getDay() === 5){today =new Date(today.getTime() - 86400000*26);}
              else if(today.getDay() === 6){today =new Date(today.getTime() - 86400000*27);}
              fromDay =new Date(today.getTime() - 86400000*6);
              newData = filter_week(today, fromDay, data, absent);
          }
        }
          else if(month!=="null"){
            today = new Date(today.getTime() - today.getTime()%86400000);
            if(month === "Tháng hiện tại"){
              newData = filter_month(today, data, absent);
            }
            else if(month === "1 tháng"){
              if (today.getMonth()===0) {today.setFullYear(today.getFullYear()-1); today.setMonth(11); today.setDate(31);}
              else if (today.getMonth()===1) { today.setMonth(0); today.setDate(31);}
              else if (today.getMonth()===2) { today.setMonth(1); today.setDate(28);}
              else if (today.getMonth()===3) { today.setMonth(2); today.setDate(31);}
              else if (today.getMonth()===4) { today.setMonth(3); today.setDate(30);}
              else if (today.getMonth()===5) { today.setMonth(4); today.setDate(31);}
              else if (today.getMonth()===6) { today.setMonth(5); today.setDate(30);}
              else if (today.getMonth()===7) { today.setMonth(6); today.setDate(31);}
              else if (today.getMonth()===8) { today.setMonth(7); today.setDate(31);}
              else if (today.getMonth()===9) { today.setMonth(8); today.setDate(30);}
              else if (today.getMonth()===10) { today.setMonth(9); today.setDate(31);}
              else if (today.getMonth()===11) { today.setMonth(10); today.setDate(30);}
              newData = filter_month(today, data, absent);
            }
            else if(month === "2 tháng"){
              if (today.getMonth()===0) {today.setFullYear(today.getFullYear()-1); today.setMonth(10); today.setDate(30);}
              else if (today.getMonth()===1) {today.setFullYear(today.getFullYear()-1); today.setMonth(11); today.setDate(31);}
              else if (today.getMonth()===2) { today.setMonth(0); today.setDate(31);}
              else if (today.getMonth()===3) { today.setMonth(1); today.setDate(28);}
              else if (today.getMonth()===4) { today.setMonth(2); today.setDate(31);}
              else if (today.getMonth()===5) { today.setMonth(3); today.setDate(30);}
              else if (today.getMonth()===6) { today.setMonth(4); today.setDate(31);}
              else if (today.getMonth()===7) { today.setMonth(5); today.setDate(30);}
              else if (today.getMonth()===8) { today.setMonth(6); today.setDate(31);}
              else if (today.getMonth()===9) { today.setMonth(7); today.setDate(31);}
              else if (today.getMonth()===10) { today.setMonth(8); today.setDate(30);}
              else if (today.getMonth()===11) { today.setMonth(9); today.setDate(31);}
              newData = filter_month(today, data, absent);
            }
            else if(month === "3 tháng"){
              if (today.getMonth()===0) {today.setFullYear(today.getFullYear()-1); today.setMonth(9); today.setDate(31);}
              else if (today.getMonth()===1) {today.setFullYear(today.getFullYear()-1); today.setMonth(10); today.setDate(30);}
              else if (today.getMonth()===2) {today.setFullYear(today.getFullYear()-1); today.setMonth(11); today.setDate(31);}
              else if (today.getMonth()===3) { today.setMonth(0); today.setDate(31);}
              else if (today.getMonth()===4) { today.setMonth(1); today.setDate(28);}
              else if (today.getMonth()===5) { today.setMonth(2); today.setDate(31);}
              else if (today.getMonth()===6) { today.setMonth(3); today.setDate(30);}
              else if (today.getMonth()===7) { today.setMonth(4); today.setDate(31);}
              else if (today.getMonth()===8) { today.setMonth(5); today.setDate(30);}
              else if (today.getMonth()===9) { today.setMonth(6); today.setDate(31);}
              else if (today.getMonth()===10) { today.setMonth(7); today.setDate(31);}
              else if (today.getMonth()===11) { today.setMonth(8); today.setDate(30);}
              newData = filter_month(today, data, absent);
            }
            else if(month === "4 tháng"){
              if (today.getMonth()===0) {today.setFullYear(today.getFullYear()-1); today.setMonth(8); today.setDate(30);}
              else if (today.getMonth()===1) {today.setFullYear(today.getFullYear()-1); today.setMonth(9); today.setDate(31);}
              else if (today.getMonth()===2) {today.setFullYear(today.getFullYear()-1); today.setMonth(10); today.setDate(30);}
              else if (today.getMonth()===3) {today.setFullYear(today.getFullYear()-1); today.setMonth(11); today.setDate(31);}
              else if (today.getMonth()===4) { today.setMonth(0); today.setDate(31);}
              else if (today.getMonth()===5) { today.setMonth(1); today.setDate(28);}
              else if (today.getMonth()===6) { today.setMonth(2); today.setDate(31);}
              else if (today.getMonth()===7) { today.setMonth(3); today.setDate(30);}
              else if (today.getMonth()===8) { today.setMonth(4); today.setDate(31);}
              else if (today.getMonth()===9) { today.setMonth(5); today.setDate(30);}
              else if (today.getMonth()===10) { today.setMonth(6); today.setDate(31);}
              else if (today.getMonth()===11) { today.setMonth(7); today.setDate(31);}
              newData = filter_month(today, data, absent);
          }
        }
          else if (date){
            
            data.map((t)=>{
              if(t.Ngay.substring(10,0) === date) {
                if(absent){
                  if (t.status === "V") newData.push(t);
                }
                else newData.push(t);
              }
              return 0;
            })
          }
          else newData = data;
          document.getElementById('find_week').value = "null";
          document.getElementById('find_month').value = "null";
          document.getElementById('find_date').value = null;
  return newData;
}
function Presence_a_teacher(ID, FullName){
  const linkATeacherAPI = 'http://localhost:5000/lesson/teacher/'+ ID;
  fetchData(linkATeacherAPI, function(response){
      var aTeacher = response.lessons;
      
  ReactDOM.render(
  <>
  <div className = "Name_of_teacher">{FullName}</div>
  <div className = "Search_Presence_Teacher">
    <select className = "CTypeSearch" id = "find_week">
    <option value = "null" className='TextSearch'>Tìm kết quả điểm danh theo tuần</option>
    <option value = "Tuần hiện tại" className='TextSearch'>Tuần hiện tại</option>
    <option value = "1 Tuần" className='TextSearch'>1 Tuần trước</option>
    <option value = "2 Tuần" className='TextSearch'>2 Tuần trước</option>
    <option value = "3 Tuần" className='TextSearch'>3 Tuần trước</option>
    <option value = "4 Tuần" className='TextSearch'>4 Tuần trước</option>
    </select>
    <select className = "CTypeSearch" id = "find_month">
    <option value = "null" className='TextSearch'>Tìm kết quả điểm danh theo tháng</option>
    <option value = "Tháng hiện tại" className='TextSearch'>Tháng hiện tại</option>
    <option value = "1 tháng" className='TextSearch'>1 Tháng trước</option>
    <option value = "2 tháng" className='TextSearch'>2 Tháng trước</option>
    <option value = "3 tháng" className='TextSearch'>3 Tháng trước</option>
    <option value = "4 tháng" className='TextSearch'>4 Tháng trước</option>
    </select>
    <input type="date" className = 'TextSearch' id = "find_date"/>
    <div>
    <input type = "checkbox" id = "absent" />Show only the absent 
    </div>
    <button type = "button" className='Button_Search' onClick = {() => {
      var newData = find_Time(aTeacher);
      
      ReactDOM.render(
        <>
        {newData.map((t) => {
          
          var date = new Date(t.Ngay.substring(10,0));
          
          return (
          <div className = "NameColumn editRows" >
          <p className = "Text_NameColumn TLID">{t.ID}</p>
          <p className = "Text_NameColumn TCID">{t.CID}</p>
          <p className = "Text_NameColumn TD">{listThu[date.getDay()]},{date.getDate()+1}/{date.getMonth()+1}/{date.getFullYear()}</p>
          <p className = "Text_NameColumn TT">{String(Number(t.tiet_bat_dau) + 6) + ':00'}</p>
          {(t.status === 'V')? 
            <><p className = "Text_NameColumn TP">Vắng</p>
              <p className = "Text_NameColumn TN">{t.note + " Đã đăng ký dạy bù vào buổi " + String(t.ID_bu)}</p></>
            : (t.status === 'T')?
                <><p className = "Text_NameColumn TP">Trễ</p>
                  <p className = "Text_NameColumn TN">{t.note}</p></>
              : <><p className = "Text_NameColumn TP">Có</p>
                  <p className = "Text_NameColumn TN">{t.note}</p></>
          }    
      </div>
      )
        })}
        </>
        ,document.getElementById("Rows"));
    }}
    >Tìm kiếm</button>
  </div>
  <div className = "NameColumn backgroundBlue">
  <p className = "Text_NameColumn colorWhite TLID">ID of Lesson</p>
  <p className = "Text_NameColumn colorWhite TCID">ID of Class</p>
  <p className = "Text_NameColumn colorWhite TD">Date</p>
  <p className = "Text_NameColumn colorWhite TT">Time Start</p>
  <p className = "Text_NameColumn colorWhite TP">Present</p>
  <p className = "Text_NameColumn colorWhite TN">Note</p>
  </div>
  <div id = "Rows">
  {aTeacher.map((t) => {
    
    var date = new Date(t.Ngay.substring(10,0));
    return (
    <div className = "NameColumn editRows" >
    <p className = "Text_NameColumn TLID">{t.ID}</p>
    <p className = "Text_NameColumn TCID">{t.CID}</p>
    <p className = "Text_NameColumn TD">{listThu[date.getDay()]},{date.getDate()+1}/{date.getMonth()+1}/{date.getFullYear()}</p>
    <p className = "Text_NameColumn TT">{String(Number(t.tiet_bat_dau) + 6) + ':00'}</p>
    {(t.status === 'V')? 
      <><p className = "Text_NameColumn TP">Vắng</p>
        <p className = "Text_NameColumn TN">{t.note + " Đã đăng ký dạy bù vào buổi " + String(t.ID_bu)}</p></>
      : (t.status === 'T')?
          <><p className = "Text_NameColumn TP">Trễ</p>
            <p className = "Text_NameColumn TN">{t.note}</p></>
        : (t.status === 'C')?
            <><p className = "Text_NameColumn TP">Có</p>
            <p className = "Text_NameColumn TN">{t.note}</p></>
          : <><p className = "Text_NameColumn TP">Chưa được điểm danh</p>
             <p className = "Text_NameColumn TN">{t.note}</p></>
    }    
</div>
)
  })}
  </div>
  
  </>,
  document.getElementById('a_teacher')
)
});
}

const Presence_list_teacher = () => {
  const [ateacher, setListTeacher] = useState([]);

  const fetchInfo = async() => {
    let res = await fetch('http://localhost:5000/user/teacherClass/all',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
    let data = await res.json();
    data = data.users;

    res = await fetch('http://localhost:5000/user/teacher/all',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
    let list = await res.json();
    list = list.users;

    var listResult = [];
    let listCID = "";
    let lisCType = "";
    for(let i = 0; i < list.length; i++){
      listCID = "";
      lisCType = "";
      for(let j = 0; j < data.length; j++){
        if(list[i].ID===data[j].ID){
          listCID = listCID + data[j].CID + ",";
          lisCType = lisCType + data[j].CType + ",";
        }
      }
      if(listCID!==""){
        listCID = listCID.slice(0,-1);
        lisCType = lisCType.slice(0,-1);
        listResult.push({"ID": list[i].ID, "FullName": list[i].FullName, "Sex": list[i].Sex, "CID":listCID, "CType": lisCType})
      }
      
    }
    setListTeacher(listResult);
    return listResult;
  }

  const find_type = async () => {
    var data = await fetchInfo();
      
      var newData = [];
      let name = document.getElementById('find_name').value;
      let CID = document.getElementById('find_CID').value;
      let CType = document.getElementById('find_CType').value;
      
      if(name){
        for(let i = 0; i <data.length; i++)
          if(data[i].FullName === name) newData.push(data[i]);
      }
      else if(CID){ 
        for(let i = 0; i <data.length; i++) 
          if(data[i].CID.search(CID) !== -1) newData.push(data[i]);
      }
      else if(CType!=="null"){
        for(let i = 0; i < data.length; i++) 
          if(data[i].CType.search(CType) !== -1) newData.push(data[i]);
      }
      else newData = data;
      
      setListTeacher(newData);
    document.getElementById('find_name').value = "";
    document.getElementById('find_CID').value = "";
    document.getElementById('find_CType').value = "null";
  }
  useEffect(()=>{
    fetchInfo();
  },[]);
  //////////////////// Hiển thị kết quả điểm danh của một giáo viên //////////////////////
  
  /////////////////////////////////////////////////
  return (
    <>
    <button id = "back" onClick = {() => {Go_Back();}}>Go Back</button>
    <div id = "list_teacher">
    <div className = "Search_Presence_Teacher">
      <input type = "text" className = "TextSearch" id = "find_name" placeholder = "Theo tên" />
      <input type = "text" className = "TextSearch" id = "find_CID" placeholder = "Theo mã lớp học" />
      <select className = "CTypeSearch" id = "find_CType">
        <option value = "null" className='TextSearch'>Tất cả</option>
        <option value = "1A" className='TextSearch'>1A</option>
        <option value = "2A" className='TextSearch'>2A</option>
        <option value = "3A" className='TextSearch'>3A</option>
        <option value = "4A" className='TextSearch'>4A</option>
      </select>
      <button className='Button_Search' onClick ={ find_type}>Tìm kiếm</button>
    </div>
    <p className = "Tieu_de_P">Xem kết quả điểm danh của giáo viên</p>
    <div className = "NameColumn backgroundBlue">
      <p className = "Text_NameColumn colorWhite PTID">ID</p>
      <p className = "Text_NameColumn colorWhite PTFullName">Teacher</p>
      <p className = "Text_NameColumn colorWhite PTSex">Sex</p>
      <p className = "Text_NameColumn colorWhite PTCID">ID of classes</p>
      <p className = "Text_NameColumn colorWhite PTCType">Type of classes</p>
    </div>
    {ateacher.map((t) => {
      
      return (
      <div className = "NameColumn editRows" onClick ={ () => { document.getElementById('list_teacher').style.display = "none";
      document.getElementById('a_teacher').style.display = "flex"; document.getElementById('back').style.display = "flex";
       Presence_a_teacher(t.ID, t.FullName);}} style = {{cursor: 'pointer'}}>
      <p className = "Text_NameColumn PTID">{t.ID}</p>
      <p className = "Text_NameColumn PTFullName">{t.FullName}</p>
      <p className = "Text_NameColumn PTSex">{t.Sex}</p>
      <p className = "Text_NameColumn PTCID">{t.CID}</p>
      <p className = "Text_NameColumn PTCType">{t.CType}</p>
  </div>
  )
    })}
    </div>
    <div id = "a_teacher"></div>
    </>
  )
}



export default Presence_list_teacher;