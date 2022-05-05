function UI() {
  this.container = document.querySelector('.container');
  this.tBody = document.getElementById('tBody');
}

UI.prototype.displayMessage = function (type, content) {
  let messageBox = document.createElement('div');
  messageBox.className = `alert alert-${type}`;
  messageBox.textContent = content;
  this.container.appendChild(messageBox);

  setTimeout(function () {
    messageBox.remove();
  }, 2000);
};



UI.prototype.clearAllInputs = function (paramsInput) {
  if (paramsInput instanceof Array) {
    let htmlArray = [...paramsInput];
    htmlArray.forEach(function (htmlItem) {
      htmlItem.value !== '' ? (htmlItem.value = '') : console.log(htmlItem);
    });
  } else {
    paramsInput.value !== '' ? (paramsInput.value = '') : null;
  }
};

UI.prototype.showFindedCustomer = function (paramsCustomer, index) {
  let storage = new Storage();
  let storageLength = storage.getCustomersFromStorage().length;
  let uiData = this.tBody.childElementCount;

  if (arguments.length === 1) {
    if (this.tBody.firstElementChild && this.tBody.childElementCount > 0) {
      while (this.tBody.firstElementChild !== null) {
        this.tBody.removeChild(this.tBody.firstElementChild);
      }
    }
    this.tBody.innerHTML = `
     <tr>
          <td>${paramsCustomer._name}</td>
          <td>${paramsCustomer._surname}</td>
          <td>${paramsCustomer._customerCode}</td>
          <td><button class="btn btn-outline-danger" id="removeButton">Remove</button></td>
          <td><button class="btn btn-outline-danger" id="clearButton">Clear</button></td>
        </tr>
    `;
  } else {
    if (storageLength > uiData) {
      this.tBody.innerHTML += `
        <tr>
          <td>${paramsCustomer._name}</td>
          <td>${paramsCustomer._surname}</td>
          <td>${paramsCustomer._customerCode}</td>
          <td><button class="btn btn-outline-danger" id="removeButton">Remove</button></td>
          <td><button class="btn btn-outline-danger" id="clearButton">Clear</button></td>
        </tr>
    `;
    }
  }
};

UI.prototype.clearUI = function (paramsTrElement) {
  paramsTrElement.remove();
};

UI.prototype.clearEveryRowController = function () {
  if (this.tBody.firstElementChild && this.tBody.childElementCount > 0) {
    while (this.tBody.firstElementChild !== null) {
      this.tBody.removeChild(this.tBody.firstElementChild);
    }
  }
};
