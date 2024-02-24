import { useParams } from "react-router-dom";
import useFetch from "../logic/useFetch";

const BlogDetail = () => {
    const { id: postId} = useParams();
    const { data:blog, isPending, error} = useFetch('http://127.0.0.1:8000/api/post/' + postId);

    return ( 
        <div className="flex flex-row min-h-screen relative">
            <div className="p-4">
                {isPending && (
                    <div className="mx-auto">
                        Please wait for the resource...
                    </div>
                )}
                {blog && (
                    <article className="mx-auto">
                        <h1>{blog.post.title}</h1>
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