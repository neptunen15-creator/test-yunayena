// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Header Logic
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            // Provide feedback to the user
            const name = document.getElementById('name').value;
            alert(`감사합니다, ${name}님! 메시지가 전송됩니다.`);
        });
    }

    // Optional: Smooth scroll for navigation links (though already handled by CSS scroll-behavior)
    // This can be used for more fine-grained control if needed.
});
