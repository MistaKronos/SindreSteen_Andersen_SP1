// Digital clock
function digitalClock() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let seconds = currentTime.getSeconds();
  let day = currentTime.getDate();
  let month = currentTime.getMonth() + 1;
  let year = currentTime.getFullYear();

  // Add leading zeros to minutes and seconds if they are less than 10
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Format the time string
  let timeString =
    day +
    "." +
    month +
    "." +
    year +
    " / " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  // Update the clock element
  document.getElementById("clock").innerHTML = timeString;
}

// Call the digitalClock function every second
setInterval(digitalClock, 1000);

// Define the Employee class
class Employee {
  constructor(name, surname) {
    this.name = name;
    this.surname = surname;
  }
}

// Define the StaffMember class
class StaffMember extends Employee {
  constructor(
    name,
    surname,
    picture,
    email,
    status,
    outTime,
    duration,
    expectedReturnTime
  ) {
    super(name, surname);
    this.picture = picture;
    this.email = email;
    this.status = status;
    this.outTime = outTime;
    this.duration = duration;
    this.expectedReturnTime = expectedReturnTime;
  }
}

// Define the DeliveryDriver class
class DeliveryDriver extends Employee {
  constructor(name, surname, vehicle, phone, deliveryAddress, returnTime) {
    super(name, surname);
    this.vehicle = vehicle;
    this.phone = phone;
    this.deliveryAddress = deliveryAddress;
    this.returnTime = returnTime;
  }
}

// Define an array to hold the staff members
const staffMembers = [];

// Get the table element from the DOM
const table = document.getElementById("staff-table");
const tbody = document.getElementById("staff-tbody");

function staffUserGet() {
  // Make a GET request to the randomuser API to get the data for 5 staff members
  fetch("https://randomuser.me/api/?results=5")
    .then((response) => response.json())
    .then((data) => {
      // Loop over the results and create new StaffMember objects from the data
      data.results.forEach((staff) => {
        const newStaffMember = new StaffMember(
          staff.name.first,
          staff.name.last,
          staff.picture.thumbnail,
          staff.email,
          "In",
          "-",
          "-",
          "-",
          "-"
        );
        staffMembers.push(newStaffMember);
      });

      // Loop over the staff members and populate the table cells with their data
      staffMembers.forEach((staff, i) => {
        const row = tbody.insertRow(i);
        const nameCell = row.insertCell(0);
        const surnameCell = row.insertCell(1);
        const pictureCell = row.insertCell(2);
        const emailCell = row.insertCell(3);
        const statusCell = row.insertCell(4);
        const outTimeCell = row.insertCell(5);
        const durationCell = row.insertCell(6);
        const expectedReturnTimeCell = row.insertCell(7);

        nameCell.innerHTML = staff.name;
        surnameCell.innerHTML = staff.surname;
        pictureCell.innerHTML = `<img src="${staff.picture}">`;
        emailCell.innerHTML = staff.email;
        statusCell.innerHTML = staff.status;
        outTimeCell.innerHTML = staff.outTime;
        durationCell.innerHTML = staff.duration;
        expectedReturnTimeCell.innerHTML = staff.expectedReturnTime;
      });
    });
}

// Call the function so the page is populated with staff members
$(document).ready(function () {
  staffUserGet();
});


const outBtn = document.getElementById("outBtn");
const inBtn = document.getElementById("inBtn");

table.addEventListener("click", (e) => {
  if (e.target.tagName === "TD") {
    e.target.parentElement.classList.toggle("selectedStaff");
  }
});

function staffOut() {
  const selectedRow = document.querySelector(".selectedStaff");

  if (selectedRow) {
    const duration = parseInt(
      prompt("Enter the length of absence in minutes:")
    );

    if (!isNaN(duration) && duration >= 0 && duration <= 2880) {
      const currentTime = new Date();
      const returnTime = new Date(currentTime.getTime() + duration * 60000);

      const staffIndex = selectedRow.rowIndex - 1;
      const staffMember = staffMembers[staffIndex];

      if (staffMember.status === "Out") {
        // Clear the shown toast for the staff member
        delete shownToasts[staffMember.email];
      }

      staffMember.status = "Out";
      staffMember.outTime = currentTime.toLocaleTimeString();
      staffMember.duration =
        duration >= 60
          ? `${Math.floor(duration / 60)}h ${duration % 60}m`
          : `${duration}m`;
      staffMember.expectedReturnTime = formatTime(returnTime);
      staffMember.expectedReturnTimeObject = returnTime;

      updateTable();
    } else {
      alert(
        "Please enter a valid number between 0 and 2880 (48h) for the duration."
      );
    }
  }
}

// Function to format a Date object into a "HH:MM:SS" string
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Add leading zeros to hours, minutes and seconds if they are less than 10
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Format the time string
  return hours + ":" + minutes + ":" + seconds;
}

function staffIn() {
  const selectedRow = document.querySelector(".selectedStaff");

  if (selectedRow) {
    const staffIndex = selectedRow.rowIndex - 1;
    const staffMember = staffMembers[staffIndex];

    staffMember.status = "In";
    staffMember.outTime = "-";
    staffMember.duration = "-";
    staffMember.expectedReturnTime = "-";

    updateTable();
  }
}

outBtn.addEventListener("click", staffOut);
inBtn.addEventListener("click", staffIn);

function updateTable() {
  staffMembers.forEach((staff, i) => {
    const row = tbody.rows[i];
    const nameCell = row.cells[0];
    const surnameCell = row.cells[1];
    const pictureCell = row.cells[2];
    const emailCell = row.cells[3];
    const statusCell = row.cells[4];
    const outTimeCell = row.cells[5];
    const durationCell = row.cells[6];
    const expectedReturnTimeCell = row.cells[7];

    nameCell.innerHTML = staff.name;
    surnameCell.innerHTML = staff.surname;
    pictureCell.innerHTML = `<img src="${staff.picture}">`;
    emailCell.innerHTML = staff.email;
    statusCell.innerHTML = staff.status;
    outTimeCell.innerHTML = staff.outTime;
    durationCell.innerHTML = staff.duration;
    expectedReturnTimeCell.innerHTML = staff.expectedReturnTime;
  });
}

// Define an array to hold the delivery drivers
const deliveryDrivers = [];

// Get the table element from the DOM
const deliveryTable = document.getElementById("deliveryTable");
const deliveryTableBody = deliveryTable.querySelector("tbody");

// Get the form elements from the DOM
const deliveryForm = document.getElementById("deliveryForm");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const returnTimeInput = document.getElementById("returnTime");

// Validate form values
function validateDelivery(name, surname, phone) {
  const nameSurnameValidation = /^[a-zA-Z\s]*$/;
  const phoneValidation = /^\+?[0-9]*$/;

  if (!nameSurnameValidation.test(name)) {
    alert(
      "Invalid name. Please enter a name that only contains letters and spaces."
    );
    return false;
  }

  if (!nameSurnameValidation.test(surname)) {
    alert(
      "Invalid surname. Please enter a surname that only contains letters and spaces."
    );
    return false;
  }

  if (!phoneValidation.test(phone) || phone.length < 7) {
    alert(
      'Invalid phone number. Please enter a phone number that only contains digits or/and optionally a "+". It should be at least 8 digits long.'
    );
    return false;
  }

  return true;
}

deliveryForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form submission

  // Get the form values
  const vehicle = document.querySelector('input[name="vehicle"]:checked').value;
  const name = nameInput.value;
  const surname = surnameInput.value;
  const phone = phoneInput.value;
  const address = addressInput.value;
  const returnTime = returnTimeInput.value;

  if (validateDelivery(name, surname, phone)) {
    // Create a new DeliveryDriver object
    const newDeliveryDriver = new DeliveryDriver(
      name,
      surname,
      vehicle,
      phone,
      address,
      returnTime
    );

    // Add the new delivery driver to the array
    deliveryDrivers.push(newDeliveryDriver);

    // Reset the form
    deliveryForm.reset();

    // Update the delivery table
    updateDeliveryTable();
  }
});

function updateDeliveryTable() {
  // Clear the delivery table
  deliveryTableBody.innerHTML = "";

  // Loop over the delivery drivers and populate the table rows
  deliveryDrivers.forEach((driver, index) => {
    const row = document.createElement("tr");

    const vehicleCell = document.createElement("td");
    if (driver.vehicle === "Motorcycle") {
      vehicleCell.innerHTML = '<i class="bi bi-bicycle"></i>';
    } else if (driver.vehicle === "Car") {
      vehicleCell.innerHTML = '<i class="bi bi-truck"></i>';
    }
    row.appendChild(vehicleCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = driver.name;
    row.appendChild(nameCell);

    const surnameCell = document.createElement("td");
    surnameCell.textContent = driver.surname;
    row.appendChild(surnameCell);

    const phoneCell = document.createElement("td");
    phoneCell.textContent = driver.phone;
    row.appendChild(phoneCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = driver.deliveryAddress;
    row.appendChild(addressCell);

    const returnTimeCell = document.createElement("td");
    returnTimeCell.textContent = driver.returnTime;
    row.appendChild(returnTimeCell);

    // Add click event listener to select the row
    row.addEventListener("click", () => {
      row.classList.toggle("selectedDriver");
    });

    deliveryTableBody.appendChild(row);
  });
}

// Clear button event listener
const clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener("click", () => {
  const selectedRow = deliveryTableBody.querySelector(".selectedDriver");

  if (selectedRow) {
    // Show confirmation prompt before removing the row
    const confirmation = confirm(
      "Are you sure you want to remove this delivery?"
    );

    if (confirmation) {
      // Get the index of the selected row
      const rowIndex = selectedRow.rowIndex - 1;

      // Remove the delivery driver from the array
      deliveryDrivers.splice(rowIndex, 1);

      // Update the delivery table
      updateDeliveryTable();
    }
  }
});

// Staff Toast

// Define an object to track the shown and dismissed toasts for staff members and their last clock in time
const shownToasts = {};
const dismissedToasts = {}; // Object to track dismissed toasts

// Function to show the staff member is late toast
function showStaffIsLateToast(staff) {
  // Check if the toast has already been shown or dismissed for the staff member and that the staff member hasn't clocked in since
  if (
    (shownToasts[staff.email] &&
      shownToasts[staff.email] > staff.lastClockInTime) ||
    (dismissedToasts[staff.email] &&
      dismissedToasts[staff.email] > staff.lastClockInTime)
  ) {
    return;
  }

  // Update the toast content with the late staff member's information
  const toastElement = document.getElementById("staffIsLate");
  const staffToastImage = toastElement.querySelector("#staffToastImage");
  const staffToastName = toastElement.querySelector("#staffToastName");
  const staffToastSurname = toastElement.querySelector("#staffToastSurname");
  const staffToastDuration = toastElement.querySelector("#staffToastDuration");

  staffToastImage.src = staff.picture;
  staffToastName.textContent = staff.name;
  staffToastSurname.textContent = staff.surname;
  staffToastDuration.textContent = `Has been out of office for: ${staff.duration}`;

  // Set the staffEmail to be used later by the Clock In button
  toastElement.dataset.staffEmail = staff.email;

  // Show the toast
  const toast = new bootstrap.Toast(toastElement);
  toast.show();

  // Mark the toast as shown for the staff member with the current time
  shownToasts[staff.email] = new Date();
}

function handleClockIn(staffEmail) {
  const staffMember = staffMembers.find((staff) => staff.email === staffEmail);

  if (staffMember) {
    staffMember.status = "In";
    staffMember.outTime = "-";
    staffMember.duration = "-";
    staffMember.expectedReturnTime = "-";
    staffMember.lastClockInTime = new Date();
    updateTable();
    delete shownToasts[staffEmail]; // Remove the toast from shownToasts object when staff member clocks in
    delete dismissedToasts[staffEmail]; // After updating the clock in time, delete the entry from the dismissedToasts
  }
}

// Function to check if any staff member is late
function staffMemberIsLate() {
  const currentTime = new Date();

  staffMembers.forEach((staff) => {
    if (
      staff.status === "Out" &&
      staff.expectedReturnTimeObject < currentTime
    ) {
      showStaffIsLateToast(staff);
    }
  });
}

// Start the interval to call staffMemberIsLate every 30 seconds
const staffIsLateInterval = setInterval(staffMemberIsLate, 30000);

// Get the toast element
const toastElement = document.getElementById("staffIsLate");

// Create a new toast instance
const staffToastInstance = new bootstrap.Toast(toastElement);

// Get the staff toast buttons
const staffDismissBtn = document.getElementById("staffDismissBtn");
const staffClockInBtn = document.getElementById("staffClockInBtn");

// Hide event listener to mark the toast as dismissed when the toast is hidden
toastElement.addEventListener("hidden.bs.toast", function () {
  const staffEmail = toastElement.dataset.staffEmail;
  dismissedToasts[staffEmail] = new Date();
});

// Staff dismiss button event listener
staffDismissBtn.addEventListener("click", (e) => {
  e.preventDefault();
  staffToastInstance.hide(); // Hide the toast
});

// Staff clock-in button event listener
staffClockInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const staffEmail = toastElement.dataset.staffEmail;
  handleClockIn(staffEmail);
  staffToastInstance.hide(); // Hide the toast
});

// Driver Toast

const shownDriverToasts = {};
const dismissedDriverToasts = {};

// Get the toast element
const driverToastElement = document.getElementById("driverIsLate");

// Create a new toast instance
const driverToastInstance = new bootstrap.Toast(driverToastElement);

function showDriverIsLateToast(driver) {
  // Check if the toast has already been shown or dismissed for the driver
  if (
    (shownDriverToasts[driver.phone] &&
      shownDriverToasts[driver.phone] > new Date(driver.returnTime)) ||
    (dismissedDriverToasts[driver.phone] &&
      dismissedDriverToasts[driver.phone] > new Date(driver.returnTime))
  ) {
    return;
  }

  // Update the toast content with the late driver's information
  const driverToastName = driverToastElement.querySelector("#driverToastName");
  const driverToastSurname = driverToastElement.querySelector(
    "#driverToastSurname"
  );
  const driverToastPhone =
    driverToastElement.querySelector("#driverToastPhone");
  const driverToastAddress = driverToastElement.querySelector(
    "#driverToastAddress"
  );
  const driverToastReturnTime = driverToastElement.querySelector(
    "#driverToastReturnTime"
  );

  driverToastName.textContent = driver.name;
  driverToastSurname.textContent = driver.surname;
  driverToastPhone.textContent = driver.phone;
  driverToastAddress.textContent = driver.deliveryAddress;
  driverToastReturnTime.textContent = driver.returnTime;

  // Show the toast
  driverToastInstance.show();

  // Mark the toast for the driver with the current time
  shownDriverToasts[driver.phone] = new Date();
}

function driverIsLate() {
  const currentTime = new Date();

  deliveryDrivers.forEach((driver) => {
    const returnTimeParts = driver.returnTime.split(":");
    const returnTimeDate = new Date();
    returnTimeDate.setHours(returnTimeParts[0]);
    returnTimeDate.setMinutes(returnTimeParts[1]);

    // Check if the driver's return time is less than the current time
    if (returnTimeDate < currentTime) {
      showDriverIsLateToast(driver);
    }
  });
}

// Start the interval to call driverIsLate every 30 seconds
const driverIsLateInterval = setInterval(driverIsLate, 30000); // 30000 ms

// Driver dismiss button event listener
const driverDismissBtn = driverToastElement.querySelector("#driverDismissBtn");
driverDismissBtn.addEventListener("click", () => {
  driverToastInstance.hide();
});

// Clear Row button event listener
const clearRowBtn = driverToastElement.querySelector("#clearRowBtn");
clearRowBtn.addEventListener("click", () => {
  const driverPhone =
    driverToastElement.querySelector("#driverToastPhone").textContent;

  // Show confirmation prompt before removing the row
  const confirmation = confirm(
    "Are you sure you want to remove this delivery driver?"
  );

  if (confirmation) {
    // Find the driver in the deliveryDrivers array and remove it
    const driverIndex = deliveryDrivers.findIndex(
      (driver) => driver.phone === driverPhone
    );
    if (driverIndex !== -1) {
      deliveryDrivers.splice(driverIndex, 1);
    }

    // Update the delivery table
    updateDeliveryTable();
  }

  // Hide the toast
  driverToastInstance.hide();
});
