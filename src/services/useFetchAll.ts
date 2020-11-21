import { equal } from "assert";
import { useState, useRef, useEffect } from "react";
import { Product } from "../models/product";

export default function useFetchAll(urls: any) { 
    const prevUrls = useRef([]);
    const [data, setData] = useState<Array<Product>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        if (areEqual(prevUrls.current, urls)) {
          setLoading(false);
          return;
        }
        prevUrls.current = urls;
    
        const promises = urls.map((url: any) =>
          fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
            if (response.ok) return response.json();
            throw response;
          })
        );
    
        Promise.all(promises)
          .then((json: any) => setData(json))
          .catch((e) => {
            console.error(e);
            setError(e);
          })
          .finally(() => setLoading(false));
    }, [urls]);

    return { data, loading, error };
}

function areEqual(array1: any, array2: any) {
  return (
    array1.length === array2.length &&
    array1.every((value: any, index: any) => value === array2[index])
  );
}