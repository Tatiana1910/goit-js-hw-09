import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerHtml = document.querySelector('.timer');
const timerSeconds = document.querySelector('span[data-seconds]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerHours = document.querySelector('span[data-hours]');
const timerDays = document.querySelector('span[data-days]');

let timer = null;

btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
    }
  },
};

flatpickr(input, options);

btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
  btnStart.disabled = true;

  let timer = setInterval(() => {
    const countDate = new Date(input.value) - new Date();
    const { days, hours, minutes, seconds } = convertMs(countDate);

    timerDays.textContent = addLeadingZero(days);
    timerHours.textContent = addLeadingZero(hours);
    timerMinutes.textContent = addLeadingZero(minutes);
    timerSeconds.textContent = addLeadingZero(seconds);

    console.log(`${days}:${hours}:${minutes}:${seconds}`);

    if (countDate <= 1000) {
      clearInterval(timer);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
