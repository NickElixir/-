
class ShoppingList extends Element {
    constructor(header, elements, options) {
        this.header = header;
        super(options, elements);
    }
    render() {
        super.render();
    }
    addItem(name, count) {
        let item = new Element("tr", name, count);
        this.elements.push(item);
        this.render();
    }
}
