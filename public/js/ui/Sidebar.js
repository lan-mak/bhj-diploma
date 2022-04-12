/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {

    const pushMenu = document.querySelector('.sidebar-toggle');

    pushMenu.addEventListener('click', () => {
      pushMenu.closest('.sidebar-mini').classList.toggle('sidebar-open');
      pushMenu.closest('.sidebar-mini').classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const login = document.querySelector('.menu-item_login');
    const linkRegistration = document.querySelector('.menu-item_register');
    const logout = document.querySelector('.menu-item_logout');

    login.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });

    linkRegistration.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });

    logout.addEventListener('click', (e) => {
      e.preventDefault();
      User.logout();
      App.setState( 'init' );
    });
  }
}
