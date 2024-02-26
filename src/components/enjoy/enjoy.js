const stars = document.querySelector('.rating__stars');
const starsArray = Array.from(document.querySelectorAll('.rating__stars-item'));

stars.addEventListener('click', e => {
    starsArray.forEach((star, i, array) => {
        if (i >= array.indexOf(e.target)) {
            star.classList.add('yellow-star');
        } else {
            star.classList.remove('yellow-star');
        }
    })
})


import Chart from 'chart.js/auto';

function ChartController() {
// Получаем контекст HTML5 Canvas
var ctx = document.getElementById('myChart').getContext('2d');

// Генерируем случайные данные для графика
var data = [];
for (var i = 0; i < 10; i++) {
    data.push(Math.floor(Math.random() * 100));
}
// Создаем график с использованием библиотеки Chart.js
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'Random Data',
            data: data,
            backgroundColor: '#6c5fbc',
            borderColor: '#6c5fbc',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
}
ChartController();