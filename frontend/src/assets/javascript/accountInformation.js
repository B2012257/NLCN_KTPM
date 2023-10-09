const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
console.log(userObject);
const uid = userObject.uid;

const api = `http://localhost:8081/api/v1/manager/infoStaff?uid=${uid}`;
const editInfo = `http://localhost:8081/api/v1/staff/editStaff`;
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
  const info = document.querySelector(".info");
  var htmls = users.map(function (user) {
    const typeName = user.type ? user.type.name : "";
    const returnHTML = `
    <div class="col col-md-8 mx-auto">
    <div class="row mb-3">
        <div class="col text-center">
            <img style="width: 200px;" src=${user.urlAvatar || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSySSYZ8Vr_66g-cqvEwxmn8qA2KRRTrbcAPA&usqp=CAU"}
                class="img-thumbnail rounded mx-auto d-block" alt="avatar">
              
        </div>
    </div>
    <div class="row">
        <div class="col">
            <h5>Thông tin cá nhân

            </h5>
        </div>
        <div class="col" >


            <button type="button" class="btn btn-outline-primary float-end update" >Chỉnh sửa </button>
            <button type="button" class="btn btn-outline-primary float-end exit" style="display:none">Hủy</button>           
            <button type="button" class="btn btn-outline-primary float-end save" style="margin-right: 10px;display:none"  data-bs-toggle="modal" data-bs-target="#exampleModal" >Lưu thay đổi </button>
         

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Thông báo</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Thay đổi thông tin cá nhân thành công !!!
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

        </div>

    </div>
    <hr>

    <form class="row col">
        <div class="col-12 col-xl-6 mb-2">
            <input disabled type="text" class="form-control disabled" 
                aria-label="FullName" value="${user.fullName}">
        </div>
        <div class="col  mb-1">
          
            <input disabled type="text" class="form-control disabled" 
            aria-label="Gender" value="${user.gender}">
        </div>
        <div class="col mb-1">
          
            <input disabled type="text" class="form-control disabled" 
            aria-label="TypeName" value="${typeName}">
        </div>
       
        <div class="col-12 col-xl-6 mt-2 mb-1">
            <input disabled type="text" class="form-control" placeholder="Số điện thoại" aria-label="phone" value=" ${user.phone}">
        </div>
        <div class="col-12 col-xl-6 mt-2 mb-1">
            <input disabled type="text" class="form-control" placeholder="Địa chỉ" aria-label="place" value= "${user.location}">
        </div>
        <div class="col-xl-6 col-12 mt-2 mb-1">
            <div class="input-group flex-nowrap">
                
                <input disabled type="text" class="form-control disabled" 
                aria-label="BankName" value="${user.bankName}">

                <input disabled type="text" class="form-control" placeholder="Số tài khoản" value="${user.bankAccount}"
                    aria-label="search_employer" aria-describedby="addon-wrapping">
            </div>
        </div>
        <div class="col-12 col-xl-6 mt-2 mb-1">
        <input disabled type="text" class="form-control" placeholder="Ngày bắt đầu làm" aria-label="beginWork" value= "${user.beginWork}">
    </div>
        <div class="col mt-2 mb-1">
            <div class="avatar_input">
                <label for="formFile" class="form-label fw-bold">Đổi ảnh chân dung:</label>
                <input class="form-control w-100" type="file" id="formFile" placeholder="">
            </div>
        </div>
    </form>
    <div class="col" style="display: flex;
    justify-content: center;
    align-items: center;">

</div>
</div> 
          `;
    return returnHTML;
  });
  info.innerHTML = htmls.join("");

  const btnUpdate = document.querySelector(".update");
  const btnExit = document.querySelector(".exit");
  const btnSave = document.querySelector(".save");
  btnUpdate.addEventListener("click", function () {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
    btnExit.style.display = "block";
    btnSave.style.display = "block";
    btnUpdate.style.display = "none";
  });

  btnExit.addEventListener("click", function () {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });

    btnSave.style.display = "none";
    btnExit.style.display = "none";
    btnUpdate.style.display = "block";
  });

  btnSave.addEventListener("click", function () {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.setAttribute("disabled", "disabled");
    });

    btnSave.style.display = "none";
    btnExit.style.display = "none";
    btnUpdate.style.display = "block";
  });

  btnSave.addEventListener("click", updateInfo);
  const avatar = document.getElementById("formFile");
  avatar.addEventListener("change", imgToUrl);

  //update tên cho nhân viên với username "Xin chào username"
  const infoStaff = document.querySelector("#username");
  var htmls2 = users.map(function (user) {
    const returnHTML = `
    ${user.userName}
          `;
    return returnHTML;
  });
  infoStaff.innerHTML = htmls2.join("");
}

function imgToUrl(e) {
  const avatar = document.getElementById("formFile");
  const file = avatar.files[0];
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    console.log(reader.result);
  });
  reader.readAsDataURL(file);
}

function updateInfo() {
  const dataInfo = {};
  // Lấy dữ liệu từ các trường input và select
  const fullName = document.querySelector("input[aria-label='FullName']");
  const gender = document.querySelector("input[aria-label='Gender']");
  const phone = document.querySelector("input[aria-label='phone']");
  const location = document.querySelector("input[aria-label='place']");
  const bankName = document.querySelector("input[aria-label='BankName']");
  const bankAccount = document.querySelector(
    "input[aria-describedby='addon-wrapping']"
  );
  const beginWork = document.querySelector("input[aria-label='beginWork']");

  dataInfo.uid = uid;
  dataInfo.fullName = fullName.value;
  dataInfo.gender = gender.value;
  dataInfo.phone = phone.value;
  dataInfo.location = location.value;
  dataInfo.bankName = bankName.value;
  dataInfo.bankAccount = bankAccount.value;
  dataInfo.beginWork = beginWork.value;
  dataInfo.urlAvatar = avatar.value;
  // Gửi dữ liệu lên server sử dụng fetch API
  if (
    dataInfo.fullName !== "" &&
    dataInfo.gender !== "" &&
    dataInfo.phone !== "" &&
    dataInfo.location !== "" &&
    dataInfo.bankName !== "" &&
    dataInfo.bankAccount !== "" &&
    dataInfo.beginWork !== ""
  ) {
    return updateStaff(dataInfo);
  } else alert("Vui lòng nhập đầy đủ trường");
}

function updateStaff(dataInfo) {
  fetch(`${editInfo}`, {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataInfo),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === "OK") {
        console.log(res);
        return location.reload();
      }

      return console.log(res);
    });
}
