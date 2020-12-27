var
    canv = document.getElementById('canvas'),
    ctx = canv.getContext('2d');
isMouseDown = false;
coords = [];

radius = 10;
color = 'black';
background_color = 'white';

canv.width = window.innerWidth;
canv.height = window.innerHeight;

canv.textContent = 'center';

canv.addEventListener('mousedown', function () {
    isMouseDown = true;
});

canv.addEventListener('mouseup', function () {
    isMouseDown = false;
    ctx.beginPath();
    coords.push('mouseup');
});

ctx.lineWidth = radius;


canv.addEventListener('mousemove', function (e) {
    if (isMouseDown) {
        coords.push([e.clientX, e.clientY]);

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, radius / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});


function save() {
    localStorage.setItem('coords', JSON.stringify(coords));
}

function replay() {
    var
        timer = setInterval(function () {
            if (!coords.length) {
                clearInterval(timer);
                ctx.beginPath();
                return;
            }

            var
                crd = coords.shift(),
                e = {
                    clientX: crd['0'],
                    clientY: crd['1']
                };

            ctx.lineTo(e.clientX, e.clientY);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(e.clientX, e.clientY, radius / 2, 0, Math.PI * 2);
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(e.clientX, e.clientY);
        }, 20);
}

function clear() {
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.beginPath();
    ctx.fillStyle = color;
};

document.addEventListener('keydown', function (e) {
    if (e.keyCode == 83) {
        save();
        console.log('Saved');
    }

    if (e.keyCode == 82) {
        console.log('Replaying...')

        coords = JSON.parse(localStorage.getItem('coords'));

        clear();
        replay();
    }

    if (e.keyCode == 67) {
        clear();
        console.log('Cleared');
    }
});