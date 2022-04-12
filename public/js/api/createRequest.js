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
      let dataRes = Object.entries(options.data);

      dataRes.forEach((element, index) => {
        if (index === 0) {
          urlSource = urlSource + '?' + element.join('=');
        } else {
          urlSource = urlSource + "&" + element.join('=');
        }
      });
    }
  } else {
    if (options.data) {
      for (var key in data) {
        formData.append(key, data[key]);
      }
    }
  }

  try {
    xhr.open(options.method, urlSource);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (Boolean(options.callback)) {
        options.callback(xhr.onerror, xhr.response);
      }
    });

    if (options.method.toLowerCase() === 'get') {
      xhr.send();
    } else {
      xhr.send(formData);
    }

  } catch (e) {
    callback(e);
  }
}
