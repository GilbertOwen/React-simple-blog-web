import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    const getData = async (link) => {
        try{
            const res = await axios.get(link);
            console.log(res);
            if(!res.statusText === 'OK'){
                throw Error('Could not get the data from the source');
            }   
            setData(res.data);
            setIsPending(false);
            console.log(res.data);
        }catch(e){
            setIsPending(false);
            setError(e.message);
            console.log(e);
        }
    }
    useEffect(()=>{
        setTimeout(() => {
            getData(url);
        }, 2000);
        // return () => {
        //     console.log('Cleanup');
        // }
    }, [url]);

    return { data, isPending, error };
}
 
export default useFetch;