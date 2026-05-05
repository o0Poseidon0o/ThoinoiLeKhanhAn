// script.js - Premium Edition

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Preloader ---
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
    }, 1500); // 1.5 seconds loading screen


    // --- 1. Countdown Timer (VIP) ---
    const partyDate = new Date("Jun 27, 2026 18:00:00").getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = partyDate - now;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("premium-countdown").innerHTML = "<h3 class='text-2xl text-deepPink font-black w-full text-center'>Bữa tiệc đã bắt đầu!</h3>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);


    // --- 2. Advanced Scroll Reveal ---
    const reveals = document.querySelectorAll('.reveal');

    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        const elementVisible = 120; // Khoảng cách cuộn trước khi hiện

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load


    // --- 3. Confetti on button click ---
    const confettiBtn = document.getElementById('confetti-btn');
    if (confettiBtn) {
        confettiBtn.addEventListener('click', () => {
            // Heart confetti
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            const interval = setInterval(function () {
                const particleCount = 50;
                // since they fall down, start a bit higher than random
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);

            setTimeout(function () {
                clearInterval(interval);
            }, 2000); // stop after 2s

            // change button text to thank you
            confettiBtn.innerHTML = "Cảm ơn bạn rất nhiều! 💕";
            confettiBtn.classList.remove('from-deepPink');
            confettiBtn.classList.add('from-green-400');
        });
    }

    // --- 4. Beautiful Balloons Background ---
    const balloonContainer = document.getElementById('balloons-wrapper');
    const colors = ['#e8b4b8', '#ffd1dc', '#ff7eb3', '#ff758c', '#ffffff'];
    const numBalloons = 20;

    for (let i = 0; i < numBalloons; i++) {
        createBalloon();
    }

    function createBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');

        const size = Math.random() * 45 + 35; // 35px to 80px
        balloon.style.width = `${size}px`;
        balloon.style.height = `${size * 1.25}px`;

        balloon.style.left = `${Math.random() * 95}vw`;
        balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        const duration = Math.random() * 15 + 15; // 15s to 30s for smooth, slow float
        const delay = Math.random() * 20; // scattered start times

        balloon.style.animationDuration = `${duration}s`;
        balloon.style.animationDelay = `${delay}s`;

        balloonContainer.appendChild(balloon);
    }

    // --- 5. Interactive 3D Tilt & Spotlight Effect ---
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        const spotlight = card.querySelector('.spotlight');

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

            if (spotlight) {
                // Ánh sáng di chuyển theo chuột
                spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.7) 0%, transparent 60%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            if (spotlight) {
                spotlight.style.background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 60%)`;
            }
        });
    });

    // --- Navbar Shrink effect on scroll ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('py-1');
            navbar.classList.remove('py-3');
        } else {
            navbar.classList.add('py-3');
            navbar.classList.remove('py-1');
        }
    });

    // --- 6. Background Music Toggle ---
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');
    let isPlaying = false;

    // Autoplay requires user interaction, so we listen to the first click anywhere
    document.body.addEventListener('click', () => {
        if (!isPlaying && bgMusic) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicIcon.classList.add('animate-[spin_4s_linear_infinite]');
            }).catch(e => console.log('Autoplay blocked'));
        }
    }, { once: true });

    if (musicToggle) {
        musicToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                bgMusic.pause();
                isPlaying = false;
                musicIcon.classList.remove('animate-[spin_4s_linear_infinite]');
            } else {
                bgMusic.play();
                isPlaying = true;
                musicIcon.classList.add('animate-[spin_4s_linear_infinite]');
            }
        });
    }

    // --- 7. Magic Sparkle Golden Snake Cursor effect ---
    const canvas = document.getElementById('magic-cursor');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
            // Thêm hạt (vẩy vàng) mỗi khi chuột di chuyển
            for (let i = 0; i < 2; i++) {
                particles.push(new Particle());
            }
        });

        class Particle {
            constructor() {
                this.x = mouse.x;
                this.y = mouse.y;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                // Golden colors for "Rắn Vàng"
                const colors = ['#FFD700', '#FDBA31', '#FFF4DF', '#FFB347'];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.size > 0.1) this.size -= 0.1;
            }
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Mạng nhện kết nối dính hạt lại để tạo hiệu ứng thân rắn uốn lượn theo đuôi chuột
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 25) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 215, 0, ${1 - distance / 25})`;
                        ctx.lineWidth = particles[i].size / 3;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                if (particles[i].size <= 0.1) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // --- 8. Smooth Lightbox Gallery ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxContent = document.getElementById('lightbox-content');

    if (galleryItems.length > 0 && lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.remove('hidden');
                    lightbox.classList.add('flex');
                    document.body.style.overflow = 'hidden'; // Ngăn cuộn trang

                    // Simple timeout for animation transition
                    setTimeout(() => {
                        lightbox.classList.remove('opacity-0');
                        lightbox.classList.add('opacity-100');
                        if (lightboxContent) {
                            lightboxContent.classList.remove('scale-95');
                            lightboxContent.classList.add('scale-100');
                        }
                    }, 10);
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('opacity-100');
            lightbox.classList.add('opacity-0');
            if (lightboxContent) {
                lightboxContent.classList.remove('scale-100');
                lightboxContent.classList.add('scale-95');
            }
            document.body.style.overflow = 'auto'; // Cho phép cuộn lại

            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
                lightboxImg.src = '';
            }, 300);
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightboxContent?.parentElement) {
                closeLightbox();
            }
        });
    }

});
