import { useEffect, useState } from 'react'
import { requestOptionsBody, URIBase } from './headers'
const BASE_URL = import.meta.env.VITE_BASE_URL

export function useSubmitForm ({endpoint, action, formData, start}) {
  const [responseData, setData] = useState(null)
  const [errorData, setError] = useState('')
  const [loadedData, setLoaded] = useState(false)

  useEffect(() => {
    if (start) {
      fetch(URIBase(endpoint), requestOptionsBody(action, formData))
      .then(async resp => {
        if (!resp.status) throw new Error('Error de red o servidor')
        return resp.json()
      })
      .then(response => {
        setData(response.results)
        setError(response.error)
        setLoaded(true)
      })
      .catch(error => {throw new Error(`Error de servidor: ${JSON.stringify(error)}`)});
    }
  }, [endpoint, action, formData, start]);
  return { responseData, errorData, loadedData }
}