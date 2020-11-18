// 10=>INTERFACES=============================================
interface isPerson{
  name: string;
  age: number;
  speak(a: string): void;
  spend(a: number): number;
}
const me: isPerson = {
  name: 'shuan',
  age: 30,
  speak(text: string): void {
    console.log(text);
  },
  spend(amount: number): number {
    console.log('I spent', amount);
    return amount
  }
}

interface HasFormatter {
  format(): string;
}

// 11=>CLASSES WITH INTERFACES===============================================
class invoice implements HasFormatter {
  constructor (
    readonly client: string,
    private details: string,
    public amount: number
    ){}
  format() {
    return `${this.client} owes $${this.amount} for ${this.details}`;
  }
}
class payment implements HasFormatter {
  constructor (
    readonly recipient: string,
    private details: string,
    public amount: number
    ){}
  format() {
    return `${this.recipient} is owed $${this.amount} for ${this.details}`;
  }
}

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

class listTemplate {
  constructor (private container: HTMLUListElement) {}
    render(item: HasFormatter, heading: string, pos: 'start' | 'end') {
      const li = document.createElement('li');

      const h4 = document.createElement('h4');
      h4.innerHTML = heading;
      li.append(h4);
  
      const p = document.createElement('p');
      p.innerText = item.format();
      li.append(p);
  
      if (pos === 'start') {
        this.container.prepend(li);
      } else {
        this.container.append(li);
    }
  } 
}

// 12=>DOM AND TYPE CASTING====================================
const form  = document.querySelector('.new-item-form') as HTMLFormElement;

// INPUTS
const type = document.querySelector('#type') as HTMLInputElement;
const tofrom = document.querySelector('#tofrom') as HTMLInputElement;
const details = document.querySelector('#details') as HTMLInputElement;
const amount = document.querySelector('#amount') as HTMLInputElement;

// LIST TEMPLATE INSTANCE
const ul = document.querySelector('ul')!;
const list = new listTemplate(ul);

form.addEventListener('submit', (e: Event)=> {
  e.preventDefault();
  let doc: HasFormatter;
  if (type.value === 'invoice') {
    doc = new invoice (tofrom.value, details.value, amount.valueAsNumber);
  } else {
    doc = new payment (tofrom.value, details.value, amount.valueAsNumber);
  }
  list.render(doc, type.value, 'end');
})