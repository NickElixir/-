class ShoppingListItem extends Th_Tr {
    constructor(name, count, options) {
    }
    render() {
    }
class ShoppingList extends Table {
    constructor(header, elements, options) {
        this.header = header;
        super();
    }
    render() {
        super.render();
    }
    addItem(name, count) {
        let item = new ShoppingListItem(name, count);
        this.elements.push(item);
        this.render();
    }
}
