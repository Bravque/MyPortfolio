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

/*============== EMAIL NOTIFICATION ===============*/

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            const form = event.target;
            const notification = document.getElementById('notification');

            // Send form data to Formspree using Fetch API
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Display success notification
                    notification.textContent = 'Message sent successfully!';
                    notification.classList.remove('error');
                    notification.classList.add('success');
                    notification.style.display = 'block';

                    // Clear the form
                    form.reset();

                    // Hide the notification after 5 seconds
                    setTimeout(() => {
                        notification.style.display = 'none';
                    }, 5000);
                } else {
                    // Display error notification
                    notification.textContent = 'Failed to send message. Please try again later.';
                    notification.classList.remove('success');
                    notification.classList.add('error');
                    notification.style.display = 'block';

                    // Hide the notification after 5 seconds
                    setTimeout(() => {
                        notification.style.display = 'none';
                    }, 5000);
                }
            })
            .catch(error => {
                // Display error notification
                notification.textContent = 'An error occurred. Please try again later.';
                notification.classList.remove('success');
                notification.classList.add('error');
                notification.style.display = 'block';

                // Hide the notification after 5 seconds
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 5000);
            });
        });
    } else {
        console.error('Form with ID "contact-form" not found.');
    }
});
