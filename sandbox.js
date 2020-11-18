var me = {
    name: 'shuan',
    age: 30,
    speak: function (text) {
        console.log(text);
    },
    spend: function (amount) {
        console.log('I spent', amount);
        return amount;
    }
};
// 11=>CLASSES WITH INTERFACES===============================================
var invoice = /** @class */ (function () {
    function invoice(client, details, amount) {
        this.client = client;
        this.details = details;
        this.amount = amount;
    }
    invoice.prototype.format = function () {
        return this.client + " owes $" + this.amount + " for " + this.details;
    };
    return invoice;
}());
var payment = /** @class */ (function () {
    function payment(recipient, details, amount) {
        this.recipient = recipient;
        this.details = details;
        this.amount = amount;
    }
    payment.prototype.format = function () {
        return this.recipient + " is owed $" + this.amount + " for " + this.details;
    };
    return payment;
}());
// let docOne: HasFormatter;
// let docTwo: HasFormatter;
// docOne = new invoice ('hario', 'web Work', 100);
// docTwo = new payment ('shoun', 'home Work', 500);
// let docs: HasFormatter [] = [];
// docs.push(docOne);
// docs.push(docTwo);
// console.log(docs);
// const invOne = new invoice ('chunli', 'work on Webstie', 300);
// const invTwo = new invoice ('Lugin', 'work on Home', 200);
// let invoices: invoice [] = [];
// invoices.push(invOne);
// invoices.push(invTwo);
// invoices.forEach(inv => {
//   console.log(inv.client, inv.amount, inv.format());
// })
var listTemplate = /** @class */ (function () {
    function listTemplate(container) {
        this.container = container;
    }
    listTemplate.prototype.render = function (item, heading, pos) {
        var li = document.createElement('li');
        var h4 = document.createElement('h4');
        h4.innerHTML = heading;
        li.append(h4);
        var p = document.createElement('p');
        p.innerText = item.format();
        li.append(p);
        if (pos === 'start') {
            this.container.prepend(li);
        }
        else {
            this.container.append(li);
        }
    };
    return listTemplate;
}());
// 12=>DOM AND TYPE CASTING====================================
var form = document.querySelector('.new-item-form');
// INPUTS
var type = document.querySelector('#type');
var tofrom = document.querySelector('#tofrom');
var details = document.querySelector('#details');
var amount = document.querySelector('#amount');
// LIST TEMPLATE INSTANCE
var ul = document.querySelector('ul');
var list = new listTemplate(ul);
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var doc;
    if (type.value === 'invoice') {
        doc = new invoice(tofrom.value, details.value, amount.valueAsNumber);
    }
    else {
        doc = new payment(tofrom.value, details.value, amount.valueAsNumber);
    }
    list.render(doc, type.value, 'end');
});
