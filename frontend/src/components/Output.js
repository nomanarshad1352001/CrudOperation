import React from "react";
import Card from "../Ui Elements/Card";

export default function Output(props) {
    let tabelData;
    if (props.user.length > 0) {
        tabelData = props.user.map((data, index) => (

            <tr key={data.id}>
                <th className={'align-center'} scope="row">{index + 1}</th>
                <td className={'align-center d-flex flex-column align-items-center'}>
                    <span className={'table-image'}>
                        <img src={`http://localhost:5000/${data.image}`} alt='user'/>
                    </span>
                    <span>{data.name}</span>
                </td>
                <td className={'align-center'}>{data.email}</td>
                <td className={'align-center'}>{data.address}</td>
                <td className={'align-center'}>{data.city}</td>
                <td className={'align-center'}>{data.nic}</td>
                <td className={'align-center'}>{data.gender}</td>
                <td className={'align-center'}>
                    <button onClick={() => {
                        props.deleteRow(data.id)
                    }} className="btn btn-danger mx-1 rounded-5">Delete
                    </button>
                    <button onClick={() => {
                        props.editRow(data.id)
                    }} className="btn btn-primary mx-1 rounded-5">Edit
                    </button>
                </td>
            </tr>

        ))
    }
    return (
        <Card className={'text-center m-3 table-responsive'}>
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
                    <th scope="col">Action</th>
                </tr>
                </thead>
                <tbody>
                {tabelData}
                </tbody>
            </table>
        </Card>

    );
}
