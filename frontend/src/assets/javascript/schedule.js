
const getAllShiftTypeApi = "http://localhost:8081/api/v1/manager/allShiftType"
const getScheduleOfBetween = "http://localhost:8081/api/v1/manager/getAllSchedule" //?startDay=2023/10/10&endDay=2023/10/10
let scheduleApi = "http://localhost:8081/api/v1/manager/schedule"

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
}


//Truyền vào tuần vừa mới lập lịch bằng cách lấy 1 ngày của trong tuần của lượt reload trước để tìm tuần vừa lặp, để tối ưu trải nghiệm 
let weekList = getWeekList(new Date())
document.querySelector(".dayInWeek").innerText = weekList[0].day
setup(weekList)

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
    let weekNameElementList = document.querySelectorAll(".weekname")
    let addEmployeeScheduleBtn = document.querySelectorAll(".add_employee_schedule_btn")
    weekNameElementList.forEach((element, index) => {
        element.innerHTML =
            `${(weekList[index].stt > 7) ? "Chủ nhật" : "Thứ " + weekList[index].stt}
        <br>
        <small class="fw-light fst-italic">${reversedDateString(weekList[index].day)}</small>`
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
    console.log(schedules);
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
    console.log(dayNow);
    let startOfWeek = new Date(dayNow);
    console.log(startOfWeek);
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
    // Lấy ngày trong tuần hiện tại
    let dayNowElementValue = document.querySelector(".dayInWeek").innerText

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
    document.querySelector(".schedule-shift-type-name").innerText = `Ca ${shiftTypeName}`
    document.querySelector(".schedule-shift-type-id").innerText = `${shiftTypeId}`

    //Doi dateTarget thang dang yyyy/mm/dd
    let dateTargetFormat = dateTarget.replace(/-/g, "/")
    console.log(dateTargetFormat);
    let scheduledApi = `http://localhost:8081/api/v1/manager/getScheduleOfShiftOfDate?shiftType=${shiftTypeId}&date=${dateTargetFormat}` //?shiftType=3&date=2023/10/16
    //Lấy danh sách nhân viên đi làm trong ca
    const sheduled = await getApi(scheduledApi)
    console.log(sheduled);

    //Nếu đã có nhân sự trong ca
    let data = sheduled.data
    let tbody = document.querySelector(".scheduled-modal-table")
    if (data && data.length > 0) {
        tbody.innerHTML = ""
        data.forEach(shiftDetail => {

            let startTime = shiftDetail.shift.shiftType.start
            let endTime = shiftDetail.shift.shiftType.end
            let totalTime = calcTotalTime(endTime, startTime) //Tổng giờ trên lịch
            firstValueTotalTime = totalTime;
            let htmlTemplate = `
            <tr role="button" title="Bấm để xem chi tiết">
                                            <td class="text-center">
                                                <input
                                                    class="form-check-input mt-0 fs-3 align-middle border border-primary" checked
                                                    type="checkbox">
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
        tbody.innerHTML =
            `
        <tr class="center">
            <td colspan="10">Chưa có nhân sự nào được sắp lịch</td>
        </tr>
        `
    }
    //Lấy danh sách nhân viên có đăng ký lịch rảnh vào ca sáng và ngày này -- Nếu nhân sự nào đã được xếp lịch bỏ qua

    // Không có nhân sự nào được đăng ký thì bỏ trống báo là không có nhân viên đăng ký
    let getFreeTimeNotScheduled = `http://localhost:8081/api/v1/manager/getFreeTimeNotScheduled?shiftType=${shiftTypeId}&date=${dateTargetFormat}`
    const freeTimes = await getApi(getFreeTimeNotScheduled)
    if (freeTimes.status === "OK") {
        return loadFreeTimeHtml(freeTimes.data)

    }
    console.log(freeTimes.message)
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
    console.log(hours, minutes);
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
    console.log(monthsDiff);
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
    inputSibling.value = newTotalTimeNewValue
}


//----------------------------------- Hiển thị dánh sách nhân sự rảnh vào bảng
function loadFreeTimeHtml(data) {
    let freeTimesData = data;
    console.log(freeTimesData);
    let tbody = document.querySelector(".tbody-freeTime-schedule")
    tbody.innerHTML = ""

    freeTimesData.forEach(freeTime => {
        let startTime = freeTime.shiftType.start
        let endTime = freeTime.shiftType.end
        let totalTime = calcTotalTime(endTime, startTime) //Tổng giờ trên lịch
        let htmlTemplate = `
            <tr role="button" title="Bấm để xem chi tiết">
                                            <td class="text-center">
                                                <input
                                                    class="form-check-input mt-0 fs-3 align-middle border border-primary"
                                                    type="checkbox">
                                            </td>
                                            <td>
                                                <span class="fullName">${freeTime.staff.fullName}</span>
                                                <span class="uid d-none">${freeTime.staff.uid}</span>

                                            </td>
                                            <td>
                                                ${freeTime.staff.gender || ""} 
                                            </td>
                                            <td>
                                                <div class="badge bg-primary">${freeTime.staff.type.name}</div>
                                            </td>

                                            <td>
                                            <input disabled type="text" style="max-width: 200px;" class="form-control"
                                                    value="${freeTime.shiftType.name}">
                                                
                                            </td>
                                            <td>
                                                <input disabled style="width: 120px;" type="time" class="form-control"
                                                    value="${freeTime.shiftType.start}">
                                            </td>
                                            <td>
                                                <input disabled disabled style="width: 120px;" type="time" class="form-control"
                                                    value="${freeTime.shiftType.end}">
                                            </td>
                                            
                                            <td>
                                                <input style="width: 80px;" min="0" max="20" type="number"
                                                    class="form-control totalTime" disabled value=${totalTime}>
                                            </td>
                                            <td>${calExp(freeTime.staff.beginWork) || 0}</td>
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
}

let dataNew = []
function saveScheduleHandler() {
    dataNew = []
    //lấy thông tin trong bảng schedule
    let tbody = document.querySelector(".scheduled-modal-table")
    let allTr = tbody.querySelectorAll("tr[role='button'] td input[type='checkbox']:checked")
    let areEqual; //so sanhs khác nhau của dữ liệu
    if (allTr.length === 0) {
        areEqual = dataDb.every(obj1 => dataNew.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));
    }
    allTr.forEach(tr => {
        let trHasChecked = tr.parentElement.parentElement
        let uid = trHasChecked.querySelector(".uid").innerHTML
        let overTime = trHasChecked.querySelector(".overTime").value

        dataNew.push({ uid, overTime })
        console.log(dataNew);
        // dataDb.every(obj1 => dataNew.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));
        areEqual = dataDb.every(obj1 => dataNew.some(obj2 => JSON.stringify(obj1) === JSON.stringify(obj2)));
    })
    //Nếu dữ liệu khác thì nó mới call api
    if (areEqual === false) {

        let shiftId = Number(document.querySelector(".schedule-shift-type-id").innerHTML)
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
        let dataPost = {
            shift_id: shiftId,
            dataSet
        }
        console.log(dataPost);
        postApi(scheduleApi)
    }
}
//Khi mà bấm vào nút tích để tích hay bỏ tích thì cập nhật lại 


function postApi(api) {

}