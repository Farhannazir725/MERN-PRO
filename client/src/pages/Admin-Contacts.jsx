import { useEffect, useState } from "react"
import { useAuth } from "../context/Auth"
import {  toast } from 'react-toastify';



export const AdminContacts =  ()=>{
    const [contactData, setContactData]= useState([]);
    const {authorizationToken}= useAuth();
    const getContacsData = async()=>{
        try {
            const response = await fetch('http://localhost:5000/api/admin/contacts',{
                method: 'GET',
                headers:{
                    Authorization:authorizationToken,
                }
            })
            const data= await response.json();
            console.log("Contact Data", data)
            if(response.ok){
                setContactData(data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteContactById = async(id)=>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
                method: 'DELETE',
                headers:{
                    Authorization:authorizationToken,

                }

            })
            if(response.ok){
                getContacsData();
                toast.success('Delete Successfully');
            }else{
                toast.error('Not Deleted');
            }
            
        } catch (error) {
            console.log(error)
        }
    }






    useEffect(()=>{
        getContacsData();
    },[]);
    return (<>
       <section className="admin-contacts-section">
        <h1>Admin Contact Data </h1>
        <div className="container admin-users">
        {
            contactData.map((curConData, index)=>{
                const {username, email, message, _id}= curConData; 
                return (
                    <div key={index}>
                        <p>{username}</p>
                        <p>{email}</p>
                        <p>{message}</p>
                        <button className="btn" onClick={()=> deleteContactById(_id)}>Delete</button>
                    </div>
                );
            })
        }
        </div>
       </section>
    </>
    )
}