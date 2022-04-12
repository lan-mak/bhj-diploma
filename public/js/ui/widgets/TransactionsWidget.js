/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    if (!element) {
      throw new Error('элемента не существует');
    } else {
      this.element = element;
      this.registerEvents()
    }
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    this.element.addEventListener('click', () => {
      let createIncomeButton = this.element.querySelector('.create-income-button');
      let createeEpenseButton = this.element.querySelector('.create-expense-button');

      createIncomeButton.addEventListener('click', () => {
        App.getModal('newIncome').open();
      });

      createeEpenseButton.addEventListener('click', () => {
        App.getModal('newExpense').open();
      });
    });
  }
}
