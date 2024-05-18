import { useAuth } from "../context/Auth"
export const Service = () =>{
    const {service} = useAuth();
    return (
        <section className="section-services">
            <div className="container">
                <h1 className="main-heading">Services</h1>
            </div>

        <div className="container grid grid-three-cols">
            {
                service.map((item,index)=>{
                    const {price,description,provider,service} = item;
                    return(
                <div className="card" key={index}>
                            <div className="card-image">
                                <img src="/image/ser.png" alt="out service Info"  height={200} />
                            </div>
                            <div className="card-details">
                                <div className="grid grid-two-cols">
                                    <p>{provider}</p>
                                    <p>{price}</p>
                                </div>
                                <h2>{service}</h2>
                                <p>{description}</p>
                            </div>
                        </div>
                        )
                })
            }
        

        </div>
        </section>
    )
}