const FORM_CUSTOMER = document.getElementById("customerForm");
const FORM_SEARCH = document.getElementById("searchForm");
const INPUT_NAME = document.getElementById("name");
const INPUT_SURNAME = document.getElementById("surname");
const INPUT_CUSTOMER_CODE = document.getElementById("customerCode");
const INPUT_SEARCH = document.getElementById("search");
const TABLE_BODY = document.getElementById("tBody");
const BUTTON_LIST = document.getElementById("ListCustomers");
const BUTTON_SEARCH = document.getElementById("searchCustomers");
let clickedArea;

//!INSTANCES
let ui = new UI();
let storage = new Storage();

eventListeners();

function eventListeners() {
  FORM_CUSTOMER.addEventListener("submit", formValidationController);
  FORM_SEARCH.addEventListener("submit", searchCustomer);
  TABLE_BODY.addEventListener("click", removeOrDeleteCustomer);
  BUTTON_LIST.addEventListener("click", listCustomersController);
  document.addEventListener("DOMContentLoaded", addFindedCustomerToUIFromStorage);
}

function formValidationController(e) {
  let newName = INPUT_NAME.value.trim(),
    newSurname = INPUT_SURNAME.value.trim(),
    newCustomerCode = INPUT_CUSTOMER_CODE.value.trim();

  if (newName === "" || newSurname === "" || newCustomerCode === "") {
    ui.displayMessage("danger", "Please enter all values");
    ui.clearAllInputs([INPUT_NAME, INPUT_SURNAME, INPUT_CUSTOMER_CODE]);
  } else {
    ui.displayMessage("success", `${newName} added database`);
    ui.clearAllInputs([INPUT_NAME, INPUT_SURNAME, INPUT_CUSTOMER_CODE]);
    storage.addCustomerToStorage(new Customer(newName, newSurname, newCustomerCode));
  }

  e.preventDefault();
}

function searchCustomer(e) {
  let newCustomerCode = INPUT_SEARCH.value.trim();

  if (newCustomerCode === "") {
    ui.displayMessage("danger", "customer-code daxil edin");
  } else {
    findCustomerByCustomerCode(newCustomerCode);
    ui.clearAllInputs(INPUT_SEARCH);
  }

  e.preventDefault();
}

function findCustomerByCustomerCode(paramsCustomerCode) {
  let customers = storage.getCustomersFromStorage();

  let findedCustomer = customers.find(function (customer) {
    return customer._customerCode === paramsCustomerCode;
  });

  if (findedCustomer) {
    localStorage.setItem("buttonController", "search");
    storage.addFindedCustomersToStorage(findedCustomer);
    ui.displayMessage("primary", `${findedCustomer._name} haqqinda melumat gosterilir`);
    ui.showFindedCustomer(findedCustomer);
  } else {
    ui.displayMessage("danger", `${paramsCustomerCode} bazada movcud deyil`);
  }
}

function addFindedCustomerToUIFromStorage() {
  //!  'DOMContentLoaded'
  let actionSelector;
  let findedCustomer = JSON.parse(localStorage.getItem("findedCustomer"));
  let customers = storage.getCustomersFromStorage();

  if (localStorage.getItem("buttonController")) {
    actionSelector = localStorage.getItem("buttonController");

    actionSelector === "list" ? customers.forEach((cus, index) => ui.showFindedCustomer(cus, index)) : ui.showFindedCustomer(findedCustomer);
  }
}

function removeOrDeleteCustomer(e) {
  if (e.target.id === "removeButton") {
    let trElement = e.target.parentElement.parentElement;
    ui.clearUI(trElement);
    localStorage.removeItem("findedCustomer");
  } else if (e.target.id === "clearButton") {
    let trElement = e.target.parentElement.parentElement;
    let promoCode = e.target.parentElement.previousElementSibling.previousElementSibling.textContent.trim();
    ui.clearUI(trElement);
    localStorage.removeItem("findedCustomer");
    storage.removeCustomerFromStorageByCode(promoCode);
  }
}

function listCustomersController() {
  let customers = storage.getCustomersFromStorage();
  localStorage.setItem("buttonController", "list");
  if (customers.length === 0) {
    ui.displayMessage("danger", "database is new");
  } else {
    ui.clearEveryRowController();
    customers.forEach((customer, index) => {
      ui.showFindedCustomer(customer, index);
    });
  }
}
