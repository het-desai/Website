document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function (event) {
        // Prevent the form from submitting initially
        event.preventDefault();

        // Call the function to sanitize and validate inputs
        handleFormSubmission();
    });

    function handleFormSubmission() {
        // Get form elements
        const firstNameInput = form.querySelector('input[name="first_name"]');
        const lastNameInput = form.querySelector('input[name="last_name"]');
        const emailInput = form.querySelector('input[name="email"]');
        const subjectInput = form.querySelector('input[name="subject"]');
        const textarea = form.querySelector('textarea');

        // Sanitize and validate first name
        const sanitizedFirstName = sanitizeAndValidateInput(firstNameInput.value);
        firstNameInput.value = sanitizedFirstName;

        // Sanitize and validate last name
        const sanitizedLastName = sanitizeAndValidateInput(lastNameInput.value);
        lastNameInput.value = sanitizedLastName;

        // Sanitize and validate email
        const sanitizedEmail = sanitizeAndValidateEmail(emailInput.value);
        emailInput.value = sanitizedEmail;

        // Sanitize and validate subject
        const sanitizedSubject = sanitizeAndValidateInput(subjectInput.value);
        subjectInput.value = sanitizedSubject;

        // Sanitize and validate textarea
        const sanitizedTextarea = sanitizeAndValidateInput(textarea.value);
        textarea.value = sanitizedTextarea;

        // If validation fails, display an alert message
        const errorMessages = {
            'first_name': 'First name only alphabets, numbers, space, and (.) dot',
            'last_name': 'Last name only alphabets, numbers, space, and (.) dot',
            'email': 'Invalid Email',
            'subject': 'Subject only alphabets, numbers, space, and (.) dot',
            'textarea': 'Message only alphabets, numbers, space, and (.) dot',
        };

        // Check each input and show alerts if invalid
        for (const [inputName, inputValue] of Object.entries({
            'first_name': sanitizedFirstName,
            'last_name': sanitizedLastName,
            'email': sanitizedEmail,
            'subject': sanitizedSubject,
            'textarea': sanitizedTextarea,
        })) {
            if (!isValidInput(inputValue)) {
                alert(errorMessages[inputName]);
                return; // Stop processing further if any input is invalid
            }
        }
        form.submit();
    }

    function sanitizeAndValidateInput(input) {
        // Allow alphabets, numbers, spaces, dots
        return input.replace(/[^a-zA-Z0-9\s.]/g, '');
    }

    function sanitizeAndValidateEmail(email) {
        // Allow alphabets, numbers, @, -, +
        return email.replace(/[^a-zA-Z0-9@\-+.]/g, '');
    }

    function isValidInput(input) {
        // You can add more complex validation logic here if needed
        // For now, let's consider it valid if it's not empty
        return input.trim() !== '';
    }

    function isValidEmail(email) {
        // Use a regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});