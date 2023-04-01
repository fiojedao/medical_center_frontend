import { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_BASE_URL
export function useCallApi ({ endpoint, user = null }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    let headerVar = ''
    
    fetch(`${BASE_URL}${endpoint}`, {
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    })
      .then((res) => {
        if (!res.status) {
          throw new Error('Error de red o servidor')
        }
        return res.json()
      })
      .then(response => {
        // console.log(response)
        setData(response.results)
        setError(response.error)
        setLoaded(true)
      })
      .catch(error => {
        if (error instanceof SyntaxError) {
          console.log(error)
          throw new Error('Respuesta no válida del servidor')
        }
      })
  }, [endpoint])
  return { data, error, loaded }
}
