class Radio extends Element {
    constructor(text, options) {
        options.type = "radio";
        super("input", options);
        this.header = text;
        this.render();
    }
    render() {
        let p = document.createElement("p");
        p.className = "radio";
        super.render();
        let input = this.elem;
        if (this.options) for (let i in this.options) input.setAttribute(i, this.options[i]); 
        p.appendChild(input);
        p.appendChild(document.createTextNode(this.header));
        p.addEventListener("click", function(event) {
            if (event.target.tagName == "P") event.target.children[0].checked = true;
        });
        this.elem = p;
    }
}
class RadioList extends Element {
    constructor(header, items, options) {
        super("div", options);
        this.items = items;
        this.header = header;
        this.render();
    }
    render() {
        super.render();
        for (let i in this.items) {
            let radio = new Radio(this.items[i].header, {value : this.items[i].value, name: this.items[i].name});
            radio.render();
            this.elem.appendChild(radio.elem);
        }
    }
}
class Select extends Element{
    constructor(Options, header, options) {
        super("select", options);
        this.Options = Options;
        this.header = header;
        this.render();
    }
    render() {
        super.render();
        this.renderOptions();
        for (let i in this.renderedOptions) this.elem.appendChild(this.renderedOptions[i]);
    }
    renderOptions() {
        let options = [];
        for (let i in this.Options) {
            let option = new Option(this.Options[i].text, this.Options[i].value);
            options.push(option);
        }
        this.renderedOptions = options;
    }
}