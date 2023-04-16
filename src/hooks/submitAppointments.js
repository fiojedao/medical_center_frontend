import { useEffect, useState } from 'react'
import { requestOptionsBody, URIBase } from './headers'

export function submitAppointments ({endpoint, action, body, start}) {
  const [responseData, setRespnse] = useState(null);
  const [errorData, setError] = useState('');
  const [loadedData, setLoaded] = useState(false);

  useEffect(() => {
    if (start) {
      fetch(URIBase(endpoint), requestOptionsBody(action, body))
      .then(async resp => {
        if (!resp.status) throw new Error('Error de red o servidor')
        return resp.json()
      })
      .then(response => {
        setRespnse(response.results)
        setError(response.error)
        setLoaded(true)
      })
      .catch(error => {throw new Error(`Error de servidor: ${error}`)});
    }
  }, [endpoint, action, start, body]);
  return { responseData, errorData, loadedData }
}
