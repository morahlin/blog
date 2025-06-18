import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../Firebase-config";
import { sendPasswordResetEmail } from "firebase/auth";
import { AiOutlineMail} from 'react-icons/ai';


const initialState = {
    email: ''
  };
  

const ResetPassword = () => {


    const [formData, setFormData] = useState(initialState);
    const  {email } = formData;
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};
       
        // Validate email
        if (!email) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is invalid';
        }
        setErrors(newErrors);
    
        // Return true if there are no errors
        return Object.keys(newErrors).length === 0;
      };

      const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
      };


      const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            
            try {
                await sendPasswordResetEmail(auth, email);
                setLoading(false);
                navigate('/login');
                toast.success("Check your email for a reset link");
            } catch (error) {
                setLoading(false);
                toast.error(error.message);
            }   
        }
        
      };

    

  return (
    <div className='pt-[20vh]'>
    {loading && 'Loading...'}
  <div className='max-w-[800px] m-auto px-4 pb-16'>
    <div className=' dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black'>
      <h1 className='text-2xl font-bold text-green-800 text-center'> Re-set Account </h1>
      <form onSubmit={handleSubmit}>

        <div className='grid md:grid-cols-1 md:gap-8'>

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


        </div>


        <p className='text-center text-sm py-1'>By signing in you accept our <span className='underline'>terms and conditions & privacy policy</span></p>
               
        <button type='submit' className='w-full my-4 md:my-2 p-3 bg-[#166534] text-white rounded-lg font-semibold'> Re-set Account </button>
      </form>

      
      <hr className="my-6 border-gray-300 w-full" />

      <p className='my-4'>already have an account? <Link className='text-[#986c55] underline text-[15px]' to={'/login'}>Login</Link></p>
    </div>
  </div>
</div>
  )
}

export default ResetPassword