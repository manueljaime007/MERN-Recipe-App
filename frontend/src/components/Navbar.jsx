export const Navbar = () => {
  return (
    <header className="bg-white shadow-md flex items-center justify-between px-10 py-2 fixed w-full">
      <a href="/">
        <h1 className="text-2xl font-semibold">Recipes</h1>
      </a>
      <nav>
        <ul className="flex gap-x-4">
          <li><a href="/login" className="">Login</a></li>
          <li><a href="/register" className="">Register</a></li>
        </ul>
      </nav>
    </header>
  )
}
