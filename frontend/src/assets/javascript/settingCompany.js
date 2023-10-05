const addSalaryApiUrl = `http://localhost:8081/api/v1/manager/addSalary`
const getAllSalaryApiUrl = "http://localhost:8081/api/v1/manager/salaries"
const getAllTypeApiUrl = "http://localhost:8081/api/v1/manager/types"
const getAllShiftTypeApiUrl = "http://localhost:8081/api/v1/manager/allShiftType"
const addStaffTypeApiUrl = "http://localhost:8081/api/v1/manager/addType"

let salaries; //Lưu lại danh sách bậc lương

function setUp() {
    getAllSalary()
    getAllType()
    getAllShiftType()
}

setUp()



function addSalaryClickHandler() {

    const salaryTable = document.querySelector(".salary-setting-table")
    const salaryTableBody = salaryTable.querySelector("tbody")

    const rowAdd = document.createElement("tr")
    const trTemplate = `
                        <td>
                            <input type="text" class="form-control center salaryNameAdd" placeholder ="Tên bậc lương" >
                        </td>
                        <td>
                            <input type="text" class="form-control center salaryBasicAdd" placeholder="Nhập 1000 = 1.000 vnd">
                        </td>
                        <td>
                            <input type="text" class="form-control center salaryOvertimeAdd" placeholder="Nhập 10000 = 10.000 vnd">
                        </td>
                        <td>
                            <input type="text" class="form-control center salaryAllowanceAdd" placeholder="Nhập 1000000 = 1.000.000vnd">
                        </td>
                        <td style="vertical-align: middle;">
                            <i class=" fa-regular fa-pen-to-square icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Chỉnh sửa" title="Chỉnh sửa"></i>
                            <i class=" fa-solid fa-trash trash_icon icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Xoá" title="Xoá"></i>
                            <i class="fa-regular fa-floppy-disk icon add-salary-save" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Lưu" title="Lưu"></i>
                        </td>
    `
    rowAdd.innerHTML = trTemplate
    //Lấy ra nút cuối
    const addSalaryBtn = document.querySelector(".add-salary-btn")
    //Xoá nút dấu cộng
    addSalaryBtn.remove()
    salaryTableBody.appendChild(rowAdd)


    //Bắt sự kiện lưu bậc lương
    const saveSalaryBtn = document.querySelector(".add-salary-save")
    // console.log(saveSalaryBtn);
    saveSalaryBtn.addEventListener("click", addSalaryHandler)

}

function addSalaryHandler() {
    //Lấy data
    let dataPost = {}
    const salaryNameInput = document.querySelector(".salaryNameAdd")
    const salaryBasicInput = document.querySelector(".salaryBasicAdd")

    const salaryOvertimeInput = document.querySelector(".salaryOvertimeAdd")

    const salaryAllowanceInput = document.querySelector(".salaryAllowanceAdd")

    dataPost.level = salaryNameInput.value
    dataPost.basic = salaryBasicInput.value
    dataPost.overtime = salaryOvertimeInput.value
    dataPost.allowance = salaryAllowanceInput.value
    if (dataPost.level !== ""
        && dataPost.basic !== ""
        && dataPost.overtime !== ""
        && dataPost.allowance !== "") {
        return addSalaryApi(dataPost)
    }
    else alert("Vui lòng nhập đầy đủ trường")
}


function addSalaryApi(dataBody) {
    fetch(`${addSalaryApiUrl}`, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataBody)
    })

        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === "OK") {
                console.log(res);
                return location.reload()
            }

            return console.log(res);
        })
}

//Lấy danh sách bậc lương khi vừa vào trang
function getAllSalary() {
    fetch(getAllSalaryApiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === "OK") {
                let tbody = document.querySelector(".salary-setting-table tbody")
                const datas = res.data
                salaries = datas
                datas.forEach(item => {
                    tbody.innerHTML += `
                    <tr>
                    <td>
                            ${item.level}
                        </td>
                        <td>
                        ${item.formattedBasic}
                        </td>
                        <td>
                        ${item.formattedOvertime}
                        </td>
                        <td>
                        ${item.formattedAllowance}
                        </td>
                        <td style="vertical-align: middle;">
                            <i class=" fa-regular fa-pen-to-square icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Chỉnh sửa" title="Chỉnh sửa"></i>
                            <i class=" fa-solid fa-trash trash_icon icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Xoá" title="Xoá"></i>
                            
                        </td>
                    </tr>
                    `
                });

                //Thêm dấu cộng vào cuối
                let addSalaryBtnElement = document.createElement("tr")
                addSalaryBtnElement.innerHTML = `
                                <td colspan="5" class="salaryLevel add-salary-btn" data-bs-toggle="tooltip"
                                    data-bs-placement="bottom" data-bs-title="Thêm một bậc lương mới">
                                    <i class=" fa-solid fa-plus" title="Thêm một bậc lương mới"></i>

                                </td>
                `

                //Thêm dữ liệu vào tbody của bảng
                renderHtmlInnerParent(tbody, addSalaryBtnElement)

                //Bắt sự kiện ấn nút thêm bậc lương
                const addSalaryBtn = document.querySelector(".add-salary-btn")
                addSalaryBtn.addEventListener('click', addSalaryClickHandler)
                return;
            }

            return console.log(res);
        })
}
function renderHtmlInnerParent(parentElement, elementRendering) {
    parentElement.appendChild(elementRendering)
}

///// Xử lí chức năng thiết lập loại nhân sự

//Hàm xử lí bấm dấu cộng để thêm 1 loại nhân sự mới
function addStaffTypeClickHandler() {

    const typeTable = document.querySelector(".type-setting-table")
    const typeTableBody = typeTable.querySelector("tbody")

    const rowAdd = document.createElement("tr")
    const trTemplate = `
                        <td>
                            <input type="text" class="form-control center typeNameAdd" placeholder ="Tên" >
                        </td>
                    
                        <td style="vertical-align: middle;">
                            <i class=" fa-regular fa-pen-to-square icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Chỉnh sửa" title="Chỉnh sửa"></i>
                            <i class=" fa-solid fa-trash trash_icon icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Xoá" title="Xoá"></i>
                            <i class="fa-regular fa-floppy-disk icon add-type-save" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Lưu" title="Lưu"></i>
                        </td>
    `
    rowAdd.innerHTML = trTemplate
    //Lấy ra nút cuối
    const addTypeBtn = document.querySelector(".add-type-btn")
    //Xoá nút dấu cộng
    addTypeBtn.remove()
    //Thêm 1 hàng mới để ng dùng nhập dữ liệu
    // typeTableBody.appendChild(rowAdd)
    renderHtmlInnerParent(typeTableBody, rowAdd)
    // //Đổ dữ liệu bậc lương vào select
    // let salarySelect = document.querySelector(".salary-select")
    // salaries.forEach(salary => {
    //     let optionElement = document.createElement("option")
    //     optionElement.value = salary.level
    //     optionElement.innerText = salary.level
    //     salarySelect.appendChild(optionElement)
    // })
    // //Thêm sự kiện đổi lựa chọn bậc lương trong thẻ select, cập nhật lại giá trị lương tương ứng
    // salarySelect.addEventListener("change", (e) => {
    //     let typeBasicInput = document.querySelector(".typeBasic")
    //     let typeOvertimeInput = document.querySelector(".typeOvertime")
    //     let typeAllowanceInput = document.querySelector(".typeAllowance")

    //     let targetValue = e.target.value // Giá trị lựa chọn mới
    //     let findSalary
    //     for (const salary of salaries) {
    //         if (salary.level === targetValue) {
    //             findSalary = salary;
    //             break; // Dừng lại sau khi tìm thấy
    //         }
    //     }
    //     //Cập nhật giá trị vào giao diện
    //     if (findSalary) {
    //         typeBasicInput.value = findSalary.formattedBasic
    //         typeOvertimeInput.value = findSalary.formattedOvertime
    //         typeAllowanceInput.value = findSalary.formattedAllowance
    //     } else {
    //         typeBasicInput.value = 0
    //         typeOvertimeInput.value = 0
    //         typeAllowanceInput.value = 0
    //     }

    // })

    // //Bắt sự kiện lưu loại nhân sự
    const saveTypeBtn = document.querySelector(".add-type-save")
    console.log(saveTypeBtn);
    saveTypeBtn.addEventListener("click", saveStaffType)
}
//Lấy danh sách loại nhân sự
function getAllType() {
    fetch(getAllTypeApiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === "OK") {
                let tbody = document.querySelector(".type-setting-table tbody")
                const datas = res.data
                datas.forEach(item => {
                    tbody.innerHTML += `
                    <tr>
                    <td>${item.name || "Không có"}</td>
                    
                <td>
                    <i class="fa-regular fa-pen-to-square icon" data-bs-toggle="tooltip"
                        data-bs-placement="bottom" data-bs-title="Chỉnh sửa"
                        data-bs-target="#exampleModal"></i>
                    <i class=" fa-solid fa-trash trash_icon icon " data-bs-toggle="tooltip"
                        data-bs-placement="bottom" data-bs-title="Xoá"></i>
                </td>
                    </tr >
                    `
                });

                //Thêm dấu cộng vào cuối
                let addTypeBtnElement = document.createElement("tr")
                addTypeBtnElement.innerHTML = `
                    <td colspan = "6" class= "salaryLevel add-type-btn" data-bs-toggle="tooltip"
                                    data-bs-placement="bottom" data-bs-title="Thêm một loại nhân sự mới" >
                    <i class=" fa-solid fa-plus" title="Thêm một loại nhân sự mới"></i>
                                </td >
                    `

                //Thêm dữ liệu (Nút thêm loại nhân sự, dấu cộng )vào tbody của bảng
                renderHtmlInnerParent(tbody, addTypeBtnElement)

                //Bắt sự kiện ấn nút dấu cộng thêm loại nhân sự
                const addSalaryBtn = document.querySelector(".add-type-btn")
                addSalaryBtn.addEventListener('click', addStaffTypeClickHandler)
                return;
            }

            return console.log(res);
        })
}


///// Xử lí chức năng thiết lập loại nhân sự

function getAllShiftType() {
    fetch(getAllShiftTypeApiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === "OK") {
                let tbody = document.querySelector(".shift-type-setting-table tbody")
                const datas = res.data
                datas.forEach(item => {
                    tbody.innerHTML += `
                    <tr>
                                <td>${item.name}</td>
                                <td>
                                    <input type="time" disabled pattern="[0-9]{2}:[0-9]{2}" value="${item.start}">
                                </td>
                                <td>
                                    <input type="time" disabled value="${item.end}">
                                </td>
                                <td>
                                    <i class="fa-regular fa-pen-to-square icon" data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Chỉnh sửa"
                                        data-bs-target="#exampleModal"></i>
                                    <i class=" fa-solid fa-trash trash_icon icon " data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Xoá"></i>
                                </td>
                    </tr >
                    `
                });

                //Thêm dấu cộng vào cuối
                let addTypeBtnElement = document.createElement("tr")
                addTypeBtnElement.innerHTML = `
                    <td colspan = "6" class= "salaryLevel add-shift-type-btn" data-bs-toggle="tooltip"
                                    data-bs-placement="bottom" data-bs-title="Thêm một loại nhân sự mới" >
                    <i class=" fa-solid fa-plus" title="Thêm một loại nhân sự mới"></i>
                                </td >
                    `

                //Thêm dữ liệu (Nút thêm loại nhân sự, dấu cộng )vào tbody của bảng
                renderHtmlInnerParent(tbody, addTypeBtnElement)

                //Bắt sự kiện ấn nút dấu cộng thêm loại nhân sự
                const addSalaryBtn = document.querySelector(".add-shift-type-btn")
                addSalaryBtn.addEventListener('click', addShiftTypeClickHandler)
                return;
            }

            return console.log(res);
        })
}

//Xử lí giao diện khi bấm vào dấu cộng thêm vào 1 loại ca làm
function addShiftTypeClickHandler() {
    const typeTable = document.querySelector(".shift-type-setting-table")
    const typeTableBody = typeTable.querySelector("tbody")

    const rowAdd = document.createElement("tr")
    const trTemplate = `
        <td class="">
        <input type="text" class="form-control center" width="200px" placeholder="Tên loại ca">
        </td>
        <td>
            <input type="time" class="form-control center">
        </td>
        <td>
            <input type="time" class="form-control center">
        </td>
        <td>
            <i class="fa-regular fa-pen-to-square icon" data-bs-toggle="tooltip"
                data-bs-placement="bottom" data-bs-title="Chỉnh sửa"></i>
            <i class=" fa-solid fa-trash trash_icon icon " data-bs-toggle="tooltip"
                data-bs-placement="bottom" data-bs-title="Xoá"></i>
                <i class="fa-regular fa-floppy-disk icon add-shift-type-save" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Lưu" title="Lưu"></i>
        </td>
    `
    rowAdd.innerHTML = trTemplate
    //Lấy ra nút cuối
    const addTypeBtn = document.querySelector(".add-shift-type-btn")
    //Xoá nút dấu cộng
    addTypeBtn.remove()

    //Thêm 1 hàng mới để ng dùng nhập dữ liệu
    renderHtmlInnerParent(typeTableBody, rowAdd)


}

function saveStaffType() {
    //Lấy data
    let typeNameAdd = document.querySelector(".typeNameAdd")
    let typeNameValue = typeNameAdd.value
    // let salarySelect = document.querySelector(".salary-select")
    // let salaryValue = salarySelect.value

    if (typeNameValue !== "" && typeNameValue !== " " && typeNameValue !== undefined) {
        const data = {
            name: typeNameValue
        }
        postApi(addStaffTypeApiUrl, JSON.stringify(data))
    } else {
        console.log("b");
        alert("Nhập đầy đủ thông tin")
    }
}

//Hàm gữi dữ liệu lên backend
function postApi(url, payload) {
    fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: payload
    })

        .then(res => res.json())
        .then(res => {
            if (res.status === "OK") {
                console.log(res);
                return location.reload()
            }

            return alert(res);
        })
}