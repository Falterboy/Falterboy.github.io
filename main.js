
// ================= Calendar Script =================
const calendarGrid = document.getElementById("calendarGrid");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date(); // Start with current month/year
let shows = {};               // Will hold show data from JSON

// -------- Fetch shows from JSON --------
fetch('shows.json')
  .then(response => response.json())
  .then(data => {
    shows = data;
    renderCalendar(); // Only render after shows are loaded
  })
  .catch(err => console.error("Error loading show data:", err));

// -------- Render Calendar --------
function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Update header
  currentMonthYear.textContent =
    currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Remove all previous date cells (keep headers)
  calendarGrid.querySelectorAll(".date").forEach(el => el.remove());

  // Blank cells before 1st
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    blank.classList.add("date");
    calendarGrid.appendChild(blank);
  }

  // Actual dates
  for (let day = 1; day <= daysInMonth; day++) {
    const dateCell = document.createElement("div");
    dateCell.classList.add("date");
    dateCell.textContent = day;

    // Format date as YYYY-MM-DD for JSON lookup
    const dateKey =
      year + "-" +
      String(month + 1).padStart(2, "0") + "-" +
      String(day).padStart(2, "0");

    // Add show info if exists
    if (shows[dateKey]) {
      dateCell.classList.add("show-date");
      dateCell.setAttribute("data-show", shows[dateKey]);
    }

    // Highlight today
    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dateCell.classList.add("today");
    }

    calendarGrid.appendChild(dateCell);
  }

  // Fill remaining cells to complete last row
  const totalCells = firstDay + daysInMonth;
  const remaining = (7 - (totalCells % 7)) % 7;
  for (let i = 0; i < remaining; i++) {
    const blank = document.createElement("div");
    blank.classList.add("date");
    calendarGrid.appendChild(blank);
  }
}

// -------- Month Navigation --------
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});
