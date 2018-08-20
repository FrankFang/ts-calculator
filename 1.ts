{
  class Calculator {
    public n1: string = '';
    public n2: string = '';
    public operator: string = '';
    public result: string = '';
    public span: HTMLSpanElement;
    public container: HTMLDivElement;
    public textLists: Array<Array<string | number>> = [
      ['Clear', '÷'],
      [7, 8, 9, '×'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      [0, '.', '='],
    ];
    constructor() {
      this.createContainer();
      this.createElements();
      this.createButtons();
      this.bindEvents();
    }
    createContainer() {
      let calc = document.createElement('div');
      calc.classList.add('calc');
      document.body.appendChild(calc);
      this.container = calc;
    }
    createElements() {
      let output = document.createElement('div');
      output.classList.add('output');
      let span = document.createElement('span');
      output.appendChild(span);
      span.textContent = '0';
      this.span = span;
      this.container.appendChild(output);
    }
    createButtons() {
      this.textLists.forEach((textList: Array<number | string>) => {
        let div = document.createElement('div');
        div.classList.add('row');
        textList.forEach((text: number | string) => {
          this.createButton(text, div, `text-${text}`);
        });
        this.container.appendChild(div);
      });
    }
    bindEvents() {
      this.container.addEventListener('click', event => {
        if (event.target instanceof HTMLButtonElement) {
          const text = event.target.textContent;
          if ('0123456789.'.indexOf(text) >= 0) {
            if (this.operator) {
              this.n2 += text;
              this.span.textContent = this.n2;
            } else {
              this.result = '';
              this.n1 += text;
              this.span.textContent = this.n1;
            }
          } else if ('+-×÷'.indexOf(text) >= 0) {
            if (this.result) {
              this.n1 = this.result;
              this.result = '';
            }
            this.operator = text;
          } else if ('='.indexOf(text) >= 0) {
            this.result = this.removeZero(this.getResult(this.n1, this.n2, this.operator));
            this.span.textContent = this.result;
            this.n1 = '';
            this.n2 = '';
            this.operator = '';
          } else if (text === 'Clear') {
            this.n1 = '';
            this.n2 = '';
            this.operator = '';
            this.result = '';
            this.span.textContent = '0';
          }
          console.log(this.n1, this.operator, this.n2);
        }
      });
    }
    removeZero(string) {
      return string.replace(/.0+$/g, '').replace(/\.0+e/, 'e');
    }
    getResult(n1: string, n2: string, operator: string): string {
      let numberN1: number = parseFloat(n1);
      let numberN2: number = parseFloat(n2);
      if (operator === '+') {
        return (numberN1 + numberN2).toPrecision(12);
      } else if (operator === '-') {
        return (numberN1 - numberN2).toPrecision(12);
      } else if (operator === '×') {
        return (numberN1 * numberN2).toPrecision(12);
      } else if (operator === '÷') {
        if (numberN2 === 0) {
          return '不是数字';
        } else {
          return (numberN1 / numberN2).toPrecision(12);
        }
      }
    }
    createButton(text: string | number, container: HTMLElement, className?: string) {
      let button = document.createElement('button');
      button.textContent = text.toString();
      className && button.classList.add(className);
      container.appendChild(button);
    }
  }

  new Calculator();
}
