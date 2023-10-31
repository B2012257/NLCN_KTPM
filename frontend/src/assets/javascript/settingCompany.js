const addSalaryApiUrl = `http://localhost:8081/api/v1/manager/addSalary`
const getAllSalaryApiUrl = "http://localhost:8081/api/v1/manager/salaries"
const getAllTypeApiUrl = "http://localhost:8081/api/v1/manager/types"
const getAllShiftTypeApiUrl = "http://localhost:8081/api/v1/manager/allShiftType"
const addStaffTypeApiUrl = "http://localhost:8081/api/v1/manager/addType"
const addShiftTypeApiUrl = "http://localhost:8081/api/v1/manager/addShiftType"
const deleteSalaryApiUrl = "http://localhost:8081/api/v1/manager/deleteSalary"
let editSalaryApiUrl = "http://localhost:8081/api/v1/manager/editSalary"
let editTypeApiUrl = "http://localhost:8081/api/v1/manager/editType"
let editShiftTypeApiUrl = "http://localhost:8081/api/v1/manager/editShiftType"
let deleteStaffTypeApiUrl = "http://localhost:8081/api/v1/manager/deleteType"
let deleteShiftTypeApiUrl = "http://localhost:8081/api/v1/manager/deleteShiftType"

let salaries; //Lưu lại danh sách bậc lương


//Hàm chạy lần đầu khi vào trang
function setUp() {
    //Mở hiệu ứng loading
    turnOnLoadingFunction("salary-loading")
    turnOnLoadingFunction("type-loading")
    turnOnLoadingFunction("shift-type-loading")

    //Giả lập loading nữa giây
    setTimeout(() => {
        getAllSalary()
        getAllType()
        getAllShiftType()
    }, 500)

}

//Chạy các hàm lần đầu khi loading trang
setUp()

//Xử lý bấm thêm salary
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
                        <td class="center">
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

            return alert(res.message)
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
                turnOffLoadingFunction("salary-loading")
                // salaryLoadingParent.remove()

                let tbody = document.querySelector(".salary-setting-table tbody")
                const datas = res.data
                salaries = datas
                datas.forEach(item => {
                    tbody.innerHTML += `
                    <tr>
                        <span class="id salary-id hide">${item.level} </span>
                        <td class="salary-level">
                            ${item.level}
                        </td>
                        <td class="salary-basic">
                        ${item.formattedBasic}
                        </td>
                        <td class="salary-overtime">
                        ${item.formattedOvertime}
                        </td>
                        <td class="salary-allowance">
                        ${item.formattedAllowance}
                        </td>
                        <td style="vertical-align: middle;">
                            <i class=" fa-regular fa-pen-to-square icon"
                                data-bs-placement="bottom" title="Chỉnh sửa" data-bs-toggle="modal" data-bs-target="#editSalaryModal" onClick="handleEditSalaryClick(this)"></i>
                            <i class=" fa-solid fa-trash trash_icon icon" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Xoá" title="Xoá" onclick="deleteSalary(this)"></i>
                            <i class="fa-regular fa-floppy-disk icon edit-salary-save hide" data-bs-toggle="tooltip"
                                data-bs-placement="bottom" data-bs-title="Lưu" title="Lưu"></i>
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
                    
                        <td class="center">
                           
                            
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
                turnOffLoadingFunction("type-loading")

                // typeLoadingParent.remove()

                let tbody = document.querySelector(".type-setting-table tbody")
                const datas = res.data
                datasSort = [...datas].sort()

                datasSort.forEach(item => {
                    tbody.innerHTML += `
                    <tr>
                    <td>
                        <span class="d-none type-id">${item.id}</span>
                        <span class="type-name"> ${item.name || "Không có"}</span>
                    </td>
                    <td>
                        <i class="fa-regular fa-pen-to-square icon" data-bs-toggle="modal" 
                            data-bs-placement="bottom" data-bs-title="Chỉnh sửa"
                            data-bs-target="#editTypeModal" onclick="handleEditStaffType(this)"></i>
                        <i class=" fa-solid fa-trash trash_icon icon " data-bs-toggle="tooltip"
                            data-bs-placement="bottom" data-bs-title="Xoá" onclick="deleteStaffType(this)"></i>
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
                turnOffLoadingFunction("shift-type-loading")
                // shiftTypeLoadingParent.remove()

                let tbody = document.querySelector(".shift-type-setting-table tbody")
                const datas = res.data
                datasSort = [...datas].sort()
                datasSort.forEach(item => {
                    console.log(item.start.split(":")[0]);
                    tbody.innerHTML += `
                    <tr>
                                <td >
                                <span class="shift-type-id d-none">${item.id}</span>
                                <span class="shift-type-name">${item.name}</span></td>
                                <td style="vertical-align: middle;">
                                    <input type="time" disabled value="${item.start}" class="start">
                                </td>
                                <td style="vertical-align: middle;">
                                    <input type="time" disabled value="${item.end}" class="end">
                                </td>
                                <td>
                                    <input type="text" disabled value="${calcTotalTime(item.end, item.start)}" class="form-control w-auto shift-type-add-total center">
                                </td>
                                <td class="center">
                                    <i class="fa-regular fa-pen-to-square icon" data-bs-toggle="modal"
                                        data-bs-placement="bottom" data-bs-title="Chỉnh sửa" data-bs-target="#editShiftTypeModal" onclick="handleEditShiftTypeClick(this)"></i>
                                    <i class=" fa-solid fa-trash trash_icon icon " data-bs-toggle="tooltip"
                                        data-bs-placement="bottom" data-bs-title="Xoá" onclick="deleteShiftType(this)"></i>
                                </td>
                    </tr >
                    `
                });

                //Thêm dấu cộng vào cuối
                let addTypeBtnElement = document.createElement("tr")
                addTypeBtnElement.innerHTML = `
                    <td colspan = "6" class="salaryLevel add-shift-type-btn" data-bs-toggle="tooltip"
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
        //Sắp xếp loại nhân sự theo tên(name)
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

            return alert(res.message);
        })
}




//######################## Xử lí các chức năng loại ca làm
// ##############################Xử lí giao diện khi bấm vào dấu cộng thêm vào 1 loại ca làm
function addShiftTypeClickHandler() {
    const typeTable = document.querySelector(".shift-type-setting-table")
    const typeTableBody = typeTable.querySelector("tbody")

    const rowAdd = document.createElement("tr")
    const trTemplate = `
        <td class="">
        <input type="text" class="form-control center w-auto shift-type-add-name-input" placeholder="Tên loại ca">
        </td>
        <td>
            <input type="time" onchange="setTotalTime()" class="form-control  w-auto shift-type-add-start-input center">
        </td>
        <td>
            <input type="time" onchange="setTotalTime()" class="form-control w-auto shift-type-add-end-input center">
        </td>
        <td>
            <input type="text" disabled class="form-control w-auto shift-type-add-total-input center">
        </td>
        <td class="center">
            
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
    //Bắt sự kiện ấn nút lưu loại ca làm mới
    const addTypeSave = document.querySelector(".add-shift-type-save")
    addTypeSave.addEventListener("click", saveShiftType)
}

function saveShiftType() {
    const shiftTypeName = document.querySelector(".shift-type-add-name-input")
    const shiftTypeStart = document.querySelector(".shift-type-add-start-input")
    const shiftTypeEnd = document.querySelector(".shift-type-add-end-input")

    const shiftTypeNameValue = shiftTypeName.value.trim()
    const shiftTypeStartValue = shiftTypeStart.value.trim() + ":00"
    const shiftTypeEndValue = shiftTypeEnd.value.trim() + ":00"


    //Kiểm tra dữ liệu
    if (shiftTypeNameValue !== "" && shiftTypeNameValue !== null &&
        shiftTypeStartValue !== "" && shiftTypeStartValue !== null &&
        shiftTypeEndValue !== "" && shiftTypeEndValue !== null) {

        let data = {
            name: shiftTypeNameValue,
            start: shiftTypeStartValue,
            end: shiftTypeEndValue
        }

        let areTimeEqual = compartTime(data.start, data.end);
        //True thì mới post api
        if (areTimeEqual === true)
            postApi(addShiftTypeApiUrl, JSON.stringify(data))
        else alert("Thời gian không hợp lệ")
    } else {
        alert("Vui lòng nhập đầy đủ thông tin!")
    }

}
//So sanh gio
function compartTime(startTime, endTime) {
    const time1 = new Date(`2023-10-30T${startTime}`);
    const time2 = new Date(`2023-10-30T${endTime}`);
    if (time1 > time2) {
        return false
    }
    return true
}
function setTotalTime(e) {
    let startTime = document.querySelector(".shift-type-add-start-input").value
    let endTime = document.querySelector(".shift-type-add-end-input").value
    console.log(startTime, endTime);
    let totalTime = calcTotalTime(String(endTime), String(startTime))
    console.log(typeof totalTime);
    console.log(totalTime);
    //set totalTime to input
    //check giờ hợp lệ
    console.log(typeof totalTime.split(" ")[0], totalTime.split(" ")[2], totalTime.split(" ")[2]);
    if (totalTime.split(" ")[0] >= 0) {
        console.log(totalTime);
        document.querySelector(".shift-type-add-total-input").value = totalTime
        console.log(document.querySelector(".shift-type-add-total-input"));
        return;
    } else {
        console.log(totalTime);
        document.querySelector(".shift-type-add-total-input").value = ""

    }
}
function calcTotalTime(EndTime, StartTime) {

    // Thời gian bắt đầu và kết thúc dưới dạng chuỗi HH:MM:SS
    const startTimeStr = StartTime;
    const endTimeStr = EndTime;

    // Tách giờ, phút và giây từ chuỗi thời gian
    const startTimeParts = startTimeStr.split(':');
    const endTimeParts = endTimeStr.split(':');

    // Chuyển đổi thời gian thành số giây
    const startTimeSeconds = (+startTimeParts[0] * 3600) + (+startTimeParts[1] * 60) + 0;
    const endTimeSeconds = (+endTimeParts[0] * 3600) + (+endTimeParts[1] * 60) + 0;

    // Tính khoản thời gian giữa chúng
    const timeDifferenceSeconds = endTimeSeconds - startTimeSeconds;

    // Chuyển đổi khoản thời gian thành giờ, phút và giây
    const hours = Math.floor(timeDifferenceSeconds / 3600);
    const minutes = Math.floor((timeDifferenceSeconds % 3600) / 60);
    let total = hours + " tiếng " + minutes + " phút"
    if (hours !== 0 && minutes !== 0) {
        return total
    }
    else if (hours !== 0 && minutes === 0)
        return hours + " tiếng"
    return + minutes + " phút";

}

// function closeRow(thisElement) {
//     let tr = thisElement.parentElement.parentElement
//     let tbody = tr.parentElement
//     //Xóa hàng
//     tr.remove()
//     //Thêm dấu cộng vào cuối
//     let trAddBtnElement = document.createElement("tr")
//     trAddBtnElement.innerHTML = `
//                      <td colspan="5" class="salaryLevel add-salary-btn" data-bs-toggle="tooltip"
//                          data-bs-placement="bottom" data-bs-title="Thêm một bậc lương mới">
//                          <i class=" fa-solid fa-plus" title="Thêm một bậc lương mới"></i>

//                      </td>
//      `
//     renderHtmlInnerParent(tbody, trAddBtnElement)
// }

//Chức năng xóa các thông tin
//Xóa Salary -> body khác, còn lại xóa loại ca với loại nhân sự truyền body {id} viết chung 1 hàm
async function deleteSalary(thisElement) {
    let trInfo = thisElement.parentElement.parentElement
    let levelToDeleted = trInfo.querySelector(".salary-level").innerHTML.trim()
    console.log(levelToDeleted);
    let dataDelete = {
        level: levelToDeleted
    }
    let deleteRs = await deleteApi(deleteSalaryApiUrl, dataDelete)
    if (deleteRs.status === "OK") {
        //Thành công
        alert(deleteRs.message)
        return location.reload()
    }
    return alert(deleteRs.message)
}

async function deleteApi(apiUrl, dataBody) {
    const response = await fetch(apiUrl, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataBody)
    })
    const data = await response.json();
    return data;
}


async function deleteStaffType(thisElement) {
    let trInfo = thisElement.parentElement.parentElement
    let idToDeleted = trInfo.querySelector(".type-id").innerHTML.trim()
    console.log(idToDeleted);
    let dataDelete = {
        id: idToDeleted
    }
    let deleteRs = await deleteApi(deleteStaffTypeApiUrl, dataDelete)
    if (deleteRs.status === "OK") {
        //Thành công
        alert(deleteRs.message)
        return location.reload()
    }
    return alert(deleteRs.message)
}

async function deleteShiftType(thisElement) {
    let trInfo = thisElement.parentElement.parentElement
    let idToDeleted = trInfo.querySelector(".shift-type-id").innerHTML.trim()
    console.log(idToDeleted);
    let dataDelete = {
        id: idToDeleted
    }
    let deleteRs = await deleteApi(deleteShiftTypeApiUrl, dataDelete)
    if (deleteRs.status === "OK") {
        //Thành công
        alert(deleteRs.message)
        return location.reload()
    }
    return alert(deleteRs.message)
}

//Chức năng chỉnh sửa 

//Bắt sự kiện click vào nút chỉnh sửa bậc lương
let salaryOld
function handleEditSalaryClick(thisElement) {
    salaryOld = null
    //Lấy thông tin lương vừa click
    let tr = thisElement.parentElement.parentElement
    let editModal = document.querySelector(".edit-salary-modal .modal-content")

    let salaryLevel = tr.querySelector(".salary-level").innerHTML.trim()
    let basic = tr.querySelector(".salary-basic").innerHTML.replaceAll(',', '').replaceAll('VND', '').trim()
    let overTime = tr.querySelector(".salary-overtime").innerHTML.replaceAll(',', '').replaceAll('VND', '').trim()
    let allowance = tr.querySelector(".salary-allowance").innerHTML.replaceAll(',', '').replaceAll('VND', '').trim()

    //Lấy các input cần đổ dữ liệu vào
    let levelNameInput = editModal.querySelector(".level-name")
    let basicInput = editModal.querySelector(".basic")
    let overtimeInput = editModal.querySelector(".overtime")
    let allowanceInput = editModal.querySelector(".allowance")

    //Đổ dữ liệu
    levelNameInput.value = salaryLevel
    basicInput.value = basic
    overtimeInput.value = overTime
    allowanceInput.value = allowance

    salaryOld = {
        level: salaryLevel,
        basic,
        overtime: overTime,
        allowance
    }
}

async function handlerSaveEditSalaryClick(thisElement) {
    //Lấy dữ liệu mới để lưu
    // console.log(salaryOld);
    let salaryNew = {}
    let editModal = document.querySelector(".edit-salary-modal .modal-content")

    //Lấy các input lấy dữ liệu ra để kiểm tra

    let levelNameInputValue = editModal.querySelector(".level-name").value.trim()
    let basicInputValue = editModal.querySelector(".basic").value.trim()
    let overtimeInputValue = editModal.querySelector(".overtime").value.trim()
    let allowanceInputValue = editModal.querySelector(".allowance").value.trim()

    salaryNew = {
        level: levelNameInputValue,
        basic: basicInputValue,
        overtime: overtimeInputValue,
        allowance: allowanceInputValue
    }
    let isEqual = areValuesEqualInObject(salaryNew, salaryOld)
    if (!isEqual) {

        console.log(isEqual, "callApi");
        let data = await putApi(editSalaryApiUrl, salaryNew)
        if (data.status === 'OK') {
            alert(data.message)
            return location.reload()
        }
        else alert(data.message)
    }
}

async function putApi(url, dataBody) {
    const rs = await fetch(url, {
        method: "PUT",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataBody)
    })
    let response = rs.json()
    return response
}
//Đưa về giá trị mặc định
function handlerDefaultEditSalaryClick() {
    if (!salaryOld) {
        return alert("Không có giá trị mặc định")
    }
    let editModal = document.querySelector(".edit-salary-modal .modal-content")

    let levelNameInput = editModal.querySelector(".level-name")
    let basicInput = editModal.querySelector(".basic")
    let overtimeInput = editModal.querySelector(".overtime")
    let allowanceInput = editModal.querySelector(".allowance")

    //Đổ dữ liệu
    levelNameInput.value = salaryOld.level
    basicInput.value = salaryOld.basic
    overtimeInput.value = salaryOld.overtime
    allowanceInput.value = salaryOld.allowance
}


//So sánh 2 object
function areValuesEqualInObject(obj1, obj2) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false; // Số lượng key không giống nhau
    }

    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false; // Giá trị của key không giống nhau
        }
    }

    return true; // Các key giống nhau và giá trị tương ứng cũng giống nhau
}
let type_default_value
function handleEditStaffType(thisElement) {
    type_default_value = {}

    let editType_modal = document.querySelector(".edit-type")
    let type_name_input = editType_modal.querySelector("#type-name")

    let tr = thisElement.parentElement.parentElement
    let type_id = tr.querySelector(".type-id").innerHTML //id cần chỉnh sửa
    let type_name_default = tr.querySelector(".type-name").innerHTML

    //Đổ dữ liệu mặc định vào input
    type_name_input.value = type_name_default
    type_default_value = {
        id: type_id,
        name: type_name_default
    }

}

async function handleSaveEditStaffType(thisElement) {
    //Lấy dữ liệu mới
    let editType_modal = document.querySelector(".edit-type")
    let type_name_input = editType_modal.querySelector("#type-name")
    let new_name_value = type_name_input.value

    let new_type_value = {
        id: type_default_value.id,
        name: new_name_value
    }
    let areObjectsEqual = areValuesEqualInObject(new_type_value, type_default_value)
    //Nếu khác thì call api
    if (!areObjectsEqual) {
        const rs = await putApi(editTypeApiUrl, new_type_value)
        if (rs.status === "OK") {
            alert("Chỉnh sửa thành công");
            return location.reload()
        }
        return alert(rs.message)
    }
}

function handleClickDefaultEditStaffType(thisElement) {
    //Lấy dữ liệu mới
    let editType_modal = document.querySelector(".edit-type")
    let type_name_input = editType_modal.querySelector("#type-name")
    type_name_input.value = type_default_value.name
}

let shift_type_default
function handleEditShiftTypeClick(thisElement) {
    shift_type_default = {}

    let tr = thisElement.parentElement.parentElement;
    let editShiftTypeModal = document.querySelector(".edit-shift-type-modal")

    let shift_type_name_new_input = editShiftTypeModal.querySelector("#shift-type-name")
    let shift_type_start_new_input = editShiftTypeModal.querySelector("#start")
    let shift_type_end_new_input = editShiftTypeModal.querySelector("#end")

    let shiftTypeId = tr.querySelector(".shift-type-id").innerHTML
    let shiftTypeName_default = tr.querySelector(".shift-type-name").innerHTML
    let shift_type_start = tr.querySelector(".start").value
    let shift_type_end = tr.querySelector(".end").value


    //Rán dữ liệu cũ
    //Cắt 2 con 0 cuối
    let newShiftType_end = shift_type_end.split(":")[0] + ":" + shift_type_end.split(":")[1]
    let newShiftType_start = shift_type_start.split(":")[0] + ":" + shift_type_start.split(":")[1]

    shift_type_name_new_input.value = shiftTypeName_default
    shift_type_start_new_input.value = newShiftType_start
    shift_type_end_new_input.value = newShiftType_end


    shift_type_default = {
        id: shiftTypeId,
        name: shiftTypeName_default,
        start: shift_type_start,
        end: shift_type_end
    }

}

function handleDefaultClickShiftType() {
    let editShiftTypeModal = document.querySelector(".edit-shift-type-modal")

    let shift_type_name_new_input = editShiftTypeModal.querySelector("#shift-type-name")
    let shift_type_start_new_input = editShiftTypeModal.querySelector("#start")
    let shift_type_end_new_input = editShiftTypeModal.querySelector("#end")

    shift_type_name_new_input.value = shift_type_default.name
    shift_type_start_new_input.value = shift_type_default.start
    shift_type_end_new_input.value = shift_type_default.end

}

async function handleSaveShiftType() {
    //Lấy dữ liệu mới
    let editShiftTypeModal = document.querySelector(".edit-shift-type-modal")

    let shift_type_name_new_input = editShiftTypeModal.querySelector("#shift-type-name")
    let shift_type_start_new_input = editShiftTypeModal.querySelector("#start")
    let shift_type_end_new_input = editShiftTypeModal.querySelector("#end")
    let new_value = {
        id: shift_type_default.id,
        name: shift_type_name_new_input.value,
        start: shift_type_start_new_input.value + ":00",
        end: shift_type_end_new_input.value + ":00"
    }
    //Kiểm tra so với dữ liệu cũ
    let areObjectsEqual = areValuesEqualInObject(new_value, shift_type_default)
    //Nếu khác thì call api
    if (!areObjectsEqual) {
        console.log(new_value);
        if (compartTime(new_value.start, new_value.end)) {
            const rs = await putApi(editShiftTypeApiUrl, new_value)
            if (rs.status === "OK") {
                alert("Chỉnh sửa thành công");
                return location.reload()
            }
            return alert(rs.message || "Không thành công")
        } else {
            alert("Thời gian không hợp lệ")
        }


    }
}