const currentDate = new Date();
const formatDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
const dateNow = currentDate.toISOString().split('T')[0];

let dateWorkChecked = document.getElementById("current-time").value = dateNow;

const dateInput = document.getElementById("current-time");
let formatDateInput = formatDate;

dateInput.addEventListener('input', getDateWorkCheck);


const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
const uid = userObject.uid;
console.log(uid);


let selectedRadioButtonId = null; 


getAllShiftType();
fetchStaffInfo();



function getDateWorkCheck() {
    console.log("date value", dateInput);
    formatDateInput = formatDay(dateInput.value);
    console.log("Ngày chấm", formatDateInput);
    const tableBody = document.getElementById('shiftDetail');
    tableBody.innerHTML = '';
    const tableBodyShiftDetail = document.getElementById('shiftDetailInTimeKeeping');
    tableBodyShiftDetail.innerHTML = '';
    getAllShiftType();

}

function formatDay(dateString) {
    // Sử dụng phương pháp split() để tách ngày, tháng và năm từ chuỗi
    const [year, month, day] = dateString.split('-');

    // Tạo chuỗi mới với định dạng yyyy/mm/dd
    const newDateString = `${year}/${month}/${day}`;

    return newDateString;
}




function calculateOverTime(startTime, shiftStart) {
    // Đây chỉ là một ví dụ, bạn có thể tính toán theo yêu cầu của bạn
    // Ví dụ: Trả về số giờ chênh lệch giữa startTime và shiftStart
    const startTimeDate = new Date(`2023-01-01T${startTime}`);
    const shiftStartDate = new Date(`2023-01-01T${shiftStart}`);

    const timeDiff = startTimeDate - shiftStartDate;
    const hoursDiff = timeDiff / (1000 * 60 * 60); // Chuyển đổi thành giờ

    let roundedHoursDiff = hoursDiff.toFixed(2);

    // Bỏ đi phần thập phân nếu nó là 0
    roundedHoursDiff = roundedHoursDiff.endsWith('.00') ? roundedHoursDiff.split('.')[0] : roundedHoursDiff;

    return roundedHoursDiff;
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




function reversedDateString(dateString) {
    const dateParts = dateString.split('-');
    const reversedDateString = dateParts.reverse().join('/');
    return reversedDateString;
}






function selectAllRows() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.rowCheckbox');
    

    // Check all individual checkboxes when "Select All" is checked initially
    checkboxes.forEach(checkbox => {
        
        checkbox.checked = selectAllCheckbox.checked;
       
    });
}







function selectCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.rowCheckbox');


    // Chọn hoặc bỏ chọn checkbox tổng dựa trên trạng thái của các checkbox con
    function updateSelectAllCheckbox() {
        const allChecked = Array.from(checkboxes).every(checkbox => checkbox.checked);
        selectAllCheckbox.checked = allChecked;
    }

    // Gắn sự kiện cho checkbox tổng
    selectAllCheckbox.addEventListener('change', function () {
        const isChecked = selectAllCheckbox.checked;
        checkboxes.forEach(checkbox => checkbox.checked = isChecked);
    });

    // Gắn sự kiện cho các checkbox con
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            updateSelectAllCheckbox();
        });
    });

}


function colorCheckbox() {
    const checkboxes = document.querySelectorAll('.rowCheckbox');

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const row = this.closest('tr');
            if (this.checked) {
                row.classList.add('table-success');
            } else {
                row.classList.remove('table-success');// Bỏ màu nền
            }
        });
    });
}



function formatTime(time) {
    const hoursMinutes = time.split(':');
    const formattedTime = hoursMinutes[0] + ':' + hoursMinutes[1];
    return formattedTime;

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
          <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="${uniqueId}"
              value="${shiftType.name}">
          <label class="form-check-label" for="${uniqueId}">Ca ${shiftType.name} (${formatTime(shiftType.start)} - ${formatTime(shiftType.end)})</label>
      </div>
      
          `;
                });
                shiftType.innerHTML = html.join("");
            }

            const radioButtons = document.querySelectorAll(".form-check-input");
            console.log(radioButtons);
            radioButtons.forEach((radio) => {
                radio.addEventListener("change", function () {
                    selectedRadioButtonId = this.id;
                    console.log("selectedRadioButtonId",selectedRadioButtonId)
                    console.log("Selected value:", this.value);
                    console.log("select Id :", this.id)
                    console.log(formatDate)
                    const labelElement = document.querySelector(`label[for="${this.id}"]`);
                    console.log("name:", labelElement.innerText)
                    console.log(formatDateInput)
                    const shiftDetailID = this.id;


                    getAllShiftDetail(formatDateInput, shiftDetailID);
                    getAllShiftDetailInTimeKeeping(formatDateInput, shiftDetailID);
                    document.getElementById("shiftDetailType").innerText = labelElement.innerText;
                    document.getElementById("shiftDetailTypeInTimeKeeping").innerText = labelElement.innerText + " đã chấm công";
                });
            });

            autoSelectShiftBasedOnTime();
        });
}



function getAllShiftDetail(date, shiftDetailID) {
    fetch(`http://localhost:8081/api/v1/manager/getAllSchedulesOfShiftOfDateNotTimeKeeping?date=${date}&shiftType=${shiftDetailID}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())

        .then(res => {
            if (res.data !== null) {

                document.getElementById("markAttendanceButton").style.display = "block"
                console.log(res)
                const tableBody = document.getElementById('shiftDetail');
                tableBody.innerHTML = '';
                const dataList = res.data;
                console.log(dataList)



                dataList.forEach(item => {

                    const row = document.createElement('tr');
                    const overTime = item.overTime;
                    let startInput = item.shift.shiftType.start;
                    let endInput = item.shift.shiftType.end;
                    let overTimeInput = item.overTime
                    const basic = item.staff.salary.basic;
                    const overtime = item.staff.salary.overtime;
                    
                    let totalTime = parseFloat(calculateOverTime(endInput, startInput)) + item.overTime;
                    let salary = ((totalTime - overTimeInput)*basic+overTimeInput*overtime).toLocaleString();
                    row.innerHTML = `

                    <td data-column-name="fullName" style="text-align: center;" id="${item.id}">${item.staff.fullName}</td> 

                    <td data-column-name="typeName" style="text-align: center;">
                        <div class="badge bg-primary">${item.staff.type.name}</div>
                    </td>
                   

                    <td data-column-name="overTime" style="text-align: center;">
                        <div>${overTime} giờ</div>
                    </td>
                
                    <td data-column-name="startTime" style="text-align: center;">  
                        <input type="time" class="form-control" style="text-align: center;" id="startTimeInput_${item.id}"
                            value="${formatTime(startInput)}"  min="${formatTime(item.shift.shiftType.start)}" max="${formatTime(item.shift.shiftType.end)}">
                    </td>
                    

                    <td data-column-name="endTime" style="text-align: center;"> 
                        <input type="time" class="form-control" style="text-align: center;"   id="endTimeInput_${item.id}"
                            value="${endInput}">
                    </td>
                   
                    <td data-column-name="overTimeInput" style="text-align: center;"> 
                        <input  min="0" max="20" type="number" class="form-control" value="${overTimeInput}"  id="overTimeInput_${item.id}"
                    </td>

                    <td style="text-align: center;" id="totalTimeTimeInput_${item.id}"> 
                        
                        ${totalTime} giờ
                    </td>
                    
                    <td data-column-name="note" style="text-align: center;"> 
                        <input  min="0" max="20" type="text" class="form-control" value=""  >
                        
                    </td>

                    <td style="text-align: center;" id="salary_${item.id}"> 
                        ${salary} đồng
                    </td>

                    <td style="text-align: center;">
                        <input type="checkbox" class="rowCheckbox">
                    </td>
                            
    
    `
                    tableBody.appendChild(row);
                    selectAllRows();
                    selectCheckbox();
                    //colorCheckbox();


                    const startID = document.getElementById(`startTimeInput_${item.id}`);
                    const endID = document.getElementById(`endTimeInput_${item.id}`);
                    const overTimeID = document.getElementById(`overTimeInput_${item.id}`);
                    const totalTimeID = document.getElementById(`totalTimeTimeInput_${item.id}`);
                    const salaryID = document.getElementById(`salary_${item.id}`);


                    startID.addEventListener('input', () => {
                        const startTimeIDValue = startID.value;
                        console.log('Start Time input value:', startTimeIDValue);
                        console.log('End Time input value:',formatTime(endID.value));
                        console.log('Over Time input value:',overTimeID.value);
                        let tongGio = parseFloat(calculateOverTime(formatTime(endID.value), startTimeIDValue)) + parseFloat(overTimeID.value);
                        if(tongGio>=0){
                            totalTimeID.innerText=tongGio+" giờ";
                        }
                        else{
                            tongGio=0;
                            totalTimeID.innerText=tongGio+" giờ";
                        }
                        console.log(typeof tongGio)
                        let salaryValue = (parseFloat(tongGio-overTimeID.value)*basic+overTimeID.value*overtime).toLocaleString();
                        salaryID.innerText=salaryValue+" đồng";
                    });


                    endID.addEventListener('input', () => {
                        const endTimeIDValue = endID.value;
                        console.log('Start Time input value:', formatTime(startID.value));
                        console.log('End Time input value:',endTimeIDValue);
                        console.log('Over Time input value:',overTimeID.value);
                        
                        let tongGio = parseFloat(calculateOverTime(endTimeIDValue, formatTime(startID.value))) + parseFloat(overTimeID.value);
                        if(tongGio>=0){
                            totalTimeID.innerText=tongGio+" giờ";
                        }
                        else{
                            tongGio=0;
                            totalTimeID.innerText=tongGio+" giờ";
                        }
                        let salaryValue = (parseFloat(tongGio-overTimeID.value)*basic+overTimeID.value*overtime).toLocaleString();
                        salaryID.innerText=salaryValue+ " đồng";
                    });


                    overTimeID.addEventListener('input', () => {
                        const overTimeIDValue = overTimeID.value;
                        console.log('Start Time input value:', formatTime(startID.value));
                        console.log('End Time input value:',formatTime(endID.value));
                        console.log('Over Time input value:',overTimeIDValue);
                       
                        let tongGio = parseFloat(calculateOverTime(formatTime(endID.value), formatTime(startID.value))) + parseFloat(overTimeIDValue);
                        if(tongGio>=0){
                            totalTimeID.innerText=tongGio+" giờ";
                        }
                        else{
                            tongGio=0;
                            totalTimeID.innerText=tongGio+" giờ";
                        }
                        let salaryValue = (parseFloat(tongGio-overTimeID.value)*basic+overTimeID.value*overtime).toLocaleString();
                        salaryID.innerText=salaryValue+" đồng";
                    });



                })
            }

            else {

                const tableBody = document.getElementById('shiftDetail');
                tableBody.innerHTML = '';
                const row = document.createElement('tr');
                row.innerHTML = `
                <td colspan="10">
                <div style="text-align: center;">Không có dữ liệu</div>
                </td>`
                tableBody.appendChild(row);
                document.getElementById("markAttendanceButton").style.display = "none"
            }
        });
}






function getAllShiftDetailInTimeKeeping(date, shiftDetailID) {
    fetch(`http://localhost:8081/api/v1/manager/getAllSchedulesOfShiftOfDateInTimeKeeping?date=${date}&shiftType=${shiftDetailID}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())



        .then(res => {
            if (res.data !== null) {

                console.log(res)
                const tableBody = document.getElementById('shiftDetailInTimeKeeping');
                tableBody.innerHTML = '';
                const dataList = res.data;
                console.log(dataList)

                dataList.forEach(item => {
                    const row = document.createElement('tr');
                    row.id=item.id;
                    const overTime = item.shiftDetail.overTime;
                    console.log(overTime);
                    const startInput = item.start;
                    const endInput = item.end;
                    const overTimeInput = item.overTime;
                    console.log(overTimeInput);
                    const totalTime = parseFloat(calculateOverTime(endInput, startInput)) + item.overTime;
                    console.log(item);
                    let basic
                    let overtime

                    if (item.shiftDetail.staff.salary) {

                        basic = (item.shiftDetail.staff.salary.basic);
                        overtime = item.shiftDetail.staff.salary.overtime;

                    }
                    else {
                        basic = 0;
                        overtime = 0
                    }


                    const salary = ((totalTime - overTimeInput) * basic + overTimeInput * overtime).toLocaleString();
                    let note = item.note;

                    if (note !== null) {
                        note = item.note;
                    }
                    else {
                        note = " "
                    }

                    row.innerHTML = `

                        <td style="text-align: center;">${item.shiftDetail.staff.fullName}</td>            
                        <td style="text-align: center;">
                            <div class="badge bg-primary">${item.shiftDetail.staff.type.name}</div>
                        </td>
                        <td style="text-align: center;">
                            ${overTime} giờ
                        </td>
                    
                        <td> 
                            <input type="time" class="form-control" style="text-align: center;"
                                value="${startInput}" disabled>
                        </td>
                        <td>
                            <input type="time" class="form-control" style="text-align: center;"
                                value="${endInput}" disabled>
                        </td>
                        <td style="text-align: center;">
                            ${overTimeInput} giờ
                        </td>
                        <td style="text-align: center;">
                            ${totalTime} giờ
                        </td>
                        <td style="text-align: center;">
                            ${salary} đồng
                        </td>
                        <td style="text-align: center;">
                            ${note}
                        </td>
                        <td style="text-align: center;" >
                            <i class="fa-solid fa-check" style="color: #045502;"></i>
                        </td>
                        <td style="text-align: center;" >
                            <button style="border: none" class="fa-solid fa-trash-can" id="${item.id}" onclick="deleteRow('${item.id}')" title="Xóa chấm công"></button>
                        </td>
                `
                    tableBody.appendChild(row);
                    selectAllRows();


                })
            }

            else {
                const tableBody = document.getElementById('shiftDetailInTimeKeeping');
                tableBody.innerHTML = '';
                const row = document.createElement('tr');
                row.innerHTML = `
                <td colspan="10">
                <div style="text-align: center;">Không có dữ liệu</div>
                </td>`
                tableBody.appendChild(row);
            }





        });
}



function markAttendance() {
    const tableRows = document.querySelectorAll('#shiftDetail tr');
    const selectedRowsData = [];


    tableRows.forEach(row => {
        const checkbox = row.querySelector('.rowCheckbox');
        if (checkbox && checkbox.checked) {

            const rowData = {};
            const shiftDetail = {};
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                const columnName = cell.getAttribute('data-column-name'); // Lấy tên cột
                const inputElement = cell.querySelector('input');

                if (columnName === 'fullName') {
                    shiftDetail.id = cell.id;
                    rowData.shiftDetail = shiftDetail;
                } else if (columnName === 'startTime') {
                    rowData.start = formatTimeValue(inputElement.value);

                } else if (columnName === 'endTime') {
                    rowData.end = formatTimeValue(inputElement.value);
                } else if (columnName === 'overTimeInput') {
                    rowData.overTime = formatTimeValue(inputElement.value);
                } else if (columnName === 'note') {
                    rowData.note = inputElement.value;
                }
                // Thêm các trường dữ liệu khác tùy theo cần thiết
            });

            selectedRowsData.push(rowData);
        }
    });

    console.log(selectedRowsData);
    workChecked(selectedRowsData);
}

function formatTimeValue(value) {
    const stringValue = value.toString();

    // Kiểm tra độ dài chuỗi và thêm ":00" nếu cần
    if (stringValue.length === 5 && /^[0-9]{2}:[0-9]{2}$/.test(stringValue)) {
        return stringValue + ':00';
    } else {
        return stringValue;
    }
}
// Sử dụng một sự kiện (ví dụ: click nút chấm công) để gọi hàm markAttendance()
const markAttendanceButton = document.getElementById('markAttendanceButton');
markAttendanceButton.addEventListener('click', markAttendance);



function workChecked(data) {
    fetch(`http://localhost:8081/api/v1/manager/workCheckeds`,
        {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data)
            alert('Chấm công thành công');
            
            
            selectRadioButton();
        })
        .catch(error => console.error('Error:', error));

}



// Hàm để kiểm tra thời gian và chọn radio button
function autoSelectShiftBasedOnTime() {
    const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    console.log("currenTime", currentTime)
    const radioButtons = document.querySelectorAll(".form-check-input");
    let shiftFound = false;
    // Xác định thời gian ca và radio button tương ứng
    for (let i = 0; i < radioButtons.length; i++) {
        const radioButton = radioButtons[i];
        console.log("radioButton:", radioButton)
        const label = document.querySelector(`label[for="${radioButton.id}"]`);
        const labelText = label.innerText;
        console.log("text", labelText)
        const shiftTimeRange = labelText.match(/\d+:\d+/g);
        console.log(shiftTimeRange)

        if (shiftTimeRange && shiftTimeRange.length === 2) {
            const shiftStartTime = shiftTimeRange[0];
            console.log(shiftStartTime)
            const shiftEndTime = shiftTimeRange[1];
            console.log(shiftEndTime)

            if (currentTime >= shiftStartTime && currentTime <= shiftEndTime) {
                // Chọn radio button và thoát khỏi vòng lặp
                radioButton.checked = true;
                selectedRadioButtonId = radioButton.id;

                console.log("Selected value:", radioButton.value);
                console.log("select Id :", radioButton.id)
                const labelElement = document.querySelector(`label[for="${radioButton.id}"]`);
                console.log("name:", labelElement.innerText)

                console.log(formatDateInput)
                const shiftDetailID = radioButton.id;

                getAllShiftDetail(formatDateInput, shiftDetailID);
                getAllShiftDetailInTimeKeeping(formatDateInput, shiftDetailID);
                document.getElementById("shiftDetailType").innerText = labelElement.innerText;
                document.getElementById("shiftDetailTypeInTimeKeeping").innerText = labelElement.innerText + " đã chấm công";
                shiftFound = true;
                break;
            }
        }
    }


    if (!shiftFound && radioButtons.length > 0) {
        const radioButton = radioButtons[0]
        radioButton.checked = true;
        selectedRadioButtonId = radioButton.id;
        console.log("Selected value:", radioButton.value);
        console.log("select Id :", radioButton.id)
        const labelElement = document.querySelector(`label[for="${radioButton.id}"]`);
        console.log("name:", labelElement.innerText)

        console.log(formatDateInput)
        const shiftDetailID = radioButton.id;

        getAllShiftDetail(formatDateInput, shiftDetailID);
        getAllShiftDetailInTimeKeeping(formatDateInput, shiftDetailID);
        document.getElementById("shiftDetailType").innerText = labelElement.innerText;
        document.getElementById("shiftDetailTypeInTimeKeeping").innerText = labelElement.innerText + " đã chấm công";
                
    }
}



function selectRadioButton() {
    if (selectedRadioButtonId) {
        const radioButton = document.getElementById(selectedRadioButtonId);
        if (radioButton) {
           
            radioButton.checked = true;
        selectedRadioButtonId = radioButton.id;
        console.log("Selected value:", radioButton.value);
        console.log("select Id :", radioButton.id)
        const labelElement = document.querySelector(`label[for="${radioButton.id}"]`);
        console.log("name:", labelElement.innerText)

        console.log(formatDateInput)
        const shiftDetailID = radioButton.id;

        getAllShiftDetail(formatDateInput, shiftDetailID);
        getAllShiftDetailInTimeKeeping(formatDateInput, shiftDetailID);
        document.getElementById("shiftDetailType").innerText = labelElement.innerText;
        document.getElementById("shiftDetailTypeInTimeKeeping").innerText = labelElement.innerText + " đã chấm công";
            
        }
    }
};


function validateTime() {
    const currentTime = new Date();
    const inputDate = new Date(document.getElementById("current-time").value);

    if (inputDate > currentTime) {
        document.getElementById("current-time").valueAsDate = currentTime;
        alert("Thời gian chấm công không hợp lệ")
        getDateWorkCheck();
    }
}

function deleteRow(rowId) {
    var row = document.getElementById(rowId);
    if (row) {
        confirm("Xóa chấm công này")
        //row.parentNode.removeChild(row);
        const data ={}
        data.id=rowId
        deleteTimeKeeping(data);
    }
}



function deleteTimeKeeping(data) {
    fetch(`http://localhost:8081/api/v1/manager/deleteTimeKeeping`,
        {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log('API response:', data)
            alert("Xóa chấm công thành công")
            selectRadioButton();
        })
        .catch(error => console.error('Error:', error));

}
