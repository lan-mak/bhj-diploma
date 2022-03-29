/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */

  static URL = '';

  static list(data, callback) {
    let requestList = {
      url: this.URL,
      method: 'GET',
      data,
      callback
    }
    createRequest(requestList)
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    let requestCreate = {
      url: this.URL,
      method: 'PUT',
      data,
      callback
    }
    createRequest(requestCreate)
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    let requestRemove = {
      url: this.URL,
      method: 'DELETE',
      data,
      callback
    }
    createRequest(requestRemove)
  }
}
