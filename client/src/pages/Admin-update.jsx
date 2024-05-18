import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom'
import { useAuth } from "../context/Auth"
import {  toast } from 'react-toastify';

export const AdminUpdate = () => {
    const {authorizationToken}= useAuth();
    const [data,setData]= useState({
        username: "",
        email: "",
        phone: "",
    });

    const params = useParams();


    const getSingleUserData = async() => {
        try {
            
      
        const response = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{
            method:"GET",
            headers:{
                Authorization:authorizationToken,
            }
            
        });
        const data = await response.json();
        console.log(`user Single Data ${data}`)
        setData(data);
        // if(response.ok){
        //     getSingleUserData();
        // }
    } catch (error) {
            console.log(error);
    }
    };

    useEffect(() =>{
        getSingleUserData();
    },[])

    const handleInput = (e) => {
     let name = e.target.name;
     let value = e.target.value;
     setData({
        ... data,
        [name]:value,
     })
    }

    // update data dynamically
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json",
                    Authorization: authorizationToken,
                },
                body:JSON.stringify(data)
            });

            if(response.ok){
                toast.success('Data Updated Succesfully')
            }
            else{
                toast.error('Not Updated')
            }
        } catch (error) {
            console.log(error)
        }
    }



return (
    <section className="section-contact">
       <div className="contact-content container">
        <h1 className="main-heading mb-3">Updata User Data</h1>
       </div>
            
            <div className="container grid grid-two-cols">
                 


                    {/* contact form  */}
                    <section className="section-form">
                    <form onSubmit={handleSubmit}>
                     

                     <div>
                         <label htmlFor="Username">Username</label>
                         <input type="text" name="username" required  id="username" autoComplete="off" value={data.username} onChange={handleInput}/>
                     </div>

                     <div>
                         <label htmlFor="email">Email</label>
                         <input type="email" name="email" required  id="email" autoComplete="off" value={data.email} onChange={handleInput}/>
                     </div>

          

                     <div>
                         <label htmlFor="phone">Mobile</label>
                         <input type="number" name="phone" required  id="phone" autoComplete="off" value={data.phone} onChange={handleInput}/>
                     </div>

          
     
                     <br />
                     <div>
                     <button type="submit" className="btn btn-submit">Update</button>
                     </div>

                 </form>
                    </section>
                    
                    

                    </div>


                   
           
     
    </section>
)
}