import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {

  const [loginData , setLoginData] = useState({
    email : "" ,
    password : ""
  }) ;

  const [loginErrors , setLoginErrors] = useState({})
const navigate = useNavigate();


  const validateLoginForm = () =>{
       
      let newError = {};

         const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(!loginData.email.trim()){
        newError.email = "Email is required";
         }
     else if(!emailpattern.test(loginData.email)){
        newError.email = "Invalid email format";
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.@#$%^&+=])[A-Za-z\d.@#$%^&+=]{8,}$/;
             
      if(!loginData.password.trim()){
        newError.password = "Password is required";
      }
     else if(!passwordPattern.test(loginData.password)){
        newError.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
      }
      setLoginErrors(newError)
      return Object.keys(newError).length === 0 ;}




const handleLogin = async (e) => {
  e.preventDefault();

  try {
       const isvalid = validateLoginForm();

    if(!isvalid){
      return ; 
    }
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/login`,
      loginData
    );

    // Token save karein
    localStorage.setItem("token", response.data.auth);

    // User ki information aur role save karein
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.data)
    );

    // Dashboard par navigate karein
    navigate("/dashboard");

  } catch (error) {
    console.log(error.response?.data || error.message);

    alert(
      error.response?.data?.message || "Login failed"
    );
  }
};




  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-slate-800">
            Codimium CRM
          </h1>

          <p className="text-slate-500 mt-2">
            Login to your account
          </p>

        </div>


        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleLogin}>

          {/* Email */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>

            <input
              name  = "email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              onChange ={(e) => setLoginData({...loginData , email : e.target.value})}  />

              {loginErrors.email && (<p className="text-red-500 text-sm mt-1">{loginErrors.email}</p>)}

          </div>


          {/* Password */}
          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
           onChange ={(e) => setLoginData({...loginData , password : e.target.value})} />

           {loginErrors.password && (<p className="text-red-500 text-sm mt-1">{loginErrors.password} </p>)}

          </div>


          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            Login
          </button>

        </form>


        {/* Register Link */}
        <div className="text-center mt-6">

          <p className="text-slate-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-blue-600 font-semibold ml-2 hover:underline "
            >
              Register now
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;