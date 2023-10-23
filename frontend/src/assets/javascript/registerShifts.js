const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
const uid = userObject.uid;

var currentDay = '';

function setCurrentDay(day) {
    currentDay = day;
    console.log(currentDay)
    getAllShiftType();
}


function updateCheckboxInfo() {
    // Xử lý khi người dùng nhấn nút "Thêm" trong modal
    // Ví dụ: Lấy thông tin từ biến và cập nhật vào td của ngày hiện tại
    var checkboxInput = document.querySelectorAll(".checkbox-input");
    for (let i = 0; i < checkboxInput.length; i++) {
        const checkBox = checkboxInput[i];

        if (checkBox.checked == true) {
            console.log(checkBox)
            console.log(checkBox.value)
            var dayCheckboxInfo = document.getElementById(currentDay + "-data");
            var newDiv = document.createElement("div");
            newDiv.id = checkBox.id;

            newDiv.textContent = checkBox.value;
            dayCheckboxInfo.appendChild(newDiv);

        }
    }




}


function fetchStaffInfo() {
    fetch(`http://localhost:8081/api/v1/staff/info?Uid=${uid}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            document.getElementById("helloUserName").innerText = "Xin chào " + data.data.fullName;
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

fetchStaffInfo();



// function operationTimeInput(checkbox) {
//     const timeInputs = checkbox.parentNode.parentNode.getElementsByTagName('input');

//     for (var i = 0; i < timeInputs.length; i++) {
//         if (timeInputs[i].type === 'time') {
//             if (checkbox.checked) {
//                 timeInputs[i].removeAttribute('disabled');
//             } else {
//                 timeInputs[i].setAttribute('disabled', 'disabled');
//             }
//         }
//     }
// }


function operationTimeInput(checkbox) {
    var dayRow = checkbox.closest("tr"); // Lấy dòng của checkbox
    var editButton = dayRow.querySelector(".fa-pen"); // Nút chỉnh sửa trong dòng đó
    // Cột trạng thái

    if (checkbox.checked) {
        editButton.removeAttribute("disabled"); // Cho phép chỉnh sửa
        // Thay đổi trạng thái
    } else {
        editButton.setAttribute("disabled", "disabled"); // Không cho phép chỉnh sửa
        // Thay đổi trạng thái
    }
}


function getAllShiftType() {
    fetch(`http://localhost:8081/api/v1/manager/allShiftType`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.status == "OK") {
                const data = res.data;
                console.log(data);
                const shiftType = document.getElementById("shiftType");
                var html = data.map(function (shiftType) {
                    console.log("shiftDetail", shiftType)
                    const uniqueId = `${shiftType.id}`;
                    return `
          <div>
                <input type="checkbox" class="checkbox-input" name="${shiftType.name}" id=${uniqueId} value="Ca ${shiftType.name} (${shiftType.start} - ${shiftType.end})"> Ca ${shiftType.name} (${shiftType.start} - ${shiftType.end})
            </div>
      
          `;
                });
                shiftType.innerHTML = html.join("");
            }
        });
}



function selectAllRows() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.checkbox-input-status');

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
}



function doiDinhDangNgay(dateString) {
    // Sử dụng phương pháp split() để tách ngày, tháng và năm từ chuỗi
    const [day, month, year] = dateString.split('/');

    // Tạo chuỗi mới với định dạng yyyy/mm/dd
    const newDateString = `${year}-${month}-${day}`;

    return newDateString;
}





getAllShiftType();




function reversedDateString(dateString) {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
        throw new Error('Invalid date format. Expected format: yyyy-mm-dd');
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${year}-${month}-${day}`;
}

function formatDateString(dateString) {

    // console.log(dateString + " Trong ham format string");
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
function getWeekList(dayNow) {
    let startOfWeek = new Date(dayNow);
    startOfWeek.setDate(dayNow.getDate() - (dayNow.getDay() + 6) % 7);

    let weekList = [];

    for (let i = 0; i <= 6; i++) {
        let day = new Date(startOfWeek);
        day.setDate(day.getDate() + i);
        let dayFomat = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`;
        let week = {
            stt: i + 2, // Thứ 0 + 2 => Thứ 2
            day: formatDateString(dayFomat)
        };
        weekList.push(week);
    }

    return weekList;
}

function showDayUnderSttOfWeekTh(date) {
    let thisWeek = date ? getWeekList(new Date(date)) : getWeekList(new Date());
    let thOfWeekElementList = document.querySelectorAll(".sttOfWeek");

    thOfWeekElementList.forEach((item, index) => {
        item.querySelector("p").innerText = reversedDateString(formatDateString(thisWeek[index].day));
    });
}

function showStartAndEndWeek(weekList) {
    let startDay = weekList[0].day;
    let endDay = weekList[weekList.length - 1].day;

    //     let startToEndDay = document.querySelector(".startToEndDay");
    //     startToEndDay.innerText = `${reversedDateString(formatDateString(startDay))} -> ${reversedDateString(formatDateString(endDay))}`;
}

// Call the showStartAndEndWeek and showDayUnderSttOfWeekTh functions to display the week information
const currentDate = new Date(); // Use the current date
showStartAndEndWeek(getWeekList(currentDate));
showDayUnderSttOfWeekTh(currentDate);


function workRegister() {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const selectedDays = {};


    daysOfWeek.forEach(day => {
        const checkbox = document.getElementById(day).querySelector("input[type='checkbox']");
        if (checkbox.checked) {
            console.log(checkbox)
            const dateFreeTime = document.getElementById(day).querySelector(".sttOfWeek").querySelector("small");
            console.log(day + "-data")
            var shiftID = document.getElementById(day).querySelector("." + day + "-data")

            var divElement = shiftID.getElementsByTagName("div");
            console.log(divElement.length)

            for (var i = 0; i < divElement.length; i++) {
                const dataFreeTime = {};
                const date = {}
                const staff = {}
                const shiftType = {}
                var currentDiv = divElement[i];
                // Lấy id của thẻ con
                var currentId = currentDiv.id;

                // Lấy nội dung của thẻ con
                var currentContent = currentDiv.innerText;

                // In id và nội dung của thẻ con
                console.log("ID của thẻ con:", currentId);
                console.log("Nội dung của thẻ con:", currentContent);
                date.date = doiDinhDangNgay(dateFreeTime.innerText);
                dataFreeTime.date = date;
                staff.uid = uid;
                dataFreeTime.staff = staff;
                shiftType.id = currentId;
                dataFreeTime.shiftType = shiftType;
                dataFreeTime.isSchedule = "false"

                console.log(dataFreeTime)
                workRegisterAPI(dataFreeTime);

            }


        }
    });

}



function workRegisterAPI(selectedDays) {
    fetch(`http://localhost:8081/api/v1/staff/registerSchedule`,
        {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedDays)
        })
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data)
            alert('Đăng ký thành công.');
        })
        .catch(error => console.error('Error:', error));

}





