import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    const getData = async (link) => {
        try{
            const res = await axios.get(link);
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
        getData(url);
    }, [url]);

    return { data, isPending, error };
}
 
export default useFetch;