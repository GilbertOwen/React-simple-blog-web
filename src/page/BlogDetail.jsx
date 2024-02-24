import { Link, useParams } from "react-router-dom";
import useFetch from "../logic/useFetch";

const BlogDetail = () => {
    const { id: postId} = useParams();
    const { data:blog, isPending, error} = useFetch('http://127.0.0.1:8000/api/post/' + postId);

    return ( 
        <div className="flex flex-row min-h-screen relative">
            <div className="w-full">
                {isPending && (
                    <div className="mx-auto">
                        Please wait for the resource...
                    </div>
                )}
                {blog && (
                    <article className="mx-auto w-fit">
                        <h1 className=" text-3xl font-semibold my-2">{blog.post.title}</h1>
                        <h3 className="text-sm mb-2">Made by <Link to={'/blogs'} className="font-medium ">{blog.post.user.name}</Link> In category <Link className="font-medium ">{blog.post.category.name}</Link></h3>
                        <p className="text-base">{blog.post.description}</p>
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