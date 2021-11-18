/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  console.log(options)

  const xhr = new XMLHttpRequest;
  const formData = new FormData;

  if (options.method === 'GET' && Boolean(options.data)) {
    xhr.open(options.method, `http://localhost:8000/mail=${options.data.email}&${options.data.password}`)
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      options.callback(xhr.onerror, xhr.response)
    })
    xhr.send()
  } else if (options.method === 'GET' && !Boolean(options.data)) {
    xhr.open(options.method, `http://localhost:8000/`)
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      options.callback(xhr.onerror, xhr.response)
      }
    )
    xhr.send()
  }

  if (options.method === 'POST') {

    formData.append('mail', `${options.data.mail}`)
    formData.append('password', `${options.data.password}`)

    xhr.open(options.method, options.url)
    xhr.addEventListener('load', () => {
      options.callback(xhr.onerror, xhr.response)
    })
    xhr.responseType = 'json';
    xhr.send( formData )
  }
};
