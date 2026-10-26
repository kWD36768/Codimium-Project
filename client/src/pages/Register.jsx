import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
const navigate = useNavigate();
  const [registerData , setRegisterData] = useState({
     name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors , setErrors] = useState({});


  

  const validateRegisterForm = () =>{
    let newError = {};
      if (!registerData.name.trim()){
        newError.name = "Name is required";
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       
      if(!registerData.email.trim()){
        newError.email = "Email is required";
      }

  
      else if(!emailPattern.test(registerData.email)){
        newError.email = "please enter a valid email address";
      }
    

      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.@#$%^&+=])[A-Za-z\d.@#$%^&+=]{8,}$/;

      if(!registerData.password.trim()){
        newError.password = "Password is required"
      }

     else if(!passwordPattern.test(registerData.password)){
        newError.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
      }

      if(!registerData.confirmPassword.trim()){
      newError.confirmPassword = "Confirm Password is required"
      }
     
     else if(registerData.password !== registerData.confirmPassword){
        newError.confirmPassword = "Passwords do not match";
      }
      setErrors(newError)
      
        setTimeout(() => {
        setErrors({});
    }, 3000);

  return Object.keys(newError).length === 0 ;
    
  }
  const handleRegister = (e) =>{
   e.preventDefault();
     const isvalid = validateRegisterForm() ;

     if (!isvalid){
      return ; 
     }
   axios.post(`${import.meta.env.VITE_API_URL}/api/register` , registerData)
   .then((response) =>{
    console.log(response)
    navigate("/login");
   })
   .catch((error) =>{
    console.log(error)
   })

  }

  
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Create Account
          </h1>

          <p className="text-slate-500 mt-2">
            Register for Codimium CRM
          </p>

        </div>


        <form className="space-y-5"
          onSubmit={handleRegister}>

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Name
            </label>

            <input
            onChange = {(e) => setRegisterData({...registerData, name : e.target.value})}
             name = "name"
              type="text"
              placeholder="Enter your name"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name}</p>)}
          </div>


          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
             onChange = {(e) => setRegisterData({...registerData, email : e.target.value})}
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
             {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email}</p>)}
          </div>


          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
             onChange = {(e) => setRegisterData({...registerData, password : e.target.value})}
              name="password"
              type="password"
              placeholder="Create password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
             {errors.password  && (<p className="text-red-500 text-sm mt-1">{errors.password}</p>)}
          </div>


          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Confirm Password
            </label>

            <input
              onChange = {(e) => setRegisterData({...registerData, confirmPassword : e.target.value})}
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              
            />
            {errors.confirmPassword && (<p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>)}
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
           
        
        >
            Register
          </button>

        </form>


        <div className="text-center mt-6">

          <p className="text-slate-600">

            Already have an account?

            <Link
              to="/login"
              className="text-blue-600 font-semibold ml-2 hover:underline"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;