/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('элемента не существует');
    };

    this.element = element;
    this.registerEvents()
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    
    this.element.addEventListener('click', e => {
      let target = e.target

      if (target.closest('.transaction__remove')) {
        let transactionId = target.closest('.transaction__remove').dataset.id
        this.removeTransaction({id: transactionId})
      }

      if (target.closest('.remove-account')) {
        this.removeAccount()
      }

    })
    
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
  removeAccount() {
    Account.get(this.lastOptions.account_id, (err, response) => {
      if (confirm("Вы согласны удалить счёт?")) {
        Account.remove(response.data, (err, response) => {
          if (response.success) {
            App.updateWidgets()
          }
        })
        this.clear()
      } else {
        return false;
      }
    })
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction(id) {
    if (confirm("Вы подтверждаете удаление транзакции?")) {
      Transaction.remove(id, (err, response) => {
        if (response.success) {
          App.update()
        }
      })
    } else {
      return false;
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    if (!options) return
    this.lastOptions = options;

    Account.get(this.lastOptions.account_id, (err, response) => {
      if (response.success) {
        this.renderTitle(response.data.name)
      };
    })

    Transaction.list(this.lastOptions, (err, response) => {
      if (response.success) {
        this.renderTransactions(response.data)
      };
    })
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle('Название счёта');
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    this.element.querySelector('.content-title').textContent = name
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {

    const now = new Date(date);
    const ruDate = new Intl.DateTimeFormat("ru", {dateStyle: "long"}).format(now);
    const ruTime = new Intl.DateTimeFormat("ru", {timeStyle: "short"}).format(now);
    return ruDate + ' в ' + ruTime
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    let dateItem = this.formatDate(item.created_at)

    return `
    <div class="transaction transaction_${item.type} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${dateItem}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
            ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>
    `
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    const content = this.element.querySelector('.content');
    content.innerHTML = '';
    data.forEach(item => {
      content.insertAdjacentHTML('beforeend', this.getTransactionHTML(item));
    });
  }
}
