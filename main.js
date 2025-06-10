const calendarGrid = document.getElementById('calendarGrid');
      const currentMonthYearHeader = document.getElementById('currentMonthYear');
      const prevMonthBtn = document.getElementById('prevMonth');
      const nextMonthBtn = document.getElementById('nextMonth');

      // Set initial month to current month, but for demonstration of 2025 event, let's start with May 2025
      let currentMonth = 4; // May (0-indexed)
      let currentYear = 2025;

      // Example event data (you'll want to manage this dynamically, perhaps from an API or a separate data file)
      // Format: 'Month-Day-Year' (Month is 1-indexed for the key for easier human readability)
      const events = {
        '5-30-2025': 'Falterboy at Pinellas Ale Works, 6–9 PM',
        // Add more events here, e.g.:
        // '6-15-2025': 'Band Practice',
        // '7-4-2025': 'Independence Day Gig!'
      };

      function renderCalendar(month, year) {
        calendarGrid.innerHTML = `
          <div class="day">Sun</div>
          <div class="day">Mon</div>
          <div class="day">Tue</div>
          <div class="day">Wed</div>
          <div class="day">Thu</div>
          <div class="day">Fri</div>
          <div class="day">Sat</div>
        `; // Clear previous days and re-add day headers

        const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, etc.
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        currentMonthYearHeader.textContent = new Date(year, month).toLocaleString('en-US', { month: 'long', year: 'numeric' });

        // Create empty divs for the days before the 1st of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
          const dateDiv = document.createElement('div');
          dateDiv.classList.add('date'); // No 'other-month' class as it's empty
          calendarGrid.appendChild(dateDiv);
        }

        // Fill in days of the current month
        for (let day = 1; day <= daysInMonth; day++) {
          const dateDiv = document.createElement('div');
          dateDiv.classList.add('date', 'current-month');
          dateDiv.textContent = day;

          // Highlight today's date if it's in the currently displayed month
          const today = new Date();
          // Adjust for current time: Tuesday, June 10, 2025
          if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
             dateDiv.classList.add('today');
          }


          // Add event data if available
          const eventKey = `${month + 1}-${day}-${year}`; // Format: Month-Day-Year (1-indexed month for event key)
          if (events[eventKey]) {
            dateDiv.classList.add('show-date');
            dateDiv.setAttribute('data-show', events[eventKey]);
          }

          calendarGrid.appendChild(dateDiv);
        }

        // Fill in empty divs for the remaining cells to complete the last row
        // This calculates how many cells are needed to make the grid a multiple of 7
        const totalCellsFilled = firstDayOfMonth + daysInMonth;
        const remainingCells = (7 - (totalCellsFilled % 7)) % 7; // (7 - (remainder of division by 7)) % 7

        for (let i = 0; i < remainingCells; i++) {
          const dateDiv = document.createElement('div');
          dateDiv.classList.add('date'); // No 'other-month' class as it's empty
          calendarGrid.appendChild(dateDiv);
        }
      }

      function showNextMonth() {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
      }

      function showPrevMonth() {
        currentMonth--;
        if (currentMonth < 0) {
          currentMonth = 11;
          currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
      }

      // Event Listeners
      prevMonthBtn.addEventListener('click', showPrevMonth);
      nextMonthBtn.addEventListener('click', showNextMonth);

      // Initial render - Starting with May 2025 to show your event
      renderCalendar(currentMonth, currentYear);
