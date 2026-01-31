import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const UserForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 chars";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {submitted && <div className="p-3 mb-4 bg-green-100 text-green-700 rounded text-sm">Success! Form submitted.</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            name="name" value={formData.name} onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            name="email" value={formData.email} onChange={handleChange}
            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              name="password" value={formData.password} onChange={handleChange}
              className={`w-full p-2 border rounded pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2.5 text-gray-500"
            >
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default UserForm;