function Storage() {}

Storage.prototype.getCustomersFromStorage = function () {
  let customers;
  if (localStorage.getItem('customers') === null) {
    customers = [];
  } else {
    customers = JSON.parse(localStorage.getItem('customers'));
  }

  return customers;
};

Storage.prototype.addCustomerToStorage = function (paramsCustomer) {
  let customers = this.getCustomersFromStorage();
  customers.push(paramsCustomer);
  localStorage.setItem('customers', JSON.stringify(customers));
};

Storage.prototype.addFindedCustomersToStorage = function (paramsFindedCustomer) {
  localStorage.setItem('findedCustomer', JSON.stringify(paramsFindedCustomer))
}



Storage.prototype.removeCustomerFromStorageByCode = function (paramsPromoCode) {
  let customers = this.getCustomersFromStorage();

  customers.forEach(function (customer, index) {
    if (customer._customerCode === paramsPromoCode) {
      customers.splice(index, 1);
    }
  })

  localStorage.setItem('customers', JSON.stringify(customers));

}