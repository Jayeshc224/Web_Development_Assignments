$(document).ready(() => {
    const validateInput = () => {
        const number1 = $('#number1').val();
        const number2 = $('#number2').val();
        let isValid = true;

        $('.error').text(''); // Clear previous errors

        if (!number1 || isNaN(number1)) {
            $('#number1Error').text('Please enter a valid number for Number 1');
            isValid = false;
        }
        if (!number2 || isNaN(number2)) {
            $('#number2Error').text('Please enter a valid number for Number 2');
            isValid = false;
        }

        // Check for infinite or undefined results
        if (isValid && (Number(number1) === Infinity || Number(number2) === Infinity)) {
            $('#number1Error').text('Number 1 or Number 2 cannot be infinite');
            $('#number2Error').text('Number 1 or Number 2 cannot be infinite');
            isValid = false;
        }

        return isValid;
    };

    const calculateResult = (operation) => {
        if (!validateInput()) return; // Don't calculate if inputs are invalid

        const num1 = parseFloat($('#number1').val());
        const num2 = parseFloat($('#number2').val());
        let result;

        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    $('#number2Error').text('Cannot divide by zero');
                    return;
                }
                result = num1 / num2;
                break;
        }

        $('#result').val(result);
    };

    $('#add').click(() => calculateResult('add'));
    $('#subtract').click(() => calculateResult('subtract'));
    $('#multiply').click(() => calculateResult('multiply'));
    $('#divide').click(() => calculateResult('divide'));
});
