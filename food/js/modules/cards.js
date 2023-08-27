import { getData } from "../services/services";

function cards() {
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 90;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');
            if (this.classes.length == 0) {
                element.classList.add('.menu__item');
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
           
            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    

    // getData('http://localhost:3000/menu')
    //     .then(data => {
    //             console.log(data);
    //             data.forEach(({img, altimg, title, descr, price}) => {
    //                 new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render()
    //         });
    //     })
    
    axios.get('http://localhost:3000/menu')
        .then(data => {
                console.log(data.data);
                data.data.forEach(({img, altimg, title, descr, price}) => {
                    new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render()
            });
        })
}

export default cards;