class Product {
    constructor(name, shelfLife, count) {
        this.name = name;
        this.shelfLife = shelfLife;
        this.count = count;
        this.datePurchase = new Date();
        this.datePurchase.setHours(0, 0, 0, 0);
        this.countType = document.forms.addProduct.elements.countType.value;
        this.frozen = document.forms.addProduct.elements.checkFrozen.checked;
        this.index = arrProducts.length;
    }
    createProduct(event) {
        event.preventDefault();
        let name = document.forms.createProduct.elements.name1.value;
        let shelfLifeFrozen = parseInt(document.forms.createProduct.elements.defaultShelfLifeFrozen.value);
        let shelfLifeNotFrozen = parseInt(document.forms.createProduct.elements.defaultShelfLifeNotFrozen.value);
        if (!name || !isNumeric(shelfLifeFrozen) || !isNumeric(shelfLifeNotFrozen)) {
            alert("Форма заполнена неправильно");
            return;
        }
        name = name.toUpperCase();
        let a = true;
        for (let i in productsCollection) {
            if (i == name) {
                a = false;
            }
        }
        if (a) {
            productsCollection[name] =  {shelfLifeFrozen: shelfLifeFrozen, shelfLifeNotFrozen: shelfLifeNotFrozen, numberAdditions: 0};
            let arr = [];
            let obj = productsCollection;
            for (let i in obj) {
                obj[i].name = i;
                arr.push(obj[i]);
            }
                arr = sortProducts(arr, "name");
                productsCollection = {};
            for (let i in arr) {
                productsCollection[arr[i].name] = arr[i];
                delete productsCollection[arr[i].name].name;
            }
            localStorage.productsCollection = JSON.stringify(productsCollection);
            let select = document.querySelector("#form select");
            select.innerHTML = "";
            for (let i in productsCollection) {
                let option = new Option(i, i);
                select.appendChild(option);
            }
            alert("Продукт успешно добавлен в коллекцию");
        } else {
            alert("В коллекции уже есть продукт с таким именем");
        }
    }
    addProduct(event) {
        if (!document.forms.addProduct.elements.countType.value) {
            alert("Не указана единица измерения. Исправьте, и повторите попытку.");
            return;
        }
        event.preventDefault();
        let name = document.forms.addProduct.elements.name2.value;
        let count = parseFloat(document.forms.addProduct.elements.count.value);
        if (count <= 0 || !isNumeric(count)) {
            alert("Количество не может быть меньше или равно 0");
            return;
        }
        let shelfLife = parseInt(document.forms.addProduct.elements.shelfLife.value);
        let i = 0;
        let product = arrProducts[i];
        while (i < arrProducts.length) {
            if (product.name !== name) {
            i++;
            product = arrProducts[i];
            } else {
            if (product.shelfLife == shelfLife) {
                product.count += count;
                localStorage.arrProducts = JSON.stringify(arrProducts);
                let tr = document.querySelectorAll(".arr-products tr");
                tr[i].children[2].innerHTML = product.count + " " + product.countType;
                alert("Продукт успешно добавлен");
                productsCollection[product.name].numberAdditions++;
                localStorage.productsCollection = JSON.stringify(productsCollection);
                return;
            }
            i++;
            }
        }
        let obj = new Product(name, shelfLife, count);
        arrProducts.push(obj);
        localStorage.arrProducts = JSON.stringify(arrProducts);
        document.querySelector(".arr-products tbody").appendChild(new Element("tr", {class: arrProducts[obj.index].frozen ? "frozen" : ""}, [new Element("td", null, arrProducts[obj.index].name), new Element("td", null, arrProducts[obj.index].shelfLife + " дн"), new Element("td", null, arrProducts[obj.index].count + " " + arrProducts[i].countType), new Element("div", {class: "switch", select: "off", index: arrProducts[obj.index].index, count: 0})]).elem);
        productsCollection[name].numberAdditions++;
        localStorage.productsCollection = JSON.stringify(productsCollection);
        alert("Продукт успешно добавлен");
        if (!localStorage._checker) {
            let time = new Date();
            time.setHours(0, 0, 0, 0);
            localStorage._checker = time;
        }
    }
    deleteProduct(index){
        arrProducts.splice(index, 1);
        for (let i = index; i < arrProducts.length; i++) {
            arrProducts[i].index -= 1;
        }
    }
    static tbody(array) {
        let elements = [];
        for (let i in array) elements.push(new Element("tr", {class: array[i].frozen ? "frozen" : ""}, [new Element("td", null, array[i].name), new Element("td", null, array[i].shelfLife + " дн"), new Element("td", null, array[i].count + " " + array[i].countType), new Element("div", {class: "switch", select: "off", index: array[i].index, count: 0})]));
        return new Element("tbody", null, elements);
    }
}
function sortProducts(arr, method) {
	if (method == "name") {
		[].sort.call(arr, function (a, b) {
			if (a.name < b.name) {
				return -1;
			}
			if (a.name > b.name) {
				return 1;
			}
			// names must be equal
			return 0;
		});
	} else if (method == "shelfLife") {
		arr.sort(function(a, b) {
			if (a.shelfLife < b.shelfLife) {
				return -1;
			}
			if (a.shelfLife > b.shelfLife) {
				return 1;
			}
			return 0;
		});
	} else if (method == "count") {
		let pieces = [];
		let kg = [];
		let g = [];
		for (let i = 0; i < arr.length; i++) {
			switch(arr[i].countType) {
			case "ШТ":
				pieces.push(arr[i]);
				break;
			case "КГ":
				kg.push(arr[i]);
				break;
			case "Г":
				g.push(arr[i]);
				break;
			}
		}
		function sortCount(a, b) {
			if (a.count < b.count) {
				return -1;
			}
			if (a.count > b.count) {
				return 1;
			}
			return 0;
		}
		pieces.sort(sortCount);
		kg.sort(sortCount);
		g.sort(sortCount);
		arr = [];
		function add(a) {
			for (let i = 0; i < a.length; i++) {
				arr.push(a[i]);
			}
		}
		add(pieces);
		add(kg);
		add(g);
	}
	return arr;
}