
const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./routes/auth-route');
const contactRoute = require('./routes/contact-route')
const serviceRoute = require('./routes/service-route')
const adminRoute = require('./routes/admin-route') 
const connectDb = require('./utils/db');
const errorMiddleware = require('./middlewares/error-middleware');

const corsOption ={
    origin: "http://localhost:5173",
    methods:"GET, POST, PUT , DELETE , HEAD",
    Credential:true,
}

app.use(cors(corsOption));                                              //  cors middleware for frontend and backend connection ke liye   
app.use(express.json());   // ye middle ware use krna hoga json me deal kare ke liye 





app.use('/api/auth', authRoute)
app.use('/api/form', contactRoute )
app.use('/api/data', serviceRoute )
app.use(errorMiddleware);

// let define admin route
app.use('/api/admin', adminRoute); 








app.get('/',(req, res)=>{ 
    res.status(200).send('Welcome Nazir In MERN Stack Developer FN')
    
});


// app.get('/register',(req, res)=>{ 
//     res.status(200).send('React Developer Nazir')
    
// });

const PORT = 5000;
connectDb().then(()=>{


app.listen(PORT,()=>{
    console.log(`Server is Running on port http://localhost:${PORT}`);
});
})