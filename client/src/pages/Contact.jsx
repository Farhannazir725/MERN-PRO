import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../context/Auth";
import {  toast } from 'react-toastify';

export const Contact = () =>{
    const [contact, setContact] = useState({
       
        username:"",

        email:"",
        message:"",
    });
    const [userData, setUserData] = useState(true)
    const {user,API} = useAuth();
    

    if(userData && user){
        setContact({
            username:user.username,
            email:user.email,
            message:"",
        });
        setUserData(false); 
    }

    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setContact({
            ...contact,
            [name]:value

        })     
    }
    const navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(contact)
        try {
            const response = await fetch(`${API}/api/form/contact`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(contact)
    
            });
            console.log(response)
            if(response.ok){
                setContact({  username:"", email:"", message:"", })
                const data = await response.json();
                console.log(data)
                toast.success('Message Send Succesfully')
                navigate('/');
            }
        } catch (error) {
            toast.error('Message Not Send')
            console.log('register', error)       
        }
    }
    return(       
    <>
    <section className="section-contact">
       <div className="contact-content container">
        <h1 className="main-heading mb-3">Contact Us</h1>
       </div>
            
            <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/image/contact2.png " alt="Someone is trying to do login" />
                    </div>
          


                    {/* contact form  */}
                    <section className="section-form">
                    <form onSubmit={handleSubmit} >
                     

                     <div>
                         <label htmlFor="Username">Username</label>
                         <input type="text" name="username" required  id="username" autoComplete="off" value={contact.username} onChange={handleInput}/>
                     </div>

                     <div>
                         <label htmlFor="email">Email</label>
                         <input type="email" name="email" required  id="email" autoComplete="off" value={contact.email} onChange={handleInput}/>
                     </div>

          
                     <div>
                         <label htmlFor="message">Message</label>
                         <br />  
                         <textarea name="message" id="message" cols="30" rows="6" autoComplete="off" value={contact.message} onChange={handleInput}/>
                        
                     </div>

                     <br />
                     <div>
                     <button type="submit" className="btn btn-submit">Submit</button>
                     </div>

                 </form>
                    </section>
                    
                    

                    </div>


                   
           
     
    </section>
    <div className="map">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115548.15439304578!2d75.76456319063813!3d25.17353535508773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396f9b30c41bb44d%3A0x5f5c103200045588!2sKota%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sae!4v1701549420467!5m2!1sen!2sae" width="80%" height="450" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
            
    </>
    )

}