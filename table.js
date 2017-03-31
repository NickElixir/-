class Table extends Element{
    constructor(elements, options) {
        super("table", options, elements);
    }
    render() {
        super.render();
    }
}
class Tbody extends Element{
    constructor(type, elements, options) {
		super(type, options, elements);
    }
    render() {
        super.render();
    }
    static products(array) {
        let elements = [];
        for (let i in array) elements.push(new Tr([new Element("td", null, array[i].name), new Element("td", null, array[i].shelfLife + " дн"), new Element("td", null, array[i].count + " " + array[i].countType), new Switch({select: "off", index: array[i].index, count: 0})], {class: array[i].frozen ? "frozen" : null}));
        return new Tbody("tbody", elements);
    }
}
class Tr extends Element{
    constructor(elements, options) {
    	super("tr", options, elements);
    }
    render() {
		super.render();
    }
}