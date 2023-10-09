document.querySelector('.logout-btn').addEventListener("click", logout)
const logoutUrl = "http://localhost:8081/api/v1/auth/logout"

function logout() {
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
                localStorage.clear()
                alert("Đăng xuất thành công")
                return location.href = "/src/pages/login.html"
            }
            else
                alert(respose.message)
            location.href = "/src/pages/login.html"
        })
}