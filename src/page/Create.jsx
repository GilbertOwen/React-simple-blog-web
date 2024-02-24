import axios from "axios";
import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState(1);
    const [body, setBody] = useState('');
    const [slug, setSlug] = useState('');
    const [timeoutId, setTimeoutId] = useState(null);

    const storeData = async (e) => {
        e.preventDefault();
    }
    // Pertama ambil parameter title dan jadikan functionnya asynchronous
    const doSlug = async (title) => {
        // Ubah title menjadi lowercase
        title = title.toLowerCase();
        // ganti spasi menjadi dash atau strip
        let words = title.replace(/\s+/g, '-');
        console.log(words);
        // melakukan pengecekan ke dalam api Post untuk melihat apakah ada slug yang sama dengan yang di input
        const res = await axios.post("http://127.0.0.1:8000/api/posts/checkSlug", {
            words
        });
        // isi dari valid ini adalah untuk memberitahu kita apakah slug yang kita kirimkan ini valid untuk masuk ke dalam table post 
        const slug = await res.data.valid;
        // Jika akan dan tidak ada duplikasi, maka 
        if(slug === true){
            // Ubah isi dari input slug atau variable state slug menjadi words yang sudah kita ubah
            setSlug(words);
        }
        console.log(slug);
    }
    return ( 
        <div className="flex flex-row min-h-screen relative">
            <div className="flex flex-col mx-auto w-[320px]">
            <h2 className="text-2xl my-2">Create Blog</h2>
            <form onSubmit={storeData}>
                <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="mb-1 text-sm">Title </label>
                    <input type="text" className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={title} onChange={(e) => {
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
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="mb-1 text-sm">Slug</label>
                    <input type="text" readOnly className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={slug}/>
                </div>
                <div className="flex flex-col mb-2">
                    <label htmlFor="title" className="mb-1 text-sm">Author</label>
                    <input type="number" className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={author} onChange={(e) => {setAuthor(e.target.value)}}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="title" className="mb-1 text-sm">Body </label>
                    <textarea className="p-2 border-t-2 border-l-2 border-r-2 border-b-2 focus:border-t-0 outline-none focus:border-r-0 focus:border-l-0 focus:border-b-2 duration-100 rounded-md focus:shadow-sm focus:shadow-blue-100" id="title" value={body} onChange={(e) => {setBody(e.target.value)}}/>
                </div>
                
            </form>
            </div>
        </div>
     );
}
 
export default Create;