import React from 'react'

export default function LocalStorageForm() {

    const submit = (event) => {
        const info = localStorage.getItem("info");
        event.preventDefault();
        let inputName = document.getElementById("inputName");
        let inputEmail = document.getElementById("inputEmail");
        let inputAddress = document.getElementById("inputAddress");
        let inputCity = document.getElementById("inputCity");
        let inputNic = document.getElementById("inputNIC");
        let inputGender = document.getElementById("inputGender");
        let obj = {
            name: inputName.value,
            email: inputEmail.value,
            address: inputAddress.value,
            city: inputCity.value,
            nic: inputNic.value,
            gender: inputGender.value
        }
        let infoObj;
        if (info == null) {
            infoObj = [];
        } else {
            infoObj = JSON.parse(info);
        }
        infoObj.push(obj);
        localStorage.setItem("info", JSON.stringify(infoObj));
        inputName.value = "";
        inputEmail.value = "";
        inputAddress.value = "";
        inputCity.value = "";
        inputNic.value = "";
        inputGender.value = "";
        showInfo();
    }

    function showInfo() {
        const info = localStorage.getItem("info");
        let infoObj;
        if (info == null) {
            infoObj = [];
        } else {
            infoObj = JSON.parse(info);
        }
        let html = "";
        infoObj.forEach(function (element, index) {
            html += `
  <tbody>
    <tr>
      <td>${index}</td>
      <td>${element.name}</td>
      <td>${element.email}</td>
      <td>${element.address}</td>
      <td>${element.city}</td>
      <td>${element.nic}</td>
      <td>${element.gender}</td>
      <td><button class="btn btn-primary" onClick=${delinfo(index)}>Del</button></td>
    </tr>
  </tbody>
  `
        });
        let tbldata = document.getElementById("tbl");
        tbldata.innerHTML = html;
    }

    function delinfo(index) {
        const info = localStorage.getItem("info");
        let infoObj;
        if (info == null) {
            infoObj = [];
        } else {
            infoObj = JSON.parse(info);
        }
        infoObj.splice(index, 1);
        localStorage.setItem("info", JSON.stringify(infoObj));
        showInfo();
    }

    return (
        <div>
            <form className="row g-3">
                <div className="col-md-6">
                    <label htmlFor="inputName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="inputName"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress"
                           placeholder="Apartment, studio, or floor"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputCity" className="form-label">City</label>
                    <input type="text" className="form-control" id="inputCity"/>
                </div>
                <div className="col-md-4">
                    <label htmlFor="inputNIC" className="form-label">NIC</label>
                    <input type="text" className="form-control" id="inputNIC"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="inputGender" className="form-label">Gender</label>
                    <input type="text" className="form-control" id="inputGender"/>
                </div>
                <div className="col-12">
                    <button type="submit" onClick={submit} className="btn btn-primary my2 mx3">Submit</button>
                </div>
            </form>
            <table className="table table-sm">
                <thead className="table-dark">
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
                <tbody id='tbl'>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <button className="btn btn-primary">Del</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    )
}
