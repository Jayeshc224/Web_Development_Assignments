var form = document.getElementById("myForm");
form.addEventListener("submit",submitted);

var validName = false;
var validEmail = false;
var validPhone = false;
var validZip = false;
var validAddress = false;

//regular expressions
 var regExName = /^[a-zA-Z]+$/;
 var regExEmail = /([\w\.]+)@northeastern\.edu$/;
 var regExPhone =  /^(\(\d{3}\)|\d{3})[ -]?\d{3}[ -]?\d{4}$/;
 var regExZip= /^\d{5}$/;
 var regExAddress = /^[a-zA-Z0-9\s]+$/;

    var firstName = document.getElementById("firstName");
    firstName.addEventListener("input", validate);

    var emailId = document.getElementById("emailId");
    emailId.addEventListener("input", validate);

    var phoneNo = document.getElementById("phoneNumber");
    phoneNo.addEventListener("input", validate);

    var zipCode=document.getElementById("zipCode");
    zipCode.addEventListener("input", validate);

    var Address = document.getElementById("Address");
    Address.addEventListener("input", validate);

    //function validate
    function validate(e){
        var value = e.target.value;
        var type = this.id;
        var em = "error_" + type;

        switch(type){
            case "firstName" :
                if(!value.trim().match(regExName)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validName = false;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validName = true;
                }
                break;

            case "emailId":
                if (!value.trim().match(regExEmail)) {
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validEmail = false;
                }
                else {
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validEmail = true;
                }
                break;

            case "phoneNumber":
                if (!value.trim().match(regExPhone)) {
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validPhone = false;
                }
                else {
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validPhone = true;
                }
                break;

            case "zipCode":
                if(!value.trim().match(regExZip)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validZip=false;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validZip = true;
                }

                case "Address":
                if(!value.trim().match(regExAddress)){
                    document.getElementById(em).style.display = "block";
                    this.style.border = "2px solid red";
                    validAddress=false;
                }
                else if(value === ''){
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validAddress = true;
                }
                else{
                    document.getElementById(em).style.display = "none";
                    this.style.border = "";
                    validAddress = true;
                }
                break;
        }
    }

//function submit
  function submitted(e){
    if(validName){
        alert("Data Entered Successfully");
    }
    else{
        alert("Please enter valid one");
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    var form = document.getElementById("myForm");
    var submitButton = document.querySelector("input[type='submit']");

    // Disable submit button on load
    submitButton.disabled = true;

    // Function to check if all fields are valid
    function checkFields() {
        var firstName = document.getElementById("firstName").value.trim();
        var emailId = document.getElementById("emailId").value.trim();
        var phoneNumber = document.getElementById("phoneNumber").value.trim();
        var comments = document.getElementById("comments").value.trim();
        var Address = document.getElementById("Address").value.trim();
        var titleChecked = document.querySelector("input[name='title']:checked");

        // Update: Add conditions for all required fields
        if (firstName && emailId && phoneNumber && comments && titleChecked) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }

    // Add event listeners to all input fields
    var inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(function(input) {
        input.addEventListener("input", checkFields);
    });

    // Ensure to call checkFields on form changes to handle dynamic enable/disable of the submit button
    form.addEventListener("change", checkFields);

    // Optional: Reinstate submit event listener
    form.addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent form submission for demonstration
        alert("Form is ready to be submitted.");
    });
});
document.addEventListener("DOMContentLoaded", function() {
var form = document.getElementById("myForm");
var submitButton = document.querySelector("input[type='submit']");

// Create a new table with a header row outside the form submission event
var table = document.createElement("table");
var thead = document.createElement("thead");
var tbody = document.createElement("tbody");
table.appendChild(thead);
table.appendChild(tbody);
document.body.appendChild(table); // Append the table to the body or to a specific element

// Create and append header cells
var headerRow = thead.insertRow();
["Title", "First Name", "Email Id", "Phone Number", "Comments" , "zipcode" , "Address"].forEach(function(text) {
    var th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
});

form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the default form submission


    // Retrieve values from the form
    var title = document.querySelector("input[name='title']:checked")?.value;
    var firstName = document.getElementById("firstName").value;
    var emailId = document.getElementById("emailId").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var comments = document.getElementById("comments").value;
    var zipCode = document.getElementById("zipCode").value;
    var Address = document.getElementById("Address").value;

    var existingEmails = tbody.querySelectorAll("tr td:nth-child(3)"); // Assuming email is in the 3rd column
    for (var i = 0; i < existingEmails.length; i++) {
        if (existingEmails[i].textContent === emailId) {
            alert("Email already exists.");

            return form.reset(); // Prevent further execution
        }
    }

    // Create a new row in the table body for form data
    var row = tbody.insertRow();
    [title, firstName, emailId, phoneNumber, comments , zipCode , Address].forEach(function(text) {
        var cell = row.insertCell();
        cell.textContent = text;
    });

    // Clear all fields
    form.reset();
    clearcheckBoxArea();
    checkFields();
   
    // Optionally, check conditions to enable the submit button
    //submitButton.disabled = checkFormConditions();
});

// You might want to define a function to check form conditions
// and decide whether to enable or disable the submit button.
// function checkFormConditions() {
//     // Implement logic here to check form conditions
//     // Return true to disable the button, false to enable it
// }
});

// Function to handle the select change event
function handleSelectChange() {
var selectBox = document.getElementById('optionsSelect');
var selectedValue = selectBox.value;
var checkboxArea = document.getElementById('checkboxArea');

// Clear previous checkbox
checkboxArea.innerHTML = '';
checkboxArea.innerHTML = '<br>';
// Check if the selected option is the one that should show the checkbox
if (selectedValue === 'Option1') { // Replace 'Option1' with the value that should show the checkbox
    // Create checkbox and label elements
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'rateID';
    checkbox.name = 'rateID';
    checkbox.value = 'rate';
   
    var label = document.createElement('label');
    label.htmlFor = 'rate';
    label.appendChild(document.createTextNode('Professor rating in 5'));

    // Append elements to the checkbox area
    checkboxArea.appendChild(checkbox);
    checkboxArea.appendChild(label);
   
    // Add event listener to toggle text field on checkbox change
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the text field if the checkbox is checked
            var textField = document.createElement('input');
            textField.type = 'text';
            textField.id = 'rating';
            textField.name = 'rating';
            textField.placeholder = 'Specify the rating...';
            textField.required = true;
            checkboxArea.appendChild(textField);
        } else {
            // Remove the text field if the checkbox is unchecked
            var textField = document.getElementById('rating');
            if (textField) {
                checkboxArea.removeChild(textField);
            }
        }
    });
}
else if(selectedValue ==='Option2'){
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'DepartmentID';
    checkbox.name = 'DepartmentID';
    checkbox.value = 'Department';
   
    var label = document.createElement('label');
    label.htmlFor = 'department';
    label.appendChild(document.createTextNode('Department rating in 5'));

    // Append elements to the checkbox area
    checkboxArea.appendChild(checkbox);
    checkboxArea.appendChild(label);
   
    // Add event listener to toggle text field on checkbox change
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the text field if the checkbox is checked
            var textField = document.createElement('input');
            textField.type = 'text';
            textField.id = 'Department';
            textField.name = 'Department';
            textField.placeholder = 'Specify the rating of dept...';
            textField.required = true;
            checkboxArea.appendChild(textField);
        } else {
            // Remove the text field if the checkbox is unchecked
            var textField = document.getElementById('Department');
            if (textField) {
                checkboxArea.removeChild(textField);
            }
        }
    });
    

}
else if(selectedValue ==='Option3'){
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'OnCampus';
    checkbox.name = 'OnCampus';
    checkbox.value = 'OnCampus';
   
    var label = document.createElement('label');
    label.htmlFor = 'OnCampus';
    label.appendChild(document.createTextNode('OnCampus job availability'));

    // Append elements to the checkbox area
    checkboxArea.appendChild(checkbox);
    checkboxArea.appendChild(label);
   
    // Add event listener to toggle text field on checkbox change
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the text field if the checkbox is checked
            var textField = document.createElement('input');
            textField.type = 'text';
            textField.id = 'OnCampus';
            textField.name = 'OnCampus';
            textField.placeholder = 'Have SSN?';
            textField.required = true;
            checkboxArea.appendChild(textField);
        } else {
            // Remove the text field if the checkbox is unchecked
            var textField = document.getElementById('OnCampus');
            if (textField) {
                checkboxArea.removeChild(textField);
            }
        }
    });

}
else if(selectedValue ==='Option4'){
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'Course';
    checkbox.name = 'Course';
    checkbox.value = 'Course';
   
    var label = document.createElement('label');
    label.htmlFor = 'Course';
    label.appendChild(document.createTextNode('Course name'));

    // Append elements to the checkbox area
    checkboxArea.appendChild(checkbox);
    checkboxArea.appendChild(label);
   
    // Add event listener to toggle text field on checkbox change
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the text field if the checkbox is checked
            var textField = document.createElement('input');
            textField.type = 'text';
            textField.id = 'Course';
            textField.name = 'Course';
            textField.placeholder = 'Which Course?';
            textField.required = true;
            checkboxArea.appendChild(textField);
        } else {
            // Remove the text field if the checkbox is unchecked
            var textField = document.getElementById('Course');
            if (textField) {
                checkboxArea.removeChild(textField);
            }
        }
    });

}
else{
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'Terms';
    checkbox.name = 'Terms';
    checkbox.value = 'Terms';
   
    var label = document.createElement('label');
    label.htmlFor = 'Terms';
    label.appendChild(document.createTextNode('Fall23/Spring24'));

    // Append elements to the checkbox area
    checkboxArea.appendChild(checkbox);
    checkboxArea.appendChild(label);
   
    // Add event listener to toggle text field on checkbox change
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            // Show the text field if the checkbox is checked
            var textField = document.createElement('input');
            textField.type = 'text';
            textField.id = 'Terms';
            textField.name = 'Terms';
            textField.placeholder = 'Mention your term';
            textField.required = true;
            checkboxArea.appendChild(textField);
        } else {
            // Remove the text field if the checkbox is unchecked
            var textField = document.getElementById('Terms');
            if (textField) {
                checkboxArea.removeChild(textField);
            }
        }
    });

}
}
function clearcheckBoxArea() { 
var div = document.getElementById("checkboxArea");             
while(div.firstChild) { 
div.removeChild(div.firstChild); 
} 
} 