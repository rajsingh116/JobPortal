import React, { useState } from 'react';
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '../../utils/constant.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
export default function Signup() {

  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  }); 
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error while registering user", error);
    }
    finally {
      dispatch(setLoading(false));
    }
  }
  return (
    <div>
      <Navbar />
      <div className='max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg'>
        <form onSubmit={submitHandler} className='flex flex-col gap-4'>
          <h1 className="text-center text-2xl font-bold">Signup</h1>

          {/* Full Name Field */}
          <div className='flex flex-col gap-2.5'>
            <Label>Full Name</Label>
            <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter your full name" />
          </div>

          {/* Email Field */}
          <div className='flex flex-col gap-2.5'>
            <Label>Email</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your email" />
          </div>

          {/* Phone Number Field */}
          <div className='flex flex-col gap-2.5'>
            <Label>Phone Number</Label>
            <Input type="tel" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="Enter your phone number" />
          </div>

          {/* Password Field */}
          <div className='flex flex-col gap-2.5'>
            <Label>Password</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password" />
          </div>

          {/* Role Field */}
          <div className='flex flex-col gap-2.5'>
            <Label>Role</Label>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Input type="radio" name="role" value="student" checked={input.role === "student"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center gap-3">
                <Input type="radio" name="role" value="recruiter" checked={input.role === "recruiter"} onChange={changeEventHandler} className="cursor-pointer" />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          {
            loading ? <Button className="w-full my-1"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button> : <Button type="submit" className="w-full my-4">Signup</Button>
          }

          <span>Already have an account? <Link to="/login" className="text-blue-500 ">Login</Link></span>
        </form>
      </div>
    </div>
  )
}

