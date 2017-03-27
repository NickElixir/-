class Table extends Element{
    constructor(elements, options) {
        super("table", options, elements);
        this.render();
    }
    render() {
        super.render();
    }
}
class Tbody extends Element{
    constructor(type, elements, options) {
		super(type, options, elements);
        this.render();
    }
    render() {
        super.render();
    }
    static products(array) {
        let elements = [];
        for (let i in array) elements.push(new Tr([{innerHTML: array[i].name}, {innerHTML: array[i].shelfLife + " дн"}, {innerHTML: array[i].count + " " + array[i].countType}, {innerHTML: new Switch({select: "off", index: array[i].index, count: 0}).elem.outerHTML}], {class: array[i].frozen ? "frozen" : null}));
        return new Tbody("tbody", elements);
    }
}
class Tr extends Element{
    constructor(elements, options) {
    	super("tr", options);
		this.Elements = elements;
        this.render();
    }
    render() {
		super.render();
        for (let i in this.Elements) this.elem.appendChild(new Td("td", this.Elements[i].innerHTML, this.Elements[i].options).elem);
    }
}
class Td extends Element{
    constructor(type, innerHTML, options) {
		super(type, options);
        this.innerHTML = innerHTML;
        this.render();
    }
    render() {
		super.render();
        this.elem.innerHTML = this.innerHTML;
    }
}