// ====== CONFIGURACIÓN (cambia aquí lo que quieras) ======

// Fecha de llegada a Colombia (-05:00 = hora de Colombia)
var targetDate = new Date('2027-02-01T00:00:00-05:00').getTime();

// Día en que llegó (20 de julio), desde donde empieza la barra del avión
var startDate = new Date('2026-07-20T00:00:00-05:00').getTime();

// Mensajes: cambia uno cada día
var messages = [
    'Cada día que pasa es un día menos para abrazarte.',
    'Colombia te está esperando con los brazos abiertos.',
    'Ya casi, mi amor. Ya casi estás en casa.',
    'Cuento los días solo para verte llegar.',
    'Tu sonrisa va a iluminar todo cuando aterrices.',
    'Falta menos de lo que imaginas, aguanta un poquito más.',
    'Eres mi lugar favorito, y pronto estarás aquí.',
    'Hoy pienso en ti, como todos los días.',
    'Quiero que este reloj llegue a cero ya.',
    'Todo se siente más bonito sabiendo que vienes.'
];

// ====== RELOJ ======

function pad(n, size) {
    var s = String(n);
    while (s.length < size) { s = '0' + s; }
    return s;
}

var lastValues = {};

function setValue(id, value) {
    var el = document.getElementById(id);
    if (lastValues[id] !== value) {
        el.textContent = value;
        el.classList.remove('tick');
        void el.offsetWidth;
        el.classList.add('tick');
        lastValues[id] = value;
    }
}

function updateCountdown() {
    var now = new Date().getTime();
    var diff = targetDate - now;

    if (diff <= 0) {
        setValue('days', '000');
        setValue('hours', '00');
        setValue('minutes', '00');
        setValue('seconds', '00');
        document.getElementById('title').textContent = '¡Bienvenida a Colombia! 🇨🇴❤️';
        document.getElementById('message').textContent = 'Por fin llegaste. Te estaba esperando.';
        document.getElementById('percent').textContent = '100%';
        document.getElementById('fill').style.width = '100%';
        document.getElementById('plane').style.left = '100%';
        return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setValue('days', pad(days, 3));
    setValue('hours', pad(hours, 2));
    setValue('minutes', pad(minutes, 2));
    setValue('seconds', pad(seconds, 2));

    // Avión
    var percent = ((now - startDate) / (targetDate - startDate)) * 100;
    if (percent < 0) { percent = 0; }
    if (percent > 100) { percent = 100; }
    document.getElementById('fill').style.width = percent + '%';
    document.getElementById('plane').style.left = percent + '%';
    document.getElementById('percent').textContent = Math.floor(percent) + '%';
}

// ====== MENSAJE DEL DÍA ======

function showDailyMessage() {
    var dayNumber = Math.floor(new Date().getTime() / (1000 * 60 * 60 * 24));
    var index = dayNumber % messages.length;
    document.getElementById('message').textContent = messages[index];
}

// ====== ESTRELLAS Y CORAZONES ======

function createStars() {
    var sky = document.getElementById('sky');
    for (var i = 0; i < 40; i++) {
        var star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 3) + 's';
        sky.appendChild(star);
    }
}

function createHeart() {
    var hearts = document.getElementById('hearts');
    var symbols = ['💗', '💙', '🩷', '🩵', '🤍'];
    var heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = Math.random() * 95 + '%';
    heart.style.fontSize = (14 + Math.random() * 18) + 'px';
    heart.style.animationDuration = (7 + Math.random() * 6) + 's';
    hearts.appendChild(heart);

    setTimeout(function () {
        hearts.removeChild(heart);
    }, 14000);
}

// ====== INICIO ======

createStars();
showDailyMessage();
updateCountdown();
setInterval(updateCountdown, 1000);
setInterval(createHeart, 1200);
