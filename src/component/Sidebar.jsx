import { Link } from "react-router-dom";

const Sidebar = ({ categories }) => {
    console.log(categories);
    return ( 
        <div className="w-1/4 px-2 font-semibold">
            <h2 className="text-3xl px-2 border-b-2 w-fit mb-3 mx-auto">List categories</h2>
            <div className="flex flex-col items-center">
                {categories.map((category) => (
                    <Link to={'/'} className="text-blue-600" key={category.id}>{category.name}</Link>
                ))}
            </div>
        </div>
    );
}
 
export default Sidebar;