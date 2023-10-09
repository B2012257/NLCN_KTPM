const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);

const uid = userObject.uid;

const api = `http://localhost:8081/api/v1/manager/infoStaff?uid=${uid}`;

let data = [];
function start() {
  getStaff(function (fetchedData) {
    data = fetchedData;
    renderStaff(data);
  });
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

//Thời gian ngày hiện tại ở trang indexStaff

var dateInput = document.getElementById("dateInput");
var resultDiv = document.getElementById("result");

// Lắng nghe sự kiện khi giá trị của thẻ input thay đổi
// dateInput.addEventListener("input", function () {
//   var selectedDate = dateInput.value;

//   var selectDay = new Date(dateInput.value);

//   var daysOfWeek = [
//     "Chủ Nhật",
//     "Thứ Hai",
//     "Thứ Ba",
//     "Thứ Tư",
//     "Thứ Năm",
//     "Thứ Sáu",
//     "Thứ Bảy",
//   ];
//   var dayOfWeek = daysOfWeek[selectDay.getDay()];

//   resultDiv.textContent = dayOfWeek + ", " + selectedDate;
// });

function displayCurrentDate() {
  var currentDate = new Date();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  var formattedDate = currentDate.toLocaleDateString(undefined, options);

  var divElement = document.getElementById("resultDate");
  divElement.textContent = formattedDate;
}

displayCurrentDate();

//////Test lấy người có giá trị trong tuần
//Lấy ra người có lịch trùng ngày hôm nay
var dataTest = [
  { id: 1, name: "thái", dateGoWork: "10/10/2023" },
  { id: 2, name: "tring", dateGoWork: "6/10/2023" },
  { id: 3, name: "phong", dateGoWork: "6/10/2023" },
  { id: 4, name: "Linh", dateGoWork: "8/10/2023" },
  { id: 5, name: "phong", dateGoWork: "8/10/2023" },
  { id: 6, name: "phong", dateGoWork: "5/10/2023" },
  { id: 7, name: "phong", dateGoWork: "7/10/2023" },
];

var currentDate = new Date();

var formattedCurrentDate = currentDate.toLocaleDateString("en-US", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function parseDate(dateString) {
  var parts = dateString.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

var filteredData2 = dataTest.filter(function (item) {
  var dateGoWork = parseDate(item.dateGoWork).toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return dateGoWork === formattedCurrentDate;
});
console.log(filteredData2);
