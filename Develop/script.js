$(document).ready(function() {
  // Using Day JS this will get the current time and day
  const currentDay = dayjs();
  const currentHour = currentDay.hour();
  const now = dayjs();
  const formattedTime = now.format('h:mm A');

  // Update the text content of the element with the current time
document.getElementById('current-time').textContent = formattedTime;


  // This goes through each hour of the day from 9 am to 5 pm
  for (let i = 9; i <= 17; i++) {
    // Create a new time-block div for this hour
    const timeBlock = $('<div>').addClass('row time-block');

    // This enables it to know if it is past present or future
    if (i < currentHour) {
      timeBlock.addClass('past');
    } else if (i === currentHour) {
      timeBlock.addClass('present');
    } else {
      timeBlock.addClass('future');
    }

    // Create the hour column
    const hourColumn = $('<div>').addClass('col-2 col-md-1 hour text-center py-3');
    if (i < 12) {
      hourColumn.text(i + 'AM');
    } else if (i === 12) {
      hourColumn.text('12PM');
    } else {
      hourColumn.text(i - 12 + 'PM');
    }

    // Create the description textarea
    const description = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', 3);

   // Create the save button
const saveButton = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
const saveIcon = $('<i>').addClass('fas fa-save').attr('aria-hidden', true);
saveButton.append(saveIcon);

// Add a click event listener to the save button
saveButton.on('click', function() {
  // Get the description text from the textarea for this time block
  const descriptionText = $(this).siblings('.description').val();

  // Save the description text to local storage using the id of the time block as the key
  const timeBlockId = $(this).parent().attr('id');
  localStorage.setItem(timeBlockId, descriptionText);

  // Show an alert box to indicate that the description has been saved
  alert('Description saved!');
});

    // Add the hour column, description, and save button to the time-block div
    timeBlock.append(hourColumn, description, saveButton);

    // Set the id of the time-block div to "hour-X" where X is the hour (in 24-hour format)
    timeBlock.attr('id', 'hour-' + i);

    // Add the time-block div to the container
    $('.container-fluid').append(timeBlock);
  }
});

