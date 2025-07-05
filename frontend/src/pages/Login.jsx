import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate("/")
    } catch (error) {
      console.error(`[ERROR]: Register error - ${error}`)
    }
  }

  return (
    <>
      <main className="px-5 grid place-items-center h-screen bg-[#f4f4f4]">
        <div className="mx-auto w-[400px] shadow-md py-6 px-6 bg-white">
          <h1 className="text-2xl font-semibold text-center mb-4">LOGIN</h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input type="email" id='email'
                placeholder="Enter email"
                className="border-1 border-gray-500 p-1.5 rounded-sm"
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
              <input type="password" id='password'
                placeholder="Enter password"
                className="border-1 border-gray-500 p-1.5 rounded-sm"
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <button type="submit" className="border-none border-gray-500 p-2 rounded-sm font-bold text-white bg-blue-500">Enter</button>
          </form>
          <p className="text-[.9rem] text-gray-500 text-center mt-5">
            Don't have an account?
            <Link to="/register" className="ml-2 text-blue-600 font-semibold hover:underline">register</Link>
          </p>
        </div>
      </main>
    </>
  )
}
