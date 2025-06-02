import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from "../context/AuthContext"
const Navbar = () => {

  const { isAuthenticated, logout } = useAuthContext();


  const [isOpen, setIsOpen] = useState(false);


  const handleLogout = async () => {
    await logout()
  };


  return (
    <nav className="bg-blue-600 text-white px-4 py-3 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-xl font-bold">
          <Link to="/">NewsApp</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`flex-col md:flex-row md:flex items-center md:space-x-6 ${isOpen ? 'flex' : 'hidden'} md:flex`}>

          <Link to="/" className="block px-3 py-2 hover:bg-blue-500 rounded">News</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="block px-3 py-2 hover:bg-blue-500 rounded">Login</Link>
              <Link to="/signup" className="block px-3 py-2 hover:bg-blue-500 rounded">Register</Link>
            </>
          )}
          {isAuthenticated && (
            <>
              <Link to="/interests" className="block px-3 py-2 hover:bg-blue-500 rounded">Interests</Link>
              <Link to="/personalized" className="block px-3 py-2 hover:bg-blue-500 rounded">Personalized</Link>
              <button onClick={handleLogout} className="block px-3 py-2 hover:bg-blue-500 rounded">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
