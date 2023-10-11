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

console.log(formattedDate, formattedDate);
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

document.getElementById("firstDay").textContent = formattedFirstDayOfWeek;
document.getElementById("lastDay").textContent = formattedLastDayOfWeek;

// console.log("Ngày đầu tiên của tuần: " + formatFirstDayOfWeek);
// console.log("Ngày cuối cùng của tuần: " + formatLastDayOfWeek);
const uid = userObject.uid;
const api = `http://localhost:8081/api/v1/staff/info?Uid=${uid}`;
const apiShift = `http://localhost:8081/api/v1/staff/getAllSchedule`;

let data = [];
function start() {
  getStaff(function (fetchedData) {
    data = fetchedData;
    renderStaff(data);
  });
  getShiftOfWeek(formattedFirstDayOfWeek, formattedLastDayOfWeek, uid);
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

function renderStaff(users) {
  const info = document.querySelector("#username");
  var htmls = users.map(function (user) {
    const typeName = user.type ? user.type.name : "";
    const returnHTML = `
    ${user.userName}
          `;
    return returnHTML;
  });
  info.innerHTML = htmls.join("");
}

function getShiftOfWeek(startDate, endDate, userId) {
  fetch(`${apiShift}?start=${startDate}&end=${endDate}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === "OK") {
        const datas = res.data;
        console.log(datas);
        let shiftData = {};

        // Tổ chức dữ liệu theo ca làm việc
        datas.forEach((item) => {
          const shiftTypeId = item.shift.shiftType.id;
          const shiftTypeName = `${item.shift.shiftType.name} (${item.shift.shiftType.start} - ${item.shift.shiftType.end})`;

          if (!shiftData[shiftTypeId]) {
            shiftData[shiftTypeId] = {
              shiftTypeName: shiftTypeName,
              staffData: [
                {
                  fullName: item.staff.fullName,
                  uid: item.staff.uid,
                },
              ],
            };
          } else {
            shiftData[shiftTypeId].staffData.push({
              fullName: item.staff.fullName,
              uid: item.staff.uid,
            });
          }
        });

        // Tạo header cho bảng
        let headerRowHTML = "<tr>";
        headerRowHTML += `<th></th>`;
        Object.values(shiftData).forEach((shiftInfo) => {
          headerRowHTML += `<th>${shiftInfo.shiftTypeName}</th>`;
        });
        headerRowHTML += "</tr>";
        document.querySelector(".shiftType").innerHTML = headerRowHTML;

        // Tạo dữ liệu cho bảng
        let bodyRowsHTML = "";
        const daysOfWeek = [
          "Thứ 2",
          "Thứ 3",
          "Thứ 4",
          "Thứ 5",
          "Thứ 6",
          "Thứ 7",
          "Chủ Nhật",
        ];
        daysOfWeek.forEach((day, index) => {
          let rowHTML = `<tr><td>${day}</td>`;
          Object.values(shiftData).forEach((shiftInfo) => {
            const staffInfo = shiftInfo.staffData[index];
            const isCurrentUser = staffInfo && staffInfo.uid === userId;
            rowHTML += `<td><span ${
              isCurrentUser
                ? ' class="badge bg-primary text-white d-flex align-items-center justify-content-center h-100"'
                : ""
            } style="font-size: 16px; padding: 8px 0">${
              staffInfo ? staffInfo.fullName : ""
            }</span></td>`;
          });
          rowHTML += "</tr>";
          bodyRowsHTML += rowHTML;
        });
        document.querySelector(".nameStaff").innerHTML = bodyRowsHTML;
      }
    });
}
