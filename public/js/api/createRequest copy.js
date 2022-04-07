/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest;
  const formData = new FormData;

  try {
    let getDataOption = () => {
      console.log(options.data)
      let dataUrlOptions = []

      if (Object.keys(options.data).length > 1) {
        for (let i of Object.entries(options.data)) {
          dataUrlOptions.push(i[0] + '=' + i[1])
        }
      } else {
        for (let i of Object.entries(options.data)) {
          dataUrlOptions.push(i[0] + '=' + i[1])
        }
      }
      dataUrlOptions = dataUrlOptions.join('&')
      console.log(dataUrlOptions)
      return dataUrlOptions
    }

    let postDataOptions = () => {
      for (let i of Object.entries(options.data)) {
        formData.append(i[0], i[1])
      }
    }

    if (options.method === 'GET' && Boolean(options.data)) {
      xhr.open(options.method, `${options.url}${getDataOption()}`)
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (Boolean(options.callback)) {
          options.callback(xhr.onerror, xhr.response)
        }
      })
      xhr.send()
    } else if (options.method === 'GET' && !Boolean(options.data)) {
      xhr.open(options.method, `${options.url}`)
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (Boolean(options.callback)) {
          options.callback(xhr.onerror, xhr.response)
        }
      })
      xhr.send()
    }

    if (options.method === 'POST') {
      postDataOptions()

      xhr.open(options.method, options.url)
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (Boolean(options.callback)) {
          options.callback(xhr.onerror, xhr.response)
        }
      })
      xhr.send(formData)
    }

    if (options.method === 'PUT') {
      postDataOptions()

      xhr.open(options.method, options.url)
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (Boolean(options.callback)) {
          options.callback(xhr.onerror, xhr.response)
        }
      })
      xhr.send(formData)
    }

    if (options.method === 'DELETE') {
      postDataOptions()

      xhr.open(options.method, options.url)
      xhr.responseType = 'json';
      xhr.addEventListener('load', () => {
        if (Boolean(options.callback)) {
          options.callback(xhr.onerror, xhr.response)
        }
      })
      xhr.send(formData)
    }
  } catch (e) {
    callback(e);
  }
}
