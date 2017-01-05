class Form {
    constructor(name, elements, legend) {
        this.name = name;
        this.elements = elements;
        if (legend) {
            this.legend = legend;
        }
    }
    render() {
        let form = document.createElement("form");
        form.name = this.name;
        if (this.legend) {
            let legend = document.createElement("legend");
            legend.innerHTML = this.legend;
            form.appendChild(legend);
        }
        for (let i in this.elements) {
            let div = document.createElement("div");
            div.className = "textfield";
            let label = document.createElement("label");
            label.innerHTML = this.elements[i].header;
            div.appendChild(label);
            div.appendChild(this.elements[i].elem);
            form.appendChild(div);
        }
        this.elem = form;
    }
}
class Input {
    constructor(name, header, type) {
        this.name = name;
        if (type) {
            this.type = type;
        }
        this.header = header;
    }
    render() {
        let input = document.createElement("input");
        input.name = this.name;
        input.type = this.type;
        this.elem = input;
    }
    static createText(name, header) {
        return new Input(name, header, "text");
    }
}
class Checkbox extends Input {
    constructor(name, header) {
        super(name, header, "checkbox");
    }
    render() {
        super.render();
    }
}
class Radio extends Input {
    constructor(name, text, value) {
        super(name, text, "radio");
        this.value = value;
    }
    render() {
        let p = document.createElement("p");
        super.render();
        let input = this.elem;
        input.type = this.type;
        input.value = this.value;
        p.appendChild(input);
        p.appendChild(document.createTextNode(this.header));
        this.elem = p;
    }
}
class RadioList {
    constructor(name, elements, header) {
        this.name = name;
        this.elements = elements;
        this.header = header;
    }
    render() {
        let div = document.createElement("div");
        for (let i in this.elements) {
            let radio = new Radio(this.elements[i].name, this.elements[i].header, this.elements[i].value);
            radio.render();
            div.appendChild(radio.elem);
        }
        this.elem = div;
    }
}
class Select {
    constructor(name, options, header) {
        this.name = name;
        this.options = options;
        this.header = header;
    }
    render() {
        let select = document.createElement("select");
        select.name = this.name;
        this.renderOptions();
        for (let i in this.renderedOptions) {
            select.appendChild(this.renderedOptions[i]);
        }
        this.elem = select;
    }
    renderOptions() {
        let options = [];
        for (let i in this.options) {
            let option = new Option(this.options[i].text, this.options[i].value);
            options.push(option);
        }
        this.renderedOptions = options;
        console.log(this.renderedOptions);
    }
}