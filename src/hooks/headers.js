const BASE_URL = import.meta.env.VITE_BASE_URL

function header(token){
    if(token != '' && token != undefined){
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
    } else {
        return {
            'Content-Type': 'application/json'
          }
    }
}

export function requestOptions(action, token){
    return {
        mode: 'cors',
        credentials: 'same-origin',
        method: action,
        headers: header(token)
  }
}

export function requestOptionsBody(action,body,token){
    return {
        mode: 'cors',
        credentials: 'same-origin',
        method: action,
        headers: header(token),
        body: JSON.stringify(body)
  }
}

export function URIBase(path){
    return `${BASE_URL}${path}`;
}

