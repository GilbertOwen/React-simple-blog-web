import axios from "axios";
import { useEffect, useState } from "react";
import useFetch from "../logic/useFetch";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    // const [author, setAuthor] = useState('');
    const [body, setBody] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('');
    const { data:categoriesOption, error:fetchError} = useFetch('http://127.0.0.1:8000/api/categories');
    const [timeoutId, setTimeoutId] = useState(null);
    const [errorField, setErrorField] = useState([]);

    const storeData = async (e) => {
        e.preventDefault();
        // console.log(post);
        try{
            const post = {
                "category_id" : parseInt(category),
                title,
                slug,
                description: body
            }
            const res = await axios.post('http://127.0.0.1:8000/api/posts', post);
            // console.log(res);
            navigate('/blog/' + res.data.id)
        }catch(e){
            if (e.response && e.response.status === 422) {
                // Here you can handle the validation error,
                // for example, by setting an error message in your component's state
                // and displaying it in your UI.
                setErrorField(e.response.data.errors);
            } else {
                // Handle other types of errors (e.g., network error, server error)
                console.error("An unexpected error occurred", e);
            }
        }
    }
    // Pertama ambil parameter title dan jadikan functionnya asynchronous
    const doSlug = async (title) => {
        try{
            // Ubah title menjadi lowercase
            title = title.toLowerCase();
            // ganti spasi menjadi dash atau strip
            let words = title.replace(/\s+/g, '-');
            console.log(words);
            // melakukan pengecekan ke dalam api Post untuk melihat apakah ada slug yang sama dengan yang di input
            const res = await axios.post("http://127.0.0.1:8000/api/posts/checkSlug", {
                words
            });
            console.log(res);
            // isi dari valid ini adalah untuk memberitahu kita apakah slug yang kita kirimkan ini valid untuk masuk ke dalam table post 
            const slugValid = await res.data.valid;
            // Jika akan dan tidak ada duplikasi, maka 
            if(slugValid == true){
                // Ubah isi dari input slug atau variable state slug menjadi words yang sudah kita ubah
                setSlug(words);
            }else{
                setSlug(res.data.slug);
            }
            console.log(res.data.slug);
        }catch(err){
            console.log(err);
            
        }
    }
    useEffect(()=>{
        console.log(category);
    },[category])

    return ( 
        <div className="flex flex-row min-h-screen relative">
            <div className="flex flex-col w-[320px] mx-auto md:w-[640px]">
            <h2 className="text-2xl my-2">Create Blog</h2>
            <form onSubmit={storeData}>
                <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="mb-1 text-sm">Title </label>
                    <input required type="text" className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={title} onChange={(e) => {
                        // Pertama, kita buat terlebih dahulu event listenernya yaitu onChange, jadi saat value di dalam inputnya diganti, maka akan mentrigger kode/program dibawah

                        // bungkus value dari input title ini ke dalam variable titleValue
                        let titleValue = e.target.value; 

                        // Kemudian check apakah ada timeoutId, jika ada maka ada perubahan yang sedang terjadi, ini dilakukan untuk menghindari banyaknya request yang dilakukan oleh program, jadi jika timeout sebelumnya ada atau request yang sebelumnya ada, maka hapus yang sebelumnya dan buat lagi yang baru dan masukkan setTimeoutnya ke dalam dynamic value/ state variable yang menyimpan timeoutId untuk dicek jika ada tabrakan setTimeout/ perubahan berikutnya
                        if(timeoutId){
                            // Jika ada timeOut sebelumnya maka lakukan clear Timeout id
                            clearTimeout(timeoutId);
                        }
                        // Setelah diclear, ganti variable title menggunakan variable dari useState
                        setTitle(titleValue); 
                        
                        // Kemudian buat lagi setTimeout agar setTimeout lainnya tidak bertabrakan
                        const id = setTimeout(() => {
                            // Jika setTimeoutnya sudah berjalan 1 detik, tanpa ada hambatan/tabrakan request lainnya, maka lakuakan doSlug untuk mengganti value dari input slug dan menjalankan function
                            doSlug(titleValue);
                        }, 1000);
                        // SetTimout id nya untuk melakukan pengecekan kedepannya lagi
                        setTimeoutId(id);
                    }}/>
                    {errorField['title'] && 
                        <p className="text-sm text-red-600">{errorField['title']}</p>
                    }
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="slug" className="mb-1 text-sm">Slug</label>
                    <input required type="text" readOnly className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="slug" value={slug}/>
                    {errorField['slug'] && 
                        <p className="text-sm text-red-600">{errorField['slug']}</p>
                    }
                </div>
                {/* <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="mb-1 text-sm">Author</label>
                    <input required type="number" className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={author} onChange={(e) => {setAuthor(e.target.value)}}/>
                    {errorField['user_id'] && 
                        <p className="text-sm text-red-600">{errorField['user_id']}</p>
                    }
                </div> */}
                <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="mb-1 text-sm">Category :</label>
                    <select required type="number" className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {categoriesOption && categoriesOption.categories.map((cat) => {
                            return (
                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                                )
                            })}
                    </select>
                            {fetchError && 
                                <p className="text-sm text-red-600">Failed to fetch categories please try again later</p>
                            }
                </div>
                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1 text-sm">Body </label>
                    <textarea required className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={body} onChange={(e) => {setBody(e.target.value)}}/>
                    {errorField['description'] && 
                        <p className="text-sm text-red-600">{errorField['description']}</p>
                    }
                </div>
                <button type="submit" className="my-3 py-2 px-4 bg-blue-400 shadow-md rounded-md text-white font-semibold">
                    Add post
                </button>
            </form>
            
            </div>
        </div>
     );
}
 
export default Create;