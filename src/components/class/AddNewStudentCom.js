import React, { useEffect } from "react";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Store } from 'react-notifications-component'

const AddNewStudentCom = ({ setAddNC }) => {
  const token = localStorage.getItem('token')
  const classID = window.location.pathname.split('/')[3]
  const [formValue, setFormValue] = React.useState({
    ID: "",
    Email: "",
    Phone: "",
    FullName: "",
    Sex: "M",
    Address: "",
    CID: classID,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };
  const d = new Date();
  const [selected, setSelected] = React.useState(d);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }

  function formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }


  useEffect(() => {
    const fetchData = async () => {
      var url = 'http://localhost:5000/student/last'
      let res = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      });
      let resjson = await res.json();
      resjson = resjson.student.ID;
      if (resjson != "size = 0") {
        let ID = (Number.parseInt(resjson) + 1).toString()
        formValue.ID = ID
        setFormValue({ ...formValue })
        console.log(formValue)
      }
    }
    fetchData();
  }, [])

  const submit = async () => {
    formValue.Bdate = formatDate(selected)

    let reply2 = await fetch('http://localhost:5000/student/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formValue)
    })
    reply2 = await reply2.json()
    console.log("Add students " + ": " + reply2.message)
    setAddNC(0)

    Store.addNotification({
      title: "Successful!",
      message: "You have added student to class successfully",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  }

  return (
    <div className="fullscreen">
      <div className="popup" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">Add New Student</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Full Name:</label>
                  <input type="text" className="form-control" name="FullName" value={formValue.FullName} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Email:</label>
                  <input type="email" className="form-control" name="Email" value={formValue.Email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Phone:</label>
                  <input type="text" className="form-control" name="Phone" value={formValue.Phone} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Address:</label>
                  <input type="text" className="form-control" name="Address" value={formValue.Address} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Sex:</label>
                  <select name="Sex" id="Sex" onChange={handleChange}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label for="recipient-name" className="col-form-label">Bdate:</label>
                  <DayPicker
                    defaultMonth={new Date(2000, 0, 1)}
                    mode="single"
                    selected={selected}
                    onSelect={setSelected}
                    footer={footer}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setAddNC(0)}>Close</button>
              <button type="button" className="btn btn-primary" onClick={submit}>Add new student</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
};

export default AddNewStudentCom;