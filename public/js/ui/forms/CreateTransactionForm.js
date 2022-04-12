/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(null, (err, response) => {
      let formList = this.element.querySelectorAll("select.accounts-select");
      let dataOptions = response.data;

      formList.forEach(element => {
        for (let i = 0; i < dataOptions.length; i++) {
          element.insertAdjacentHTML('beforeend', `<option value="${dataOptions[i].id}">${dataOptions[i].name}</option>`);
        }
      });
    });
  }


  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response.success) {
        App.update();
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();

      }
    });
  }
}
