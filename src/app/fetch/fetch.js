export const fetchAPI = (options) => {

  return fetch(options.url, options)
    .then(response => {

      // TODO: Validate error responses from the backend

      return response;
    
    })
    .then(response => response.json());

}