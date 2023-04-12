import { useEffect, useState } from 'react'
import { requestOptions, URIBase } from './headers'

export function useCallApi ({ endpoint, param }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
      fetch(URIBase(param == "" || param == null || param == undefined? endpoint: `${endpoint}/${param}`), requestOptions("GET"))
      .then(async resp => {
        if (!resp.status) throw new Error('Error de red o servidor')
        return resp.json()
      })
      .then(response => {
        setData(response.results)
        setError(response.error)
        setLoaded(true)
      })
      .catch(error => {throw new Error(`Error de servidor: ${error}`)});
  }, [endpoint]);
  return { data, error, loaded }
}
