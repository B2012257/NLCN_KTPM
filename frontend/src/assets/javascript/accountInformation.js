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
        <div class="col">

            <button type="button" class="btn btn-outline-primary float-end">Chỉnh sửa </button>
        </div>

    </div>
    <hr>

    <form class="row col">
        <div class="col-12 col-xl-6 mb-2">
            <input disabled type="text" class="form-control disabled" 
                aria-label="FullName" value="${user.fullName}">
        </div>
        <div class="col  mb-1">
            <div class="form-floating ">
                <select disabled class="form-select" id="floatingSelect" aria-label="">
                    <option selected value="male">${user.gender}</option>
                    <option value="female">Nữ</option>
                </select>
                <label for="floatingSelect">Giới tính</label>
            </div>
        </div>
        <div class="col mb-1">
            <div class="form-floating ">
                <select disabled class="form-select" id="floatingSelect" aria-label="">
                    <option value="#">${typeName}</option>
                    <option value="bep">Phụ bếp</option>
                    <option value="banhang">Bán hàng</option>
                </select>
                <label for="floatingSelect">Chức vụ</label>
            </div>
        </div>
        <div class="col-12 col-xl-6 mt-2 mb-1">
            <input disabled type="email" class="form-control" placeholder="Email" aria-label="Email">
        </div>
        <div class="col-12 col-xl-6 mt-2 mb-1">
            <input disabled type="text" class="form-control" placeholder="Số điện thoại" aria-label="phone" value=" ${user.phone}">
        </div>
        <div class="col-12 col-xl-6 mt-2 mb-1">
            <input disabled type="text" class="form-control" placeholder="Địa chỉ" aria-label="place" value= "${user.location}">
        </div>
        <div class="col-xl-6 col-12 mt-2 mb-1">
            <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping" role="button">
                    <select disabled class="p-1 border border-0 bg-transparent">
                        <option checked value="#">${user.bankName}</option>
                        <option value="Agribank">Agribank</option>
                    </select>
                </span>
                <input disabled type="text" class="form-control" placeholder="Số tài khoản" value="${user.bankAccount}"
                    aria-label="search_employer" aria-describedby="addon-wrapping">
            </div>
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

    <button style="margin: 20px 0 ;padding: 10px 15px" type="button" class="btn btn-outline-primary savebtn ">Lưu </button>
</div>
</div> 
          `;
    return returnHTML;
  });
  info.innerHTML = htmls.join("");
  const btnUpdate = document.querySelector(".float-end");
  btnUpdate.addEventListener("click", function () {
    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      input.removeAttribute("disabled");
    });
  });
}
