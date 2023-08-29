import React, {useEffect, useState, useRef} from 'react'
import Output from "./Output";
import axios from "axios";
import LoadingSpinner from "../Ui Elements/LoadingSpinner";

export default function FormWithDb() {
    const [allUsers, setAllUsers] = useState([]);
    const [editingState, setEditingState] = useState(false);
    const [isSpinner, setIsSpinner] = useState(false);
    const [error, setError] = useState('');
    const [previewUrl, setPreviewUrl] = useState('');
    const [file, setFile] = useState(null);
    const [userInput, setUserInput] = useState({
        Name: "",
        Email: "",
        Address: "",
        City: "",
        NIC: "",
        Gender: "",
        id: ""
    });
    const filePickerRef = useRef();
    const inputChangeHandler = (event) => {
        const {name, value} = event.target;
        if (name === 'image') {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);
        }
        setUserInput((preValue) => {
            return {
                ...preValue,
                [name]: value,
            };
        });
    };
    const submit = (event) => {
        event.preventDefault();
        setError('');
        setIsSpinner(true);
        const File = new FormData();
        File.append("image", file);
        File.append("name", userInput.Name);
        File.append("email", userInput.Email);
        File.append("address", userInput.Address);
        File.append("city", userInput.City);
        File.append("nic", userInput.NIC);
        File.append("gender", userInput.Gender);
        if (editingState === true) {
            updateUser(File, userInput.id);
        } else {
            addUser(File)
        }
    };

    const populateData = (response) => {
        setAllUsers(response.data.users);
        setPreviewUrl('');
        setIsSpinner(false);
        setFile(null);
        setUserInput({Name: "", Email: "", Address: "", City: "", NIC: "", Gender: ""});
    }
    const addUser = data => {
        const config = {
            method: 'post',
            url: `http://localhost:5000/api/users`,
            data: data
        };

        axios(config)
            .then((response) => {
                populateData(response);
            })
            .catch((error) => {
                setError(error.response.data.message);
                setIsSpinner(false);
            });
    }
    const getAllUsers = () => {
        const config = {
            method: 'get',
            url: `http://localhost:5000/api/users`,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        axios(config)
            .then((response) => {
                setIsSpinner(false);
                setAllUsers(response.data.users);
            })
            .catch((error) => {
                setError(error.response.data.message);
                setIsSpinner(false);
            });
    }
    const deleteRow = (id) => {
        setIsSpinner(true);
        setError('');
        deleteUser(id);
    };
    const deleteUser = (id) => {
        const config = {
            method: 'delete',
            url: `http://localhost:5000/api/users/${id}`,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        axios(config)
            .then((response) => {
                populateData(response);
            })
            .catch((error) => {
                setError(error.response.data.message);
                setIsSpinner(false);
            });
    }
    const editRow = (id) => {
        setError('')
        setEditingState(true);
        const selectedUser = allUsers.find((x) => x.id === id);
        setPreviewUrl(`http://localhost:5000/${selectedUser.image}`)
        setUserInput({
            id: id,
            Name: selectedUser.name,
            Email: selectedUser.email,
            Address: selectedUser.address,
            City: selectedUser.city,
            NIC: selectedUser.nic,
            Gender: selectedUser.gender
        });
    };
    const updateUser = (data, id) => {
        const config = {
            method: 'patch',
            url: `http://localhost:5000/api/users/${id}`,
            data: data
        };

        axios(config)
            .then((response) => {
                setEditingState(false);
                populateData(response);
            })
            .catch((error) => {
                setError(error.response.data.message);
                setIsSpinner(false);
            });
    }
    useEffect(() => {
        getAllUsers();
        setIsSpinner(true);
    }, []);
    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);
    const pickImageHandler = () => {
        filePickerRef.current.click();
    };
    return (
        <div>
            {isSpinner && <LoadingSpinner overlay/>}
            <div className="container">
                <form className="form row g-0">
                    <div className={`image-upload`}>
                        <div onClick={pickImageHandler} className="image-upload__preview cursor-pointer">
                            {previewUrl ? <img src={previewUrl} alt="Preview"/> : <span>Pick an image.</span>}
                        </div>
                    </div>
                    <div className="col-md-6 container">
                        <label htmlFor="inputname" className="form-label mb-0 mt-2 ms-2">
                            <h5>Name</h5>
                        </label>
                        <input
                            placeholder="Enter your name"
                            type="text"
                            name="Name"
                            value={userInput.Name}
                            onChange={inputChangeHandler}
                            className="form-control rounded-5"
                            id="inputName"
                        />
                    </div>
                    <div className="col-md-6 container">
                        <label htmlFor="inputEmail4" className="form-label mb-0 mt-2 ms-2">
                            <h5>Email</h5>
                        </label>
                        <input
                            placeholder="Enter your email"
                            type="email"
                            name="Email"
                            value={userInput.Email}
                            onChange={inputChangeHandler}
                            className="form-control rounded-5"
                            id="inputEmail4"
                        />
                    </div>
                    <div className="col-md-6 container">
                        <label htmlFor="inputAddress" className="form-label mb-0 mt-2 ms-2">
                            <h5>Address</h5>
                        </label>
                        <input
                            type="text"
                            name="Address"
                            value={userInput.Address}
                            onChange={inputChangeHandler}
                            className="form-control rounded-5"
                            id="inputAddress"
                            placeholder="Apartment, studio, or floor"
                        />
                    </div>
                    <div className="col-md-6 container">
                        <label htmlFor="inputCity" className="form-label mb-0 mt-2 ms-2">
                            <h5>City</h5>
                        </label>
                        <input
                            placeholder="Enter your city"
                            type="text"
                            name="City"
                            value={userInput.City}
                            onChange={inputChangeHandler}
                            className="form-control rounded-5"
                            id="inputCity"
                        />
                    </div>
                    <div className="col-md-6 container">
                        <label htmlFor="inputNIC" className="form-label mb-0 mt-2 ms-2">
                            <h5>NIC</h5>
                        </label>
                        <input
                            placeholder="Enter your Nic"
                            type="text"
                            name="NIC"
                            value={userInput.NIC}
                            onChange={inputChangeHandler}
                            className="form-control rounded-5"
                            id="inputNic"
                        />
                    </div>
                    <div className="col-md-6 container">
                        <label htmlFor="inputGender" className="form-label mb-0 mt-2 ms-2">
                            <h5>Gender</h5>
                        </label>
                        <input
                            placeholder="Enter your gender"
                            type="text"
                            name="Gender"
                            value={userInput.Gender}
                            onChange={inputChangeHandler}
                            className="form-control rounded-5"
                            id="inputGender"
                        />
                    </div>
                    <input
                        id="inputFile"
                        name="image"
                        ref={filePickerRef}
                        style={{display: 'none'}}
                        type="file"
                        accept=".jpg,.png,.jpeg"
                        onChange={inputChangeHandler}
                    />
                    {error && <div className={'text-center text-danger mt-3'}>{error}</div>}
                    <div className="col-1 g-1 container">
                        <button type="submit" onClick={submit} className="btn btn-warning rounded-5 mt-2 ">
                            {editingState ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            <Output user={allUsers} deleteRow={deleteRow} editRow={editRow}/>
        </div>
    )
}
