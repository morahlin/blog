import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GoogleAuth from '../Components/GoogleAuth';
import {AiFillEyeInvisible, AiFillEye, AiOutlineMail} from 'react-icons/ai';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase-config';
import { toast } from "react-toastify";


const initialState = {
  email: '',
  password: '',
};

const Login = ({setIsAuth}) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const  {email, password} = formData;
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

    //toggling for password eye
    const [passwordEye, setPasswordEye] = useState(false);
    const handlePasswordEye = () => {
      setPasswordEye(!passwordEye)
    }

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value});
    };


    const validateForm = () => {
      let newErrors = {};
     
      // Validate email
      if (!email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = 'Email is invalid';
      }
  
      // Validate password
      if (!password) {
        newErrors.password = 'Password is required';
      } else if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long';
      }
  
      setErrors(newErrors);
  
      // Return true if there are no errors
      return Object.keys(newErrors).length === 0;
    };
  


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (validateForm()) {
        try {
          setLoading(true);
            if( email && password ){
            const {user} = await signInWithEmailAndPassword(
              auth, email, password
            )
            setLoading(false);
            localStorage.setItem('isAuth', true);
             toast.success('Login successfully')
            setIsAuth(true)
            navigate('/')
            }
        } catch (error) {
          console.log(error.message);
          toast.error('Invalid credential');
          setLoading(false);
        }
      }
      
    };
  
  return (
    <div className='pt-[20vh]'>
      {loading && 'Loading...'}
    <div className='max-w-[800px] m-auto px-4 pb-16'>
      <div className=' dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black'>
        <h1 className='text-2xl font-bold text-green-800'> Login Account </h1>
        <form onSubmit={handleSubmit} >

          <div className='grid md:grid-cols-2 md:gap-8'>

          <div className='md:my-4'>
              <label>Email Address</label>
              <div className='my-2 w-full relative'>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type="email" 
                  placeholder='Enter Email Address'
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                <AiOutlineMail className='absolute right-2 top-4 text-gray-400' /> 
              </div>
              {errors.email && ( <span className="text-red-500">{errors.email}</span>)}
            </div> 

            <div className='md:my-4'>
              <label>Password</label>
              <div className='my-2 w-full relative '>
                <input
                  className='w-full p-2 border border-gray-400 bg-transparent rounded-lg' 
                  type={(passwordEye === false) ? 'password' : 'text'} 
                  placeholder='Enter your Password'
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
                <div className='absolute right-2 top-4'>
                  {(passwordEye === false) ? <AiFillEyeInvisible onClick={handlePasswordEye} className='text-gray-400'/> : <AiFillEye onClick={handlePasswordEye} className='text-gray-400'/>}
                </div>
              </div>
              {errors.password && ( <span className="text-red-500">{errors.password}</span>)}
            </div>

          </div>


          <p className='text-center text-sm py-1'>By signing in you accept our <span className='underline'>terms and conditions & privacy policy</span></p>
                 
          <button type='submit' className='w-full my-4 md:my-2 p-3 bg-[#166534] text-white rounded-lg font-semibold'> Login Account </button>
        </form>

        
        <hr className="my-6 border-gray-300 w-full" />
     
        <GoogleAuth setIsAuth={setIsAuth}/>
        <p className='text-center text-sm py-1 '> Forgotten password? <span className='underline '> <Link to={'/reset'} className='text-[#3e3e8b] text-[15px]'>Reset</Link></span></p>

        <p className='my-4'>Don't have an account? <Link className='text-[#986c55] underline text-[15px]' to={'/register'}> Register </Link></p>
      </div>
    </div>
  </div>

  )
}

export default Login;