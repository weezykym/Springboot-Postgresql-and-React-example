import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function Home() {
    const[users, setUsers] = useState([]);

    

    useEffect(() => {loadUsers()}, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/api/getUsers");
        setUsers(result.data);
    }

    // eslint-disable-next-line no-unused-vars
    const {id} = useParams()

    const deleteUser = async (id)=> {
        await axios.delete(`http://localhost:8080/api/deleteUser/${id}`);
        loadUsers();
    }

    return (
        <div className="container">
            <div className="py-4">
                <table className="table mt-2 shadow">
                    <thead>
                        <tr>
                            <th scope="col">index</th>
                            <th scope="col">Name</th>
                            <th scope="col">Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>(
                            <tr>
                            <th scope="row" key={index}>{index+1}</th>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}> View </Link>
                                <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}> Edit </Link>
                                <button className="btn btn-danger mx-2" onClick={()=>deleteUser(user.id)}>Delete</button>
                            </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
