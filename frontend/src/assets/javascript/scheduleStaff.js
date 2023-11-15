const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, nên cộng thêm 1
var year = currentDate.getFullYear();
// Định dạng lại chuỗi ngày thành "YYYY/MM/DD"
var formattedDate =
  year +
  "/" +
  (month < 10 ? "0" : "") +
  month +
  "/" +
  (day < 10 ? "0" : "") +
  day;

// format ngày theo dạng yyyy/mm/dd
function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  return `${year}/${month}/${day}`;
}

var firstDayOfWeek = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 1
);

var formattedFirstDayOfWeek = getFormattedDate(firstDayOfWeek);

function getNextDay(firstDayOfWeek, i) {
  var nextDay = new Date(firstDayOfWeek);
  nextDay.setDate(firstDayOfWeek.getDate() + i);
  var formatDay = getFormattedDate(nextDay);
  return formatDay;
}

var lastDayOfWeek = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + (7 - currentDate.getDay())
);
var formattedLastDayOfWeek = getFormattedDate(lastDayOfWeek);

const uid = userObject.uid;
const api = `http://localhost:8081/api/v1/staff/info?Uid=${uid}`;
const apiShift = `http://localhost:8081/api/v1/staff/getAllSchedule`;

let data = [];
function start() {
  setTimeout(() => {
    // getStaff(function (fetchedData) {
    //   data = fetchedData;
    //   renderStaff(data);
    // });
    getShiftOfWeek(firstDayOfWeek, lastDayOfWeek);
  }, 500);
}
start();
// async function getStaff(callback) {
//   try {
//     const response = await fetch(api, {
//       method: "GET",
//       mode: "cors",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const responseData = await response.json();

//     // Kiểm tra xem responseData có phải là một mảng hay không
//     if (Array.isArray(responseData.data)) {
//       const data = responseData.data;
//       console.log("Data from API:", data);
//       callback(data);
//     } else if (typeof responseData.data === "object") {
//       // Nếu responseData.data là một đối tượng, chuyển thành mảng gồm một phần tử
//       const data = [responseData.data];
//       console.log("Data from API:", data);
//       callback(data);
//     } else {
//       console.error("Invalid data format from API");
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// function renderStaff(users) {
//   const info = document.querySelector("#username");
//   var htmls = users.map(function (user) {
//     const returnHTML = `
//     ${user.fullName}
//           `;
//     return returnHTML;
//   });
//   info.innerHTML = htmls.join("");
// }

const getAllShiftTypeApi = "http://localhost:8081/api/v1/staff/allShiftType";

async function fetchData(url) {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
}

//Gọi 2 api
async function getShiftOfWeek(startDate, endDate) {
  const apiShift1 = `${apiShift}?start=${getFormattedDate(
    startDate
  )}&end=${getFormattedDate(endDate)}`;
  const apiShift2 = getAllShiftTypeApi;

  const [shiftData1, shiftData2] = await Promise.all([
    fetchData(apiShift1),
    fetchData(apiShift2),
  ]);

  const schedule = shiftData1.data;
  const dataShift = shiftData2.data;
  console.log("Shift Data 1:", schedule);
  console.log("Shift Data 2:", dataShift);
  let counter = 1;
  let numberOfKeys = 0;
  let headerRowHTML = "<tr>";
  headerRowHTML += `<th></th>`;
  dataShift.forEach((shiftInfo) => {
    headerRowHTML += `<th>${shiftInfo.name} <br>
    (${shiftInfo.start} - ${shiftInfo.end})</th>`;
  });
  headerRowHTML += "</tr>";
  document.querySelector(".shiftType").innerHTML = headerRowHTML;
  const keys = Object.keys(dataShift);
  numberOfKeys = keys.length;
  console.log("keys", keys);

  let bodyRowsHTML = "";
  const daysOfWeek = [
    { thu: "Thứ 2", day: getNextDay(startDate, 0) },
    { thu: "Thứ 3", day: getNextDay(startDate, 1) },
    { thu: "Thứ 4", day: getNextDay(startDate, 2) },
    { thu: "Thứ 5", day: getNextDay(startDate, 3) },
    { thu: "Thứ 6", day: getNextDay(startDate, 4) },
    { thu: "Thứ 7", day: getNextDay(startDate, 5) },
    { thu: "Chủ nhật", day: getNextDay(startDate, 6) },
  ];
  daysOfWeek.forEach((day) => {
    let rowHTML = `<tr><th>${day.thu}
          <br>
          <small class="fw-light fst-italic">Ngày ${day.day}</small> </th>`;
    dataShift.forEach((shiftInfo) => {
      rowHTML += `<td class= "cell_${counter}"></td>`;
      counter++;
    });
    rowHTML += "</tr>";
    bodyRowsHTML += rowHTML;
  });
  document.querySelector(".nameStaff").innerHTML = bodyRowsHTML;

  const shiftData3 = {};
  {
    schedule
      ? schedule.forEach((item) => {
          let date = item.shift.date.date;
          let formattedShiftDate = date.replace(/-/g, "/");

          let shiftType = item.shift.shiftType.id;
          let fullName = item.staff.fullName;
          let userId = item.staff.uid;
          if (shiftType > 3) {
            //Nếu mà thêm ca thứ tư ca đêm mà id tạo ra id ca nó ngẫu nhiên id nó lớn hơn 3 và khác 4 thì set về 4
            shiftType = 4;
          }
          if (!shiftData3[date]) {
            shiftData3[date] = {};
          }

          if (!shiftData3[date][shiftType]) {
            shiftData3[date][shiftType] = [];
          }

          shiftData3[date][shiftType].push({ fullName, userId });
          console.log("numberOfKeys", numberOfKeys);
          console.log("shiftData3", shiftData3);
          for (let Type = 1; Type <= numberOfKeys; Type++) {
            if (shiftData3[date] && shiftData3[date][Type]) {
              for (let i = 0; i <= 6; i++) {
                if (formattedShiftDate === getNextDay(startDate, i)) {
                  let m = i + 1;
                  const names = shiftData3[date][Type];
                  const cellSelector = `.cell_${Type + (m - 1) * numberOfKeys}`;
                  document.querySelector(cellSelector).innerHTML = names
                    .map(
                      (name) =>
                        `<span
                  ${
                    name.userId == uid
                      ? ' class="badge bg-primary text-white d-flex align-items-center justify-content-center h-100" style="padding: 10px;font-size: 16px;margin-bottom: -20px"'
                      : ""
                  }
                  >${name.fullName}</span> <br>`
                    )
                    .join("");
                }
              }
            }
          }
        })
      : "";
  }
}

// Lưu trữ ngày đầu tiên của tuần hiện tại
let currentWeekStart = new Date();
currentWeekStart.setDate(
  currentWeekStart.getDate() - currentWeekStart.getDay() + 1
);

// Hàm để lấy ngày đầu và cuối của tuần dựa trên ngày cho trước
function getWeekDates(startDate) {
  const firstDayOfWeek = new Date(startDate);
  const lastDayOfWeek = new Date(startDate);
  lastDayOfWeek.setDate(startDate.getDate() + 6);

  return {
    firstDay: firstDayOfWeek,
    lastDay: lastDayOfWeek,
  };
}

// Hiển thị tuần hiện tại
async function displayCurrentWeek() {
  const weekDates = getWeekDates(currentWeekStart);
  document.getElementById(
    "weekDates"
  ).innerHTML = `Ngày đầu tuần: ${getFormattedDate(
    weekDates.firstDay
  )} - Ngày cuối tuần: ${getFormattedDate(weekDates.lastDay)}`;
  await getShiftOfWeek(weekDates.firstDay, weekDates.lastDay);
}

// Hiển thị tuần hiện tại khi trang được tải
displayCurrentWeek();

// Sự kiện khi click nút "Lùi"
document.getElementById("backBtn").addEventListener("click", function () {
  currentWeekStart.setDate(currentWeekStart.getDate() - 7);
  displayCurrentWeek();
});

// Sự kiện khi click nút "Tiến"
document.getElementById("forwardBtn").addEventListener("click", function () {
  currentWeekStart.setDate(currentWeekStart.getDate() + 7);
  displayCurrentWeek();
});
