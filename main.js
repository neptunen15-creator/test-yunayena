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
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form Submitted:', { name, email, message });
            
            // Provide feedback to the user
            alert(`감사합니다, ${name}님! 메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.`);
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Optional: Smooth scroll for navigation links (though already handled by CSS scroll-behavior)
    // This can be used for more fine-grained control if needed.
});
