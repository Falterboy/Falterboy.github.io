
const calendarGrid = document.getElementById("calendarGrid");
const currentMonthYear = document.getElementById("currentMonthYear");
const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

let currentDate = new Date();
let shows = {}; // Will be loaded from JSON

// Fetch the JSON file
fetch('shows.json')
  .then(response => response.json())
  .then(data => {
    shows = data;        // assign fetched data to the shows object
    renderCalendar();    // render calendar once the data is loaded
  })
  .catch(err => console.error("Error loading show data:", err));

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  currentMonthYear.textContent =
    currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  // Clear old dates
  calendarGrid.querySelectorAll(".date").forEach(el => el.remove());

  // Blank cells before first day
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);
  }

  // Actual dates
  for (let day = 1; day <= daysInMonth; day++) {
    const dateCell = document.createElement("div");
    dateCell.classList.add("date");
    dateCell.textContent = day;

    const dateKey =
      year + "-" +
      String(month + 1).padStart(2, "0") + "-" +
      String(day).padStart(2, "0");

    if (shows[dateKey]) {
      dateCell.classList.add("show-date");
      dateCell.setAttribute("data-show", shows[dateKey]);
    }

    calendarGrid.appendChild(dateCell);
  }
}

// Prev / Next Month
prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});
