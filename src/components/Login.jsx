import React, { useState } from "react";
import axios from "axios"
import {useDispatch} from "react-redux"
import { addUser } from "../utils/userSlice";
import {useNavigate}  from "react-router-dom"
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const[firstName,setFirstName] = useState("");
  const[lastName,setLastName] = useState("");
  const[isLoginForm,setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error,setError] = useState("");

  const handelLogin = async () => {

    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      },{withCredentials:true});

      dispatch(addUser(res.data));
      navigate("/feed")
    } catch (error) {
      setError(error?.response?.data || "Something went wrong")
      
    }
  };

  const handelSignup =  async () =>{

    try {
      const res = await axios.post(BASE_URL + "/signup",{firstName,lastName,emailId,password},{withCredentials:true})
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    } catch (error) {
      setError(error?.response?.data || "Something went wrong")
    }

  }

  return (
    <div className="my-20 flex justify-center items-center">
      <div className="card bg-neutral text-neutral-content w-96">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{isLoginForm? "Login" : "Sign up"}</h2>
          <div>
            { !isLoginForm && <>
          <legend className="fieldset-legend">FirstName</legend>
          <input type="text" placeholder="First Name" className="input" value={firstName}  onChange={(e) => setFirstName(e.target.value)} />
          <legend className="fieldset-legend">LastName</legend>
          <input type="text" placeholder="Last Name" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </>}
            <legend className="fieldset-legend">Email ID</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input
                type="email"
                placeholder="mail@site.com"
                required
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>
          <div>
            <legend className="fieldset-legend">Password</legend>
            <label className="input validator">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </g>
              </svg>
              <input
                type="password"
                required
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <p className="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>

            <p className="text-red-500 m-3">{error}</p>
          </div>
          <div className="card-actions justify-end mt-5">
            <button className="btn btn-primary" onClick={isLoginForm? handelLogin : handelSignup}>{isLoginForm? "Login" : "Sign up"}</button>
          </div>

          <p className="mt-5 cursor-pointer" onClick={()=>setIsLoginForm((value)=>!value)}>{isLoginForm? "New user? SignUp Here " : "Existing User? Login Here"}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
