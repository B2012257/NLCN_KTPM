// var currentDate = new Date();
// var firstDayOfMonth = new Date(
//   currentDate.getFullYear(),
//   currentDate.getMonth(),
//   1
// );
// var lastDayOfMonth = new Date(
//   currentDate.getFullYear(),
//   currentDate.getMonth() + 1,
//   0
// );
// console.log("Ngày đầu tiên của tháng: " + firstDayOfMonth.toLocaleDateString());
// console.log("Ngày cuối cùng của tháng: " + lastDayOfMonth.toLocaleDateString());
// document.getElementById("firstDay").value = firstDayOfMonth
//   .toISOString()
//   .split("T")[0];

// console.log(firstDayOfMonth.toLocaleDateString().split("T")[0]);
// document.getElementById("lastDay").value = lastDayOfMonth
//   .toISOString()
//   .split("T")[0];

var currentDate = new Date();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

// Kiểm tra nếu ngày hiện tại là ngày cuối cùng của tháng
if (
  currentDate.getDate() === new Date(currentYear, currentMonth + 1, 0).getDate()
) {
  // Nếu là ngày cuối cùng của tháng, tăng tháng lên 1
  currentMonth++;
}

var firstDayOfMonth = new Date(currentYear, currentMonth, 1);
var lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

console.log("Ngày đầu tiên của tháng: " + firstDayOfMonth.toLocaleDateString());
console.log("Ngày cuối cùng của tháng: " + lastDayOfMonth.toLocaleDateString());

// Hiển thị ngày bắt đầu và kết thúc trong ô input
document.getElementById("firstDay").value = firstDayOfMonth
  .toLocaleDateString("en-CA")
  .split("/")
  .reverse()
  .join("-");
document.getElementById("lastDay").value = lastDayOfMonth
  .toLocaleDateString("en-CA")
  .split("/")
  .reverse()
  .join("-");
const api = `http://localhost:8081/api/v1/manager/allStaff`;
let data = [];
function start() {
  getStaff(function (fetchedData) {
    data = fetchedData;
    filterStaffByRole(data, "tatca");
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
    const data = responseData.data; // Truy cập thuộc tính data từ response object
    console.log("Data from API:", data); // Log kết quả từ API
    callback(data);
  } catch (error) {
    console.error(error);
  }
}
const radioButtons = document.querySelectorAll(
  'input[name="inlineRadioOptions"]'
);
let count = 1;
function renderStaff(staffs) {
  count = 1;
  const listStaff = document.getElementById("list-staff");
  var htmls = staffs.map(function (staff) {
    const typeName = staff.type ? staff.type.name : "";
    const salaryBasic = staff.type ? staff.salary.formattedBasic : "";
    const salaryOvertime = staff.type ? staff.salary.formattedOvertime : "";

    const today = new Date();
    const beginWork = new Date(staff.beginWork);
    const monthsDiff =
      (today.getFullYear() - beginWork.getFullYear()) * 12 +
      today.getMonth() -
      beginWork.getMonth();

    // Tính số năm và số tháng
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    const month = months > 0 ? `${months}` : "0";
    const year = years > 0 ? `${years} năm ` : "";
    const returnHTML = `
        <tr style="text-align: center">
        <td>${count}</td>
        <td>${staff.fullName}</td>
        <td>${staff.gender}</td>
        <td>
            <div class="badge bg-primary">${typeName}</div>
        </td>
        <td>${staff.phone}</td>
        <td>${year} ${month} tháng</td>
        <td>
            120 giờ
        </td>
        <td>
        ${salaryBasic}
        </td>
        <td>
            30 giờ
        </td>
        <td>
        ${salaryOvertime}
        </td>
        <td>
            23423423
        </td>
        <td>
        ${staff.bankName}
        </td>
        <td>
        ${staff.bankAccount}
        </td>
    </tr>
        `;
    count++;
    return returnHTML;
  });
  listStaff.innerHTML = htmls.join("");
}

function removeDiacriticsAndSpaces(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();
}

function filterStaffByRole(data, role) {
  console.log("Role selected:", role);
  if (role === "tatca") {
    renderStaff(data);
  } else {
    const filteredStaff = data.filter((staff) => {
      let name = staff.type && staff.type.name;
      if (name) {
        let remove = removeDiacriticsAndSpaces(name);
        return remove === role;
      }
    });
    renderStaff(filteredStaff);
  }
}

radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    filterStaffByRole(data, this.value); // Truyền thêm tham số data vào hàm filterStaffByRole
  });
});

//test lấy các người có trong tháng
// var dataTest = [
//   { id: 1, name: "thái", dateGoWork: "10/10/2023" },
//   { id: 2, name: "tring", dateGoWork: "6/10/2023" },
//   { id: 3, name: "phong", dateGoWork: "6/10/2023" },
//   { id: 4, name: "Linh", dateGoWork: "8/12/2023" },
//   { id: 5, name: "phong", dateGoWork: "8/10/2023" },
//   { id: 6, name: "phong", dateGoWork: "5/10/2023" },
//   { id: 7, name: "phong", dateGoWork: "7/10/2023" },
// ];
// var currentDate = new Date();
// var firstDayOfMonth = new Date(
//   currentDate.getFullYear(),
//   currentDate.getMonth(),
//   1
// );
// var lastDayOfMonth = new Date(
//   currentDate.getFullYear(),
//   currentDate.getMonth() + 1,
//   0
// );

// function parseDate(dateString) {
//   var parts = dateString.split("/");
//   return new Date(parts[2], parts[1] - 1, parts[0]);
// }

// var filteredData = dataTest.filter(function (item) {
//   var dateGoWork = parseDate(item.dateGoWork);
//   return dateGoWork >= firstDayOfMonth && dateGoWork <= lastDayOfMonth;
// });

// console.log("Ngày đầu tiên của tháng: " + firstDayOfMonth.toLocaleDateString());
// console.log("Ngày cuối cùng của tháng: " + lastDayOfMonth.toLocaleDateString());
// console.log(filteredData);
