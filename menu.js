function selectSection(event) {
    if (document.body.querySelector(".visible")) {
        document.body.querySelector(".visible").className = "invisible";
        document.body.querySelector("#" + event.target.getAttribute("key")).className = "visible";
        if (document.body.clientWidth < 768) {
            document.querySelector("body").classList.toggle("navOpen");
            document.querySelector("nav").classList.toggle("open");
            document.querySelector(".container").classList.toggle("open");
            document.querySelector(".openNav").classList.toggle("open");
        }
    }
}
class Menu extends Element{
    constructor(elements, options) {
        super("ul", options, elements);
    }
    render() {
        super.render();
        this.listElem = this;
        let points = this.listElem.elem.querySelectorAll("li");
        for (let i = 0; i < points.length; i++) points[i].addEventListener("click", selectSection);
        this.elem = new Element("section", {class: "menu"}, [new Element("nav", null, [this.listElem]), new Element("div", {class: "openNav"}, [new Element("div", {class: "icon"})], [{event: "click", handler: function(){
            document.querySelector("body").classList.toggle("navOpen");
            document.querySelector("nav").classList.toggle("open");
            document.querySelector(".container").classList.toggle("open");
            document.querySelector(".openNav").classList.toggle("open");
        }}])]).elem;
    }
}