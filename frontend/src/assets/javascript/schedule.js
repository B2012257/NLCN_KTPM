
const getAllShiftTypeApi = "http://localhost:8081/api/v1/manager/allShiftType"
const getScheduleOfBetween = "http://localhost:8081/api/v1/manager/getAllSchedule" //?startDay=2023/10/10&endDay=2023/10/10

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


    //Thêm sự kiện tiến và lùi tuần


}
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
                                <span class="d-none">${shiftType.id} </span>
                                <td class="add_employee_schedule_btn t2">


                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus mt-2 fs-4 fw-lighter "></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t3">

                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter "></i>
                                    </div>
                                </td>
                                <td class=" add_employee_schedule_btn t4">


                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter "></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t5">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter "></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t6">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter "></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t7">
                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter "></i>
                                    </div>
                                </td>
                                <td class="add_employee_schedule_btn t0">

                                    <div class="btn p-0" data-bs-toggle="modal" data-bs-target="#modal">
                                        <i class="fa-solid fa-plus fs-5 fw-lighter "></i>
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

    weekNameElementList.forEach((element, index) => {
        element.innerHTML =
            `${(weekList[index].stt > 7) ? "Chủ nhật" : "Thứ " + weekList[index].stt}
        <br>
        <small class="fw-light fst-italic">${reversedDateString(weekList[index].day)}</small>`
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


            td.querySelector("div").innerHTML = `<i class="fa-solid fa-pen" title="Chỉnh sửa"></i>`
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
    //Nếu ngày khi tăng lên bằng 1 thì qua tháng mới
    if (targetDate.getDate() === 1) {
        targetDate.setMonth((targetDate.getMonth() + 1) + 1); // Tăng giá trị tháng lên 1
        targetDate.setDate(1); // Đặt ngày thành 1
    }
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
    console.log(preWeek);

    //Clear hết dữ liệu của tuần cũ
    clearOldDataTable()
    //Set lai ngay hien tai
    document.querySelector(".dayInWeek").innerText = preWeek[0].day
    setup(preWeek)
}
function clearOldDataTable() {
    document.querySelectorAll(".schedule-table thead .weekname").forEach(item => {
        item.innerText = ""
    })
    document.querySelector(".schedule-table .shedule-tbody").innerHTML = ""
}