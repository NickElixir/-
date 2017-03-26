class Form {
    constructor(name, elements, legend, submitFunc, submitElem) {
        this.name = name;
        this.elements = elements;
        this.legend = legend ? legend : null;
        this.submitFunc = submitFunc ? submitFunc : null;
            //If there is no submit function, please add to this.submitFunc.
            this.submitElem = submitElem ? submitElem : new Submit(this.name + "-submit", "SUBMIT");
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
                if (this.elements[i] instanceof Checkbox) {
                    var div = document.createElement("p");
                    div.className = "checkbox";
                    div.innerHTML = this.elements[i].header;
                    div.addEventListener("click", function(){
                        if (event.target.tagName == "P") event.target.children[0].checked = !event.target.children[0].checked;
                    });
                } else {
                    var div = document.createElement("div");
                    let label = document.createElement("label");
                    label.innerHTML = this.elements[i].header;
                    div.appendChild(label);
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
        return new Form("createProduct", [new Input("name1", "Название продукта"), new Note("Примечание", "Лучше указать запись вида: род + вид. Желательно использовать множественное число."), new Num("defaultShelfLifeFrozen", "Срок годности в холодильнике", {min: 0}), new Num("defaultShelfLifeNotFrozen", "Срок годности при комнатной температуре", {min: 0})], "Добавить новый продукт в коллекцию", Product.prototype.createProduct, new Submit("submit", "Отправить"));
    }
    static addProduct() {
          let options = [];
          for (let i in productsCollection) {
            let option = {text: i, value: i};
            options.push(option);
          }
          let select = new Select("name2", options, "Название продукта");
          select.elem.addEventListener("blur", changeShelfLifeValue);
          let shelfLife = new Num("shelfLife", "Текущий срок годности");
          if (productsCollection) {
            for (let i in productsCollection) {
              if (i == select.elem.value) {
                shelfLife.elem.value = productsCollection[i].shelfLifeFrozen;
                break;
              }
            }
          }
          let checkbox = new Checkbox("checkFrozen", "Продукт в холодильнике?");
          checkbox.elem.addEventListener("blur", changeShelfLifeValue);
          let elements = [select, checkbox, shelfLife, new Num("count", "Количество"), new RadioList("Единица измерения", [{name: "countType", header: "ШТ", value: "ШТ"}, {name: "countType", header: "КГ", value: "КГ"}, {name: "countType", header: "Г", value: "Г"}])]
          return new Form("addProduct", elements, "Добавить продукт", Product.prototype.addProduct, new Submit("submit", "Отправить"));
        }
}
class Input extends Element{
    constructor(name, header, options, parent) {
        super("input", options);
        this.name = name;
        this.type = this.type ? this.type : "text";
        this.header = header;
        if (!parent) {
            this.render();
        }
    }
    render() {
        super.render();
        this.elem.name = this.name;
        this.elem.type = this.type;
    }
}
class Num extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "number";
        this.render();
    }
    render() {
        super.render();
    }
}
class Checkbox extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "checkbox";
        this.render();
    }
    render() {
        super.render();
    }
}
class Radio extends Input {
    constructor(name, text, options) {
        super(name, text, options, true);
        this.type = "radio";
        this.render();
    }
    render() {
        let p = document.createElement("p");
        p.className = "radio";
        super.render();
        let input = this.elem;
        input.type = this.type;
        if(this.options) {
            for (let i in this.options) {
                input.setAttribute(i, this.options[i]);
            } 
        }
        p.appendChild(input);
        p.appendChild(document.createTextNode(this.header));
        p.addEventListener("click", function(event) {
            if (event.target.tagName == "P") {
                event.target.children[0].checked = true;
            }
        });
        this.elem = p;
    }
}
class RadioList extends Element {
    constructor(header, items) {
        super("div");
        this.items = items;
        this.header = header;
        this.render();
    }
    render() {
        super.render();
        for (let i in this.items) {
            let radio = new Radio(this.items[i].name, this.items[i].header, {value : this.items[i].value});
            radio.render();
            this.elem.appendChild(radio.elem);
        }
    }
}
class Submit extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "submit";
        this.render();
    }
    render() {
        super.render();
        this.elem.value = this.header;
    }
}
class Select extends Element{
    constructor(name, Options, header, options) {
        super("select", options);
        this.name = name;
        this.Options = Options;
        this.header = header;
        this.render();
    }
    render() {
        super.render();
        this.elem.name = this.name;
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
class Search extends Input {
    constructor(name, header, options) {
        super(name, header, options, true);
        this.type = "search";
        this.render();
    }
    render() {
        super.render();
    }
}