'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    role: 'traveller',
    phone: '',
    bio: '',
  });

  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();

      formData.append('username', form.username);
      formData.append('email', form.email);
      formData.append('password', form.password);
      formData.append('password2', form.password2);
      formData.append('role', form.role);
      formData.append('phone', form.phone);
      formData.append('bio', form.bio);

      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      const res = await fetch('http://localhost:8000/api/auth/register/', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || 'Registration failed');
      }

      router.push('/auth/login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-white to-emerald-100 p-4">

      {/* Glow background blobs */}
      <div className="absolute w-72 h-72 bg-sky-300 blur-3xl opacity-30 rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-emerald-300 blur-3xl opacity-30 rounded-full bottom-10 right-10"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-2xl p-6"
      >
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-1">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Join Nepal Trek & Tour Adventure 🌄
        </p>

        {/* Error */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        {/* Inputs */}
        <input
          name="username"
          placeholder="Username"
          className="w-full mb-3 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={form.username}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          className="w-full mb-3 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={form.password2}
          onChange={handleChange}
        />

        <select
          name="role"
          className="w-full mb-3 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={form.role}
          onChange={handleChange}
        >
          <option value="traveller">Traveller 🧳</option>
          <option value="guide">Guide 🧭</option>
          <option value="agency">Agency 🏢</option>
          <option value="seller">Seller 🛍️</option>
          <option value="admin">Admin ⚙️</option>
        </select>

        <input
          name="phone"
          placeholder="Phone"
          className="w-full mb-3 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={form.phone}
          onChange={handleChange}
        />

        <textarea
          name="bio"
          placeholder="Short bio..."
          className="w-full mb-3 p-3 rounded-lg border bg-white/80 focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={form.bio}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          className="w-full mb-4 text-sm"
          onChange={(e) => {
            if (e.target.files) {
              setProfilePicture(e.target.files[0]);
            }
          }}
        />

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-semibold shadow-md hover:scale-[1.02] transition"
        >
          {loading ? 'Creating Account...' : 'Join Adventure 🚀'}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{' '}
          <span className="text-sky-600 cursor-pointer">Login</span>
        </p>
      </form>
    </div>
  );
}