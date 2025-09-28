import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/input/Input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPath";
import { userContext } from "../../context/UserContext";
import updateImage from "../../utils/updateImage";
function Signup() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilepic, setProfilepic] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { updateUser } = useContext(userContext);
  // handle signup form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    let profileimageurl="";
    if(!fullname){
      setError("Please enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address")
      return;
    }
    if(!password){
      setError("Please enter a valid Password")
      return;
    }
    setError("");

    //signup api call
    try{

      //update image url
      const imageupdate=await updateImage(profilepic);
      profileimageurl=imageupdate.imageurl || "";
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullname,
        email,
        password,
        profileimageurl
      })
      const {token,user}=response.data;
      if(token){
        localStorage.setItem('token',token);
        updateUser(user);
        navigate("/dashboard");
    
      }
    }catch(err){
       if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-9 flex flex-col justify-center">
        <h3 className="text-xl text-black font-semibold">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSubmit}>
          <ProfilePhotoSelector image={profilepic} setimage={setProfilepic} />
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <Input
              value={fullname}
              onChange={({ target }) => setFullname(target.value)}
              label="Full Name"
              placeholder="Kiran Kumar"
              type="text"
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="kiran@example.com"
              type="text"
            />
            <div className="col-span-2">
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button type="submit" className="btn-primary">
              Sign Up
            </button>
            <p className="text-slate-800 text-[13px] mt-3">
              Already have an account?{" "}
              <Link
                className="font-medium text-primary underline"
                to={"/Login"}
              >
                Login
              </Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default Signup;
