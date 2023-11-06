const getAllSalaryApiUrl = "http://localhost:8081/api/v1/manager/salaries"
const getAllTypeApiUrl = "http://localhost:8081/api/v1/manager/types"
const getAllShiftTypeApiUrl = "http://localhost:8081/api/v1/manager/allShiftType"
const addStaffApi = "http://localhost:8081/api/v1/manager/addStaff"
const recentStaffsApiUrl = "http://localhost:8081/api/v1/manager/staff/recent"
const defaultAvatarUrl = "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
let getStaffInfoApiUrl = "http://localhost:8081/api/v1/staff/info" //?Uid=NS2283
let editRecentStaffApiUrl = 'http://localhost:8081/api/v1/manager/editStaff'
let deleteRecentStaffApiUrl = 'http://localhost:8081/api/v1/manager/deleteStaff'

let recentStaffs;
let avatarUrl
let salaries
let staffTypes
let recentStaff // Danh sách nhân sự vừa thêm lần trước
let edit_change_avatar // Lưu thông tin ảnh đại diện thay đổi
async function setUp() {
    turnOnLoadingFunction("recent-spinner")

    salaries = await getAllSalary()
    staffTypes = await getAllType()

    //Load bậc lương vào thẻ select
    loadSalariesHtml(salaries, "salary-select", "salary-select", (e) => handleChangeSalaryLevel(e, "salary-detail"))
    //Load loại nhân sự vào thẻ select
    loadStaffTypeHtml(staffTypes, "type-select")

    //thêm sự kiện nút thêm nhân sự
    document.querySelector(".add-staff-btn").addEventListener("click", (e) => handleClickAddStaff(e))

    recentStaff = await getRecentStaff()
    recentStaffs = recentStaff
    loadStaffRecentHtml(recentStaffs)


}
setUp()
//Hàm xóa dấu tiếng việt
//Ref:  https://gist.github.com/hu2di/e80d99051529dbaa7252922baafd40e3
function StringFormatVietnameseSign(string) {
    var str = string;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/ + /g, " ");
    str = str.trim();
    return str;
}
//Cài đặt cloundary widget
var myWidget = cloudinary.createUploadWidget({
    cloudName: 'dfcjwhc7o',
    uploadPreset: 'cdootl7q'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Done! Here is the image info: ', result.info);
        let url = result.info.url
        avatarUrl = url
        turnOnToast("Tải lên thành công", "Ảnh đã được tải lên thành công!");
    }
}
)
var myWidget_Edit = cloudinary.createUploadWidget({
    cloudName: 'dfcjwhc7o',
    uploadPreset: 'cdootl7q'
}, (error, result) => {
    if (!error && result && result.event === "success") {
        console.log('Avatar chỉnh sửa: ', result.info);
        let url = result.info.url
        edit_change_avatar = url
        turnOnToast("Tải lên thành công", "Ảnh đã được tải lên thành công!");
    }
}
)
//Init toast
var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl, {
        autohide: true,
        animation: true
    })
})

document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
}, false);

document.getElementById("upload_widget-edit").addEventListener("click", function () {
    myWidget_Edit.open();

}, false);
//Lấy danh sách bậc lương khi vừa vào trang
async function getAllSalary() {
    const response = await fetch(getAllSalaryApiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    if (data.status === "OK") {
        console.log("Phản hồi từ API:", data); // In phản hồi ra màn hình
        return data.data
    }
    else alert("Lỗi lấy danh sách bậc lương")
}
function renderHtmlInnerParent(parentElement, elementRendering) {
    parentElement.appendChild(elementRendering)
}

//Lấy danh sách loại nhân sự
async function getAllType() {
    const response = await fetch(getAllTypeApiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    if (data.status === "OK") {
        console.log("Phản hồi từ API:", data); // In phản hồi ra màn hình
        return data.data
    }
    else alert("Lỗi lấy danh sách loại nhân sự")
}

function formatDateString(dateString) {
    // Tách ngày, tháng, năm từ chuỗi đầu vào
    const parts = dateString.split('/');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    // Chuyển đổi ngày và tháng thành chuỗi có 2 chữ số, nếu cần
    const formattedDay = day.length === 1 ? '0' + day : day;
    const formattedMonth = month.length === 1 ? '0' + month : month;

    // Tạo chuỗi ngày tháng năm đã được định dạng
    const formattedDateString = `${year}/${formattedMonth}/${formattedDay}`;

    return formattedDateString;
}

async function getRecentStaff() {
    let end = new Date()
    let endString = `${end.getFullYear()}/${end.getMonth() + 1}/${end.getDate() + 1}`
    //Lấy từ ngày hiện tại + 1 vì nó chỉ lấy tại lúc 00:00:00 của sáng ngày hiện tại, nhưng nhân sự thêm sau ngày hiện tại (vd lúc 7h sáng ngày hiện tại) 
    //thì sẽ không lấy đc

    let sevenDayBefore = new Date(end.setDate(end.getDate() - 7));
    let sevenDayBeforeString = `${sevenDayBefore.getFullYear()}/${sevenDayBefore.getMonth() + 1}/${sevenDayBefore.getDate()}`

    let url = `${recentStaffsApiUrl}?start=${formatDateString(sevenDayBeforeString)}&end=${formatDateString(endString)}`
    console.log(url);
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    if (data.status === "OK") {
        console.log("Phản hồi từ API:", data); // In phản hồi ra màn hình
        return data.data
    }
    else alert(data.data.message)
}
//Thêm 1 con vào cuối element cha
function renderElementInnerParent(parentElementClassName, childrenElement) {
    let parentElement = document.querySelector(`.${parentElementClassName}`)
    //Nếu truyền đúng tên element
    if (parentElement && childrenElement) {
        parentElement.appendChild(childrenElement)
    }
    //Không đúng thì báo lỗi
    else
        return alert("Invalid class elements")
}


//Thêm các bậc lương vào giao diện
function loadSalariesHtml(salaries, salaryParentElementClassName, salarySelectInputClassName, handleChangeSalaryLevelFunction) {
    salaries.forEach(salary => {
        //Tạo 1 thẻ option 
        let optionTag = document.createElement("option")
        optionTag.value = salary.level
        optionTag.innerText = salary.level
        renderElementInnerParent(salaryParentElementClassName, optionTag)
    });
    //Thêm sự kiện đổi bậc lương để hiển thị thông tin chi tiết bậc lương đó
    document.querySelector(`.${salarySelectInputClassName}`).addEventListener("change", (e) => handleChangeSalaryLevelFunction(e))
}

//Thêm loại nhân sự vào giao diện
function loadStaffTypeHtml(staffTypes, typeSelectElementClassName) {

    staffTypes.forEach(type => {
        //Tạo 1 thẻ option 
        let optionTag = document.createElement("option")
        optionTag.value = type.id
        optionTag.innerText = type.name
        renderElementInnerParent(typeSelectElementClassName, optionTag)
    });
}

//Xử lí sự kiện ấn nút thêm nhân sự
async function handleClickAddStaff(e) {
    e.preventDefault()
    //Lấy thông tin người dùng vừa nhập và kiểm tra
    let fullname = document.querySelector(".fullname-add-employee-input").value.trim()
    let typeId = document.querySelector(".staff-type-add-employee-select").value.trim()
    let salaryLevel = document.querySelector(".salary-add-employee-salect").value.trim()
    let location = document.querySelector(".location-add-employee-input").value.trim()
    let phone = document.querySelector(".phone-add-employee-input").value.trim()
    let bankName = document.querySelector(".bank-name-add-employee-select").value.trim()
    let gender = document.querySelector(".gender-employee-select").value.trim()
    let beginWork = document.querySelector(".begin-work-employee-input").value.trim()
    let bankNumber = document.querySelector(".bank-number-employee-input").value.trim()


    //Kiểm tra data
    //Kiểm tra không được để trống
    if (fullname, typeId, salaryLevel, location, phone, bankName, gender, beginWork, bankNumber && salaryLevel !== '0' && typeId !== '0' && gender !== '0') {

        let randomNumber = Math.round(Math.random() * 10000)
        let fullnameFormat = StringFormatVietnameseSign(fullname)
        let nameArray = fullnameFormat.split(" ")
        let name = nameArray[nameArray.length - 1] || ''
        let surfaceName = nameArray[nameArray.length - 2] || ''
        let userName = surfaceName + name + randomNumber
        console.log(userName, randomNumber);
        if (!avatarUrl) {
            avatarUrl = defaultAvatarUrl
        }
        let data = {
            fullName: fullname,
            userName,
            password: "123123",
            type: {
                id: typeId
            },
            salary: {
                "level": salaryLevel
            },
            location,
            phone,
            bankName,
            gender,
            beginWork,
            bankAccount: bankNumber,
            urlAvatar: avatarUrl
        }
        console.log(data);
        let responsePostApi = await postAddStaffApi(data)
        console.log(responsePostApi);

        setTimeout(() => {
            document.location.reload()

        }, 500)
    } else turnOnToast("Không thành công", "Vui lòng nhập đầy đủ thông tin!")
    //Sinh username
}

//Lấy danh sách loại nhân sự
async function postAddStaffApi(data) {
    console.log(data)
    const response = await fetch(addStaffApi, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const dataRs = await response.json();
    if (dataRs.status === "OK") {
        alert("Thêm thành công nhân sự")
        turnOnToast("Thành công", dataRs.message)
        console.log("Phản hồi từ API thêm nhân sự:", dataRs); // In phản hồi ra màn hình
        return dataRs.data
    }
    else alert(dataRs.message);
}

function loadStaffRecentHtml(staffs) {

    if (staffs.length === 0) {
        let divTag = document.createElement("div")
        divTag.classList.add("list-group")
        divTag.innerHTML = `
       <p class="center"> Không có thông tin  </p>
        `
        turnOffLoadingFunction("recent-spinner")

        renderElementInnerParent("card-body-recent", divTag)

    }
    turnOffLoadingFunction("recent-spinner")

    staffs.forEach(staff => {
        //Tạo 1 thẻ option 
        let divTag = document.createElement("div")
        divTag.classList.add("list-group")
        let createTimeDate = new Date(staff.createdDateTime)
        let createTimeFormat = `${createTimeDate.getHours()}:${createTimeDate.getMinutes()}, ${createTimeDate.getDate()}/${createTimeDate.getMonth() + 1}`
        let diffDay;//Tính so với hiện tại là bao nhiêu ngày

        // Tính toán khoảng cách giữa hai ngày (đơn vị là mili-giây)
        const timeDifference = new Date().getTime() - createTimeDate.getTime();

        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); //Đổi ra giây -> Ra phút -> Ra giờ -> ra ngày
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); //Đổi ra giây -> Ra phút -> Ra giờ

        let dayTimeDifference;
        console.log(daysDifference, hoursDifference);
        if (daysDifference === 0) {
            if (hoursDifference !== 0)
                dayTimeDifference = `${hoursDifference} giờ trước`
            else
                dayTimeDifference = "Bây giờ"
        }
        else
            dayTimeDifference = `${daysDifference} ngày trước`
        divTag.innerHTML = `
                            <button class="list-group-item list-group-item-action mt-1" onclick="handleClickOnRecentStaff(this)"
                                data-bs-toggle="modal" data-bs-target="#modal">
                                <div class="d-flex w-100 justify-content-between">
                                    <span class="d-none staff-uid">${staff.uid}</span>
                                    <p class="mb-1 fw-bold fs-6">${staff.fullName}
                                    <br />
                                        <span class="badge bg-primary">${staff.type.name}</span>
                                    </p>
                                    <small class="text-body-secondary">${dayTimeDifference}</small>
                                    </div>
                                    <small class="text-body-secondary">Thêm vào: ${createTimeFormat}</small>
                            </button>
        `
        renderElementInnerParent("card-body-recent", divTag)
    });
}

//Xử lí khi bấm vào 1 nhân sự vừa thêm
async function handleClickOnRecentStaff(thisElement) {
    let staffUid = thisElement.querySelector(".staff-uid").innerText
    let staffRs = await getStaffInfo(staffUid)
    //Thành công
    if (staffRs.status === "OK") {
        console.log("Lấy thông tin nhân sự thành công");
        //Hiển thị ra giao diện
        showStaffInfoIntoForm(staffRs.data)
    } else {
        alert("Lỗi lấy thông tin ", staffRs.message);
    }
}

//Lấy thông tin nhân sự
async function getStaffInfo(uid) {
    let apiUrl = `${getStaffInfoApiUrl}?Uid=${uid}`
    return await getApi(apiUrl)
}

//Hiển thị vào thông tin nhân sự vào form
//Recent information db data
let recentDbData
function showStaffInfoIntoForm(staffInfo) {
    console.log(staffInfo);
    recentDbData = {}
    let avatar = document.querySelector(".edit-avatar")
    let fullNameElement = document.querySelector(".fullname-edit-employee-input")
    let userNameElement = document.querySelector(".username-edit-employee-input")
    let staffTypeElement = document.querySelector(".staff-type-edit-employee-select")
    let phoneElement = document.querySelector(".phone-edit-employee-input")
    let salarySelectElement = document.querySelector(".edit-salary-select")
    let salaryDetail = document.querySelector(".edit-salary-detail")
    let locationElement = document.querySelector(".location-edit-employee-input")
    let bankNameSelectElement = document.querySelector(".bank-name-edit-employee-select")
    let bankNumberInputElement = document.querySelector(".bank-number-employee-input-edit")
    let genderElement = document.querySelector(".edit-gender-employee-select")
    let beginWorkElement = document.querySelector(".edit-begin-work-employee-input")

    avatar.src = staffInfo.urlAvatar
    fullNameElement.value = staffInfo.fullName
    userNameElement.value = staffInfo.userName
    locationElement.value = staffInfo.location
    phoneElement.value = staffInfo.phone
    bankNameSelectElement.value = staffInfo.bankName
    bankNumberInputElement.value = staffInfo.bankAccount
    genderElement.value = staffInfo.gender
    beginWorkElement.value = staffInfo.beginWork

    //Lưu lại data cũ
    recentDbData = {

        uid: staffInfo.uid,
        fullName: staffInfo.fullName,
        gender: staffInfo.gender,
        phone: staffInfo.phone,
        beginWork: staffInfo.beginWork,
        location: staffInfo.location,
        bankName: staffInfo.bankName,
        username: staffInfo.userName,
        bankAccount: staffInfo.bankAccount,
        urlAvatar: staffInfo.urlAvatar,
        type: {
            id: (Number)(staffInfo.type.id)
        },
        salary: {
            level: staffInfo.salary.level
        }
    }
    // console.log(recentDbData);
    //Hiển thị danh sách vào select trước
    //Load bậc lương vào thẻ select
    //Làm rỗng dữ liệu
    document.querySelector(".type-select-edit").innerHTML = `<option checked value="0">Loại nhân sự</option>`
    document.querySelector(".edit-salary-select").innerHTML = `<option checked value="0">Bậc lương</option>`
    loadSalariesHtml(salaries,
        "salary-edit-employee-salect",
        "salary-edit-employee-salect",
        (e) => handleChangeSalaryLevel(e, "edit-salary-detail"))

    //Load loại nhân sự vào thẻ select
    loadStaffTypeHtml(staffTypes, "type-select-edit")

    staffTypeElement.value = staffInfo.type.id

    salarySelectElement.value = staffInfo.salary.level
    let salary = staffInfo.salary
    let valueString = `Cơ bản: ${salary.formattedBasic}; Tăng ca ${salary.formattedOvertime}; Trợ cấp ${salary.formattedAllowance}/Tháng`
    //Hiển thị chi tiết bậc lương vào input
    salaryDetail.value = valueString
    console.log("1");
    //
}

//Hàm call api method get và return response
async function getApi(apiUrl) {
    const response = await fetch(apiUrl, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const dataRs = response.json();
    return dataRs;
}

//Xử lí sự kiện chọn bậc lương thì sẽ hiện chỉ số bậc lương đó
function handleChangeSalaryLevel(e, editSalaryDetailClassName) {
    let levelTarget = e.target.value
    console.log(levelTarget);
    let salaryDetailInput = document.querySelector(`.${editSalaryDetailClassName}`)
    if (levelTarget !== "0") {
        let detailOfTarget
        for (const salary of salaries) {
            if (salary.level === levelTarget) {
                detailOfTarget = salary
                break;
            }
        }

        let valueString = `Cơ bản: ${detailOfTarget.formattedBasic}; Tăng ca ${detailOfTarget.formattedOvertime}; Trợ cấp ${detailOfTarget.formattedAllowance}/Tháng`
        salaryDetailInput.value = valueString

    } else {
        salaryDetailInput.value = "Vui lòng chọn bậc lương"
    }
}
//Thêm sự kiện nút lưu thay đổi
document.querySelector(".save-edit-recent-staff").addEventListener('click', editStaffJustAdd)
//Edit staff just add - Chỉnh sửa nhân sự vừa thêm trong 7 ngày
async function editStaffJustAdd() {
    //Lấy dữ liệu mới
    let avatar = document.querySelector(".edit-avatar")
    let fullNameElement = document.querySelector(".fullname-edit-employee-input")
    let userNameElement = document.querySelector(".username-edit-employee-input")
    let staffTypeElement = document.querySelector(".staff-type-edit-employee-select")
    let phoneElement = document.querySelector(".phone-edit-employee-input")
    let salarySelectElement = document.querySelector(".edit-salary-select")
    let salaryDetail = document.querySelector(".edit-salary-detail")
    let locationElement = document.querySelector(".location-edit-employee-input")
    let bankNameSelectElement = document.querySelector(".bank-name-edit-employee-select")
    let bankNumberInputElement = document.querySelector(".bank-number-employee-input-edit")
    let genderElement = document.querySelector(".edit-gender-employee-select")
    let beginWorkElement = document.querySelector(".edit-begin-work-employee-input")

    let newData = {
        uid: recentDbData.uid,
        fullName: fullNameElement.value,
        gender: genderElement.value,
        phone: phoneElement.value,
        beginWork: beginWorkElement.value,
        location: locationElement.value,
        bankName: bankNameSelectElement.value,
        username: userNameElement.value,
        bankAccount: bankNumberInputElement.value,
        urlAvatar: edit_change_avatar || avatar.src,
        type: {
            id: (Number)(staffTypeElement.value.trim())
        },
        salary: {
            level: salarySelectElement.value
        }
    }


    //So sánh 2 object
    let areEqual = areObjectsEqual(recentDbData, newData)
    console.log(areEqual);
    if (!areEqual) {
        //Enable nút lưu
        console.log("Call api");
        let rsData = await putApi(editRecentStaffApiUrl, newData);
        if (rsData.status === 'OK') {
            alert('Chỉnh sửa thành công!')
            return location.reload()
        }
        alert(rsData.message)
        return location.reload()
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
//So sánh 2 object, có giá trị là 1 object khác
function areObjectsEqual(obj1, obj2) {
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false; // Số lượng khóa khác nhau
    }

    for (const key of keys1) {
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            if (!areObjectsEqual(obj1[key], obj2[key])) {
                console.log('Các khóa khác nhau');

                return false; // Kiểm tra đệ quy các đối tượng lồng nhau
            }
        } else if (obj1[key] !== obj2[key]) {
            console.log('Giá trị của các khóa không giống nhau');
            return false; // Giá trị của các khóa không giống nhau
        }
    }

    return true; // Đối tượng giống nhau
}

document.querySelector(".delete-staff-btn").addEventListener('click', deleteRecentStaff)

async function deleteRecentStaff() {
    //Hiển thị bản conform
    let deleteConform = confirm('Bạn chắc chắn muốn xóa nhân sự này')
    if (deleteConform) {
        let uidToDeleted = recentDbData.uid
        deleteRecentStaffApiUrl
        let deleteRs = await deleteApi(`${deleteRecentStaffApiUrl}/${uidToDeleted}`)
        if (deleteRs.status === 'OK') {
            alert(deleteRs.message)
            return location.reload()
        }
        alert(deleteRs.message)
        return location.reload()
    }

}

async function deleteApi(apiUrl) {
    const response = await fetch(apiUrl, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json();
    return data;
}
