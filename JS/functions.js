function displayTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
    var day = currentTime.getDate();
    var month = currentTime.getMonth() + 1;
    var year = currentTime.getFullYear();
  
    // Add leading zeros to minutes and seconds if they are less than 10
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    // Format the time string
    var timeString =
      day + "." + month + "." + year + " | " + hours + ":" + minutes + ":" + seconds;
  
    // Update the clock element
    document.getElementById("clock").innerHTML = timeString;
  }
  
  // Call the displayTime function every second
  setInterval(displayTime, 1000);

  