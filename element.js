class Element{
    constructor(tag, options, elements, eventListeners) {
        this.tag = tag;
        if (options) this.options = options;
        if (elements) this.elements = elements;
        if (eventListeners) this.eventListeners = eventListeners;
        this.render();
    }
    render() {
        this.elem = document.createElement(this.tag);
        for (let i in this.options) this.elem.setAttribute(i, this.options[i]);
        if (this.elements){
            if (this.elements instanceof Array)  for (let i in this.elements) this.elem.appendChild(this.elements[i].elem);
            else this.elem.innerHTML = this.elements;
        }
        for (let i in this.eventListeners) this.elem.addEventListener(this.eventListeners[i].event, this.eventListeners[i].handler);
    }
    static createProductForm() {
        return new Element("form", {name: "createProduct"}, [new Element("legend", {}, "Добавить новый продукт в коллекцию"), new Element("label", {}, "Название продукта"), new Element("input", {name: "name1", type: "text"}), new Note("Примечание", "Лучше указать запись вида: род + вид. Желательно использовать множественное число.<br/>"), new Element("label", {}, "Срок годности в холодильнике"), new Element("input", {min: 0, name: "defaultShelfLifeFrozen", type: "number"}), new Element("label", {}, "Срок годности при комнатной температуре"), new Element("input", {name: "defaultShelfLifeNotFrozen", type: "number",min: 0}), new Element("input", {name: "submit", type: "submit", value: "Отправить"})], [{event: "submit", handler: Product.prototype.createProduct}]);
    }
    static addProductForm() {
        let options = [];
        for (let i in productsCollection) options.push({text: i, value: i});
        let shelfLife = new Element("input", {name: "shelfLife", type: "number"});
        if (productsCollection) {
            for (let i in productsCollection) {
                if (i == options[0].value) {
                    shelfLife.elem.value = productsCollection[i].shelfLifeNotFrozen;
                    break;
                }
            }
        }
        let select = new Select(options, "Название продукта", {name: "name2"});
        select.elem.addEventListener("blur", changeShelfLifeValue);
        let checkbox = new Element("input", {name: "checkFrozen", type: "checkbox"}, "", [{handler: changeShelfLifeValue, event: "blur"}]);
        return new Element("form", {name: "addProduct"}, [new Element("legend", {}, "Добавить продукт"), new Element("label", {}, "Название продукта"), select, new Element("p", {class: "checkbox"}, [ {elem: document.createTextNode("Продукт в холодильнике?")}, new Element("input", {name: "checkFrozen", type: "checkbox"}, "", [{handler: changeShelfLifeValue, event: "blur"}])], function(){
                        if (event.target.tagName == "P") event.target.children[0].checked = !event.target.children[0].checked;
                    }), new Element("label", {}, "Текущий срок годности"), shelfLife, new Element("label", {}, "Количество"), new Element("input", {name: "count", type: "number", min: 1}), new Element("label", {}, "Единица измерения"), new RadioList("Единица измерения", [{name: "countType", header: "ШТ", value: "ШТ"}, {name: "countType", header: "КГ", value: "КГ"}, {name: "countType", header: "Г", value: "Г"}]), new Element("input", {name: "submit", type: "submit", value: "Отправить"})], [{event: "submit", handler: Product.prototype.addProduct}]);
    }
}