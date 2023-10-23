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

var firstDayOfWeek = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 1
);

var formattedFirstDayOfWeek =
  firstDayOfWeek.getFullYear() +
  "/" +
  ("0" + (firstDayOfWeek.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + firstDayOfWeek.getDate()).slice(-2);

var lastDayOfWeek = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + (7 - currentDate.getDay())
);
var formattedLastDayOfWeek =
  lastDayOfWeek.getFullYear() +
  "/" +
  ("0" + (lastDayOfWeek.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + lastDayOfWeek.getDate()).slice(-2);

var Tuesday = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 2
);

var formattedTuesdayOfWeek =
  Tuesday.getFullYear() +
  "/" +
  ("0" + (Tuesday.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + Tuesday.getDate()).slice(-2);

var Wednesday = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 3
);

var formattedWednesdayOfWeek =
  Wednesday.getFullYear() +
  "/" +
  ("0" + (Wednesday.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + Wednesday.getDate()).slice(-2);

var Thursday = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 4
);

var formattedThursdayOfWeek =
  Thursday.getFullYear() +
  "/" +
  ("0" + (Thursday.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + Thursday.getDate()).slice(-2);

var Friday = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 5
);

var formattedFridayOfWeek =
  Friday.getFullYear() +
  "/" +
  ("0" + (Friday.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + Friday.getDate()).slice(-2);

var Saturday = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 6
);

var formattedSaturdayOfWeek =
  Saturday.getFullYear() +
  "/" +
  ("0" + (Saturday.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + Saturday.getDate()).slice(-2);

document.getElementById("firstDay").textContent = formattedFirstDayOfWeek;
document.getElementById("lastDay").textContent = formattedLastDayOfWeek;

const uid = userObject.uid;
const api = `http://localhost:8081/api/v1/staff/info?Uid=${uid}`;
const apiShift = `http://localhost:8081/api/v1/staff/getAllSchedule`;

let data = [];
function start() {
  setTimeout(() => {
    getStaff(function (fetchedData) {
      data = fetchedData;
      renderStaff(data);
    });
    getShiftOfWeek(formattedFirstDayOfWeek, formattedLastDayOfWeek, uid);
  }, 500);
}
start();
async function getStaff(callback) {
  try {
    const response = await fetch(api, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    // Kiểm tra xem responseData có phải là một mảng hay không
    if (Array.isArray(responseData.data)) {
      const data = responseData.data;
      console.log("Data from API:", data);
      callback(data);
    } else if (typeof responseData.data === "object") {
      // Nếu responseData.data là một đối tượng, chuyển thành mảng gồm một phần tử
      const data = [responseData.data];
      console.log("Data from API:", data);
      callback(data);
    } else {
      console.error("Invalid data format from API");
    }
  } catch (error) {
    console.error(error);
  }
}

function renderFullName(cell) {
  document.querySelector(cell).innerHTML = names
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

function renderStaff(users) {
  const info = document.querySelector("#username");
  var htmls = users.map(function (user) {
    const returnHTML = `
    ${user.fullName}
          `;
    return returnHTML;
  });
  info.innerHTML = htmls.join("");
}

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
async function getShiftOfWeek(startDate, endDate, userId) {
  const apiShift1 = `${apiShift}?start=${startDate}&end=${endDate}`;
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

  let bodyRowsHTML = "";
  const daysOfWeek = [
    { thu: "Thứ 2", day: formattedFirstDayOfWeek },
    { thu: "Thứ 3", day: formattedTuesdayOfWeek },
    { thu: "Thứ 4", day: formattedWednesdayOfWeek },
    { thu: "Thứ 5", day: formattedThursdayOfWeek },
    { thu: "Thứ 6", day: formattedFridayOfWeek },
    { thu: "Thứ 7", day: formattedSaturdayOfWeek },
    { thu: "Chủ nhật", day: formattedLastDayOfWeek },
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
  schedule.forEach((item) => {
    let date = item.shift.date.date;
    let formattedShiftDate = date.replace(/-/g, "/");

    let shiftType = item.shift.shiftType.id;
    let fullName = item.staff.fullName;
    let userId = item.staff.uid;

    if (!shiftData3[date]) {
      shiftData3[date] = {};
    }

    if (!shiftData3[date][shiftType]) {
      shiftData3[date][shiftType] = [];
    }

    shiftData3[date][shiftType].push({ fullName, userId });

    for (let Type = 1; Type <= numberOfKeys; Type++) {
      if (shiftData3[date] && shiftData3[date][Type]) {
        if (formattedShiftDate === formattedFirstDayOfWeek) {
          let m = 1;
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

        if (formattedShiftDate === formattedTuesdayOfWeek) {
          let m = 2;
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
        if (formattedShiftDate === formattedWednesdayOfWeek) {
          let m = 3;
          const names = shiftData3[date][Type];
          console.log("names1 ", names);
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
        if (formattedShiftDate === formattedThursdayOfWeek) {
          let m = 4;
          const names = shiftData3[date][Type];
          console.log("names1 ", names);
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
        if (formattedShiftDate === formattedFridayOfWeek) {
          let m = 5;
          const names = shiftData3[date][Type];
          console.log("names1 ", names);
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
        if (formattedShiftDate === formattedSaturdayOfWeek) {
          let m = 6;
          const names = shiftData3[date][Type];
          console.log("names1 ", names);

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
        if (formattedShiftDate === formattedLastDayOfWeek) {
          let m = 7;
          const names = shiftData3[date][Type];
          console.log("names1 ", names);
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
  });
}
