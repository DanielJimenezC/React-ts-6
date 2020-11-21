import { useState, useRef, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFecth(url: any) {
    const isMounted = useRef(false);
    const [data, setData] = useState<any>([]);
    const [error, setError] = useState<any>(null);
    const [loading, setLoading] = useState<any>(true);

    useEffect(() => {
        isMounted.current = true;
        async function init() {
          try {
            const response = await fetch(baseUrl + url);
            if (response.ok) {
              const json = await response.json();
              if (isMounted.current) setData(json);
            } else {
              throw response;
            }
          } catch (e) {
            if (isMounted.current) setError(e);
          } finally {
            if (isMounted.current) setLoading(false);
          }
        }
        init();
    
        return () => {
          isMounted.current = false;
        };
      }, [url]);

      return { data, error, loading };
}