document.addEventListener("DOMContentLoaded", () => {
    // Array of portfolio items
    const projects = [
        { src: 'project1.jpg', alt: 'Project 1', description: 'Project 1 Description' },
        { src: 'project2.jpg', alt: 'Project 2', description: 'Project 2 Description' },
        // Add more projects as needed
    ];

    // Select gallery container
    const gallery = document.querySelector('.gallery');

    // Insert gallery items dynamically
    projects.forEach(project => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `
            <img src="${project.src}" alt="${project.alt}">
            <p>${project.description}</p>
        `;
        gallery.appendChild(div);
    });

    // Form validation and feedback
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (name === '' || email === '' || message === '') {
            feedback.textContent = 'Please fill out all fields.';
        } else {
            feedback.textContent = 'Thank you for your message!';
            form.reset(); // Clear the form
        }
    });
});
