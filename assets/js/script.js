function loader(callback) {
    const countDown = document.getElementById('calculator__percent-loader');
    let load = 0;
    let loading = setInterval(function () {
        load = load + Math.floor(Math.random() * 5);
        if (load < 100) {
            countDown.textContent = load + "%";
        } else {
            load = 100;
            countDown.textContent = 100 + "%";
            callback();
            clearInterval(loading);
        }
    }, 50);
}


const time = 500; // ms
const step = 1000;

function outNum(num, elem) {
    let l = document.querySelector('#' + elem);
    let n = 0;
    let t = Math.round(time / (num / step));
    let interval = setInterval(() => {
        n = n + step;
        const ostatok = num % step;
        if (n + ostatok === num) {
            clearInterval(interval);
            l.textContent = String((n + ostatok).toLocaleString());
            return;
        }
        l.textContent = String(n.toLocaleString());
    }, t);
    console.log(interval)
}


const howWeWorkSection = () => {
    const howWeWorksItems = document.querySelectorAll('.how-we-work__item');

    const onMouseEnterHowWeWorks = (number) => (event) => {
        event.target.classList.add('active');
        document.querySelector('.how-we-work__number').textContent = number;
        document.querySelector('.how-we-work__text').textContent = event.target.dataset.text;
    }

    const onMouseLeaveHowWeWorks = (event) => {
        event.target.classList.remove('active');
    }

    howWeWorksItems.forEach((item, i) => {
        item.addEventListener('mouseenter', onMouseEnterHowWeWorks(i + 1));
        item.addEventListener('mouseleave', onMouseLeaveHowWeWorks);
    })
}


const calculateSection = () => {
    const steps = [[{
        text: 'Механизированная штукатурка',
        image: './assets/images/step_1-1.jpg'
    }, {
        text: 'Стяжка пола',
        image: './assets/images/step_1-2.jpg',
    }, {
        text: 'Штукатурка стен + стяжка пола',
        image: './assets/images/step_1-3.jpg'
    }], [{
        text: 'Квартира',
        image: './assets/images/step_2-1.jpg'
    }, {
        text: 'Дом',
        image: './assets/images/step_2-2.jpg',
    }, {
        text: 'Нежилое помещение',
        image: './assets/images/step_2-3.jpg'
    }]];

    const calculatorTemplate = (text, image) => {
        return `<button class="calculator__item">
                    <span class="calculator__desc">${text}</span>
                    <img src=${image} alt=${text} class="calculator___image">
                </button>`
    };

    const calcContainer = document.querySelector('.calculator__box');
    const calcForm = document.querySelector('.calculator__form');
    const calcButton = document.querySelector('.calculator__button');
    const calcTitle = document.querySelector('.calculator__title');
    const calcSubtitle = document.querySelector('.calculator__subtitle');
    const calcLoader = document.querySelector('.calculator__loader');

    let currentStep = 0;

    const renderItems = () => {
        return steps[currentStep].reduce((acc, val) => {
            acc += calculatorTemplate(val.text, val.image);
            return acc;
        }, '');
    };

    const nextStepHandler = () => {
        if (currentStep + 1 === steps.length) {
            calcLoader.classList.remove('unvisible');
            const fn = () => {
                calcLoader.classList.add('unvisible');
                outNum(15000, 'price');
                outNum(13500, 'total-price');
            };
            loader(fn);
            setTimeout(() => {
                calcContainer.classList.add('hidden');
                calcButton.classList.add('hidden');
                calcForm.classList.remove('hidden');
                calcTitle.textContent = 'Заказать беслатную консультацию';
                calcSubtitle.textContent = 'Расчет стоимости и сертификат на скидку вышлем на Ваш электронный адрес';
            }, 200);
        } else {
            currentStep++;
            calcContainer.innerHTML = renderItems();
            calcButton.blur();
            calcButton.classList.add('disabled');
        }
    }


    calcContainer.innerHTML = renderItems();


    calcContainer.addEventListener('click', (event) => {
        const calcItem = event.target.closest('.calculator__item');
        if (!calcItem) return;
        const calcItems = document.querySelectorAll('.calculator__item');
        calcButton.classList.remove('disabled');
        calcItems.forEach((item) => item.classList.remove('active'));
        calcItem.classList.add('active');
    });

    calcContainer.addEventListener('keypress', e => {
        const calcItems = Array.from(e.currentTarget.querySelectorAll('.calculator__item'))
        const isSomeItemActive = calcItems.some((item) => item.classList.contains('active'));
        if (e.key === 'Enter' && isSomeItemActive) {
            nextStepHandler();
        }
    })

    calcButton.addEventListener('click', nextStepHandler);
}

const inputFocusWatcher = () => {
    const fields = document.querySelectorAll('.field');

    for (let i = 0; i < fields.length; i++) {
        fields[i].querySelector('.input')
            .addEventListener('focusout', e => {
                if (e.target.value) {
                    fields[i].querySelector('.label').classList.add('active');
                } else {
                    fields[i].querySelector('.label').classList.remove('active');
                }
            })
    }
};


const header = document.querySelector('.header');
const headerPositionScrollHandler = (e) => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    howWeWorkSection();
    calculateSection();
    inputFocusWatcher();
    headerPositionScrollHandler();
    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 3
    }).mount();

    document.addEventListener('scroll', headerPositionScrollHandler);
});

setTimeout(() => {
    document.querySelector('.main__loader').classList.add('unvisible');
}, 1000);