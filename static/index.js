// Navigation Bar Toggle
const navToggle = document.querySelector('#nevbar');
const navLinks = document.querySelectorAll('#nevbar a');

navToggle.addEventListener('click', () => {
	navLinks.forEach((link) => {
		link.classList.toggle('active');
	});
});

// Image Slider (Optional)
const images = document.querySelectorAll('.box img');
let currentIndex = 0;

setInterval(() => {
	images.forEach((image, index) => {
		if (index === currentIndex) {
			image.classList.add('active');
		} else {
			image.classList.remove('active');
		}
	});
	currentIndex = (currentIndex + 1) % images.length;
}, 3000);

// Footer Year Update
const yearElement = document.querySelector('.footer p:last-child');
const currentYear = new Date().getFullYear();

yearElement.textContent=`&copy; ${currentYear}your helper's website`;


// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener('click', (e) => {
		e.preventDefault();
		document.querySelector(anchor.getAttribute('href')).scrollIntoView({
			behavior: 'smooth',
		});
	});
});

// Mobile Navigation
const mobileNavToggle = document.querySelector('#nevbar');
const mobileNavLinks = document.querySelectorAll('#nevbar a');

mobileNavToggle.addEventListener('click', () => {
	mobileNavLinks.forEach((link) => {
		link.classList.toggle('active');
	});
});