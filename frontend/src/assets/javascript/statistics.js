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

var formattedFirstDayOfMonth =
  firstDayOfMonth.getFullYear() +
  "/" +
  ("0" + (firstDayOfMonth.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + firstDayOfMonth.getDate()).slice(-2);

var formattedLastDayOfMonth =
  lastDayOfMonth.getFullYear() +
  "/" +
  ("0" + (lastDayOfMonth.getMonth() + 1)).slice(-2) +
  "/" +
  ("0" + lastDayOfMonth.getDate()).slice(-2);
console.log("Ngày đầu tiên của tháng: " + formattedFirstDayOfMonth);
console.log("Ngày cuối cùng của tháng: " + formattedLastDayOfMonth);

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
const apiType = `http://localhost:8081/api/v1/manager/types`;
const getTimekeeping = `http://localhost:8081/api/v1/manager/getAllScheduleOfStaffInTimeKeepingStartEndByUid`;

let data = [];
function start() {
  getStaff(function (fetchedData) {
    data = fetchedData;
    filterStaffByRole(data, "Tất cả");
  });
  getType();
}
start();

function getType() {
  fetch(apiType, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status == "OK") {
        const data = res.data;
        console.log(data);
        const type = document.getElementById("typeStaff");
        var html = data.map(function (type, index) {
          const uniqueId = `inlineRadio${index + 1}`; // Sử dụng index để tạo id duy nhất
          return `
          <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="${uniqueId}"
              value="${type.name}">
          <label class="form-check-label" for="${uniqueId}">${type.name}</label>
      </div>
      
          `;
        });
        type.innerHTML = html.join("");
      }
      const radioButtons = document.querySelectorAll(".form-check-input");
      console.log(radioButtons);
      radioButtons.forEach((radio) => {
        radio.addEventListener("change", function () {
          console.log("Selected value:", this.value);
          filterStaffByRole(data, this.value); // Truyền thêm tham số data vào hàm filterStaffByRole
        });
      });
    });
}

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
async function renderStaff(staffs, start, end) {
  // count = 1;
  const listStaff = document.getElementById("list-staff");
  var htmls = staffs.map(async function (staff, index) {
    let userId = staff.uid;
    let count = index + 1;
    return fetchTimeKeeping(start, end, userId).then((timeKeeping) => {
      console.log("timeKeeping", timeKeeping);
      const typeName = staff.type ? staff.type.name : "";
      const salaryBasicReal = staff.type ? staff.salary.basic : "";
      const salaryBasic = staff.type ? staff.salary.formattedBasic : "";
      const salaryOvertimeReal = staff.type ? staff.salary.overtime : "";
      const salaryOvertime = staff.type ? staff.salary.formattedOvertime : "";
      const hoursShift = timeKeeping ? calculateTotalHours(timeKeeping) : 0;
      console.log("hoursShift", typeof hoursShift);
      const formatHoursShift = hoursShift > 0 ? hoursShift.toFixed(1) : 0;
      const totalOvertime = timeKeeping && calculateTotalOvertime(timeKeeping);
      const totalMoney = timeKeeping
        ? formatHoursShift * salaryBasicReal +
          totalOvertime * salaryOvertimeReal
        : 0;

      const lamtronSo = Math.round(totalMoney);
      const config = {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code",
        maximumFractionDigits: 9,
      };
      const formated = new Intl.NumberFormat("vi-VN", config).format(lamtronSo);

      console.log("totalOvertime", totalOvertime);
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
        <td class="hoursShift"> ${formatHoursShift}
        </td>
        <td>
        ${salaryBasic}
        </td>
        <td class="hoursOvertime">
        ${totalOvertime ? totalOvertime : "0"}
        </td>
        <td>
        ${salaryOvertime}
        </td>
        <td>
            ${formated} 
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
  });
  Promise.all(htmls).then(function (htmlArray) {
    listStaff.innerHTML = htmlArray.join("");
  });
  // listStaff.innerHTML = htmls.join("");
}

function filterStaffByRole(data, role) {
  // console.log("Role selected:", role);
  if (role === "Tất cả") {
    renderStaff(data, formattedFirstDayOfMonth, formattedLastDayOfMonth);
  } else {
    const filteredStaff = data.filter((staff) => {
      let name = staff.type && staff.type.name;
      if (name) {
        return name === role;
      }
    });
    renderStaff(
      filteredStaff,
      formattedFirstDayOfMonth,
      formattedLastDayOfMonth
    );
  }
}

radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    filterStaffByRole(data, this.value); // Truyền thêm tham số data vào hàm filterStaffByRole
  });
});

async function fetchTimeKeeping(start, end, uid) {
  try {
    const response = await fetch(
      `${getTimekeeping}?uid=${uid}&start=${start}&end=${end}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (responseData.status === "OK") {
      const data = responseData.data; // Truy cập thuộc tính data từ response object
      console.log("Data Timekeeping:", data); // Log kết quả từ API
      console.log("length", data.length);
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

// Hàm tính tổng số giờ công từ một mảng dữ liệu
function calculateTotalHours(data) {
  var totalHours = 0;

  // Lặp qua mỗi đối tượng trong mảng dữ liệu
  for (var i = 0; i < data.length; i++) {
    // Tách giờ, phút và giây từ chuỗi thời gian bắt đầu và kết thúc
    var startTimeArray = data[i].start.split(":");
    var endTimeArray = data[i].end.split(":");

    // Chuyển đổi giờ, phút và giây thành số và tính tổng số giờ công
    var hoursWorked =
      parseInt(endTimeArray[0], 10) -
      parseInt(startTimeArray[0], 10) +
      (parseInt(endTimeArray[1], 10) - parseInt(startTimeArray[1], 10)) / 60 +
      (parseInt(endTimeArray[2], 10) - parseInt(startTimeArray[2], 10)) / 3600;

    // Cộng số giờ công từ đối tượng hiện tại vào tổng số giờ công
    totalHours += hoursWorked;
  }

  return totalHours;
}

//tính tổng giờ làm thêm
function calculateTotalOvertime(timekeepingData) {
  let totalOvertime = 0;
  for (let i = 0; i < timekeepingData.length; i++) {
    totalOvertime += timekeepingData[i].overTime;
  }
  return totalOvertime;
}

//Thêm số 0 vào chuỗi ngày tháng.. Tryuền vào tham số dạng yyyy-mm-đd
function dateStringFormat(dateString) {
  // Tách ngày, tháng, năm từ chuỗi đầu vào
  const parts = dateString.split("-");
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];

  // Chuyển đổi ngày và tháng thành chuỗi có 2 chữ số, nếu cần
  const formattedDay = day.length === 1 ? "0" + day : day;
  const formattedMonth = month.length === 1 ? "0" + month : month;

  // Tạo chuỗi ngày tháng năm đã được định dạng
  const formattedDateString = `${year}/${formattedMonth}/${formattedDay}`;

  return formattedDateString;
}

//Render ra giá trị sau khi chọn ngày bắt đầu và kết thúc
const statistics = document.getElementById("statistics");
console.log(statistics);
statistics.addEventListener("click", function () {
  const valueFirstDay = document.getElementById("firstDay").value;
  const valueLastDay = document.getElementById("lastDay").value;
  const dayStart = dateStringFormat(valueFirstDay);
  const dayEnd = dateStringFormat(valueLastDay);
  renderStaff(data, dayStart, dayEnd);
});

if (window.screen.width < 500) {
  const stylePhone = document.getElementById("dateStylePhone");
  stylePhone.classList.add("overflow-x-scroll", "w-100", "d-inline-block");
}
