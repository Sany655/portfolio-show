import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   onSubmit({ email, password });
  // };

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to owner page
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex-col align-middle justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Sign In</h2>
      <div className="flex flex-col">
        <label htmlFor="email" className="text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password" className="text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
      >
        Sign In
      </button>
    </form>
    </div>
  );
};

export default SignIn;