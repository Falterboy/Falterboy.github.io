const calendarGrid = document.getElementById("calendarGrid");
const currentMonthYear = document.getElementById("currentMonthYear");

const prevBtn = document.getElementById("prevMonth");
const nextBtn = document.getElementById("nextMonth");

/* START ON CURRENT DATE */
let currentDate = new Date();

/* SHOWS DATA */
const shows = {
  "2025-04-12": "The Orpheum - Tampa",
  "2025-04-18": "Crowbar - Ybor",
  "2025-05-02": "The Nest - St Pete"
};

function renderCalendar() {

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  currentMonthYear.textContent =
    currentDate.toLocaleString("default", { month: "long", year: "numeric" });

  /* clear old dates */
  calendarGrid.querySelectorAll(".date").forEach(el => el.remove());

  /* blank cells before first day */
  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement("div");
    calendarGrid.appendChild(blank);
  }

  /* actual dates */
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

/* BUTTONS */

prevBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
