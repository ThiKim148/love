const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor(x, y, angle, speed, color) {
        this.x = x;
        this.y = y;
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.color = color;
        this.alpha = 1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= 0.95;
        this.speedY *= 0.95;
        this.alpha -= 0.01;
    }
    draw() {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

let particles = [];

function heartExplosion(x, y, color) {
    for (let i = 0; i < 300; i++) {
        let t = Math.PI * 2 * Math.random();
        let hx = 16 * Math.pow(Math.sin(t), 3);
        let hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        let angle = Math.atan2(hy, hx);
        let speed = Math.random() * 10 + 2;
        particles.push(new Particle(x, y, angle, speed, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.update();
        p.draw();
        if (p.alpha <= 0) particles.splice(i, 1);
    });
    requestAnimationFrame(animate);
}

// Bắn pháo hoa ngay khi mở trang
heartExplosion(canvas.width / 2, canvas.height / 2, "red");
setInterval(() => {
    heartExplosion(Math.random() * canvas.width, Math.random() * canvas.height / 2, "pink");
}, 2000);

animate();

// Hiện chữ sau 2 giây
setTimeout(() => {
    document.getElementById("message").style.opacity = 1;
}, 2000);

window.onresize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
};

// Xử lý nút bấm
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const ringBox = document.getElementById("ringBox");

function showRingBox() {
    ringBox.style.display = "block";
    // Xóa class để reset animation
    ringBox.classList.remove("show");
    // Thêm lại class sau một chút để trigger lại animation
    setTimeout(() => {
        ringBox.classList.add("show");
    }, 50);
}

yesBtn.addEventListener("click", showRingBox);
noBtn.addEventListener("click", showRingBox);
