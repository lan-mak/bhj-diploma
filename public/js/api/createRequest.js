/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  const xhr = new XMLHttpRequest;
  let formData = new FormData;

  let urlSource = options.url;
  let data = options.data;

  
  if (options.method.toLowerCase() === 'get') {
    if (options.data) {
      let link = Object.entries(data).reduce((sum, item) => {
        return sum + item.join('=') + '&';
      }, '?');

      urlSource = link.slice(0, -1);
    }
  } else {
    if (options.data) {
      for (let key in data) {
        formData.append(key, data[key]);
      }
    }
  }

  xhr.open(options.method, urlSource);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    if (Boolean(options.callback)) {
      options.callback(xhr.onerror, xhr.response);
    }
  });

  try {
    xhr.send(options.method.toLowerCase() === 'get' ? null : formData);
  } catch (e) {
    callback(e);
  }
}
