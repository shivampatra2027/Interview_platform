import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, User, Cpu } from 'lucide-react';
import {useUser,SignIn} from "@clerk/clerk-react";

export default function LoginPage() {

  const {isSignedIn} = useUser();
  const navigate = useNavigate();
  useEffect(()=>{
    if(isSignedIn){
      navigate("/dashboard")
    }
  },[isSignedIn]);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement API call to backend
    console.log('Form submitted:', formData);
    // Navigate to dashboard after successful login
    navigate('/dashboard');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">
            Interview<span className="text-blue-500">AI</span>
          </span>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-2 text-center">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-slate-400 text-center mb-8">
            {isSignup ? 'Start your interview preparation journey' : 'Sign in to continue your practice'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Doe"
                    required={isSignup}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isSignup && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center text-slate-400">
                  <input type="checkbox" className="mr-2 rounded border-slate-700" />
                  Remember me
                </label>
                <a href="#" className="text-blue-400 hover:text-blue-300">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25"
            >
              <LogIn className="w-5 h-5" />
              {isSignup ? 'Sign Up' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-slate-400 hover:text-white text-sm"
            >
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <span className="text-blue-400 font-medium">
                {isSignup ? 'Sign In' : 'Sign Up'}
              </span>
            </button>
          </div>
        </div>

        <p className="text-slate-500 text-xs text-center mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
