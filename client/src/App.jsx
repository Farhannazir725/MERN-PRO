import { BrowserRouter, Routes,Route } from "react-router-dom"
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./component/Navbar";
import {Footer} from "./component/Footer";
import {Error} from "./pages/Error";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./component/layout/Admin-layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-update";



const App = () =>{
  return(
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route  path='/' element={<Home />} />
      <Route  path='/about' element={<About />} />
      <Route  path='/contact' element={<Contact />} />
      <Route  path='/service' element={<Service />} />
      <Route  path='/register' element={<Register />} />
      <Route  path='/login' element={<Login />} />
      <Route  path='*'  element={<Error />}  />
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/admin' element={<AdminLayout/>}>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="contacts" element={<AdminContacts/>}/>
        <Route path="users/:id/edit" element={<AdminUpdate/>}/>
        
        
      </Route>

    </Routes>
    <Footer/>
    
    
    </BrowserRouter>
    </>
  )
}

export default App