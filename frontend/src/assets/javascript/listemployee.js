const api = `http://localhost:8081/api/v1/manager/allStaff`;
const apiType = `http://localhost:8081/api/v1/manager/types`;
const apiSalary = `http://localhost:8081/api/v1/manager/salaries`;
const getInfoStaff = `http://localhost:8081/api/v1/manager/infoStaff`;

let data = [];

let avatar = "";
let dbAvatar;
function start() {
  getStaff(function (fetchedData) {
    data = fetchedData;
    filterStaffByRole(data, "Tất cả");
  });
  getType();
  getSalary();
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
function getSalary() {
  fetch(apiSalary, {
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
        console.log("salary", data);
        const salary = document.getElementById("levelSalary");
        var htmls = data.map(function (salary, index) {
          return `
          <option id="salary" value="${salary.level}">${salary.level}
          <label"> (Cơ bản: ${salary.formattedBasic}; Tăng ca ${salary.formattedOvertime}; Trợ cấp ${salary.formattedAllowance}/Tháng )</label>
          </option>
          `;
        });
        salary.innerHTML = htmls.join("");
      }
    });
}

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

        const typeDetail = document.getElementById("type");
        var htmls = data.map(function (type, index) {
          return `
          <option id="${type.id}" value="${type.name}">${type.name}</option>
          `;
        });
        typeDetail.innerHTML = htmls.join("");
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

function renderStaff(staffs) {
  const listStaff = document.getElementById("list-staff");
  var htmls = staffs.map(function (staff) {
    const typeName = staff.type ? staff.type.name : "";

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
        <tr style="text-align: center" role="button" title="Bấm để xem chi tiết" data-bs-toggle="modal" id="${staff.uid}"
        data-bs-target="#modal">
        <td>${staff.uid}</td>
        <td>${staff.fullName}</td>
        <td>${staff.userName}</td>
        <td>${staff.gender}</td>
        <td>
            <div class="badge bg-primary">${typeName}</div>
        </td>
        <td>${staff.location}</td>
        <td>${staff.phone}</td>
        <td>${year} ${month} tháng</td>
   
        
    </tr>
        `;

    return returnHTML;
  });
  listStaff.innerHTML = htmls.join("");

  let idStaff = document.querySelectorAll('tr[data-bs-toggle="modal"]');
  console.log("idStaff", idStaff);

  idStaff.forEach((tr) => {
    tr.addEventListener("click", function () {
      const value = tr.getAttribute("id");

      getInfoDetailStaff(value);
    });
  });
}

function filterStaffByRole(data, role) {
  // console.log("Role selected:", role);
  if (role === "Tất cả") {
    renderStaff(data);
  } else {
    const filteredStaff = data.filter((staff) => {
      let name = staff.type && staff.type.name;
      if (name) {
        return name === role;
      }
    });
    renderStaff(filteredStaff);
  }
}

function filterStaffByName(data, searchTerm) {
  return data.filter((staff) => {
    const fullName = staff.fullName.toLowerCase();
    return fullName.includes(searchTerm);
  });
}
const inputSearch = document.querySelector(".form-control");
const btnSearch = document.querySelector(".input-group-text");
btnSearch.addEventListener("click", function () {
  if (inputSearch.value === "") {
    return;
  } else {
    const searchTerm = inputSearch.value.trim().toLowerCase();
    console.log("input", searchTerm);
    const filteredStaff = filterStaffByName(data, searchTerm);
    renderStaff(filteredStaff);
    inputSearch.value = "";
  }
});

async function getInfoDetailStaff(uid) {
  try {
    const response = await fetch(`${getInfoStaff}?uid=${uid}`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    if (responseData) {
      const data = responseData.data;
      console.log(data);
      fillStaffInfo(data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

const idGetDetail = "";
function fillStaffInfo(data) {
  document.getElementById("userId").value = data.uid;
  document.getElementById("FullName").value = data.fullName;
  document.getElementById("gender").value = data.gender;
  document.getElementById("type").value = data.type.name;
  document.getElementById("phone").value = data.phone;
  document.getElementById("location").value = data.location;
  document.getElementById("bankAccount").value = data.bankAccount;
  document.getElementById("bankName").value = data.bankName;
  document.getElementById("avatar").src = data.urlAvatar;
  document.getElementById("beginWork").value = data.beginWork;
  document.getElementById("levelSalary").value = data.salary.level;
  dbAvatar = data.urlAvatar;
}
console.log("idGetDetail", idGetDetail);
function enableEdit() {
  const inputElements = document.querySelectorAll(".editInfo");
  inputElements.forEach((inputElement) => {
    inputElement.removeAttribute("disabled");
  });

  const buttonCompleted = document.getElementById("buttonCompleted");
  buttonCompleted.style.display = "block";

  const buttonEdit = document.getElementById("buttonEdit");
  buttonEdit.style.display = "none";

  const buttonCancel = document.getElementById("buttonCancel");
  buttonCancel.style.display = "block";

  document.getElementById("upload_widget").addEventListener(
    "click",
    function () {
      myWidget.open();
    },
    false
  );
}
var myWidget = cloudinary.createUploadWidget(
  {
    cloudName: "dfcjwhc7o",
    uploadPreset: "cdootl7q",
  },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      let url = result.info.url;
      avatar = url;
    }
  }
);

function cancelInfo() {
  const buttonCompleted = document.getElementById("buttonCompleted");
  buttonCompleted.style.display = "none";
  const buttonCancel = document.getElementById("buttonCancel");
  buttonCancel.style.display = "none";
  const buttonEdit = document.getElementById("buttonEdit");
  buttonEdit.style.display = "block";
  const inputElements = document.querySelectorAll(".editInfo");
  inputElements.forEach((inputElement) => {
    inputElement.setAttribute("disabled", "disabled");
  });
  const value = document.getElementById("userId").value;
  console.log("value", value);
  getInfoDetailStaff(value);
}

function updateStaffInfoHandler() {
  const newFullName = document.getElementById("FullName").value;
  const newGender = document.getElementById("gender").value;
  const newPhone = document.getElementById("phone").value;
  // const newTypeName = document.getElementById("type").value;
  const newTypeSelectId =
    document.getElementById("type").options[
      document.getElementById("type").selectedIndex
    ].id;
  console.log("selectedOptionId", newTypeSelectId);
  const newLocation = document.getElementById("location").value;
  const newBankAccount = document.getElementById("bankAccount").value;
  const newBankName = document.getElementById("bankName").value;
  const uid = document.getElementById("userId").value;
  const beginWork = document.getElementById("beginWork").value;
  const levelSalary = document.getElementById("levelSalary").value;
  // const levelSalary =
  //   document.getElementById("levelSalary").options[
  //     document.getElementById("levelSalary").selectedIndex
  //   ].id;
  console.log("levelSalary", levelSalary);
  const dataUpdate = {};
  dataUpdate.type = {};
  dataUpdate.salary = {};

  if (avatar !== "") {
    dataUpdate.urlAvatar = avatar;
    console.log(avatar);
  } else {
    dataUpdate.urlAvatar = dbAvatar;
  }

  dataUpdate.fullName = newFullName;
  dataUpdate.type.id = newTypeSelectId; //do backend chỉ chỉnh dc id của type nên chưa update được (mai sửa)
  dataUpdate.gender = newGender;
  dataUpdate.phone = newPhone;
  dataUpdate.location = newLocation;
  dataUpdate.bankAccount = newBankAccount;
  dataUpdate.bankName = newBankName;

  dataUpdate.beginWork = beginWork;
  dataUpdate.salary.level = levelSalary;

  dataUpdate.uid = uid;

  console.log(uid);
  console.log("dataUpdate", dataUpdate.type);

  updateStaffInfo(dataUpdate);
}

//Gọi api cập nhật thông tin cá nhân
function updateStaffInfo(dataUpdate) {
  fetch("http://localhost:8081/api/v1/manager/editStaff", {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataUpdate),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === "OK") {
        console.log(res);
        return location.reload();
      }

      return console.log(res);
    })

    .then((data) => {
      console.log("User data updated successfully:", data);
      alert("Thông tin đã được cập nhật thành công."); // Thông báo khi cập nhật thành công
    })
    .catch((error) => console.error("Error:", error));
}

async function deleteStaff(uid) {
  try {
    const response = await fetch(
      `http://localhost:8081/api/v1/manager/deleteStaff/${uid}`,
      {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const responseData = await response.json();
    if (responseData.status === "OK") {
      return location.reload();
    }
  } catch (error) {}
}

function loadFullName() {
  const fullName = document.getElementById("userNameStaffDelete");
  const newFullName = document.getElementById("FullName").value;
  fullName.textContent = newFullName;
}
function onClickDeleteStaff() {
  const userId = document.getElementById("userId").value;
  deleteStaff(userId);
}
