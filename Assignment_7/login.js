$(document).ready(() => {
    const validateField = (selector, pattern, minLength, maxLength, errorSelector, errorMessage) => {
        $(selector).on('input', () => {
            const value = $(selector).val();
            let error = '';
            if (!value) error = 'Field cannot be empty';
            else if (!pattern.test(value)) error = 'Invalid characters';
            else if (value.length < minLength || value.length > maxLength) error = errorMessage;
            $(errorSelector).text(error);
            validateForm();
        });
    };

    const validateForm = () => {
        const errors = $('.error').toArray().some(error => $(error).text() !== '');
        $('#loginButton').prop('disabled', errors);
    };

    validateField('#email', /^[a-z0-9._%+-]+@northeastern\.edu$/, 5, 50, '#emailError', 'Email must be between 5 and 50 characters');
    validateField('#username', /^[a-zA-Z0-9]+$/, 4, 20, '#usernameError', 'Username must be between 4 and 20 characters and contain no special characters');
    validateField('#password', /^[a-zA-Z0-9!@#$%^&*]+$/, 6, 20, '#passwordError', 'Password must be between 6 and 20 characters');
    validateField('#confirmPassword', /^[a-zA-Z0-9!@#$%^&*]+$/, 6, 20, '#confirmPasswordError', 'Password must match and be between 6 and 20 characters');

    $('#loginForm').submit((event) => {
        event.preventDefault();

            // Redirect to the calculator page if the form is valid
            window.location.href = 'cal.html';

    });

    
});
