{
    var Calculator = /** @class */ (function () {
        function Calculator() {
            this.n1 = '';
            this.n2 = '';
            this.operator = '';
            this.result = '';
            this.textLists = [
                ['Clear', '÷'],
                [7, 8, 9, '×'],
                [4, 5, 6, '-'],
                [1, 2, 3, '+'],
                [0, '.', '='],
            ];
            this.createContainer();
            this.createElements();
            this.createButtons();
            this.bindEvents();
        }
        Calculator.prototype.createContainer = function () {
            var calc = document.createElement('div');
            calc.classList.add('calc');
            document.body.appendChild(calc);
            this.container = calc;
        };
        Calculator.prototype.createElements = function () {
            var output = document.createElement('div');
            output.classList.add('output');
            var span = document.createElement('span');
            output.appendChild(span);
            span.textContent = '0';
            this.span = span;
            this.container.appendChild(output);
        };
        Calculator.prototype.createButtons = function () {
            var _this = this;
            this.textLists.forEach(function (textList) {
                var div = document.createElement('div');
                div.classList.add('row');
                textList.forEach(function (text) {
                    _this.createButton(text, div, "text-" + text);
                });
                _this.container.appendChild(div);
            });
        };
        Calculator.prototype.bindEvents = function () {
            var _this = this;
            this.container.addEventListener('click', function (event) {
                if (event.target instanceof HTMLButtonElement) {
                    var text = event.target.textContent;
                    if ('0123456789.'.indexOf(text) >= 0) {
                        if (_this.operator) {
                            _this.n2 += text;
                            _this.span.textContent = _this.n2;
                        }
                        else {
                            _this.result = '';
                            _this.n1 += text;
                            _this.span.textContent = _this.n1;
                        }
                    }
                    else if ('+-×÷'.indexOf(text) >= 0) {
                        if (_this.result) {
                            _this.n1 = _this.result;
                            _this.result = '';
                        }
                        _this.operator = text;
                    }
                    else if ('='.indexOf(text) >= 0) {
                        _this.result = _this.removeZero(_this.getResult(_this.n1, _this.n2, _this.operator));
                        _this.span.textContent = _this.result;
                        _this.n1 = '';
                        _this.n2 = '';
                        _this.operator = '';
                    }
                    else if (text === 'Clear') {
                        _this.n1 = '';
                        _this.n2 = '';
                        _this.operator = '';
                        _this.result = '';
                        _this.span.textContent = '0';
                    }
                    console.log(_this.n1, _this.operator, _this.n2);
                }
            });
        };
        Calculator.prototype.removeZero = function (string) {
            return string.replace(/.0+$/g, '').replace(/\.0+e/, 'e');
        };
        Calculator.prototype.getResult = function (n1, n2, operator) {
            var numberN1 = parseFloat(n1);
            var numberN2 = parseFloat(n2);
            if (operator === '+') {
                return (numberN1 + numberN2).toPrecision(12);
            }
            else if (operator === '-') {
                return (numberN1 - numberN2).toPrecision(12);
            }
            else if (operator === '×') {
                return (numberN1 * numberN2).toPrecision(12);
            }
            else if (operator === '÷') {
                if (numberN2 === 0) {
                    return '不是数字';
                }
                else {
                    return (numberN1 / numberN2).toPrecision(12);
                }
            }
        };
        Calculator.prototype.createButton = function (text, container, className) {
            var button = document.createElement('button');
            button.textContent = text.toString();
            className && button.classList.add(className);
            container.appendChild(button);
        };
        return Calculator;
    }());
    new Calculator();
}
