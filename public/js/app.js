const form = document.querySelector('form');
const input = document.querySelector('input');
const address = document.querySelector('#location');
const weather = document.querySelector('#weather');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('/weather?address=' + input.value).then(res => {
        res.json().then(data => {
            address.textContent = data.location || data.error;
            weather.textContent = data.forecast
        })
    })
});