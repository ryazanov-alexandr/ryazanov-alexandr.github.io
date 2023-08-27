function slider({container, slide, prevArrow, nextArrow, totalCounter, currentCounter, wrapper, field}) {
    const slider = document.querySelector(container),
            slides = document.querySelectorAll(slide),
            prev = document.querySelector(prevArrow),
            next = document.querySelector(nextArrow),
            total = document.querySelector(totalCounter),
            current = document.querySelector(currentCounter),
            slidesWrapper = document.querySelector(wrapper),
            slidesField = document.querySelector(field),
            width = window.getComputedStyle(slidesWrapper).width;
    
    let slideIndex = 1;
    let offset = 0;

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }

        return num;
    }

    total.textContent = getZero(slides.length);
    current.textContent = getZero(slideIndex);

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    
    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
            dots = [];


    indicators.classList.add('carousel-indicators');

    slider.append(indicators);

    for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);
        indicators.append(dot);
        dots.push(dot);
    }

    dots[slideIndex-1].classList.add('active');

    function deleteNotDigits(str) {
        return +str.replace(/\D/g, '')
    }

    function moveSlide() {
        slidesField.style.transform = `translateX(-${offset}px)`;
        current.textContent = getZero(slideIndex);

        dots.forEach(dot => dot.classList.remove('active'))
        dots[slideIndex-1].classList.add('active');
    }

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
            slideIndex = 1;
        } else {
            offset += deleteNotDigits(width);
            slideIndex += 1;
        }
        moveSlide();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
            slideIndex = slides.length;
        } else {
            offset -= deleteNotDigits(width);
            slideIndex -= 1;
        }
        moveSlide();
    });


    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');
            slideIndex = slideTo;
            offset = deleteNotDigits(width) * (slideIndex - 1);
            moveSlide();
        });
    });
}

export default slider;