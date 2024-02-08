import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
  }, []);

  const loadUsers = async () => {
    
    const result = await axios.get("https://employee-tracker-backend-production-b1a1.up.railway.app/users");
    
    setUsers(result.data);
    
  };
 
  
  const deleteUser = async (id) => {
    let pass = prompt("Enter the password :")
    if(pass === "abc"){
      await axios.delete(`https://employee-tracker-backend-production-b1a1.up.railway.app/user/${id}`);
      loadUsers();
    }else{
      alert("Wrong password")
    }
    
  };
  function findTime(s1,s2){
    if(s2===""){
      return s2;
    }
    s1 =  s1.split(':');


  let totalSeconds1 = parseInt(s1[0] * 3600 + s1[1] * 60 + s1[2]);
  let totalSeconds2 = parseInt(s2 * 3600 + s2 * 60 + s2)
    if(totalSeconds1>totalSeconds2){
      return "Not Met";
    } 
    return "met"
    
    
  }
  return (
    <div className="container">
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">S.N</th>
              <th scope="col">Name</th>
              <th scope="col">Log In Time</th>
              <th scope="col">Email</th>
              <th scope="col">Logout</th>
              <th scope="col">Work Time</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{user.name}</td>
                <td>{user.inTime}</td>
                <td>{user.email}</td>
                <td>{user.logOut}</td>
                <td>{findTime(user.inTime,8)}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewuser/${user.id}`}
                  >
                    View
                  </Link>
                  {/* <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link> */}
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/logoutuser/${user.id}`}>
                  <button
                    className="btn btn-danger mx-2"
                  >
                    Logout
                  </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
