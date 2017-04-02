class Note extends Element {
    constructor(header, text) {
        super("span", {class: "note"}, header, [{event: "click", handler: function(event) {
            let target = event.target;
            while (target.className !== "note") {
                target = target.parentNode;
            }
            target.children[1].hidden = !target.children[1].hidden;
        }}]);
        this.text = text;
        this.render();
    }
    render() {
        super.render();
        let text = new Element("span", null, this.text);
        text.elem.hidden = true;
        this.elem.appendChild(document.createElement("br"));
        this.elem.appendChild(text.elem);
    }
}
