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

// var Monday = new Date(
//   currentDate.getFullYear(),
//   currentDate.getMonth(),
//   currentDate.getDate() - currentDate.getDay() + 1
// );

// var formattedMonDayOfWeek =
//   Monday.getFullYear() +
//   "-" +
//   ("0" + (Monday.getMonth() + 1)).slice(-2) +
//   "-" +
//   ("0" + Monday.getDate()).slice(-2);
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
console.log("Thứ 3", formattedTuesdayOfWeek);
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
console.log("THỨ 4", formattedWednesdayOfWeek);

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
console.log("Thứ 5", formattedThursdayOfWeek);

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
console.log("Thứ 6", formattedFridayOfWeek);

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
console.log("Thứ 7", formattedSaturdayOfWeek);

// var Sunday = new Date(
//   currentDate.getFullYear(),
//   currentDate.getMonth(),
//   currentDate.getDate() + (7 - currentDate.getDay())
// );
// var formattedSunDayOfWeek =
//   Sunday.getFullYear() +
//   "/" +
//   ("0" + (Sunday.getMonth() + 1)).slice(-2) +
//   "/" +
//   ("0" + Sunday.getDate()).slice(-2);

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
    ${user.fullName}
          `;
    return returnHTML;
  });
  info.innerHTML = htmls.join("");
}

// function getShiftOfWeek(startDate, endDate, userId) {
//   fetch(`${apiShift}?start=${startDate}&end=${endDate}`, {
//     method: "GET",
//     mode: "cors",
//     credentials: "include",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => res.json())
//     .then((res) => {
//       if (res.status === "OK") {
//         const datas = res.data;
//         console.log("datas", datas);
//         let shiftData = {};
//         let shiftData2 = {};
//         // Tổ chức dữ liệu theo ca làm việc
//         // datas.forEach((item) => {
//         //   const shiftTypeId = item.shift.shiftType.id;
//         //   const shiftTypeName = `${item.shift.shiftType.name} (${item.shift.shiftType.start} - ${item.shift.shiftType.end})`;
//         //   const shiftDate = item.shift.date.date;
//         //   const key = `${shiftDate}-${shiftTypeName}`;
//         //   if (!shiftData[shiftTypeId]) {
//         //     shiftData[shiftTypeId] = {
//         //       shiftDate: shiftDate,
//         //       shiftTypeName: shiftTypeName,
//         //       staffData: [
//         //         {
//         //           fullName: item.staff.fullName,
//         //           uid: item.staff.uid,
//         //           date: item.shift.date,
//         //         },
//         //       ],
//         //     };
//         //   } else {
//         //     shiftData[shiftTypeId].staffData.push({
//         //       fullName: item.staff.fullName,
//         //       uid: item.staff.uid,
//         //       date: item.shift.date,
//         //     });
//         //   }
//         // });
//         console.log("shiftdata", shiftData);

//         datas.forEach((item) => {
//           const shiftTypeId = item.shift.shiftType.id;
//           const shiftTypeName = `${item.shift.shiftType.name} (${item.shift.shiftType.start} - ${item.shift.shiftType.end})`;
//           const shiftDate = item.shift.date.date;
//           const key = `${shiftDate}-${shiftTypeName}`;
//           if (!shiftData2[key]) {
//             shiftData2[key] = {
//               shiftDate: shiftDate,
//               shiftTypeName: shiftTypeName,
//               staffData: [
//                 {
//                   fullName: item.staff.fullName,
//                   uid: item.staff.uid,
//                   date: item.shift.date,
//                 },
//               ],
//             };
//           } else {
//             shiftData2[key].staffData.push({
//               fullName: item.staff.fullName,
//               uid: item.staff.uid,
//               date: item.shift.date,
//             });
//           }
//         });
//         console.log("shiftdata", shiftData);
//         console.log("shiftdata2", shiftData2);

//         // Tạo header cho bảng
//         let headerRowHTML = "<tr>";
//         headerRowHTML += `<th></th>`;
//         Object.values(shiftData2).forEach((shiftInfo) => {
//           headerRowHTML += `<th>${shiftInfo.shiftTypeName}</th>`;
//         });
//         headerRowHTML += "</tr>";
//         document.querySelector(".shiftType").innerHTML = headerRowHTML;

//         // Tạo dữ liệu cho bảng
//         let bodyRowsHTML = "";
//         const daysOfWeek = [
//           { thu: "Thứ 2", day: formattedFirstDayOfWeek },
//           { thu: "Thứ 3", day: formattedTuesdayOfWeek },
//           { thu: "Thứ 4", day: formattedWednesdayOfWeek },
//           { thu: "Thứ 5", day: formattedThursdayOfWeek },
//           { thu: "Thứ 6", day: formattedFridayOfWeek },
//           { thu: "Thứ 7", day: formattedSaturdayOfWeek },
//           { thu: "Chủ nhật", day: formattedLastDayOfWeek },
//         ];
//         daysOfWeek.forEach((day, index) => {
//           let rowHTML = `<tr><th>${day.thu}
//           <br>
//           <small class="fw-light fst-italic">Ngày ${day.day}</small> </th>`;
//           Object.values(shiftData2).forEach((shiftInfo) => {
//             const staffInfo = shiftInfo.staffData[index];
//             const isCurrentUser = staffInfo && staffInfo.uid === userId;
//             rowHTML += `<td><span ${
//               isCurrentUser
//                 ? ' class="badge bg-primary text-white d-flex align-items-center justify-content-center h-100"'
//                 : ""
//             } style="font-size: 16px; padding: 8px 0">${
//               staffInfo ? staffInfo.fullName : ""
//             }</span></td>`;
//           });
//           rowHTML += "</tr>";
//           bodyRowsHTML += rowHTML;
//         });
//         document.querySelector(".nameStaff").innerHTML = bodyRowsHTML;
//       }
//     });
// }

async function getShiftOfWeek(startDate, endDate, userId) {
  try {
    const response = await fetch(
      `${apiShift}?start=${startDate}&end=${endDate}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();

    if (res.status === "OK") {
      const datas = res.data;
      let shiftData = {};
      console.log(datas);
      // Tổ chức dữ liệu theo ngày và ca làm việc
      datas.forEach((item) => {
        const shiftDate = item.shift.date.date;
        // const formattedShiftDate = shiftDate.replace(/-/g, "/");
        const shiftTypeName = `${item.shift.shiftType.name} (${item.shift.shiftType.start} - ${item.shift.shiftType.end})`;

        if (!shiftData[shiftDate]) {
          shiftData[shiftDate] = {};
        }

        if (!shiftData[shiftDate][shiftTypeName]) {
          shiftData[shiftDate][shiftTypeName] = [];
        }

        shiftData[shiftDate][shiftTypeName].push({
          fullName: item.staff.fullName,
          uid: item.staff.uid,
        });
      });
      console.log("shiftData", shiftData);
      // Tạo header cho bảng
      let headerRowHTML = "<tr>";
      headerRowHTML += `<th></th>`;
      const shiftTypes = Object.keys(shiftData[Object.keys(shiftData)[0]]);
      shiftTypes.forEach((shiftTypeName) => {
        headerRowHTML += `<th>${shiftTypeName}</th>`;
      });
      headerRowHTML += "</tr>";
      document.querySelector(".shiftType").innerHTML = headerRowHTML;

      console.log("shiftTypes", shiftTypes);
      // Tạo dữ liệu cho bảng
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
      daysOfWeek.forEach((day, index) => {
        console.log("Day", day);
        let rowHTML = `<tr><th>${day.thu}
            <br>
            <small class="fw-light fst-italic">Ngày ${day.day}</small> </th>`;

        shiftTypes.forEach((shiftTypeName) => {
          console.log("day.day", day.day);

          const staffInfo = shiftData[day.day]
            ? shiftData[day.day][shiftTypeName]
            : [];
          console.log("staffInfo", staffInfo);
          const isCurrentUser = staffInfo.some((staff) => staff.uid === userId);
          rowHTML += `<td><span ${
            isCurrentUser
              ? ' class="badge bg-primary text-white d-flex align-items-center justify-content-center h-100"'
              : ""
          } style="font-size: 16px; padding: 8px 0">${staffInfo
            .map((staff) => staff.fullName)
            .join(", ")}</span></td>`;
        });

        rowHTML += "</tr>";
        bodyRowsHTML += rowHTML;
      });

      document.querySelector(".nameStaff").innerHTML = bodyRowsHTML;
    }
  } catch (error) {}
}
