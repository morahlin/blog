import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import CreateForm from './Pages/CreateForm';
import { auth } from '../Firebase-config';
import { signOut } from "firebase/auth";
import Register from './Pages/Register';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from './Pages/ResetPassword';

const App = () => {

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const logout = () => {
    if (window.confirm("Are you sure you want to sign out?")) {
        signOut(auth).then(() => {
          localStorage.removeItem('isAuth');
          toast.success('You have successfully signed out');
          setIsAuth(false);
          navigate('/');
        }).catch((error) => {
          console.log(error.message)
      })
    }
}

  return (
    <div>
      <ToastContainer position='top-center' theme="colored" />
      <Navbar isAuth={isAuth} logout={logout} />


      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />}/>
        <Route path="/register" element={<Register setIsAuth={setIsAuth} />}/>
        <Route path="/reset" element={<ResetPassword setIsAuth={setIsAuth}/>} />
        <Route path='/create-post' element={<CreateForm  />} />

      </Routes>

      
    </div>
  )
}

export default App