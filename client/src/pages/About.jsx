import { useState } from "react";
import { useAuth } from "../context/Auth"

export const About = ()=>{
 const {user} = useAuth();
 const [userData, setUserData] = useState(true)
 const [username , setUsername]= useState("")
 if(userData && user){
    setUsername({
       username:user.email,    
    });
    setUserData(false);
}
    return (
        <>
            <main>
            <section className="section-hero">
                <div className="container grid grid-two-cols">

                    {/* // first div with content or First Section */}
                     <div className="hero-content">
                        <p value={username} className="username" >Welcome, {user ? user.email :'our Website'}</p>
                        {/* <p>Welcome Nazir Coding</p> */}
                        <h1>Why Choose Us?</h1>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur placeat reiciendis debitis                  </p>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur placeat reiciendis debitis                   </p>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur placeat reiciendis debitis                   </p>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore consectetur placeat reiciendis debitis                   </p>
                        <div className="btn btn-group">
                            <a href="/contact">
                                <button className="btn">Connect Now</button>
                            </a>
                            <a href="/service">
                                <button className="btn secondary-btn">Learn More</button>
                            </a>
                      </div>
                   </div>



                        {/* hero images or Second Section */}
                     <div className="hero-image">
                        <img src="/image/about.png" alt="" width="400" height="500" />
                    </div>
                 

                </div>
            </section>
        </main>
        
                                                     {/* 2nd section */}

        <section className="section-analytics">
            <div className="container grid grid-four-cols">
               
                <div className="div1">
                    <h2 style={{backgroundColor:'#f4f3ff', color:'black'}}>50+</h2>
                    <p style={{backgroundColor:'#f4f3ff', color:'black'}}>Registered Company</p>
                </div>

                <div className="div1">
                    <h2 style={{backgroundColor:'#f4f3ff', color:'black'}}>100,00+</h2>
                    <p style={{backgroundColor:'#f4f3ff', color:'black'}}>Happy Clients</p>
                </div>

                <div className="div1">
                    <h2 style={{backgroundColor:'#f4f3ff', color:'black'}}>500+</h2>
                    <p style={{backgroundColor:'#f4f3ff', color:'black'}}>Well Known Developers</p>
                </div>

                <div className="div1" style={{border:'none'}}>
                    <h2 style={{backgroundColor:'#f4f3ff', color:'black'}}>24/7</h2>
                    <p style={{backgroundColor:'#f4f3ff', color:'black'}}>Service</p>
                </div>

            </div>
        </section>

        
        
        
        </>
    )
}