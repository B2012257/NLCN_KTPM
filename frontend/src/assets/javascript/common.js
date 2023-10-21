//Xử lí đăng xuất
document.querySelector('.logout-btn').addEventListener("click", logout)
const logoutUrl = "http://localhost:8081/api/v1/auth/logout"
function logout() {
    localStorage.clear()
    fetch(logoutUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },

    })
        .then(res => res.json())
        .then(respose => {
            if (respose.status === "OK") {
                alert("Đăng xuất thành công")
                return location.href = "/src/pages/login.html"
            }
            else
                alert(respose.message)
            location.href = "/src/pages/login.html"
        })
}

//Gọi khi vừa load vào trang
function setUp() {
    renderFullName()
}
setUp()
//Hiển thị fullName lên header
function renderFullName() {
    const loginUrl = "http://localhost:8081/api/v1/staff/info" //?uid=QL382
    //Lấy id user
    let userInfo = JSON.parse(localStorage.getItem("u"))
    if (!userInfo) return location.href = "../pages/login.html"
    let userUid = userInfo.uid


    fetch(loginUrl + `?Uid=${userUid}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },

    })
        .then(res => res.json())
        .then(respose => {
            if (respose.status === "OK") {
                document.querySelector(".fullName-btn").innerHTML = respose.data.fullName
                return console.log(respose);
            }
            alert(respose.message)
        })

}

// container -> toast-container
//Hiển thị thông báo
function turnOnToast(title, content) {
    let toastHtmlTemplate =
        ` <div class="toast show" role="alert" data-bs-animation="false" data-bs-autohide="false"">
                <div class="toast-header">
                    <span class="rounded me-2 bg-success" style="width: 22px;height: 22px;"> </span>
                    <strong class="me-auto message-title">${title}</strong>
                    <small class="text-muted">Bây giờ</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        <div class="toast-body message-content">
            ${content}
        </div>
    </div>`

    let toastContainer = document.querySelector(".toast-container")
    if (toastContainer) {
        toastContainer.innerHTML += toastHtmlTemplate
    } else return;
}
