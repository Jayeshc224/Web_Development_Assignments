// Title constructor function that creates a Title object
function Title(title) {
    this.myTitle = title;
}
 
Title.prototype.getName = function () {
    return this.myTitle;
}
 
// Object for social media links
var socialMedia = {
    facebook: 'http://facebook.com',
    twitter: 'http://twitter.com',
    flickr: 'http://flickr.com',
    youtube: 'http://youtube.com'
};
 
var title = new Title("CONNECT WITH ME!");
 
// Function to add event listeners
function addEventListeners() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var images = document.querySelectorAll('img[src="down.png"]');
   
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('click', function () {
            toggleDeleteEditColumns(checkbox);
            updateSubmitButton();
            highlightRow(checkbox);
        });
    });
 
    images.forEach(function (image) {
		image.removeEventListener('click', toggleDropDown);
        image.addEventListener('click', function () {
            toggleDropDown(image);
        });
    });
       // Hide "Delete" and "Edit" columns initially
       var deleteEditCells = document.querySelectorAll('th:last-child, th:nth-last-child(2), td:last-child, td:nth-last-child(2)');
       deleteEditCells.forEach(function(cell) {
           cell.style.display = 'none';
       });
}

addEventListeners();
 
// Function to add a new student row
function addNewStudent() {
    var table = document.getElementById('myTable');
    var studentNumbers = Array.from(table.querySelectorAll('tr[student-number]'))
        .map(row => parseInt(row.getAttribute('student-number')));
        var maxNumber = studentNumbers.length > 0 ? Math.max(...studentNumbers) : 0;
        var nextStudentNumber = maxNumber + 1;
    // Create a new row for student data
    var studentDataRow = table.insertRow(-1);
    studentDataRow.setAttribute("student-number", nextStudentNumber);
    // Create cells for the student data row
    var cellContents = [
        '<input type="checkbox" /><br /><br /><img src="down.png" width="25px" />',
        'Student ' + nextStudentNumber,
        'Teacher ' + nextStudentNumber,
        'Approved',
        'Fall',
        'TA',
        12345 + nextStudentNumber - 1,
        '100%',
        '',
        ''
    ];
 
    for (var i = 0; i < cellContents.length; i++) {
        var cell = studentDataRow.insertCell(i);
        cell.innerHTML = cellContents[i];
    };
    // Create a new row for award details
    var awardDetailsRow = table.insertRow(-1);
    // Add class to the student data row
    awardDetailsRow.className = 'dropDownTextArea';
    // Create a cell for the award details row
    var awardDetailsCell = awardDetailsRow.insertCell(0);
    awardDetailsCell.colSpan = "8";
    // Set content for the award details cell
    awardDetailsCell.innerHTML = `
        Advisor: Advisor ${nextStudentNumber}<br /><br />
        Award Details<br />
        Semester: ${studentDataRow.cells[4].textContent}<br />
        Type: ${studentDataRow.cells[5].textContent}<br />
        Budget Number: ${studentDataRow.cells[6].textContent}<br />
        Tuition Number: <br />
        Comments:<br /><br /><br />
        Award Status:<br /><br /><br />
    `;
 
    // Display a success message
    alert('Student ' + nextStudentNumber + ' Record added successfully');
    addEventListeners();
}
 
// Function to toggle the visibility of "dropDownTextArea" rows when the down arrow image is clicked
function toggleDropDown(image) {
    var row = image.closest('tr'); // Get the parent row
    var dropDownRow = row.nextElementSibling; // Get the next row (should be the dropDownTextArea)

    // Ensure that we have the correct dropDownRow by checking the class
    if (dropDownRow && dropDownRow.classList.contains('dropDownTextArea')) {
        // Toggle the display property of the dropDownRow
        dropDownRow.style.display = (dropDownRow.style.display === 'table-row' || dropDownRow.style.display === '') ? 'none' : 'table-row';
    }
}
 
addEventListeners();
 
// Add event listener to the "Add New Student" button
var addButton = document.getElementById('add');
addButton.addEventListener('click', function(){
    addNewStudent();
});
 
// Function to toggle the visibility of "Delete" and "Edit" columns when a checkbox is clicked
function toggleDeleteEditColumns(checkbox) {
    var table = document.getElementById('myTable');
    var deleteEditHeaders = table.querySelectorAll('th:nth-last-child(-n+2)');
    var deleteEditCells = table.querySelectorAll('td:nth-last-child(-n+2)');
   
    // Update the display property of delete and edit cells and headers based on the checkbox
    var isAnyCheckboxChecked = Array.from(document.querySelectorAll('input[type="checkbox"]')).some(checkbox => checkbox.checked);
    deleteEditHeaders.forEach(header => {
        header.style.display = isAnyCheckboxChecked ? 'table-cell' : 'none';
    });
    deleteEditCells.forEach(cell => {
        cell.style.display = isAnyCheckboxChecked ? 'table-cell' : 'none';
    });
 
    if (checkbox.checked) {
        checkbox.closest('tr').querySelector('td:nth-last-child(2)').innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
        checkbox.closest('tr').querySelector('td:last-child').innerHTML = '<button onclick="editRow(this)">Edit</button>';
    } else {
        checkbox.closest('tr').querySelector('td:nth-last-child(2)').innerHTML = '';
        checkbox.closest('tr').querySelector('td:last-child').innerHTML = '';
    }
}
 
// Function to update the submit button's disabled state based on checkboxes
function updateSubmitButton() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var submitButton = document.getElementById('button');
    var isAnyCheckboxChecked = Array.from(checkboxes).some(function (checkbox) {
        return checkbox.checked;
    });
    submitButton.disabled = !isAnyCheckboxChecked;
    submitButton.style.backgroundColor = isAnyCheckboxChecked ? 'orange' : 'gray';
}
 
// Function to highlight the row when checkbox is checked
function highlightRow(checkbox) {
    var row = checkbox.closest('tr');
    if (checkbox.checked) {
        row.style.backgroundColor = 'yellow';
    } else {
        row.style.backgroundColor = '';
    }
}
 
// Function to delete a row
function deleteRow(button) {
    if (window.confirm("Are you sure, you want to delete this record? ")) {
        const row = button.parentElement.parentElement; // Get the grandparent row
        const childRow = row.nextElementSibling;
        const stu = row.cells[1].innerHTML;
        row.remove();
        childRow.remove();
        alert(`Record for ${stu} is deleted!`);
        addEventListeners();
        // Update the display of remaining delete/edit columns
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkedCheckbox) {
            toggleDeleteEditColumns(checkedCheckbox);
        });
    }
   
}
 
// Function to edit a row (you can implement your edit logic here)
function editRow(button) {
    // Get the row containing the Edit button
    var row = button.parentElement.parentElement;
    // Get the student number from the row (assuming it's stored in a data attribute)
    var studentNumber = parseInt(row.getAttribute('student-number'));
    // Display the edit popup for the selected student
    showEditPopup(studentNumber, row);
}
 
// Function to display the edit popup
function showEditPopup(studentNumber, row) {
    var popup = document.getElementById('editPopup');
    var title = document.getElementById('popupTitle');
    var studentDetails = document.getElementById('studentDetails');
 
    // Set the title of the edit popup
    title.textContent = 'Edit details of Student ' + studentNumber;
 
    // Get the student details from the corresponding row
    var cells = row.querySelectorAll('td');
    var tableHead = document.getElementById('table-head');
    var headCells = tableHead.querySelectorAll('th');
    var detailsHTML = '<div class="edit-details"><div>';
 
    for (var i = 1; i < cells.length - 2; i++) {
        detailsHTML += headCells[i].textContent + ':&nbsp;<br>';
    }
 
    detailsHTML += "</div><div>";
 
    for (var i = 1; i < cells.length - 2; i++) {
        detailsHTML += cells[i].textContent + '<br>';
    }
 
    detailsHTML += "</div></div>"
 
    studentDetails.innerHTML = detailsHTML;
 
    // Show the edit popup
    popup.style.display = 'block';
}
 
// Function to hide the edit popup
function hideEditPopup() {
    var popup = document.getElementById('editPopup');
    popup.style.display = 'none';
}
 
// Add event listeners to all Edit buttons
var editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Get the student number from the button's student-number attribute
        var studentNumber = parseInt(button.getAttribute('student-number'));
        showEditPopup(studentNumber);
    });
});
 
// Add event listener to the Update button in the edit popup
var updateButton = document.getElementById('updateButton');
updateButton.addEventListener('click', function () {
    // Close the edit popup
    hideEditPopup();
    // Display a success message
    alert('Student data updated successfully');
});
 
// Add event listener to the Cancel button in the edit popup
var cancelButton = document.getElementById('cancelButton');
cancelButton.addEventListener('click', function () {
    // Close the edit popup
    hideEditPopup();
});
 
// Call to add event listeners on initial load
addEventListeners();
 