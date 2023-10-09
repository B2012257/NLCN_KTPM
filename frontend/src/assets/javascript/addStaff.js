const getAllSalaryApiUrl = "http://localhost:8081/api/v1/manager/salaries"
const getAllTypeApiUrl = "http://localhost:8081/api/v1/manager/types"
const getAllShiftTypeApiUrl = "http://localhost:8081/api/v1/manager/allShiftType"
const addStaffApi = "http://localhost:8081/api/v1/manager/addStaff"
const recentStaffsApiUrl = "http://localhost:8081/api/v1/manager/staff/recent"
const defaultAvatarUrl = "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png"
let recentStaffs;
let avatarUrl

let salaries
let staffTypes
let recentStaff // Danh sách nhân sự vừa thêm lần trước
async function setUp() {
    turnOnLoadingFunction("recent-spinner")
    salaries = await getAllSalary()
    staffTypes = await getAllType()
    //Load bậc lương vào thẻ select
    loadSalariesHtml(salaries)
    //Load loại nhân sự vào thẻ select
    loadStaffTypeHtml(staffTypes)

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
    }
}
)

document.getElementById("upload_widget").addEventListener("click", function () {
    myWidget.open();
}, false
    //Load chức vụ

    //Load bậc lương
);

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

    // console.log(dateString + " Trong ham format string");
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
function loadSalariesHtml(salaries) {
    salaries.forEach(salary => {
        //Tạo 1 thẻ option 
        let optionTag = document.createElement("option")
        optionTag.value = salary.level
        optionTag.innerText = salary.level
        renderElementInnerParent("salary-select", optionTag)
    });
    //Thêm sự kiện đổi bậc lương để hiển thị thông tin chi tiết bậc lương đó
    document.querySelector(".salary-add-employee-salect").addEventListener("change", (e) => handleChangeSalaryLevel(e))
}

//Thêm loại nhân sự vào giao diện
function loadStaffTypeHtml(staffTypes) {
    console.log(staffTypes);

    staffTypes.forEach(type => {
        //Tạo 1 thẻ option 
        let optionTag = document.createElement("option")
        optionTag.value = type.id
        optionTag.innerText = type.name
        renderElementInnerParent("type-select", optionTag)
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
        let name = nameArray[nameArray.length - 1]
        let surfaceName = nameArray[nameArray.length - 2]
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


        document.location.reload()
    } else alert("Vui lòng nhập đầy đủ thông tin nhân sự")
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
                            <button class="list-group-item list-group-item-action mt-1" onclick=""
                                data-bs-toggle="modal" data-bs-target="#modal">
                                <div class="d-flex w-100 justify-content-between">
                                    <span class="d-none">${staff.uid}</span>
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


//Xử lí sự kiện chọn bậc lương thì sẽ hiện chỉ số bậc lương đó
function handleChangeSalaryLevel(e) {
    let levelTarget = e.target.value
    let salaryDetailInput = document.querySelector('.salary-detail')
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