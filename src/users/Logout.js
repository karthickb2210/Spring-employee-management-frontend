import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import axios from 'axios';
function Logout() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        inTime: "",
        logOut:"",
        email: "",
      });

    const {id} = useParams();
    async function handlelogout(id){
        
        user.logOut = currtime();
        await axios.put(`https://employee-tracker-backend-production-b1a1.up.railway.app/user/${id}`, user);
        console.log(user);
        navigate("/");
    }
    function currtime(){
        let d = new Date()
        return d.toLocaleTimeString('it-IT'); 
    }
   

    //   const { name, inTime,logout, email } = user;

      useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const loadUser = async () => {
        const result = await axios.get(`https://employee-tracker-backend-production-b1a1.up.railway.app/user/${id}`);
        setUser(result.data);
      };
  return (
    <>
    <label >Do you wish to logout </label>
    <br></br>
    <button className='btn btn-primary my-2' onClick={()=>handlelogout(id)}>Yes</button>
    <Link to="/">
    <button className='btn btn-outline-danger mx-2' >No</button>
    </Link>
   
    
    </>
  )
}

export default Logout