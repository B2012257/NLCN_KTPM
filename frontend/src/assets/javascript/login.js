const loginBtn = document.querySelector(".login-btn");

const loginApi = `http://localhost:8081/api/v1/auth/login`;

//Bắt sự kiện ấn nút đăng nhập
loginBtn.addEventListener("click", loginHandler);

function loginHandler() {
  //Lấy dữ liệu từ form
  let userNameForm = document.querySelector(".username-input");
  let passwordForm = document.querySelector(".password-input");

  fetch(
    `${loginApi}?username=${userNameForm.value}&password=${passwordForm.value}`,
    {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.status === "OK") return loginSuccess(res);
      return loginError(res);
    });
}

//Khi đang nhập thành công
function loginSuccess(resData) {
  //Lưu thông tin tạm vào localstorage
  let dataSaveInStorage = {
    uid: resData.data.uid,
    type: resData.data.type.id,
  };
  localStorage.setItem("u", JSON.stringify(dataSaveInStorage));

  //Chuyển sang trang chủ
  //Kiểm tra type nếu Quản lý thì qua trang quản lý
  //Ngược lại qua trang nhân sự
  if (resData.data.type.name.toLowerCase().trim().includes("quản lý"))
    return (location.href = "/src/index.html");
  return (location.href = "/src/pages/indexStaff.html");
}

//Khi đang nhập thất bại
//Hiện thông báo lỗi
function loginError() {}
