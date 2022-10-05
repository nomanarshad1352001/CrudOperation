import React, { useState } from "react";
export default function IndividualStateForm() {
  const [Name, setname] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [NIC, setNIC] = useState("");
  const [Gender, setGender] = useState("");
  const [arr, setarr] = useState([]);
 const submit = (event) => {
    event.preventDefault();
    let obj = {
      name: Name,
      email: Email,
      address: Address,
      city: City,
      nic: NIC,
      gender: Gender,
      id: arr.length + 1,
    };
    setarr((prevState) => [...prevState, obj]);
    setname("");
    setEmail("");
    setAddress("");
    setCity("");
    setNIC("");
    setGender("");
  };
  const changename = (event) => {
    setname(event.target.value);
  };
  const changemail = (event) => {
    setEmail(event.target.value);
  };
  const changeAddress = (event) => {
    setAddress(event.target.value);
  };
  const changeCity = (event) => {
    setCity(event.target.value);
  };
  const changeNIC = (event) => {
    setNIC(event.target.value);
  };
  const changeGender = (event) => {
    setGender(event.target.value);
  };

  const deleteRow = (id) => {
    console.log("del has been clicked", id);
    const newarr = arr.filter((x) => x.id !== id);
    setarr(newarr);
  };
  const editRow = (id) => {
    console.log("edit has been clickes");
    const newarr = arr.filter((x) => x.id === id);
    console.log(newarr);
    setname(newarr[0].name);
    setEmail(newarr[0].email);
    setAddress(newarr[0].address);
    setCity(newarr[0].city);
    setNIC(newarr[0].nic);
    setGender(newarr[0].gender);
    console.log(newarr[0].id );
  };
  return (
    <div>
      <div className="center">
        <form onSubmit={submit} className="row g-0">
          <div className="col-md-10">
            <label htmlFor="inputname" className="form-label">
              <h5>Name</h5>
            </label>
            <input
              type="text"
              value={Name}
              onChange={changename}
              className="form-control shadow"
              id="inputName"
            />
          </div>
          <div className="col-md-10">
            <label htmlFor="inputEmail4" className="form-label">
              <h5>Email</h5>
            </label>
            <input
              type="email"
              value={Email}
              onChange={changemail}
              className="form-control shadow"
              id="inputEmail4"
            />
          </div>
          <div className="col-10">
            <label htmlFor="inputAddress" className="form-label">
              <h5>Address</h5>
            </label>
            <input
              type="text"
              value={Address}
              onChange={changeAddress}
              className="form-control shadow"
              id="inputAddress"
              placeholder="Apartment, studio, or floor"
            />
          </div>
          <div className="col-md-10">
            <label htmlFor="inputCity" className="form-label">
              <h5>City</h5>
            </label>
            <input
              type="text"
              value={City}
              onChange={changeCity}
              className="form-control shadow"
              id="inputCity"
            />
          </div>
          <div className="col-md-10">
            <label htmlFor="inputNIC" className="form-label">
              <h5>NIC</h5>
            </label>
            <input
              type="text"
              value={NIC}
              onChange={changeNIC}
              className="form-control shadow"
              id="inputNic"
            />
          </div>
          <div className="col-md-10">
            <label htmlFor="inputGender" className="form-label">
              <h5>Gender</h5>
            </label>
            <input
              type="text"
              value={Gender}
              onChange={changeGender}
              className="form-control shadow"
              id="inputGender"
            />
          </div>
          <div className="col-1 g-1">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">City</th>
              <th scope="col">Nic</th>
              <th scope="col">Gender</th>
              <th scope="col">operation</th>
            </tr>
          </thead>
          {arr.map((data, index) => (
            <tbody key={data.id}>
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.address}</td>
                <td>{data.city}</td>
                <td>{data.nic}</td>
                <td>{data.gender}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteRow(data.id);
                    }}
                    className="btn btn-primary"
                  >
                    delete
                  </button>
                  <button
                    onClick={() => {
                      editRow(data.id);
                    }}
                    className="btn btn-primary"
                  >
                    edit
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
