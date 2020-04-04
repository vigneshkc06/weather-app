const form = document.querySelector('form');
const input = document.querySelector('input');
const address = document.querySelector('#location');
const weather = document.querySelector('#weather');

form.addEventListener('submit', e => {
    e.preventDefault();
    fetch('http://penguin.termina.linux.test:3000/weather?address=' + input.value).then(res => {
        res.json().then(data => {
            address.textContent = data.location;
            weather.textContent = data.forecast
        })
    })
})