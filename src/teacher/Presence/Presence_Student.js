import './Presence_Student.css';
import {useState, useEffect, React} from 'react';
import ReactDOM from 'react-dom';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from 'recharts';

const token = localStorage.getItem("token")
const myID = localStorage.getItem("id")
var listThu = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const a_student = (ID, Name, CID)=>{
  const fetchLesson = async () => {
    let resLesson = await fetch('http://localhost:5000/class/lesson/'+ CID,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      }); ////// Lấy ra các buổi học của một class có CID nhập vào
    let dataLesson = await resLesson.json();
    dataLesson = dataLesson.classes;

    var resultPresent = [];
    var today = new Date();
    
    var thu = '';
    for(let i=0; i<dataLesson.length; i++) {
      console.log(dataLesson[i].Ngay);
      var date1 = new Date(dataLesson[i].Ngay);
      console.log(date1);
      dataLesson[i].Ngay = String(date1.getDate()) +'/'+ String(date1.getMonth()+1) + '/' + String(date1.getFullYear()) ;
      console.log(dataLesson[i].Ngay);
      thu = listThu[date1.getDay()]; 
      console.log(thu);
    
        let resLearn = await fetch('http://localhost:5000/lesson/hoc/'+ dataLesson[i].ID,{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
          });  ///// Lấy ra danh sách các học sinh trong buổi học có BID = dataLesson[i].ID
        let dataLearn = await resLearn.json();
        dataLearn = dataLearn.lessons;
          var learned =0;
        for(let j=0; j<dataLearn.length;j++) {
          if(dataLearn[j].SID === ID){
            resultPresent.push({"Thu": thu, "Date": dataLesson[i].Ngay, "Status":dataLearn[j].status, "Note": dataLearn[j].note })
            learned = 1;
            break;
          }
        }
      
      if(learned === 0){
        resultPresent.push({"Thu": thu, "Date": dataLesson[i].Ngay, "Status": "Soon", "Note": "" })
      }
    }
  console.log(resultPresent);
  ReactDOM.render(<>
    <div className = "Name_of_teacher">Kết quả điểm danh của {Name} trong lớp {CID}</div>
    <div className = "ghichu1" >
        
        <div className='ghichu' style = {{background: "#86fc4f"}}></div>
        <p>: Có mặt</p>
        <div className='ghichu' style = {{background: "#f5ef56"}}></div>
        <p>: Trễ học</p>
        <div className='ghichu' style = {{background: "#f45b5b"}}></div>
        <p>: Vắng học</p>
        <div className='ghichu' style = {{background: "#ffff"}}></div>
        <p>: Chưa được điểm danh</p>
    </div>
    
    <div className = "List_Lesson">
    {
      resultPresent.map((t) => {
        return (
          <div className = {"Present_Lesson " + ((t.Status === 'Soon' || t.Status === "N")? "bgWhite" : t.Status === 'V'? "bgRed" : t.Status === 'T'? "bgYellow": "bgGreen")}>
          <div className = "Time_Lesson">
          <p className = "Time_Thu">{t.Thu}</p>
          <p className = "Time_Day">{t.Date}</p>
          </div>
          <div className = "Note_Lesson">{t.Note}</div>
          </div>
        )
      })
    }
    </div>
    </>, document.getElementById('a_student'))
  }
  fetchLesson();
}

function find_Student(data){
  var newData = [];
      let name = document.getElementById("find_name").value;
      let sex = document.getElementById("find_sex").value;
      let absent = document.getElementById("absent").checked;
      console.log(name);
      console.log(sex);
      console.log(absent);
      if(name){
        for(let i = 0; i <data.length; i++){
          if(data[i].Name === name)newData.push(data[i]);
        }
      }
      else if(sex !== "null"){
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
      document.getElementById("find_name").value = "";
      document.getElementById("find_sex").value = "null";
      document.getElementById("absent").checked = false;

    return newData;
}

const list_student = (CID, BID) =>{
  var listStudent = [];
  const fetchInfoStudent = async() => {
    let resStudent = await fetch('http://localhost:5000/class/student/' + CID,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      }); /////Thêm link lấy ra danh sách học sinh của một lớp với ID = CID
    let dataStudent = await resStudent.json();
    dataStudent = dataStudent.classes;

    let resPresent = await fetch('http://localhost:5000/lesson/hoc/'+ BID,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      })  /// Thêm link lấy ra kết quả điểm danh của một buổi học gần nhất = BID
    let dataPresent = await resPresent.json();
    dataPresent = dataPresent.lessons;


    for(let i = 0; i < dataStudent.length; i++){
      let resultPresent = '';
      let resultNote = '';
      for(let j = 0; j < dataPresent.length; j++){
        if(dataStudent[i].ID === dataPresent[j].SID) {resultPresent = dataPresent[j].status; resultNote = dataPresent[j].note}
      }
      listStudent.push({"ID": dataStudent[i].ID, "Name": dataStudent[i].FullName, "Sex": dataStudent[i].Sex, "Phone": dataStudent[i].Phone, "Present": resultPresent, "Note": resultNote});
    }

  ReactDOM.render(
  <>
  <div className = "Name_of_teacher">Danh sách học viên của lớp {CID}</div>
  <div className = "Search_Presence_Teacher">
    <input type="text" className = "CTypeSearch" id = "find_name" placeholder='Tìm tên học sinh'></input>
    <select className = "CTypeSearch" id = "find_sex">
    <option value = "null" className='TextSearch'>Sex</option>
    <option value = "M" className='TextSearch'>Male</option>
    <option value = "F" className='TextSearch'>Female</option>
    </select>
    <div>
    <input type = "checkbox" id = "absent" />Show only the absent
    </div>
    <button type = "button" className='Button_Search' 
    onClick = {()=> {
      document.getElementById("RowsListStudent").style.display = "none";
      document.getElementById("RowsListStudent1").style.display = "table";

      var newData = find_Student(listStudent);
      ReactDOM.render(
        <>
        <thead>
          <tr className = "NameColumn backgroundBlue">
          <th className = "Text_NameColumn colorWhite">ID</th>
          <th className = "Text_NameColumn colorWhite">Name</th>
          <th className = "Text_NameColumn colorWhite">Sex</th>
          <th className = "Text_NameColumn colorWhite">Phone</th>
          <th className = "Text_NameColumn colorWhite">Present</th>
          <th className = "Text_NameColumn colorWhite">Note</th>
        </tr>
        </thead>
    
        <tbody >
        { newData.map((t) => {
          return (
            <tr className = "NameColumn " 
            onClick ={ () => { document.getElementById('list_student').style.display = "none";
            document.getElementById('a_student').style.display = "flex"; 
            a_student(t.ID, t.Name, CID);}} style = {{cursor: 'pointer'}}
             >
            <td className = "Text_NameColumn">{t.ID}</td>
            <td className = "Text_NameColumn">{t.Name}</td>
            <td className = "Text_NameColumn">{t.Sex}</td>
            <td className = "Text_NameColumn">{t.Phone}</td>
            {(t.Present === "C")? <td className = "Text_NameColumn">Có</td>: 
            (t.Present === "T")? <td className = "Text_NameColumn">Trễ</td>: 
            (t.Present === "V")? <td className = "Text_NameColumn">Vắng</td>:<td className = "Text_NameColumn"></td>}
            <td className = "Text_NameColumn">{t.Note}</td>
            </tr>
          )
        }
        )}
        </tbody>
        </>,document.getElementById("RowsListStudent1"));
    }
  }
  >Tìm kiếm</button>
  </div>
  <table id = "RowsListStudent">
    <thead>
    <tr className = "NameColumn backgroundBlue">
    <th className = "Text_NameColumn colorWhite">ID</th>
    <th className = "Text_NameColumn colorWhite">Name</th>
    <th className = "Text_NameColumn colorWhite">Sex</th>
    <th className = "Text_NameColumn colorWhite">Phone</th>
    <th className = "Text_NameColumn colorWhite">Present</th>
    <th className = "Text_NameColumn colorWhite">Note</th>
  </tr>
    </thead>
    
  <tbody >
  { listStudent.map(
    (t) => {
    return (
    <tr className = "NameColumn " 
    onClick ={ () => { document.getElementById('list_student').style.display = "none";
    document.getElementById('a_student').style.display = "flex"; 
    a_student(t.ID, t.Name, CID);}} style = {{cursor: 'pointer'}}
     >
    <td className = "Text_NameColumn">{t.ID}</td>
    <td className = "Text_NameColumn">{t.Name}</td>
    <td className = "Text_NameColumn">{t.Sex}</td>
    <td className = "Text_NameColumn">{t.Phone}</td>
    {(t.Present === "C")? <td className = "Text_NameColumn">Có</td>: 
      (t.Present === "T")? <td className = "Text_NameColumn">Trễ</td>: 
      (t.Present === "V")? <td className = "Text_NameColumn">Vắng</td>:<td className = "Text_NameColumn"></td>}
    <td className = "Text_NameColumn">{t.Note}</td>
    </tr>
    
)
  }
  )}
  </tbody>
  </table>
  <table id = "RowsListStudent1"></table>
  </>,
  document.getElementById('list_student')
)
}
fetchInfoStudent();
}

function static_class(CID){
     var data_statis = [];
     const fetchDataStatis = async() => {
        let resClass = await fetch('http://localhost:5000/class/' + CID,{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              }); //lấy ra các buổi học của lớp đó
              console.log('http://localhost:5000/class/' + CID)
            let dataClass = await resClass.json();
            dataClass = dataClass.Class;
            console.log(dataClass)

        let resLesson = await fetch('http://localhost:5000/class/lesson/' + CID,{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              }); //lấy ra các buổi học của lớp đó
            let dataLesson = await resLesson.json();
            dataLesson = dataLesson.classes;

        let resPresent = await fetch('http://localhost:5000/lesson/hoc/present',{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              }); //lấy số lượng có mặt của các buổi học
            let dataPresent = await resPresent.json();
            dataPresent = dataPresent.lessons;

            let resNumStudent = await fetch('http://localhost:5000/class/student/' + CID,{
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
              },
            }); //sẽ thay đổi link, lấy ra số lượng thành viên tham gia vào buổi học gần nhất
          let dataNumStudent = await resNumStudent.json();
          dataNumStudent = dataNumStudent.classes; 

          var NumStudentStudy = dataNumStudent.length;
        for(let i = 0; i < dataLesson.length; i++){
            for (let j = 0; j < dataPresent.length; j++){
                if(dataPresent[j].BID === dataLesson[i].ID){
                    data_statis.push({"Time": dataLesson[i].Ngay , "SL": dataPresent[j].Present});
                    break;
                }
            }
        }
        if(data_statis.length === 0) {
          ReactDOM.render(
            <div className = "Name_of_teacher" style = {{margin: '3rem 0 0 5rem'}}>Không có kết quả thống kê của lớp {CID}</div>,
         document.getElementById('statistic_a_class'))
          return;
        }
        var month = []
        month.push(new Date(data_statis[0].Time).getMonth()+1)
        for (let i = 0; i < data_statis.length; i++) {
            if (month[0] !== new Date(data_statis[0].Time).getMonth()+1){
                month.push(new Date(data_statis[0].Time).getMonth()+1)
            }
        }
        var dataByMonth = [];
        for (let i = 0; i < month.length; i++){
            var dataThisMonth = [];
            for(let j = 0; j <data_statis.length; j++){
                if(month[i] === new Date(data_statis[0].Time).getMonth()+1){
                    dataThisMonth.push({"Time": "Date " + String(new Date(data_statis[j].Time).getDate()), "Number_of_student": data_statis[j].SL, "Month": month[i]});
                }
            }
            dataByMonth.push(dataThisMonth);
        }
        
        ReactDOM.render(
            <div className = "statisesofclass">
            <div className = "Name_of_teacher" style = {{margin: '3rem 0 0 7rem'}}>Kết quả thống kê của lớp {CID}</div>
            
            {
                dataByMonth.map((t)=>{
                    var numLesson = t.length;
                    var sumPresent = 0;
                    for (let i = 0; i < t.length; i++){
                        sumPresent += t[i].Number_of_student;
                    } 
                    var TB = sumPresent/numLesson;
                    console.log(t);
                    return(
                        <>
                        <div className="infoStatis">
                            <p style = {{color: "#0061FF", fontWeight: "600", fontSize: "20px"}}>Tháng {t[0].Month}</p>
                            <p>Số buổi: {numLesson}</p>
                            <p>Trung bình: {TB}/{NumStudentStudy}</p>
                        </div>
                            <BarChart data = {t} width = {400} height={400}
                            margin = {{top: 10, left: 20, right: 20, bottom: 10}}>
                                <CartesianGrid stroke='#ccc'></CartesianGrid>
                                <XAxis dataKey= "Time"></XAxis>
                                <YAxis dataKey= "Number_of_student"></YAxis>
                                <Tooltip></Tooltip>
                                <Legend></Legend>
                                <Bar dataKey = "Number_of_student" fill = "#52daf6"></Bar>

                            </BarChart>
                        
                        </>
                        
                    )
                })
            }
            
            </div>,
            // <h1>Thống kê</h1>,
         document.getElementById('statistic_a_class'))
    }
    fetchDataStatis();
}

const Presence_Student = () => {
    const [aclass, setClass] = useState([]);
    const fetchDataClass = async () => {
        let reslistClass = await fetch('http://localhost:5000/class/all',{
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
            },
          });
        let datalistClass = await reslistClass.json();
        datalistClass = datalistClass.classes;
        
        console.log(datalistClass);
        var dataClass = [];
        for(let i = 0; i < datalistClass.length; i++) {
          if(datalistClass[i].TID === myID){
            dataClass.push(datalistClass[i]);
          }
        }

        var listResult = [];
        for(let i = 0; i < dataClass.length; i++){
            /// Lấy ra tên giáo viên dạy
            let resTeacher = await fetch('http://localhost:5000/user/' + dataClass[i].TID,{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              });
            let dataTeacher = await resTeacher.json();
            let nameTeacher = dataTeacher.user.FullName;
            
            /////Lấy ra các buổi học của lớp đó
            let resLesson = await fetch('http://localhost:5000/class/lesson/' + dataClass[i].CID,{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              });
            let dataLesson = await resLesson.json();
            dataLesson = dataLesson.classes;
            

            var latest_BID = '';  // id buổi học gần đây nhất
            var today = new Date(); 
            for(let j = 0; j < dataLesson.length; j++) {
              
                if(new Date(dataLesson[j].Ngay)<= today){latest_BID = dataLesson[j].ID; break;}
            }
            // Lấy ra số lượng thành viên của lớp đó
            let resNumStudent = await fetch('http://localhost:5000/class/student/' + dataClass[i].CID,{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              }); //sẽ thay đổi link, lấy ra số lượng thành viên tham gia vào buổi học gần nhất
            let dataNumStudent = await resNumStudent.json();
            dataNumStudent = dataNumStudent.classes; 

            var NumStudentStudy = dataNumStudent.length;

            // Lấy ra số lượng thành viên có mặt của buổi học gần nhất
            let resPresent = await fetch('http://localhost:5000/lesson/hoc/present',{
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  "Authorization": `Bearer ${token}`
                },
              }); //sẽ thay đổi link, lấy ra số lượng thành viên tham gia vào buổi học gần nhất
            let dataPresent = await resPresent.json();
            dataPresent = dataPresent.lessons; 

            var Present_of_latestLesson = 0;
            if(new Date(dataClass[i].DateE) < today)Present_of_latestLesson = -1;
            else {
              for (let j = 0; j < dataPresent.length; j++){
                if(dataPresent[j].BID === latest_BID ){Present_of_latestLesson = dataPresent[j].Present; break;}
            }
            }
            /// Kết quả
            listResult.push({"CID": dataClass[i].CID, "CType": dataClass[i].CType, "Teacher": nameTeacher, "Present": Present_of_latestLesson, "NumStudent": NumStudentStudy, "latest_BID": latest_BID})
        }
        setClass(listResult);
        return listResult;
    }
    useEffect (()=>{
      fetchDataClass();
      },[]);
    
    //-----------------------------------------------------------------------------------------------------------------------------------------
    return (
        <>
        <button id = "Sback" onClick = {()=>{BackButton();}}>Go Back</button>
        
        <div id = "list_classes">
        <div className = "Name_of_teacher">Xem kết quả điểm danh học viên của các lớp</div>
        <div className = "Search_Presence_Student">
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
            var data = await fetchDataClass();
            
              var newData = [];
              let CID = document.getElementById('find_CID').value;
              let teacher = document.getElementById('find_Teacher').value;
              let CType = document.getElementById('find_CType').value;
              
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
              
              setClass(newData);
            document.getElementById('find_CID').value = "";
            document.getElementById('find_Teacher').value = "";
            document.getElementById('find_CType').value = "null";
            }
          }
          >Tìm kiếm</button>
        </div>
        <table className = "RowsListClass">
            <thead className = "infoClass">
                <tr className = "SNameColumn SbackgroundBlue">
                    <th className = "Text_NameColumn colorWhite">ID of Class</th>
                    <th className = "Text_NameColumn colorWhite">Type</th>
                    <th className = "Text_NameColumn colorWhite">Teacher</th>
                    <th className = "Text_NameColumn colorWhite">Present</th>
                </tr>
                <th className = "statis_class"></th>
            </thead>
        
        {aclass.map((t) => {
          return (
            <tbody className = "infoClass">
                <tr className = "SNameColumn editRows" onClick ={ () => { document.getElementById('list_classes').style.display = "none";
                    document.getElementById('list_student').style.display = "flex"; document.getElementById('Sback').style.display = "flex";
                    list_student(t.CID, t.latest_BID);}} style = {{cursor: 'pointer'}}>
                    <td className = "Text_NameColumn">{t.CID}</td>
                    <td className = "Text_NameColumn">{t.CType}</td>
                    <td className = "Text_NameColumn">{t.Teacher}</td>
                    {(t.Present=== -1)? <td className = "Text_NameColumn">Finish</td> : <td className = "Text_NameColumn">{t.Present}/{t.NumStudent}</td>}
                    
                </tr>
                <td className = "statis_class" onClick = {()=>{document.getElementById('list_classes').style.display = "none";
                    document.getElementById('statistic_a_class').style.display = "flex"; document.getElementById('Sback').style.display = "flex";
                    static_class(t.CID);}} style = {{cursor: 'pointer'}}>
                    <img src="http://localhost:3000/statistical.png" alt="statis"/>
                </td>
            </tbody>
          
      )
        })}
        </table>
        </div>
        <div id = "list_student"></div>
        <div id = "a_student"></div>
        <div id = "statistic_a_class"></div>
        </>
      )
}


function BackButton(){
  var buttonBack = document.getElementById('Sback');
  var layer_listClass = document.getElementById('list_classes');
  var layer_aStudent = document.getElementById('a_student');
  var layer_listStudent  = document.getElementById('list_student');
  var layer_statistic = document.getElementById('statistic_a_class');
  if (layer_statistic.style.display === "flex"){
    layer_statistic.style.display = "none";
    buttonBack.style.display = "none";
    layer_listClass.style.display = "flex";
  }
  else if (layer_listStudent.style.display === "flex"){
    layer_listStudent.style.display = "none";
    document.getElementById("RowsListStudent").style.display = "table";
    document.getElementById("RowsListStudent1").style.display = "none";
    buttonBack.style.display = "none";
    layer_listClass.style.display = "flex";
  }
  else {
    layer_aStudent.style.display = "none";
    layer_listStudent.style.display = "flex";
  }
    
}

export default Presence_Student;