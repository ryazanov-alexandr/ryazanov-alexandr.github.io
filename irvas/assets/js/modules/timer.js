const timer = (id, deadline) => {
    const addZero = (num) => {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }

    const getTimeRemaining = (endtime) => {
        const time = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((time / 1000) % 60),
                minutes = Math.floor((time / (1000 * 60)) % 60),
                hours = Math.floor((time / (1000 * 60 * 60) ) % 24),
                days = Math.floor((time / (1000 * 60 * 60 * 24)));

        return {
            'total': addZero(time),
            'days': addZero(days),
            'hours': addZero(hours),
            'minutes': addZero(minutes),
            'seconds': addZero(seconds)
        };
    };

    const setClock = (selector, endtime) => {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timerInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endtime);

            
            if (time.total <= 0) {
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";

                clearInterval(timerInterval);
            } else {
                days.textContent = time.days;
                hours.textContent = time.hours;
                minutes.textContent = time.minutes;
                seconds.textContent = time.seconds;
            }
        }
    };

    setClock(id, deadline);

};

export default timer;