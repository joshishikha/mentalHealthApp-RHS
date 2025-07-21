// Scroll to Section
const menuLinks = document.querySelectorAll('.menu a');

menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));

        // Scroll to the exact top position of the section
        window.scrollTo({
            top: targetSection.offsetTop - document.querySelector('header').offsetHeight, // Adjust for fixed header height
            behavior: 'smooth'
        });

        // Remove active class from other links
        menuLinks.forEach(item => item.classList.remove('active'));

        // Add active class to the clicked link
        this.classList.add('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Add smooth scrolling
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });

            // Add active class to the clicked link
            document.querySelectorAll('.menu a').forEach(item => {
                item.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Resource dropdown functionality
document.querySelectorAll('.resource-header').forEach(header => {
    header.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const content = document.getElementById(targetId);
        
        // Toggle the display of the content
        if (content.style.display === 'none' || !content.style.display) {
            // Close all other open dropdowns first
            document.querySelectorAll('.resource-content').forEach(item => {
                if (item.id !== targetId) {
                    item.style.display = 'none';
                }
            });
            
            // Reset all dropdown icons
            document.querySelectorAll('.resource-header i').forEach(icon => {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            });
            
            // Open this dropdown
            content.style.display = 'block';
            this.querySelector('i').classList.remove('fa-chevron-down');
            this.querySelector('i').classList.add('fa-chevron-up');
        } else {
            // Close this dropdown
            content.style.display = 'none';
            this.querySelector('i').classList.remove('fa-chevron-up');
            this.querySelector('i').classList.add('fa-chevron-down');
        }
    });
});

// Email form submission
document.getElementById('send-email-btn')?.addEventListener('click', function(e) {
    e.preventDefault();
    
    const to = document.getElementById('email-to').value;
    const from = document.getElementById('email-from').value;
    const subject = document.getElementById('email-subject').value;
    const message = document.getElementById('email-message').value;
    
    if (!to || !from || !message) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Create a mailto link with the form data
    const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('From: ' + from + '\n\n' + message)}`;
    
    // Open the mail client
    window.location.href = mailtoLink;
    
    // Provide feedback to the user
    setTimeout(() => {
        // Clear the form if the user comes back to the page
        document.getElementById('email-from').value = '';
        document.getElementById('email-message').value = '';
        document.getElementById('appointment-context').textContent = '';
    }, 1000);
});

// Handle booking appointment buttons
const counselorEmails = {
    "Kimberly Herring": "kiherring@lwsd.org",
    "Lindsey Ehrlich": "lehrlich@lwsd.org",
    "Wendi Thomas": "wthomas@lwsd.org",
    "Sarah Gray": "sgray@lwsd.org",
    "Margaret Kinney": "MKinneyKrepel@lwsd.org",
    "Katie Bunyard": "kbunyard@lwsd.org",
    "Ellen Zambrowsky-Huls": "ezambrowsky-huls@lwsd.org",
    "Kasey Dauenhauer": "kdauenhauer@lwsd.org",
    "Tara Kapsch": "tkapsch@lwsd.org",
    "JB Magpantay": "jmagpantay@lwsd.org"
};

document.querySelectorAll('.counselor-item .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the counselor name from the sibling element
        const counselorItem = this.closest('.counselor-item');
        const counselorNameFull = counselorItem.querySelector('.counselor-name').textContent;
        
        // Extract the base name without the last name range
        const counselorName = counselorNameFull.split('(')[0].trim();
        
        // Find the email form and scroll to it
        const emailForm = document.querySelector('.email-form');
        emailForm.scrollIntoView({ behavior: 'smooth' });
        
        // Set the counselor's email in the "To" field
        if (counselorEmails[counselorName]) {
            document.getElementById('email-to').value = counselorEmails[counselorName];
            
            // Set the appointment context message
            document.getElementById('appointment-context').textContent = `Booking an appointment with ${counselorName}`;
            
            // Update subject with counselor name
            document.getElementById('email-subject').value = `Appointment Request with ${counselorName}`;
            
            // Focus on the "From" field since "To" is already filled
            setTimeout(() => {
                document.getElementById('email-from').focus();
            }, 800); // Wait for the scroll to complete
        }
    });
});

// Enhance hotline call buttons
document.querySelectorAll('.hotline-buttons .btn').forEach(button => {
    // Add visual feedback for both call and message buttons
    button.addEventListener('click', function(e) {
        // Add visual feedback that the button was clicked
        this.classList.add('btn-active');
        setTimeout(() => {
            this.classList.remove('btn-active');
        }, 300);
    });
});

// Set active menu item based on scroll position
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Get all sections
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
            const id = section.getAttribute('id');
            document.querySelectorAll('.menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});
