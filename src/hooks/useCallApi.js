import { useEffect, useState } from 'react'
import { requestOptions, URIBase } from './headers'

export function useCallApi ({ endpoint }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const uri = URIBase(endpoint);
  useEffect(() => {
      fetch(uri, requestOptions("GET", null))
      .then(async resp => {
        if (!resp.status) throw new Error('Error de red o servidor')
        return resp.json()
      })
      .then(response => {
        setData(response.results)
        setError(response.error)
        setLoaded(true)
      })
      .catch(error => {
        setData([])
        setError(error)
        setLoaded(false)});
  }, [uri]);
  return { data, error, loaded }
}
