const requestHandler = (method) => {
    let isError = null
    const response =  fetch(request.url, {
        method: method,
        headers: request.headers ? request.headers : {},
        body: request.body ? JSON.stringify(request.body) : null,
    })
	const requestData = (request) => {
            const responce = await fetch(request.url, {
			method: method,
			headers: request.headers ? request.headers : {},
			body: request.body ? JSON.stringify(request.body) : null,
		})
        const data = await responce.json()
		if (responce.ok) {	
			return data
		} else {
			let errorMessage = 'Authentciation failed'
			if (data && data.error && data.error.message) {
				errorMessage = data.error.message
			}
			 throw new Error(errorMessage)
		}
	}
	return[requestData,isError]
}
export default requestHandler
