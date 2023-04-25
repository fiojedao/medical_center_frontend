import { useEffect, useState } from 'react'
import { requestOptions, URIBase } from './headers'

export function getAppointmentById({endpoint, action, start}) {
  const [appResp, setData] = useState(null)
  const [apperrorData, setError] = useState('')
  const [apoploadedData, setLoaded] = useState(false)

  useEffect(() => {
    if (start) {
      fetch(URIBase(endpoint), requestOptions(action))
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
    }
  }, [endpoint, action, start]);
  return { appResp, apperrorData, apoploadedData }
}
