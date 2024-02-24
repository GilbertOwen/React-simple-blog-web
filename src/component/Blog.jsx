import { Link } from "react-router-dom";

const Blog = ({blogs}) => {
    return ( 
        <div className="w-3/4 border-r-2 min-h-screen h-full">
                <h2 className="text-3xl px-3 mb-2 font-semibold border-b-2 w-fit mx-auto">All Posts</h2>
                { blogs && blogs.posts.map((post)=>{    
                    return (
                        <div className="flex flex-col mb-3 pb-2 border-b-2 mr-2" key={post.id}>
                            <Link to={`/blog/${post.id}`} className="text-2xl w-fit font-semibold text-blue-600">
                                { post.title }
                            </Link>
                            <h5 className="text-base mb-2">
                                <a href="/" className="w-fit font-semibold text-blue-600">
                                { post.user.name} 
                                </a> in Category of <a href="/" className="w-fit font-semibold text-blue-600">{ post.category.name }</a>
                            </h5>
                            <p className="text-sm">
                                { post.description.substr(0, 120) + '...'}
                            </p>
                        </div>
                    )
                }) }
        </div>
     );
}
 
export default Blog;