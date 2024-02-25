import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../logic/useFetch";
import axios from "axios";

const BlogDetail = () => {
    const { id: postId} = useParams();
    const { data:blog, isPending, error} = useFetch('http://127.0.0.1:8000/api/post/' + postId);
    const navigate = useNavigate();

    const deleteBlog = async (id) => {
        try{
        const res = await axios.delete('http://127.0.0.1:8000/api/post/' + id);
        if(res.statusText === 'OK'){
            navigate('/blogs');
        }else{
            throw Error('Error when trying to delete, please try again');
        }
        }catch(err){
            console.log(err);
        }
    }

    return ( 
        <div className="flex flex-row min-h-screen relative">
            <div className="w-full">
                {isPending && (
                    <div className="mx-auto">
                        Please wait for the resource...
                    </div>
                )}
                {blog && (
                    <article className="mx-auto w-fit md:w-[540px] lg:w-[640px] px-2 border-l-2 border-r-2">
                        <h1 className=" text-3xl font-semibold my-2">{blog.post.title}</h1>
                        <h3 className="text-sm mb-2">Made by <Link to={'/blogs'} className="font-medium ">{blog.post.user.name}</Link> In category <Link className="font-medium ">{blog.post.category.name}</Link></h3>
                        <p className="text-base">{blog.post.description}</p>
                        {blog && (<button onClick={() => deleteBlog(blog.post.id)} className="px-4 py-2 my-3 bg-red-600 text-white font-semibold rounded-md">Delete</button>)}
                    </article>
                )}
                {
                    error && (
                    <div className="my-5 mx-auto">
                        {blog.message}
                    </div>

                    )
                }
            </div>
        </div>
    );
}
 
export default BlogDetail;