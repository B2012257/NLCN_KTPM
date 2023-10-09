//Lấy ngày hiên tại
const currentDate = new Date();
const formatDate1 = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
const formatDate = currentDate.toISOString().split('T')[0];
document.getElementById("current-time").value = formatDate;


console.log(formatDate1)

function setUp() {
    setInterval(updateCurrentTime, 1000);

    // Gọi hàm ban đầu để hiển thị thời gian ngay khi trang được tải
    updateCurrentTime();
    getListTimeKeepingMorning();
    getListTimeKeepingAfternoon();
    getListTimeKeepingEvening();


}

setUp();


function getListTimeKeepingMorning() {
    fetch(`http://localhost:8081/api/v1/manager/getScheduleOfShiftOfDate?date=${formatDate1}&shiftType=1`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())

        .then(res => {
            console.log(res)
            const tableBody = document.getElementById('workCheckMorning');
            tableBody.innerHTML = '';
            const dataList = res.data;
            dataList.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>
                <span>${item.staff.fullName}</span>
            </td>
            <td>
                <div class="badge bg-primary">${item.staff.type.name}</div>
            </td>
            <td>
                <input min="0" max="20" type="time"
                    class="form-control" disabled id="startTime_${item.id}" value="${item.shift.shiftType.start}">
            </td>
            <td>
                <input min="0" max="20" type="time"
                    class="form-control" disabled id="endTime_${item.id}" value="${item.shift.shiftType.end}">
            </td>
            <td>
                <input  min="0" max="20" type="number"
                    class="form-control" disabled id="overTime_${item.id}" value="${item.overTime}">
            </td>
            <td>
                <input type="time" class="form-control" id="startTimeInput_${item.id}"
                    value="">
            </td>

            <td>
                <input type="time" class="form-control" id="endTimeInput_${item.id}"
                    value="">
            </td>
            <td>
                <input min="0" max="20" value="" id="overTimeInput_${item.id}"
                    type="number" class="form-control" disabled>
            </td>
            <td>
                <input  min="0" max="20" type="number"
                    class="form-control" disabled value="" id="totalTime_${item.id}">
            </td>
            <td>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here"
                        id="floatingTextarea2" style="height: 60px"></textarea>
                    <label for="floatingTextarea2"></label>
                </div>
            </td>
            <td>
                <div class="badge" id="status_${item.id}"></div>
        </td>
            `;

                tableBody.appendChild(row);
                const shiftDetail_Id = item.id;
                const startTime = document.getElementById(`startTimeInput_${item.id}`);
                const endTime = document.getElementById(`endTimeInput_${item.id}`);
                const overTime = document.getElementById(`overTimeInput_${item.id}`);
                const totalTime = document.getElementById(`totalTime_${item.id}`)
                const startDefault = document.getElementById(`startTime_${item.id}`);
                const status = document.getElementById(`status_${item.id}`);
                const dataPost = {};
                console.log(shiftDetail_Id)

                startTime.addEventListener('input', () => {
                    const startTimeValue = startTime.value;
                    const compare = compareTimes(startDefault.value, startTimeValue);


                    if (compare) {
                        status.innerText = 'Đúng giờ';
                        status.classList.add('bg-success');
                        status.classList.remove('bg-warning');
                    }
                    else {
                        status.innerText = 'Đi trễ';
                        status.classList.add('bg-warning');
                    }
                    console.log('Start Time input value:', startTimeValue);




                });

                endTime.addEventListener('input', () => {
                    const endTimeValue = endTime.value;
                    console.log('End Time input value:', endTimeValue);
                    const overTimeValue = calculateOverTime(endTimeValue, item.shift.shiftType.end);
                    overTime.value = overTimeValue;
                    console.log(overTimeValue);
                    const totalTimeValue = calculateOverTime(endTime.value, startTime.value);
                    totalTime.value = totalTimeValue;

                });



            });
        });
}


function calculateOverTime(startTime, shiftStart) {
    // Đây chỉ là một ví dụ, bạn có thể tính toán theo yêu cầu của bạn
    // Ví dụ: Trả về số giờ chênh lệch giữa startTime và shiftStart
    const startTimeDate = new Date(`2023-01-01T${startTime}`);
    const shiftStartDate = new Date(`2023-01-01T${shiftStart}`);

    const timeDiff = startTimeDate - shiftStartDate;
    const hoursDiff = timeDiff / (1000 * 60 * 60); // Chuyển đổi thành giờ

    return hoursDiff;
}


function compareTimes(time1, time2) {
    // Chuyển đổi giờ vào đối tượng Date để có thể so sánh
    const time1Date = new Date(`2000-01-01T${time1}`);
    const time2Date = new Date(`2000-01-01T${time2}`);

    // So sánh giờ
    return time1Date >= time2Date;
}


function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time1');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();

    currentTimeElement.textContent = 'Thời gian hiện tại: ' + formattedTime;
}



function getListTimeKeepingAfternoon() {
    fetch(`http://localhost:8081/api/v1/manager/getScheduleOfShiftOfDate?date=2023/10/05&shiftType=2`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())

        .then(res => {
            console.log(res)
            const tableBody = document.getElementById('workCheckAfternoon');
            tableBody.innerHTML = '';
            const dataList = res.data;
            dataList.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>
                <span>${item.staff.fullName}</span>
            </td>
            <td>
                <div class="badge bg-primary">${item.staff.type.name}</div>
            </td>
            <td>
                <input min="0" max="20" type="time"
                    class="form-control" disabled id="startTime_${item.id}" value="${item.shift.shiftType.start}">
            </td>
            <td>
                <input min="0" max="20" type="time"
                    class="form-control" disabled id="endTime_${item.id}" value="${item.shift.shiftType.end}">
            </td>
            <td>
                <input  min="0" max="20" type="number"
                    class="form-control" disabled id="overTime_${item.id}" value="${item.overTime}">
            </td>
            <td>
                <input type="time" class="form-control" id="startTimeInput_${item.id}"
                    value="">
            </td>

            <td>
                <input type="time" class="form-control" id="endTimeInput_${item.id}"
                    value="">
            </td>
            <td>
                <input min="0" max="20" value="" id="overTimeInput_${item.id}"
                    type="number" class="form-control" disabled>
            </td>
            <td>
                <input  min="0" max="20" type="number"
                    class="form-control" disabled value="" id="totalTime_${item.id}">
            </td>
            <td>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here"
                        id="floatingTextarea2" style="height: 60px"></textarea>
                    <label for="floatingTextarea2"></label>
                </div>
            </td>
            <td>
                <div class="badge" id="status_${item.id}"></div>
        </td>
            `;

                tableBody.appendChild(row);

                const startTime = document.getElementById(`startTimeInput_${item.id}`);
                const endTime = document.getElementById(`endTimeInput_${item.id}`);
                const overTime = document.getElementById(`overTimeInput_${item.id}`);
                const totalTime = document.getElementById(`totalTime_${item.id}`)
                const startDefault = document.getElementById(`startTime_${item.id}`);
                const status = document.getElementById(`status_${item.id}`);
                const shiftDetail_Id = item.id;
                console.log(shiftDetail_Id)

                startTime.addEventListener('input', () => {
                    const startTimeValue = startTime.value;
                    const compare = compareTimes(startDefault.value, startTimeValue);


                    if (compare) {
                        status.innerText = 'Đúng giờ';
                        status.classList.add('bg-success');

                    }
                    else {
                        status.innerText = 'Đi trễ';
                        status.classList.add('bg-warning');
                    }
                    console.log('Start Time input value:', startTimeValue);




                });

                endTime.addEventListener('input', () => {
                    const endTimeValue = endTime.value;
                    console.log('End Time input value:', endTimeValue);
                    const overTimeValue = calculateOverTime(endTimeValue, item.shift.shiftType.end);
                    overTime.value = overTimeValue;
                    console.log(overTimeValue);
                    const totalTimeValue = calculateOverTime(endTime.value, startTime.value);
                    totalTime.value = totalTimeValue;

                });



            });
        });
}



function getListTimeKeepingEvening() {
    fetch(`http://localhost:8081/api/v1/manager/getScheduleOfShiftOfDate?date=2023/10/05&shiftType=3`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())

        .then(res => {
            console.log(res)
            const tableBody = document.getElementById('workCheckEvening');
            tableBody.innerHTML = '';
            const dataList = res.data;
            dataList.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td>
                <span>${item.staff.fullName}</span>
            </td>
            <td>
                <div class="badge bg-primary">${item.staff.type.name}</div>
            </td>
            <td>
                <input min="0" max="20" type="time"
                    class="form-control" disabled id="startTime_${item.id}" value="${item.shift.shiftType.start}">
            </td>
            <td>
                <input min="0" max="20" type="time"
                    class="form-control" disabled id="endTime_${item.id}" value="${item.shift.shiftType.end}">
            </td>
            <td>
                <input  min="0" max="20" type="number"
                    class="form-control" disabled id="overTime_${item.id}" value="${item.overTime}">
            </td>
            <td>
                <input type="time" class="form-control" id="startTimeInput_${item.id}"
                    value="">
            </td>

            <td>
                <input type="time" class="form-control" id="endTimeInput_${item.id}"
                    value="">
            </td>
            <td>
                <input min="0" max="20" value="" id="overTimeInput_${item.id}"
                    type="number" class="form-control" disabled>
            </td>
            <td>
                <input  min="0" max="20" type="number"
                    class="form-control" disabled value="" id="totalTime_${item.id}">
            </td>
            <td>
                <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a comment here"
                        id="floatingTextarea2" style="height: 60px"></textarea>
                    <label for="floatingTextarea2"></label>
                </div>
            </td>
            <td>
                <div class="badge" id="status_${item.id}"></div>
        </td>
            `;

                tableBody.appendChild(row);

                const startTime = document.getElementById(`startTimeInput_${item.id}`);
                const endTime = document.getElementById(`endTimeInput_${item.id}`);
                const overTime = document.getElementById(`overTimeInput_${item.id}`);
                const totalTime = document.getElementById(`totalTime_${item.id}`)
                const startDefault = document.getElementById(`startTime_${item.id}`);
                const status = document.getElementById(`status_${item.id}`);


                startTime.addEventListener('input', () => {
                    const startTimeValue = startTime.value;
                    const compare = compareTimes(startDefault.value, startTimeValue);


                    if (compare) {
                        status.innerText = 'Đúng giờ';
                        status.classList.add('bg-success');

                    }
                    else {
                        status.innerText = 'Đi trễ';
                        status.classList.add('bg-warning');
                    }
                    console.log('Start Time input value:', startTimeValue);




                });

                endTime.addEventListener('input', () => {
                    const endTimeValue = endTime.value;
                    console.log('End Time input value:', endTimeValue);
                    const overTimeValue = calculateOverTime(endTimeValue, item.shift.shiftType.end);
                    overTime.value = overTimeValue;
                    console.log(overTimeValue);
                    const totalTimeValue = calculateOverTime(endTime.value, startTime.value);
                    totalTime.value = totalTimeValue;

                });



            });
        });
}



