import { useState } from "react"
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../context/Auth";
import {  toast } from 'react-toastify';

export const Login = () =>{
    const [user, setUser] = useState({
       
        email:"",

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
    const URL = `${API}/api/auth/login`;
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
            console.log(response)
            const res_data = await response.json()
            if(response.ok){
                toast.success('Login Succesfully')
                
                stroreTokenInLs(res_data.token)
                setUser({   email:"",  password:"" })
                navigate('/');
            }
            else{
                setUser({   email:"",  password:"" })
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.log('login', error)       
        }
    };
    return(       
    <>
    <section>
        <main>
            <div className="section-login">
                <div className="container grid grid-two-cols">
                    <div className="login-img">
                        <img src="/image/login.png " alt="Someone is trying to do login" width="500" height="500"/>
                    </div>
                    
                    {/* Login form */}
                    <div className="login-form">
                        <h1 className="main-heading mb-3">Login Form</h1>
                        <br />
                        <form onSubmit={handleSubmit} >
                     

                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" required placeholder="Enter Your Email" id="email" autoComplete="off" value={user.email} onChange={handleInput}/>
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" required placeholder="password" id="password" autoComplete="off" value={user.password} onChange={handleInput}/>
                            </div>

                            <br />

                            <button type="submit" className="btn btn-submit">Login</button>


                        </form>
                    </div>

                </div>
            </div>
        </main>
    </section>
            
    </>
    )

}