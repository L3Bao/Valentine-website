// scripts.js

function redirectToPlanning() {
    window.location.href = 'planning.html';
}

function moveNoButton() {
    const noButton = document.querySelector('.no-button');
    const newPosition = getRandomPosition();
    noButton.style.position = 'absolute';
    noButton.style.left = newPosition.x + 'px';
    noButton.style.top = newPosition.y + 'px';
    makeYesButtonBigger();
}

function makeYesButtonBigger() {
    const yesButton = document.querySelector('.yes-button');
    yesButton.classList.add('bigger');
}

function getRandomPosition() {
    const offset = 50; // Offset to ensure button does not go beyond window edges
    const randomX = Math.floor(Math.random() * (window.innerWidth - offset));
    const randomY = Math.floor(Math.random() * (window.innerHeight - offset));
    return { x: randomX, y: randomY };
}

//           <-- planning.html -->

function submitPlan() {
    // Get selected date from the text field
    var selectedDate = document.getElementById('date-input').value.trim();

    // Get selected dinner option
    var selectedDinner = document.querySelector('input[name="dinner"]:checked');
    var dinnerValue = selectedDinner ? selectedDinner.value : "";

    // Get selected activity option
    var selectedActivity = document.querySelector('input[name="activity"]:checked');
    var activityValue = selectedActivity ? selectedActivity.value : "";

    // Get other dinner option if provided
    var otherDinner = document.getElementById('other-input').value.trim();

    // Get other activity option if provided
    var otherActivity = document.getElementById('other-input').value.trim();

    // Store selected options in an array
    var selectedOptions = [];
    
    // Add date option if provided
    if (selectedDate !== "") {
        selectedOptions.push("Date: " + selectedDate);
    }

    // Add dinner option if provided
    if (dinnerValue !== "") {
        selectedOptions.push("Dinner: " + dinnerValue);
    } else if (otherDinner !== "") {
        selectedOptions.push("Dinner: " + otherDinner);
    }

    // Add activity option if provided
    if (activityValue !== "") {
        selectedOptions.push("Activity: " + activityValue);
    } else if (otherActivity !== "") {
        selectedOptions.push("Activity: " + otherActivity);
    }

    // Store selected options in local storage
    localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));

    // Redirect to result page
    window.location.href = 'result.html';
}


//           <-- result.html -->

// Retrieve selected options from local storage
var selectedOptions = JSON.parse(localStorage.getItem('selectedOptions'));

// Display selected options in the "plan-summary" section
var planSummary = document.querySelector('.plan-summary');
if (selectedOptions.length > 0) {
    var pDate = document.createElement('p');
    pDate.textContent = selectedOptions[0];
    planSummary.appendChild(pDate);
    
    var pDinner = document.createElement('p');
    pDinner.textContent = selectedOptions[1];
    planSummary.appendChild(pDinner);

    var pActivity = document.createElement('p');
    pActivity.textContent = selectedOptions[2];
    planSummary.appendChild(pActivity);
} else {
    var p = document.createElement('p');
    p.textContent = "Chưa có chọn gì hết á 😢, quay lại chọn ii!!";
    planSummary.appendChild(p);
}

// Clear local storage after retrieving selected options
localStorage.removeItem('selectedOptions');
