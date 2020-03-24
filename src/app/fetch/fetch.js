const handleError = (error) => {

  if (typeof error === 'object') {

    return error;
  
  }

  try {

    const { message, } = JSON.parse(error);

    return Promise.reject(new Error(message));
    
  } catch (err) {

    return Promise.reject(new Error(error));
  
  }

}

export const fetchAPI = (options) => {

  return fetch(options.url, options)
    .then(response => {

      // TODO: Validate error responses from the backend

      if(response.status !== 200) {

        return response.text();
      
      }

      return response;
    
    })
    .then(handleError)
    .then(response => response.json());

}