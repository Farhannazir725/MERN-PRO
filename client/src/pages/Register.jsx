import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../context/Auth";
import {  toast } from 'react-toastify';

export const Register = () =>{
    const [user, setUser] = useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });
    const handleInput = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value

        })     
    }
    const navigate = useNavigate();
    const {stroreTokenInLs,API}= useAuth();
    const URL = `${API}/api/auth/register`;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(user)
        try {
        const response = await fetch(URL,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(user)

        });
        // console.log(response)
        const res_data = await response.json()
        console.log("res form register",res_data.extraDetails)
        if(response.ok){
            
            // console.log("res form register",res_data)
            // localStorage.setItem('token',res_data.token)
            stroreTokenInLs(res_data.token)
            setUser({ username:"",  email:"", phone:"", password:"" })
            toast.success('Registered Succesfully')
            navigate('/login');
        }else{
            toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
        }
    } catch (error) {
        console.log('register', error)       
    }
    };
    return(       
    <>
    <section>
        <main>
            <div className="section-registraion">
                <div className="container grid grid-two-cols">
                    <div className="registraion-img">
                        <img src="/image/registraion.jpg" alt="Someone is trying to do Registration" width="500" height="500"/>
                    </div>
                    
                    {/* Registraion form */}
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Registration Form</h1>
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input type="text" name="username" value={user.username} onChange={handleInput} required placeholder="Username" id="username" autoComplete="off"/>
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" required placeholder="Enter Your Email" id="email" autoComplete="off" value={user.email} onChange={handleInput}/>
                            </div>

                            <div>
                                <label htmlFor="phone">Phone</label>
                                <input type="number" name="phone" required placeholder="Phone" id="phone" autoComplete="off" value={user.phone} onChange={handleInput}/>
                            </div>


                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" required placeholder="password" id="password" autoComplete="off" value={user.password} onChange={handleInput}/>
                            </div>

                            <br />

                            <button type="submit" className="btn btn-submit">Register Now</button>


                        </form>
                    </div>

                </div>
            </div>
        </main>
    </section>
            
    </>
    )

}