import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Toast from '../components/Toast';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from '../components/Loader';

import {
  UserPlus,
  Mail,
  Lock,
  User,
  CheckCircle,
  XCircle,
  ShieldAlert
} from 'lucide-react';
import Navbar from '../components/Navbar';
// import { useToast } from "@/components/ui/use-toast";

const Signup = () => {
  // Updated state: separate username and fullName fields.
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [otpInput, setOtpInput] = useState<string[]>(Array(6).fill(''));

  const [errors, setErrors] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });



  // Debounced effect: check username availability whenever username changes.
  useEffect(() => {
    if (!formData.username) {
      setUsernameAvailable(null);
      return;
    }
    setCheckingUsername(true);

    const handler = setTimeout(() => {
      axios
        .get(`http://localhost:4000/server/user/check-username/${formData.username}`)
        .then((response) => {
          setUsernameAvailable(response.data.available);
          setCheckingUsername(false);
        })
        .catch((err) => {
          console.error(err);
          setUsernameAvailable(false);
          setCheckingUsername(false);
        });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [formData.username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.name ||
      !formData.email || !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields correctly.");
      return;
    }

    if(!emailVerified){
      toast.error("Verification is must !");
      return;
    }

    if(formData.password !== formData.confirmPassword){
      toast.error("Password & ConfirmPassword are not matched !");
      return;
    }

    if(!usernameAvailable){
      toast.error("Username is not available !");
      return;
    }

    setLoading(true); // Start loader

    try {
      const response = await axios.post("http://localhost:4000/server/user/sign-up", {
          username: formData.username,
          name: formData.name,
          email: formData.email,
          password: formData.password,
      });

      const data = await response.data;

      if (response.data.success) {
        const res = await axios.post("http://localhost:4000/server/user/email/email-signup", {
          name:formData.name,
          email:formData.email
        });
        toast.success("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        toast.error("Signup failed. Try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailVerify = () => {
    if (formData.name === '') {
      toast.error("Full Name is required");
    }

    if (formData.username === '') {
      toast.error("Username is required");
      return;
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    setOtpSent(true);

    axios
      .post('http://localhost:4000/server/user/email/email-otp', {
        email: formData.email,
        name: formData.name,
        otp,
      })
      .then(() => {
        toast.success('OTP sent to your email');
      })
      .catch((err) => {
        toast.error('Failed to send OTP, try again')
      });

    // Invalidate the OTP after 2 minutes.
    setTimeout(() => {
      setGeneratedOtp('');
      setOtpSent(false);
      setOtpInput(Array(6).fill(''));
    }, 120000);
  };


  const handleOtpInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    // Only allow digits.
    if (!/^\d?$/.test(value)) return;

    const newOtpInput = [...otpInput];
    newOtpInput[index] = value;
    setOtpInput(newOtpInput);

    // Auto-focus next input if a digit was entered.
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) (nextInput as HTMLInputElement).focus();
    }

    // If all six digits are entered, verify the OTP.
    if (newOtpInput.every((digit) => digit !== '')) {
      const enteredOtp = newOtpInput.join('');
      if (enteredOtp === generatedOtp) {
        setEmailVerified(true);
        toast.success("Email Verified Successfuly");
      } else {
        toast.error("Incorrect OTP. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] w-7 mx-auto ml-200 mt-12 mb-10">
        <Loader />
      </div>
    );
  }
  
  
  return (
    <><Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-white-600 to-indigo-600 flex items-center justify-center px-4 mt-[50px]">

      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden"
      >
        {/* Animated background effect */}
        <div className=" absolute inset-0 top-[30px] bg-gradient-to-r from-purple-200 to-indigo-200 opacity-10 animate-pulse"  />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <UserPlus className="h-12 w-12 text-purple-600" />
          </motion.div>

          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Create Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username Field with availability check */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Id
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/3  transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your User Name"
                  required
                />
                <div className="absolute right-3 -mt-5 transform -translate-y-1/2">
                  {checkingUsername ? (
                    <svg
                      className="animate-spin h-5 w-5 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                  ) : usernameAvailable === true ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : usernameAvailable === false ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : null}
                </div>
                <ShieldAlert className="absolute left-3 top-11 h-5 w-5 text-red-500 opacity-100" />
                <p className='text-red-500 w-full pl-10'>Username will not change, it must be unique </p>
              </div>
            </motion.div>

            {/* Full Name Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2 mt-3">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Enter your Full Name"
                  required
                />
              </div>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 
                    ${emailVerified ? 'bg-gray-200 cursor-not-allowed text-gray-500' : 'focus:ring-purple-600 focus:border-transparent'}`}
                  placeholder="Enter your email"
                  readOnly={emailVerified}
                  required
                />
                {!emailVerified && formData.email && (
                  <button
                    type="button"
                    onClick={handleEmailVerify}
                    // disabled={!canVerify}
                    className="absolute right-2 bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 transition"
                  >
                    Verify
                  </button>
                )}
                {emailVerified && (
                  <span className="absolute right-2 text-green-600 font-bold">Verified</span>
                )}
              </div>

            </motion.div>

            {/* OTP Input Boxes (appear if OTP has been sent and email is not verified) */}
            {otpSent && !emailVerified && (
              <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
                <p className="text-sm text-gray-700 mb-2">Enter the 6-digit OTP sent to your email:</p>
                <div className="flex gap-2">
                  {otpInput.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpInputChange(e, index)}
                      className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Password Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Create a password"
                  required
                />
              </div>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </motion.div>

            {/* Signup Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              type="submit"
              disabled={!formData.username || usernameAvailable === false || checkingUsername}
              className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-lg transition-all duration-300 transform mt-6 ${!formData.username || usernameAvailable === false || checkingUsername
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:scale-105 hover:from-purple-700 hover:to-indigo-700'
                }`}
            >
              Create Account
            </motion.button>
          </form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-center"
          >
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </motion.div>
      
    </div>
    </>
  );
};

export default Signup;