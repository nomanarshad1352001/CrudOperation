import React from "react";
import Card from "./Card/Card";

export default function Output(props) {
    let expenseContent;
    if (props.user.length > 0) {
        expenseContent = props.user.map((data, index) => (
            <tbody key={data.id}>
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>{data.Address}</td>
                <td>{data.City}</td>
                <td>{data.NIC}</td>
                <td>{data.Gender}</td>
                <td>
                    <button
                        onClick={() => {
                            props.deleteRow(data.id);
                        }}
                        className="btn btn-danger mx-1 rounded-5"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => {
                            props.editRow(data.id);
                        }}
                        className="btn btn-primary mx-1 rounded-5"
                    >
                        Edit
                    </button>
                </td>
            </tr>
            </tbody>
        ))
    }
    return (
        <Card className={'text-center m-3'}>
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
                {expenseContent}
            </table>
        </Card>

    );
}
