let sumaryApiUrl =
  "http://localhost:8081/api/v1/manager/statistics/work/sumary";

//Kiểm tra đăng nhập
if (!localStorage.getItem("u")) {
  alert("Vui lòng đăng nhập");
  location.href = "./pages/login.html";
}

async function setUp() {
  //Lấy dữ liệu tổng quan
  try {
    const sumary = await getApi(sumaryApiUrl);

    showSumary(sumary);
  } catch {
    alert("Lỗi nhận dữ liệu từ máy chủ");
    return;
  }
}
setUp();

async function getApi(api) {
  const response = await fetch(api, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if ((data.status = "OK")) {
    const resData = data.data;
    return resData;
  }
  return alert("Có lỗi khi lấy dữ liệu tổng quan");
  // loadShiftTypeHtml(data.data)
}

function showSumary(data) {
  let totalSumary = document.querySelector(".totalSumary");
  let totalSumaryListGroup = totalSumary.querySelector(".list-group");
  let todaySumary = document.querySelector(".todaySumary");
  let todaySumaryListGroup = todaySumary.querySelector("list-group");

  let totalStaff = totalSumary.querySelector(".totalStaff");
  let newStaffInMonth = totalSumary.querySelector(".newInMonth");
  totalStaff.innerHTML = data.totalStaff;
  newStaffInMonth.innerHTML = data.newStaffInMonth;
  //Hiển thị tổng nhân sự theo chức vụ
  let htmlTemplate = `
     <li class="list-group-item d-flex justify-content-between">Phụ bếp
        <span class="badge bg-secondary totalBep">14</span>
    </li>
    `;
  data.totalEachType.forEach((total) => {
    totalSumaryListGroup.innerHTML += `
        <li class="list-group-item d-flex justify-content-between">${total.typeName}
           <span class="badge bg-secondary totalBep">${total.count}</span>
        </li>
       `;
  });

  let totalStaffWorkingToday = todaySumary.querySelector(".totalworkingToday");
  totalStaffWorkingToday.innerHTML = data.totalWorkToday;
  //Hiển thị tổng làm việc hôm nay theo từng chức vụ
  document.querySelector(".phubep").innerHTML =
    data.totalWorkTodayGroupByType["Phụ bếp"] || 0;
  document.querySelector(".banhang").innerHTML =
    data.totalWorkTodayGroupByType["Bán hàng"] || 0;
}
