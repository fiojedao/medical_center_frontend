import { useEffect, useState } from 'react'
const BASE_URL = import.meta.env.VITE_BASE_URL

export function useSubmitForm (endpoint, action, formData, start) {
  const [responseData, setData] = useState(null)
  const [errorData, setError] = useState('')
  const [loadedData, setLoaded] = useState(false)

  useEffect(() => {
    let headerVar = ''
    if (start) {
      debugger
      fetch(BASE_URL+endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        mode: 'cors'
      })
        .then((res) => {
          if (!res.status) {
            throw new Error('Error de red o servidor')
          }
          return res.json()
        })
        .then(response => {
          // console.log(response)
          debugger
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
    }
  }, [endpoint, start]) // Or [] if effect doesn't need props or state

  return { responseData, errorData, loadedData }
}
