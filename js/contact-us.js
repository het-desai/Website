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
        const messageInput = form.querySelector('textarea[name="message"]');

        // Sanitize inputs
        const sanitizedFirstName = sanitizeInput(firstNameInput.value);
        const sanitizedLastName = sanitizeInput(lastNameInput.value);
        const sanitizedEmail = sanitizeAndValidateEmail(emailInput.value);
        const sanitizedSubject = sanitizeInput(subjectInput.value);
        const sanitizedMessage = sanitizeInput(messageInput.value);

        // Update input values with sanitized versions
        firstNameInput.value = sanitizedFirstName;
        lastNameInput.value = sanitizedLastName;
        emailInput.value = sanitizedEmail !== null ? sanitizedEmail : '';
        subjectInput.value = sanitizedSubject;
        messageInput.value = sanitizedMessage;

        // Define error messages
        const errorMessages = {
            'first_name': 'First name should contain only alphabets, numbers, spaces, and dots.',
            'last_name': 'Last name should contain only alphabets, numbers, spaces, and dots.',
            'email': 'Invalid email address.',
            'subject': 'Subject should contain only alphabets, numbers, spaces, and dots.',
            'message': 'Message should contain only alphabets, numbers, spaces, and dots.',
        };

        // Check each input and show alerts if invalid
        const inputsToValidate = {
            'first_name': sanitizedFirstName,
            'last_name': sanitizedLastName,
            'email': sanitizedEmail,
            'subject': sanitizedSubject,
            'message': sanitizedMessage,
        };

        for (const [inputName, inputValue] of Object.entries(inputsToValidate)) {
            if (!isValidInput(inputValue, inputName)) {
                alert(errorMessages[inputName]);
                return; // Stop processing further if any input is invalid
            }
        }

        form.submit();
    }

    function sanitizeInput(input) {
        // Allow alphabets, numbers, spaces, dots
        return input.replace(/[^a-zA-Z0-9\s.]/g, '');
    }

    function sanitizeAndValidateEmail(email) {
        // Allow alphabets, numbers, @, -, +, ., and _
        const sanitizedEmail = email.replace(/[^a-zA-Z0-9@\-+._]/g, '');
        return isValidEmail(sanitizedEmail) ? sanitizedEmail : ''; // Return empty string if invalid
    }

    function isValidInput(input, inputName) {
        // Check if input is not empty
        if (input.trim() === '') return false;

        // Additional validation for specific fields
        if (inputName === 'email' && input === '') return false; // Check for empty email string

        return true;
    }

    function isValidEmail(email) {
        // Use a regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});