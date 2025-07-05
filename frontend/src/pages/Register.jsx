import { useState, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext";
export const Register = () => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(username, email, password)
      navigate("/")
    } catch (error) {
      console.error(`[ERROR]: Register error - ${error}`)
    }
  }
  return (
    <>
      <main className="px-5 grid place-items-center h-screen bg-[#f4f4f4]">
        <div className="mx-auto w-[400px] shadow-md py-6 px-6 bg-white">
          <h1 className="text-2xl font-semibold text-center mb-4">REGISTER</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="username">Username</label>
              <input type="text" id="username"
                placeholder="Enter username"
                className="border-1 border-gray-500 p-1.5 rounded-sm"
                onChange={(e) => setUsername(e.target.value)}
                required />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input type="email" id="email"
                placeholder="Enter email"
                className="border-1 border-gray-500 p-1.5 rounded-sm"
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
              <input type="password" id="password"
                placeholder="Enter password"
                className="border-1 border-gray-500 p-1.5 rounded-sm"
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <button type="submit" className="border-none border-gray-500 p-2 rounded-sm font-bold text-white bg-blue-500">Register</button>
          </form>
          <p className="text-[.9rem] text-center mt-5 text-gray-500">
            Already regsistered?
            <Link to="/login" className="ml-1 text-blue-600 font-semibold hover:underline">login</Link>
          </p>
        </div>
      </main>
    </>
  )
}
