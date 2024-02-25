import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div className="flex flex-col items-center min-h-screen relative">
            <h2 className="text-3xl font-semibold mb-2">Sorry</h2>
            <p>What you have searching for is not here</p>
            <Link to="/" className="font-bold text-blue-400">
                Go back to the blog...
            </Link>
        </div>
     );
}
 
export default NotFound;