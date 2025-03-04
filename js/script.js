 /*==toggle icon navbar==*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

};

/*==scroll section active link==*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec =>{
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

        };
    });
    /*==sticky navbar==*/

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*==remove toggle icon==*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};


    /*==scroll reveal==*/
    ScrollReveal({ 
        reset: true,
        distance: '80px',
        duration: 1000,
        delay: 200

    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .services-container, .project, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });


/*==============typed js===========*/
const typed = new Typed('.multiple-text', {
    strings: ['Software Engineer', 'Fullstack Dev', 'Graphic Designer'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
    backDelay: 2000
});

/*=============== SWIPER TESTIMONIAL ===============*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    grabCursor: true,
  
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

/*============== EMAIL NOTIFICATION & FORM VALIDATION ===============*/

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission until validated

            const form = event.target;
            const notification = document.getElementById('notification');

            const fullName = form.fullname.value.trim();
            const email = form.email.value.trim();
            const mobile = form.mobile.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();

            // Regular expressions for validation
            const nameRegex = /^[a-zA-Z]+([ \-']{0,1}[a-zA-Z]+){0,2}[.]{0,1}$/; 
            // First & Last name required, starts with uppercase, no numbers/symbols.

            const emailRegex = /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            // Ensures a valid email format with no consecutive dots.

            const mobileRegex = /^(?:\+?\d{1,3})?[1-9]\d{9,14}$/;
            // Allows international + country codes or starts with 07 (Kenya), min 10 digits.

            const subjectRegex = /^[a-zA-Z0-9\s]{5,}$/;
            // Allows only letters, numbers, spaces; at least 5 characters.

            const messageRegex = /^[a-zA-Z0-9.,!?'"()&\s]{20,}$/;
            // Ensures a meaningful message (min 20 characters, allows punctuation)

            // Validation checks
            if (!nameRegex.test(fullName)) {
                showNotification('Full Name must contain only letters and spaces.', 'error');
                return;
            }

            if (!emailRegex.test(email)) {
                showNotification('Enter a valid email address.', 'error');
                return;
            }

            if (mobile && !mobileRegex.test(mobile)) {
                showNotification('Mobile Number should contain only digits.', 'error');
                return;
            }

            if (subject.length < 3) {
                showNotification('Subject must be at least 3 characters long.', 'error');
                return;
            }

            if (message.length < 10) {
                showNotification('Message must be at least 10 characters long.', 'error');
                return;
            }

            // If all validations pass, send the form data to Formspree
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showNotification('Message sent successfully!', 'success');
                    form.reset(); // Clear the form

                } else {
                    showNotification('Failed to send message. Please try again later.', 'error');
                }
            })
            .catch(error => {
                showNotification('An error occurred. Please try again later.', 'error');
            });
        });
    } else {
        console.error('Form not found.');
    }

    function showNotification(message, type) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
});
