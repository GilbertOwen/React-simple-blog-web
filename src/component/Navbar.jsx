import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
     <nav className="fixed top-0 left-0 right-0 border-b-2 z-10 bg-white">
        <div className="py-4 px-6 flex flex-row justify-between mx-auto">
          <div className="flex flex-row items-center">
            <h2 className='text-3xl font-bold bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-transparent'>Funicurs</h2>
          </div>
          <div className="flex flex-row items-center gap-x-5">
            <Link to="/blogs" className='text-lg font-medium mx-1 py-2 px-4 hover:bg-rose-300 rounded-lg hover:shadow-md hover:text-white duration-300'>
              Blog
            </Link>
            <Link to="/create" className='text-lg font-medium mx-1 py-2 px-4 text-white bg-rose-300 shadow-md hover:text-black duration-300 hover:bg-white hover:shadow-none rounded-lg'>
              Create Blog
            </Link>
          </div>
        </div>
      </nav>
     );
}
 
export default Navbar;