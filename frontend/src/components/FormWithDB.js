import React, {useState} from 'react'
import Output from "./Output";

export default function FormWithDb() {
    const [user, setuser] = useState([]);
    const [EditingState, setEditingState] = useState(false);
    const [UserInput, setUserInput] = useState({
        Name: "",
        Email: "",
        Address: "",
        City: "",
        NIC: "",
        Gender: "",
        id: null,
    });
    const ChangeInput = (event) => {
        const {name, value} = event.target;
        setUserInput((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };
    const submit = (event) => {
        event.preventDefault();
        if (EditingState === true) {
            console.log(UserInput);
            user[user.findIndex((el) => el.id === UserInput.id)] = UserInput;
            setUserInput({
                Name: "",
                Email: "",
                Address: "",
                City: "",
                NIC: "",
                Gender: "",
            });
            setEditingState(false);
        } else {
            UserInput.id = user.length + 1;
            setuser((prevState) => [...prevState, UserInput]);
            setUserInput({
                Name: "",
                Email: "",
                Address: "",
                City: "",
                NIC: "",
                Gender: "",
            });
        }
    };
    const deleteRow = (id) => {
        const newuser = user.filter((x) => x.id !== id);
        setuser(newuser);
    };
    const editRow = (id) => {
        setEditingState(true);
        const newuser = user.filter((x) => x.id === id);
        setUserInput({
            id: id,
            Name: newuser[0].Name,
            Email: newuser[0].Email,
            Address: newuser[0].Address,
            City: newuser[0].City,
            NIC: newuser[0].NIC,
            Gender: newuser[0].Gender,
        });
    };
    return (
        <div>
            <div className="container">
                <form className="form g-0">
                    <div className="col-md-10 container">
                        <label htmlFor="inputname" className="form-label">
                            <h5>Name</h5>
                        </label>
                        <input
                            placeholder="Enter your name"
                            type="text"
                            name="Name"
                            value={UserInput.Name}
                            onChange={ChangeInput}
                            className="form-control rounded-5"
                            id="inputName"
                        />
                    </div>
                    <div className="col-md-10 container">
                        <label htmlFor="inputEmail4" className="form-label">
                            <h5>Email</h5>
                        </label>
                        <input
                            placeholder="Enter your email"
                            type="email"
                            name="Email"
                            value={UserInput.Email}
                            onChange={ChangeInput}
                            className="form-control rounded-5"
                            id="inputEmail4"
                        />
                    </div>
                    <div className="col-10 container">
                        <label htmlFor="inputAddress" className="form-label">
                            <h5>Address</h5>
                        </label>
                        <input
                            type="text"
                            name="Address"
                            value={UserInput.Address}
                            onChange={ChangeInput}
                            className="form-control rounded-5"
                            id="inputAddress"
                            placeholder="Apartment, studio, or floor"
                        />
                    </div>
                    <div className="col-md-10 container">
                        <label htmlFor="inputCity" className="form-label">
                            <h5>City</h5>
                        </label>
                        <input
                            placeholder="Enter your city"
                            type="text"
                            name="City"
                            value={UserInput.City}
                            onChange={ChangeInput}
                            className="form-control rounded-5"
                            id="inputCity"
                        />
                    </div>
                    <div className="col-md-10 container">
                        <label htmlFor="inputNIC" className="form-label">
                            <h5>NIC</h5>
                        </label>
                        <input
                            placeholder="Enter your Nic"
                            type="text"
                            name="NIC"
                            value={UserInput.NIC}
                            onChange={ChangeInput}
                            className="form-control rounded-5"
                            id="inputNic"
                        />
                    </div>
                    <div className="col-md-10 container">
                        <label htmlFor="inputGender" className="form-label">
                            <h5>Gender</h5>
                        </label>
                        <input
                            placeholder="Enter your gender"
                            type="text"
                            name="Gender"
                            value={UserInput.Gender}
                            onChange={ChangeInput}
                            className="form-control rounded-5"
                            id="inputGender"
                        />
                    </div>
                    <div className="col-1 g-1 container">
                        <button type="submit" onClick={submit} className="btn btn-warning rounded-5 mt-3 ">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <Output user={user} deleteRow={deleteRow} editRow={editRow}/>
        </div>
    )
}
