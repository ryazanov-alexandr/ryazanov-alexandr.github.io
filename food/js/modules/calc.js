function calc() {
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    sex = localStorage.getItem('sex') 
            ? localStorage.getItem('sex') 
            : document.querySelector('#gender .calculating__choose-item').getAttribute('id');
    ratio = localStorage.getItem('ratio') 
            ? localStorage.getItem('ratio') 
            : document.querySelector('#ratio .calculating__choose-item').getAttribute('data-ratio');

    console.log(sex, ratio);

    function initLocalSetting(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem =>{
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === sex || elem.getAttribute('data-ratio') === ratio) {
                elem.classList.add(activeClass);
            }
            if (false) {
                console.log(elem.getAttribute('data-ratio'), localStorage.getItem('ratio'))
                elem.classList.remove(activeClass);
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSetting('#gender div', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big div', 'calculating__choose-item_active');
    function isNotFilledFields() {
        return (!sex || !height || !weight || !age || !ratio);
    }
    
    function calcTotal() {
        if (isNotFilledFields()) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } 
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(parentSelector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(elem => elem.classList.remove(activeClass));
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
    }

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    
    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;