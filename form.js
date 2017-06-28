class Form {
    constructor(name, elements, legend, submitFunc, submitElem) {
        this.name = name;
        this.elements = elements;
        this.legend = legend ? legend : null;
        this.submitFunc = submitFunc ? submitFunc : null;
            //If there is no submit function, please add to this.submitFunc.
            this.submitElem = submitElem ? submitElem : new Element("input", {name: this.name + "-submit", type: "submit", value: "SUBMIT"});
            //If there is no submit element, it will be made automatically.
        this.render();
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
            if (this.elements[i] instanceof Note) form.appendChild(this.elements[i].elem);
            else {
                console.log(this.elements[i]);
                if (this.elements[i].options.type == "checkbox") {
                    var div = document.createElement("p");
                    div.className = "checkbox";
                    div.innerHTML = this.elements[i].header;
                    div.addEventListener("click", function(){
                        if (event.target.tagName == "P") event.target.children[0].checked = !event.target.children[0].checked;
                    });
                } else {
                    var div = document.createElement("div");
                    //let label = document.createElement("label");
                    //label.innerHTML = this.elements[i].header;
                    //div.appendChild(label);
                }
                div.appendChild(this.elements[i].elem);
                form.appendChild(div);
            }
        }
        form.addEventListener("submit", this.submitFunc);
        this.submitElem.render();
        form.appendChild(this.submitElem.elem);
        this.elem = form;
    }
    static createProduct() {
        return new Form("createProduct", [new Element("label", {}, "Название продукта"), new Element("input", {name: "name1", type: "text"}), new Note("Примечание", "Лучше указать запись вида: род + вид. Желательно использовать множественное число."), new Element("label", {}, "Срок годности в холодильнике"), new Element("input", {min: 0, name: "defaultShelfLifeFrozen", type: "number"}), new Element("label", {}, "Срок годности при комнатной температуре"), new Element("input", {name: "defaultShelfLifeNotFrozen", type: "number",min: 0})], "Добавить новый продукт в коллекцию", Product.prototype.createProduct, new Element("input", {name: "submit", type: "submit", value: "Отправить"}));
    }
    static addProduct() {
          let options = [];
          for (let i in productsCollection) {
            let option = {text: i, value: i};
            options.push(option);
          }
          let select = new Select(options, "Название продукта", {name: "name2"});
          select.elem.addEventListener("blur", changeShelfLifeValue);
          let shelfLife = new Element("input", {name: "shelfLife", type: "number"});
          if (productsCollection) {
            for (let i in productsCollection) {
              if (i == select.elem.value) {
                shelfLife.elem.value = productsCollection[i].shelfLifeFrozen;
                break;
              }
            }
          }
          let checkbox = new Element("input", {name: "checkFrozen", type: "checkbox"}, "", [{handler: changeShelfLifeValue, event: "blur"}]);
          checkbox.header = "Продукт в холодильнике?";
          let elements = [new Element("label", {}, "Название продукта"), select, checkbox, new Element("label", {}, "Текущий срок годности"), shelfLife, new Element("label", {}, "Количество"), new Element("input", {name: "count", type: "number"}), new Element("label", {}, "Единица измерения"), new RadioList("Единица измерения", [{name: "countType", header: "ШТ", value: "ШТ"}, {name: "countType", header: "КГ", value: "КГ"}, {name: "countType", header: "Г", value: "Г"}], {})]
          return new Form("addProduct", elements, "Добавить продукт", Product.prototype.addProduct, new Element("input", {name: "submit", type: "submit", value: "Отправить"}));
        }
}
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