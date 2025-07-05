import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()
  
  const handleLogout = ()=>{
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-white shadow-md flex items-center justify-between px-10 py-2 fixed w-full">
      <a href="/">
        <h1 className="text-2xl font-semibold">Recipes</h1>
      </a>
      <nav>
       {user ? (
        <div className="flex gap-x-4">
          <button 
            className="p-2 bg-red-900 text-white rounded-sm"
            onClick={handleLogout}  
          >Logout</button>
        
        </div>
       ):<ul className="flex gap-x-4">
          <li><a href="/login" className="">Login</a></li>
          <li><a href="/register" className="">Register</a></li>
        </ul> 
       }
      </nav>
    </header>
  )

}

//  <ul className="flex gap-x-4">
//           <li><a href="/login" className="">Login</a></li>
//           <li><a href="/register" className="">Register</a></li>
//         </ul>