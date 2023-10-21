
const getAllShiftTypeApi = "http://localhost:8081/api/v1/manager/allShiftType"
const getScheduleOfBetween = "http://localhost:8081/api/v1/manager/getAllSchedule" //?startDay=2023/10/10&endDay=2023/10/10
let scheduleApi = "http://localhost:8081/api/v1/manager/schedule"
let createShift = "http://localhost:8081/api/v1/manager/addShift"
let deleteShiftApi = "http://localhost:8081/api/v1/manager/deleteShift"
let firstValueTotalTime; //Lưu thời gian ca chuẩn

//Hàm chính 
async function setup(weekList) {

    //Load các ca vào bảng
    let shiftTypesRes = await getAllShiftType()
    loadShiftTypeHtml(shiftTypesRes.data)

    loadWeekDay(weekList) //Hiển thị ngày vào bảng
    // document.querySelector(".")
    //Load các ca dã lập lịch trong tuần của ngày hiện tại
    let scheduleRes = await getAllScheduleAtWeek(weekList)
    loadScheduleHtml(scheduleRes.data)

    //Thêm sự kiện ấn nút lập lịch cho 1 ca trong ngày hoặc chỉnh sửa
    let actionScheduleBtnList = document.querySelectorAll(".action-schedule-btn")
    actionScheduleBtnList.forEach(actionBtn => {
        actionBtn.addEventListener("click", (e) => actionBtnClickHandler(e))
    })

    //Thêm sự kiện vào nút lưu lịch 
    document.querySelector(".save-schedule").addEventListener("click", saveScheduleHandler)
    document.querySelector(".delete-scheduled").addEventListener("click", deleteShiftHandler)

}


//Truyền vào tuần vừa mới lập lịch bằng cách lấy 1 ngày của trong tuần của lượt reload trước để tìm tuần vừa lặp, để tối ưu trải nghiệm 
let preDoingDate = JSON.parse(localStorage.getItem("dayScheduling"))
let date = new Date()
if (preDoingDate)
    date = new Date(preDoingDate)

let weekList = getWeekList(date)
document.querySelector(".dayInWeek").innerText = weekList[0].day
setup(weekList)

//Clear localStorage 
localStorage.removeItem("dayScheduling");

//Thêm sự kiện tiến lùi tuần
document.querySelector(".previous-week").addEventListener("click", () => getPreviousWeek())
document.querySelector(".next-week").addEventListener("click", () => getNextWeek())

async function getAllShiftType() {
    return await getApi(getAllShiftTypeApi)
}
function loadShiftTypeHtml(shiftTypes) {
    // sort shiftTypes
    shiftTypes.sort((a, b) => a.start.localeCompare(b.start))
    //Nếu chưa có tr thì mới thêm,, Nếu danh sách lấy được <= 0

    shiftTypes.forEach(shiftType => {
        let trTag = document.createElement("tr")
        // trTag.classList.add("min-h-200")
        let startTime = shiftType.start.split(":")[0] + ":" + shiftType.start.split(":")[2]
        let endTime = shiftType.end.split(":")[0] + ":" + shiftType.end.split(":")[2]

        trTag.classList.add("shift-type-name-tr")
        trTag.innerHTML = `
                                <th class="shift-type-name-th ${shiftType.name}" style="min-width:120px;">${shiftType.name}
                                <br />
                                <small class="fw-normal" style="font-size: 14px;"> ${startTime} - ${endTime} </small>
                                </th>
                                <span class="d-none shift-type-id">${shiftType.id} </span>
                                <td class="add_employee_schedule_btn t2">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus mt-2 fs-4 fw-lighter btn-add-schedule d-block action-schedule-btn"></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t3">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter btn-add-schedule d-block action-schedule-btn"></i>
                                    </div>
                                </td>
                                <td class=" add_employee_schedule_btn t4">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter btn-add-schedule d-block action-schedule-btn"></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t5">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter btn-add-schedule d-block action-schedule-btn"></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t6">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter btn-add-schedule d-block action-schedule-btn"></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t7">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter btn-add-schedule d-block action-schedule-btn"></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t0">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter btn-add-schedule d-block action-schedule-btn"></i>
                                    </div>
                                </td>
        `
        renderElementInnerParent("shedule-tbody", trTag)
    });

}
function reversedDateString(dateString) {

    const dateParts = dateString.split('-');
    const reversedDateString = dateParts.reverse().join('-');
    return reversedDateString;
}
//Lấy tuần của ngày hiện tại và hiển thị vào bảng
function loadWeekDay(weekList) {
    //Tím thứ của ngày hôm nay
    let dnow = new Date()
    let dayOfWeek = dnow.getDay() // 0 -> Chu nhat, 1-6 -> thu2-thu7
    let dayNowString = `${dnow.getFullYear()}-${dnow.getMonth() + 1}-${dnow.getDate()}`
    if (dayOfWeek === 0) dayOfWeek = 6
    else dayOfWeek--;
    let weekNameElementList = document.querySelectorAll(".weekname")
    let addEmployeeScheduleBtn = document.querySelectorAll(".add_employee_schedule_btn")
    weekNameElementList.forEach((element, index) => {
        //Xoa cột được tô màu trước
        element.classList.remove("text-danger")

        //index chay tu 0-6 voi 0->t2, 7->cn
        //Kiểm tra xem ngày hôm nay có nằm trong tuần được truyền vào không -> nếu có thì là trùng tuần
        let dayArray = Object.values(weekList[index]) //Sẽ trả về mảng các value tại 1 object
        let dayOfIndex = dayArray[dayArray.length - 1]; //Lấy ra value cuối (tương đương key = day)
        //so sánh 2 ngày 
        let areEqualDate = dateCompare(dayOfIndex, dayNowString) // -1 or 0 or 1
        // console.log(areEqualDate);
        if (dayOfIndex.trim() == dayNowString.trim()) {
            if (dayOfWeek === index) {
                element.classList.add("text-danger")
            }
        }

        element.innerHTML =
            `${(weekList[index].stt > 7) ? "Chủ nhật" : "Thứ " + weekList[index].stt}
            <br>
            <small class="fw-light fst-italic">
                ${reversedDateString(weekList[index].day)}
            </small>`
    })
    let index = 0; //0 - 6
    addEmployeeScheduleBtn.forEach((element) => {
        if (index > 6) index = 0;
        element.innerHTML +=
            `<span class="d-none dayOfThisShiftDetail">${weekList[index].day}</span>`
        index++
    })

}
function loadScheduleHtml(schedules) {
    // console.log(schedules);
    if (schedules) {
        schedules.forEach(schedule => {
            //Lấy tr thông qua id loại ca làm
            let scheduleDate = schedule.shift.date.date
            let targetDate = new Date(scheduleDate)
            let weekName = targetDate.getDay() + 1
            if (weekName == 1) {
                weekName = 0
            }

            let tr = document.querySelector(`.${schedule.shift.shiftType.name}`).parentNode
            let td = tr.querySelector(`.t${weekName}`)
            let start = schedule.shift.shiftType.start
            let end = schedule.shift.shiftType.end
            let startFormat = start.split(":")[0] + ":" + start.split(":")[2]
            let endFormat = end.split(":")[0] + ":" + end.split(":")[2]
            let spanNode = document.createElement("span")
            spanNode.classList.add("badge")
            spanNode.classList.add("bg-primary")
            spanNode.innerText = `${schedule.staff.fullName}
            `
            spanNode.innerHTML += `<span class="d-none dayOfThisShiftDetail">${schedule.shift.date.date}</span>`
            //${startFormat}-${endFormat}
            td.insertBefore(spanNode, td.querySelector("div"))


            td.querySelector("div").innerHTML = `<i class="fa-solid fa-pen edit-schedule-btn action-schedule-btn d-block" title="Chỉnh sửa"></i>`
            // td.querySelector("div").removeAttribute("data-bs-toggle")
            // td.querySelector("div").removeAttribute("data-bs-target")
        });

    } else {
        console.log("Không có ca");
        document.querySelectorAll(".weekname").forEach(item => {
            item.style = "min-width: 166.8px"
        })
    }

}

async function getApi(api) {
    const response = await fetch(api, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await response.json()
    const res = data
    return res
    // loadShiftTypeHtml(data.data)

}
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

//Lấy lịch làm theo tuần truyền vào, weekList la danh sach tuan cua ngay hien tai
async function getAllScheduleAtWeek(weekList) {
    let startWeek = (weekList[0].day).replace(/-/g, "/")
    let endWeek = (weekList[6].day).replace(/-/g, "/")

    return await getApi(getScheduleOfBetween + `?startDay=${startWeek}&endDay=${endWeek}`)
}

//Trả về tuần của ngày hiện tại
function getWeekList(dayNow) {
    //Tìm ngày đầu tuần
    // console.log(dayNow);
    let startOfWeek = new Date(dayNow);
    // console.log(startOfWeek);
    //Lấy ngày hiện tại trừ cho số ngày cách thứ 2
    startOfWeek.setDate(dayNow.getDate() - (dayNow.getDay() + 6) % 7)

    //Lặp danh sách từ thứ 2 đến chủ nhật
    let weekList = []

    for (let i = 0; i <= 6; i++) {

        let day = new Date(startOfWeek);
        //Ngày đầu tuần tăng 1
        day.setDate(day.getDate() + i);
        let dayFomat = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`
        let week = {
            stt: i + 2, // Thứ 0 + 2 => Thứ 2
            day: dateStringFormat(dayFomat)
        }
        weekList.push(week)
    }
    return weekList.sort();
}
//Thêm số 0 vào chuỗi ngày tháng.. Tryuền vào tham số dạng yyyy-mm-đd
function dateStringFormat(dateString) {

    // Tách ngày, tháng, năm từ chuỗi đầu vào
    const parts = dateString.split('-');
    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    // Chuyển đổi ngày và tháng thành chuỗi có 2 chữ số, nếu cần
    const formattedDay = day.length === 1 ? '0' + day : day;
    const formattedMonth = month.length === 1 ? '0' + month : month;

    // Tạo chuỗi ngày tháng năm đã được định dạng
    const formattedDateString = `${year}-${formattedMonth}-${formattedDay}`;

    return formattedDateString;
}

//Hàm lấy ngày kế tiếp từ ngày truyền vào 
function getNextDay(date) {
    //Khởi tạo đối tượng
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() + 1); // Tăng giá trị ngày lên 1
    return targetDate;
}
//Lấy ngày cuối trước ngày truyền vào
function getPreviousDay(date) {
    //Khởi tạo đối tượng
    const targetDate = new Date(date);
    targetDate.setDate(targetDate.getDate() - 1); // Giảm giá trị ngày đi 1

    return targetDate;
}
//Hàm tiến 1 tuần từ tuần truyền vào
function getNextWeek() {
    let daynow = new Date()// Ngày hôm nay

    let dayNowElementValue = document.querySelector(".dayInWeek").innerText

    let weekNow = getWeekList(new Date(dayNowElementValue))
    let endWeekNow = weekNow[6].day //yyyy-mm-dd
    let startNextWeek = getNextDay(endWeekNow) //Lấy ngày đầu của tuần kế tiếp
    let nextWeek = getWeekList(startNextWeek) //Lấy dah sách tuần kế

    //Clear hết dữ liệu của tuần cũ
    clearOldDataTable()
    //Set lai ngay hien tai
    document.querySelector(".dayInWeek").innerText = nextWeek[0].day
    setup(nextWeek)

}
//Hàm lùi 1 tuần từ tuần truyền vào
function getPreviousWeek() {
    let daynow = new Date()// Ngày hôm nay

    let weekOfDayNow = getWeekList(daynow)//Tuan cua ngay hom nay
    let mondayOfNowDate = new Date(weekOfDayNow[0].day) //Đầu tuần của tuần hiện tại
    console.log(mondayOfNowDate)

    // Lấy ngày đầu trong tuần hiện tại
    let dayNowElementValue = document.querySelector(".dayInWeek").innerText // Ngày đầu của tuần đang xem
    let dayNowElementValueDate = new Date(dayNowElementValue)

    let weekNow = getWeekList(new Date(dayNowElementValue))
    let startWeekNow = weekNow[0].day //yyyy-mm-dd
    let endNextWeek = getPreviousDay(startWeekNow) //Lấy ngày cuối của tuần trước
    let preWeek = getWeekList(endNextWeek) //Lấy ra tuần trước

    //Clear hết dữ liệu của tuần cũ
    clearOldDataTable()
    //Set lai ngay hien tai
    document.querySelector(".dayInWeek").innerText = preWeek[0].day
    setup(preWeek)
}

//Xóa dữ liệu cũ của 1 tuần trước
function clearOldDataTable() {
    document.querySelectorAll(".schedule-table thead .weekname").forEach(item => {
        item.innerText = ""
    })
    document.querySelector(".schedule-table .shedule-tbody").innerHTML = ""
}

//Hành động click vào nút thêm or chỉnh sửa lịch
//Dữ liệu cũ
let dataDb = [];
async function actionBtnClickHandler(event) {

    let iTagTarget = event.target
    //Lấy ngày target và id ca target
    //Lấy ngày target
    let dateTargetTd = iTagTarget.parentNode.parentNode
    let dateTarget = dateTargetTd.querySelector(".dayOfThisShiftDetail").innerText //Nếu chưa có ca thì không lấy được ngày // -----BUGS --Fixed
    //Lấy shiftTypeId target
    let shiftTypeIdTarget = dateTargetTd.parentNode
    let shiftTypeId = shiftTypeIdTarget.querySelector(".shift-type-id").innerText //Lấy shiftTypeId của ca target
    let shiftTypeNameTh = shiftTypeIdTarget.querySelector("th")
    let shiftTypeName = shiftTypeNameTh.firstChild.data.trim().toLowerCase()
    document.querySelector(".schedule-date").innerHTML = `ngày ${reversedDateString(dateTarget)}`
    document.querySelector(".schedule-date-none").innerHTML = `${dateTarget}`

    document.querySelector(".schedule-shift-type-name").innerText = `Ca ${shiftTypeName}`
    document.querySelector(".schedule-shift-type-id").innerText = `${shiftTypeId}`

    //Doi dateTarget thang dang yyyy/mm/dd
    let dateTargetFormat = dateTarget.replace(/-/g, "/")
    // console.log(dateTargetFormat);
    let scheduledApi = `http://localhost:8081/api/v1/manager/getScheduleOfShiftOfDate?shiftType=${shiftTypeId}&date=${dateTargetFormat}` //?shiftType=3&date=2023/10/16
    //Lấy danh sách nhân viên đi làm trong ca
    const sheduled = await getApi(scheduledApi)
    // console.log(sheduled);

    //Nếu đã có nhân sự trong ca
    let data = sheduled.data
    let tbody = document.querySelector(".scheduled-modal-table")


    //Nếu có lịch sẵn thì set shift_id để deleteShift nhận được
    if (data && data.length > 0) {
        tbody.innerHTML = ""
        data.forEach(shiftDetail => {
            //set shift_id để deleteShift nhận được
            let shift_id = shiftDetail.shift.id
            document.querySelector(".schedule-shift-id").innerText = shift_id

            let startTime = shiftDetail.shift.shiftType.start
            let endTime = shiftDetail.shift.shiftType.end
            let totalTime = calcTotalTime(endTime, startTime) //Tổng giờ trên lịch
            firstValueTotalTime = totalTime;
            let htmlTemplate = `
            <tr role="button" title="Bấm để xem chi tiết" class="table-success">
                                            <td class="text-center checked-scheduled">
                                                <input
                                                    class="form-check-input checked-scheduled-input mt-0 fs-5 align-middle border border-success" checked
                                                    type="checkbox" onclick="handleClickCheckBoxScheduled(this)">
                                            </td>
                                            <td>
                                                <span class="fullName">${shiftDetail.staff.fullName}</span>
                                                <span class="uid d-none">${shiftDetail.staff.uid}</span>
                                            </td>
                                            <td>
                                                ${shiftDetail.staff.gender || ""} 
                                            </td>
                                            <td>
                                                <div class="badge bg-primary">${shiftDetail.staff.type.name}</div>
                                            </td>

                                            <td>
                                            <input disabled type="text" style="max-width: 200px;" class="form-control"
                                                    value="${shiftDetail.shift.shiftType.name}">
                                                
                                            </td>
                                            <td>
                                                <input disabled style="width: 120px;" type="time" class="form-control"
                                                    value="${shiftDetail.shift.shiftType.start}">
                                            </td>
                                            <td>
                                                <input disabled disabled style="width: 120px;" type="time" class="form-control"
                                                    value="${shiftDetail.shift.shiftType.end}">
                                            </td>
                                            <td>
                                                <input onchange="onChangeOverTimeInput(this)" style="width: 80px;" min="0" max="20" value=${shiftDetail.overTime || 0}
                                                    type="number" class="form-control overTime">
                                            </td>
                                            <td>
                                                <input style="width: 80px;" min="0" max="20" type="number"
                                                    class="form-control totalTime" disabled value=${totalTime + shiftDetail.overTime}>
                                            </td>
                                            <td>${calExp(shiftDetail.staff.beginWork) || 0}</td>
                                        </tr>
        `
            tbody.innerHTML += htmlTemplate
        });

        //Lưu lại data cũ để so sánh có thay đổi hay không, nếu có thay đổi thì khi bấm nút lưu thì mới thực hiện
        saveInfoInScheduledTable()




    } else { //Nếu không có nhân sự trong ca làm
        dataDb = []
        //Hiển thị nút xóa ca
        tbody.innerHTML =
            `
        <tr class="schedule-empty center">
            <td colspan="10">Chưa có nhân sự nào được sắp lịch</td>
        </tr>
        `
    }
    //Lấy danh sách nhân viên có đăng ký lịch rảnh vào ca sáng và ngày này -- Nếu nhân sự nào đã được xếp lịch bỏ qua

    // Không có nhân sự nào được đăng ký thì bỏ trống báo là không có nhân viên đăng ký
    let getFreeTimeNotScheduled = `http://localhost:8081/api/v1/manager/getFreeTimeNotScheduled?shiftType=${shiftTypeId}&date=${dateTargetFormat}`
    const freeTimes = await getApi(getFreeTimeNotScheduled)
    if (freeTimes.status === "OK") {
        loadFreeTimeHtml(freeTimes.data)
        // return;

    } else {
        console.log(freeTimes.message)
        loadFreeTimeHtml([]) //Khi status !== OK thì trả về mảng rổng
    }
    // //Hiển thị nút xóa ca
    //Kiểm tra ngày đang tháo tác để ẩn hiện nút lưu và xóa
    let daynow = new Date()// Ngày hôm nay
    let dayNowString = `${daynow.getFullYear()}-${daynow.getMonth() + 1}-${daynow.getDate()}`

    //Kiểm tra xem ngày đang thao tác có nhỏ hơn ngày hôm nay hay  không
    let equal = dateCompare(dateTarget, dayNowString)
    console.log(equal, data.length);
    //Nếu equal < 0 tức là nhỏ hơn --> ẩn cả 2
    // Nếu equal == 0 và chiều dài bằng rỗng thì ẩn nút xóa -> hiện nút lưu
    //Nếu equal > 0 -> hiện nút lưu, nếu length == 0 thì ẩn nút xóa
    console.log(equal < 0 && data.length == 0);
    //Ngày nhỏ hơn thì k cho thao tác
    if (equal < 0) {
        //Ẩn nút lưu
        document.querySelector(".delete-scheduled").classList.add("disabled")
        document.querySelector(".save-schedule").classList.add("disabled")

    }
    //Ngày = hoặc lớn hơn --> thì nếu không có nhân sự đang trong lịch thì cho lưu và k cho xóa, vì chưa có lập lịch thì có j mà xóa
    else if (equal >= 0 && data.length === 0) {
        document.querySelector(".delete-scheduled").classList.add("disabled")
        document.querySelector(".save-schedule").classList.remove("disabled")
    }
    //Còn lại trường hợp (equal >= 0 và data.length !== 0) thì hiện 2 nút xóa ca và lưu (edit)
    else {
        document.querySelector(".delete-scheduled").classList.remove("disabled")
        document.querySelector(".save-schedule").classList.remove("disabled")

    }

}

//Tính thời gian chênh lệch
function calcTotalTime(EndTime, StartTime) {

    // Thời gian bắt đầu và kết thúc dưới dạng chuỗi HH:MM:SS
    const startTimeStr = StartTime;
    const endTimeStr = EndTime;

    // Tách giờ, phút từ chuỗi thời gian
    const startTimeParts = startTimeStr.split(':');
    const endTimeParts = endTimeStr.split(':');

    // Chuyển đổi thời gian thành số giây
    const startTimeSeconds = (+startTimeParts[0] * 3600) + (+startTimeParts[1] * 60) + 0;
    const endTimeSeconds = (+endTimeParts[0] * 3600) + (+endTimeParts[1] * 60) + 0;

    // Tính khoản thời gian giữa chúng
    const timeDifferenceSeconds = endTimeSeconds - startTimeSeconds;

    // Chuyển đổi khoản thời gian thành giờ, phút
    const hours = Math.floor(timeDifferenceSeconds / 3600);
    const minutes = (timeDifferenceSeconds % 3600) / 60 / 60; //ra dạng 0.5 giờ
    // console.log(hours, minutes);
    let total = hours + minutes
    // if (hours !== 0 && minutes !== 0) {
    //     return total
    // }
    // else if (hours !== 0 && minutes === 0)
    //     return hours + "h"
    // return + minutes + "p";
    return total;

}


//Tính số năm kinh nghiệm so với hiện tại
function calExp(yearBegin) {
    const dnow = new Date()
    const yearBeginDate = new Date(yearBegin)

    //Tính ra số tháng chênh lệch
    const monthsDiff =
        (dnow.getFullYear() - yearBeginDate.getFullYear()) * 12 +
        dnow.getMonth() -
        yearBeginDate.getMonth()
    // console.log(monthsDiff);
    // Tính số năm và số tháng
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    const month = months > 0 ? `${months} tháng` : "0";
    const year = years > 0 ? `${years} năm ` : "";
    return `${year} ${month}`
}


//Xử lý thay đổi giá trị giờ tăng ca
function onChangeOverTimeInput(thisElement) {
    //The td cha
    let tdParent = thisElement.parentElement
    //Lấy giá trị tại mỗi lần thay đổi
    let newValue = thisElement.value
    let tdParentSibling = tdParent.nextElementSibling
    let inputSibling = tdParentSibling.querySelector("input")
    let newTotalTimeNewValue = Number(firstValueTotalTime) + Number(newValue)
    console.log(firstValueTotalTime, newValue);
    inputSibling.value = newTotalTimeNewValue
}


//----------------------------------- Hiển thị dánh sách nhân sự rảnh vào bảng
function loadFreeTimeHtml(data) {
    let freeTimesData = data;
    // console.log(freeTimesData);
    let tbody = document.querySelector(".tbody-freeTime-schedule")
    tbody.innerHTML = ""
    //Nếu k có dữ liệu lịch rảnh thì hiển thị text thông báo vào bảng
    if (data.length === 0) {
        let htmlTemplate =
            `
            <tr class="free-time-empty center">
                <td colspan="9">Không có nhân sự đăng ký lịch làm</td>
            </tr>
        `
        tbody.innerHTML += htmlTemplate
    }
    freeTimesData.forEach(freeTime => {
        let startTime = freeTime.shiftType.start
        let endTime = freeTime.shiftType.end
        let totalTime = calcTotalTime(endTime, startTime) //Tổng giờ trên lịch
        let htmlTemplate = `
            <tr role="button" title="Bấm để xem chi tiết">
                                            <td class="text-center free-time-check">
                                                <input
                                                    class="form-check-input free-time-check-input mt-0 fs-5 align-middle border border-primary"
                                                    type="checkbox" onclick="handleClickCheckBoxFreeTimeSchedule(this)">
                                            </td>
                                            <td>
                                                <span class="fullName">${freeTime.staff.fullName}</span>
                                                <span class="uid d-none">${freeTime.staff.uid}</span>

                                            </td>
                                            <td class="gender">
                                                ${freeTime.staff.gender || ""} 
                                            </td>
                                            <td>
                                                <div class="badge bg-primary type">${freeTime.staff.type.name}</div>
                                            </td>

                                            <td>
                                            <input disabled type="text" style="max-width: 200px;" class="form-control shift-type-name"
                                                    value="${freeTime.shiftType.name}">
                                                
                                            </td>
                                            <td>
                                                <input disabled style="width: 120px;" type="time" class="form-control start"
                                                    value="${freeTime.shiftType.start}">
                                            </td>
                                            <td>
                                                <input disabled disabled style="width: 120px;" type="time" class="form-control end"
                                                    value="${freeTime.shiftType.end}">
                                            </td>
                                            
                                            <td>
                                                <input style="width: 80px;" min="0" max="20" type="number"
                                                    class="form-control totalTime" disabled value=${totalTime}>
                                            </td>
                                            <td class="totalWorkYear">${calExp(freeTime.staff.beginWork) || 0}</td>
                                        </tr>
        `
        tbody.innerHTML += htmlTemplate
    })
}

// Hàm lưu lại dữ liệu cũ của bảng lịch làm đã lặp
function saveInfoInScheduledTable() {
    dataDb = []

    let tbody = document.querySelector(".scheduled-modal-table")
    let allTr = tbody.querySelectorAll("tr")
    console.log(allTr);
    allTr.forEach(tr => {
        let uid = tr.querySelector(".uid").innerHTML
        let overTime = tr.querySelector(".overTime").value
        dataDb.push({ uid, overTime })
    })
    // console.log(dataDb);
}

function compareBetweenObject(data1, data2) {
    if (data1.length === data2.length)
        return data1.every(obj1 => data2.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));
    return false;
}
let dataNew = []
async function saveScheduleHandler() {

    console.log("hehe");
    dataNew = []
    //lấy thông tin trong bảng schedule
    let tbody = document.querySelector(".scheduled-modal-table")
    let allTr = tbody.querySelectorAll("tr td input[type='checkbox']:checked")
    console.log(allTr);
    let areEqual; //so sanhs khác nhau của dữ liệu
    if (allTr.length === 0) {
        areEqual = compareBetweenObject(dataDb, dataNew)
    }
    allTr.forEach(tr => {
        let trHasChecked = tr.parentElement.parentElement
        let uid = trHasChecked.querySelector(".uid").innerHTML
        let overTime = trHasChecked.querySelector(".overTime").value

        dataNew.push({ uid, overTime })
        // dataDb.every(obj1 => dataNew.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));
    })
    console.log(dataNew, dataDb);

    areEqual = compareBetweenObject(dataDb, dataNew)
    //Nếu dữ liệu khác thì nó mới call api
    if (areEqual === false) {

        let shiftTypeId = Number(document.querySelector(".schedule-shift-type-id").innerHTML)
        let shiftDate = document.querySelector(".schedule-date-none").innerText
        // let dateCreateShift =
        //Chuẩn hóa dataSet
        let dataSet = []
        dataNew.forEach(data => {
            let staff = {
                uid: data.uid
            }
            let dataSetObj = {
                overTime: Number(data.overTime),
                staff
            }
            dataSet.push(dataSetObj)
        })
        console.log("Call api", dataNew, dataSet);

        //Tạo shift
        //Xong có shift rồi thì từ shift_id đó
        let dataCreateShiftPost = {
            date: {
                date: shiftDate
            },
            shiftType: {
                id: shiftTypeId
            }
        }

        let shift_Rs = await postApi(createShift, dataCreateShiftPost)

        console.log("API thêm nhân sự:", shift_Rs); // In phản hồi ra màn hình
        //Xử lý thêm lịch làm
        let shift_id = shift_Rs.data.id
        let dataPost = {
            shift_id,
            dataSet: [...dataSet]
        }

        let schedule_Rs = await postApi(scheduleApi, dataPost)
        if (schedule_Rs.status === "OK") {
            console.log(schedule_Rs);
            //Thông báo những ng thêm thành công và thất bại
            //Lưu thông tin của 1 ngày trong tuần đang sắp lịch
            let dayNowScheduling = document.querySelector(".schedule-date-none").innerText
            localStorage.setItem("dayScheduling", JSON.stringify(dayNowScheduling))
            location.reload()
        } else {
            //Thông báo báo lỗi
            console.log(schedule_Rs);
        }

        // let dataPost = {
        //     shift_id: shiftId,
        //     dataSet
        // }
        console.log(shift_Rs, "Shift_id");

        // postApi(scheduleApi)
    }
}
//Khi mà bấm vào nút tích để tích hay bỏ tích thì cập nhật lại 

//Xóa cả ca làm
async function deleteShiftHandler() {
    //Lấy id ca cần xóa
    //Lấy tên ca
    //Lấy ngày
    let shiftId = document.querySelector(".schedule-shift-id").innerText
    let shiftTypeName = document.querySelector(".schedule-shift-type-name").innerText
    let shiftDate = document.querySelector(".schedule-date").innerText
    //Lấy xác nhận tự người dùng
    let isDelete = confirm(`Xác nhận xóa ${shiftTypeName} ${shiftDate}?`)
    console.log(isDelete);

    //True -> xử lí xóa ca
    if (isDelete && shiftId) {
        //Call api xóa
        let deleteRs = await deleteApiWithParam(deleteShiftApi, "id", shiftId)
        if (deleteRs.status === "OK") {
            alert(deleteRs.message)
            return location.reload()

        }
        alert(deleteRs.message)
    } else {
        return;
    }

}


async function deleteApiWithParam(api, param, paramValue) {
    const response = await fetch(`${api}?${param}=${paramValue}`, {
        method: "DELETE",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },

    })
    const dataRs = await response.json();

    return dataRs
}

async function postApi(api, data) {
    const response = await fetch(api, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const dataRs = await response.json();

    return dataRs
}

//Bắt sự kiện bắt check vào chọn 1 nhân sự trong lịch đã sắp -> disable dòng của nhân sự đó
function handleClickCheckBoxScheduled(element) {
    let trOfThisElement = element.parentElement.parentElement // Lấy nguyên hàng dữ liệu
    console.log(trOfThisElement);
    let overTimeInput = trOfThisElement.querySelector(".overTime")
    let type = trOfThisElement.querySelector(".badge")

    //bg-secondary
    //Bật tắt thuộc tính disabled
    overTimeInput.toggleAttribute("disabled")

    //Bật tắt đổi màu thẻ tr
    trOfThisElement.classList.toggle("table-success")
    trOfThisElement.classList.toggle("table-light")

    //Đổi màu Type Badge
    type.classList.toggle("bg-primary")
    type.classList.toggle("bg-secondary")

    console.log(trOfThisElement);
    //Disabled input overTime

}
//Bắt sự kiện khi chọn vào 1 nhân sự trong danh sách lịch rảnh --> Đưa nhân sự đó lên lịch đã sắp xếp
function handleClickCheckBoxFreeTimeSchedule(element) {
    let trOfThisElement = element.parentElement.parentElement // Lấy nguyên hàng dữ liệu
    console.log(trOfThisElement);
    //Chuyển lên bảng sắp lịch
    //Lấy dữ liệu của hàng đó
    let fullName = trOfThisElement.querySelector(".fullName").innerText
    let uid = trOfThisElement.querySelector(".uid").innerText
    let gender = trOfThisElement.querySelector(".gender").innerText
    let type = trOfThisElement.querySelector(".type").innerText
    let shiftRegisted = trOfThisElement.querySelector(".shift-type-name").value
    let start = trOfThisElement.querySelector(".start").value
    let end = trOfThisElement.querySelector(".end").value
    let totalTime = trOfThisElement.querySelector(".totalTime").value
    let totalWorkYear = trOfThisElement.querySelector(".totalWorkYear").innerText //Thâm niên
    firstValueTotalTime = totalTime;

    moveToScheduleTale(fullName, uid, gender, type, shiftRegisted, start, end, totalTime, totalWorkYear)

    //Biến hàng dữ liệu đó thành display none
    //Đính uid lên thẻ tr để đến khi muốn hiện lại biết hiện hàng nào lên
    trOfThisElement.classList.add(`${uid}`)
    trOfThisElement.style.display = "none"
}

//Chuyển lên bảng lập lịch
function moveToScheduleTale(fullName, uid, gender, type, shiftRegisted, start, end, totalTime, totalWorkYear) {

    let tr = document.createElement("tr")
    tr.innerHTML =
        `
                                            <td class="text-center checked-scheduled checked-schedule-from-free-time">
                                                <input
                                                    class="form-check-input checked-scheduled-input mt-0 fs-5 align-middle border border-success" checked
                                                    type="checkbox" onclick="moveToFreeTimeTale(this)">
                                            </td>
                                            <td>
                                                <span class="fullName">${fullName}</span>
                                                <span class="uid d-none">${uid}</span>
                                            </td>
                                            <td>
                                                ${gender || ""} 
                                            </td>
                                            <td>
                                                <div class="badge bg-primary">${type}</div>
                                            </td>

                                            <td>
                                            <input disabled type="text" style="max-width: 200px;" class="form-control"
                                                    value="${shiftRegisted}">
                                                
                                            </td>
                                            <td>
                                                <input disabled style="width: 120px;" type="time" class="form-control"
                                                    value="${start}">
                                            </td>
                                            <td>
                                                <input disabled disabled style="width: 120px;" type="time" class="form-control"
                                                    value="${end}">
                                            </td>
                                            <td>
                                                <input onchange="onChangeOverTimeInput(this)" style="width: 80px;" min="0" max="20" value=${0}
                                                    type="number" class="form-control overTime">
                                            </td>
                                            <td>
                                                <input style="width: 80px;" min="0" max="20" type="number"
                                                    class="form-control totalTime" disabled value=${totalTime}>
                                            </td>
                                            <td>${totalWorkYear}</td>
                                        </tr>
    `

    //Kiểm tra nếu đang có thẻ tr-empty thì xóa
    let trEmpty = document.querySelector(".schedule-empty")
    if (trEmpty) {
        trEmpty.remove()
    }
    renderElementInnerParent("scheduled-modal-table", tr)

    //Lưu lại dữ liệu mới
}

//Chuyển về lại bảng lịch rảnh
function moveToFreeTimeTale(element) {
    //Chuyển về
    console.log("Chuyển về");
    let trOfThisElement = element.parentElement.parentElement
    let classToDisplayBLock = trOfThisElement.querySelector(".uid").innerText // Lấy ra class cần hiển thị lại trong bảng freeTime
    // let trInFreeTimeTable = 
    //Xóa hàng ở bảng sheduled
    trOfThisElement.remove()
    //Hiện lại hàng ở bảng free-time
    let elementToShow = document.querySelector(`.${classToDisplayBLock}`)
    elementToShow.style.display = "table-row"
    elementToShow.querySelector(".free-time-check-input").checked = false
    //Bỏ check

}


//Hàm hổ trợ so sánh 2 
// Ap dung cho Date khởi tạo từ chuỗi :
// Vd 
//
// let date1 = new Date('2021-10-23');
// let date2 = new Date('2021-10-22');
//paramater format: "yyyy-mm-dd"
//Trả về < 0 là dateString1 < dateString2
//Trả về = 0 là dateString1 = dateString2
//Trả về > 0 là dateString1 > dateString2

function dateCompare(dateString1, dateString2) {
    console.log(dateString1, dateString2);
    let date1 = new Date(dateString1)
    let date2 = new Date(dateString2)


    // let day1String = `${date1.getFullYear()}-${date1.getMonth() + 1}-${date1.getDate()}`.trim()
    // let day2String = `${date2.getFullYear()}-${date2.getMonth() + 1}-${date2.getDate()}`.trim()
    if (date1.getTime() > date2.getTime()) {
        console.log(date1, date2, 1);
        return 1;
    }
    if (date1.getTime() < date2.getTime()) {
        console.log(date1, date2, -1);

        return -1;
    }
    console.log(date1, date2, 0);

    return 0; //Bằng nhau

}