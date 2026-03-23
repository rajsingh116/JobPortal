import React, { use, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function Login() {
  const{loading}=useSelector((state)=>state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 🔒 Frontend validation (important)
    if (!input.email || !input.password || !input.role) {
      toast.error("Please fill all fields and select a role");
      return;
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        input,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
      console.log("Login error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-lg">
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <h1 className="text-center text-2xl font-bold">Login</h1>

          {/* Email */}
          <div className="flex flex-col gap-2.5">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2.5">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
              placeholder="Enter your password"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col gap-2.5">
            <Label>Role</Label>
            <RadioGroup className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-1"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button>:<Button type="submit" className="w-full my-4">
            Login
          </Button> 
          }
          
          <span>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}
