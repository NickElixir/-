class Switch {
    constructor(options, eventListeners) {
        this.className = "switch";
        if (options) {
            this.options = options;
        }
        if (eventListeners) {
            this.eventListeners = eventListeners;
        }
        this.render();
    }
    render() {
        let div = document.createElement("div");
        div.className = this.className;
        if (this.options) {
            for (let i in this.options) {
                div.setAttribute(i, this.options[i]);
            }
        }
        if (this.eventListeners) {
            for (let i in this.eventListeners) {
                div.addEventListener(i, this.eventListeners[i]);
            }
        }
        this.elem = div;
    }
}