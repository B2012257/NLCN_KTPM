const currentDate = new Date();
const formatDate1 = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
const formatDate = currentDate.toISOString().split('T')[0];
console.log(formatDate1);
console.log(formatDate);
const formatDate2 = reversedDateString(formatDate);
console.log(formatDate2);

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
const uid = userObject.uid;

let count =1;
let countM =1;

document.getElementById("toDay").innerText="Hôm nay : "+formatDate2;

function reversedDateString(dateString) {
    const dateParts = dateString.split('-');
    const reversedDateString = dateParts.reverse().join('/');
    return reversedDateString;
}


function formatTime(time){
    const hoursMinutes = time.split(':');
    const formattedTime = hoursMinutes[0] +':' + hoursMinutes[1];
    return formattedTime;

}


fetchStaffInfo();
getAllScheduleTimekeeping();
getAllScheduleNotTimekeeping();
getAllScheduleTimekeepingStartAndEnd(currentYear,currentMonth);



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
        document.getElementById("helloUserName").innerText="Xin chào "+data.data.fullName;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  



function getAllScheduleTimekeeping() {
    fetch(`http://localhost:8081/api/v1/staff/getAllScheduleOfStaffInTimeKeeping?date=${formatDate1}&Uid=${uid}`, {
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
            const tableBody = document.getElementById('timeKeepingToday');
            const dataList = res.data;
            dataList.forEach(item => {
                const row = document.createElement('tr');
                const date = reversedDateString(item.shiftDetail.shift.date.date);
                const start = formatTime(item.shiftDetail.shift.shiftType.start);
                const end = formatTime(item.shiftDetail.shift.shiftType.end);
                const startInput = formatTime(item.start);
                const endInput = formatTime(item.end);
                const overTimeInput = item.overTime;
                const totalTime = calculateOverTime(item.end,item.start);
                const allowance = item.shiftDetail.staff.salary.allowance;
                console.log(allowance);
                const basic = item.shiftDetail.staff.salary.basic;
                const overtime = item.shiftDetail.staff.salary.overtime;
                
                let salary = overTimeInput*overtime+(totalTime-overTimeInput)*allowance;
                let note = item.note;
                if(note==null){
                    note=' ';
                }

                
                row.innerHTML =`
                <td style="text-align: center;">${count}</td>
                                    
                <td style="text-align: center;">${date}</td>
                
                <td style="text-align: center;">
                    ${item.shiftDetail.shift.shiftType.name} (${start} - ${end} )
                </td>
                <td  style="text-align: center;">
                    ${item.shiftDetail.overTime}
                </td>
            
                <td style="text-align: center;">
                    ${startInput}
                </td>
                <td style="text-align: center;">
                    ${endInput}
                </td>
                <td style="text-align: center;">
                    ${overTimeInput}
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
                <td style="text-align: center;">
                    <div class="badge bg-success">Đã chấm công</div>
                </td>
    
    `
            tableBody.appendChild(row);
            count=count+1;
            
                
            })  
            
        });
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



function getAllScheduleNotTimekeeping() {
    fetch(`http://localhost:8081/api/v1/staff/getAllScheduleOfStaffNotInTimeKeeping?date=${formatDate1}&Uid=${uid}`, {
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
            const tableBody = document.getElementById('timeKeepingToday');
            const dataList = res.data;
            dataList.forEach(item => {
                const row = document.createElement('tr');
                const date = reversedDateString(item.shift.date.date);
                const start = formatTime(item.shift.shiftType.start);
                const end = formatTime(item.shift.shiftType.end);

                row.innerHTML =`
                <td style="text-align: center;">${count}</td>
                                    
                <td style="text-align: center;">${date}</td>
                
                <td style="text-align: center;">
                    ${item.shift.shiftType.name} (${start} - ${end} )
                </td>
                <td  style="text-align: center;">
                    ${item.overTime}
                </td>
                    
                <td style="text-align: center;">
                    --:--
                </td>
                <td style="text-align: center;">
                    --:--
                </td>
                <td style="text-align: center;">
                    0
                </td>
                <td style="text-align: center;">
                    0
                </td>
                <td style="text-align: center;">
                    0
                </td>
                <td style="text-align: center;">
                    
                </td>
                <td style="text-align: center;">
                    <div class="badge bg-warning">Chưa chấm công</div>
                </td>
    
    `
            tableBody.appendChild(row);
            count=count+1;
            
                
            })  
            
        });
}




function getFirstAndLastDayOfMonth(year, month) {
    // Ngày đầu tháng
    const firstDay = new Date(year, month , 1);
    const formattedFirstDay = dateFormat(firstDay);
  
    // Ngày cuối tháng: lấy ngày cuối của tháng hiện tại
    const lastDay = new Date(year, month+1, 0);
    const formattedLastDay = dateFormat(lastDay);
  
    return { firstDay: formattedFirstDay, lastDay: formattedLastDay };
  }
  
  function dateFormat(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1; // Tháng tính từ 0 đến 11
    let day = date.getDate();
  
    if (month < 10) {
      month = '0' + month;
    }
  
    if (day < 10) {
      day = '0' + day;
    }
  
    return year + '/' + month + '/' + day;
  }
  

  
  // Gọi hàm để lấy ngày đầu và cuối tháng của tháng hiện tại
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(currentYear, currentMonth);
  
  console.log('Ngày đầu tháng:', firstDay);
  console.log('Ngày cuối tháng:', lastDay);
  



  function getAllScheduleTimekeepingStartAndEnd(currentYear,currentMonth) {
   
    const { firstDay, lastDay } = getFirstAndLastDayOfMonth(currentYear, currentMonth);
    
    fetch(`http://localhost:8081/api/v1/staff/getAllTimeKeeping?start=${firstDay}&end=${lastDay}&Uid=${uid}`, {
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
            if(res.data !== null){
           
            console.log(res)
            const tableBody = document.getElementById('timeKeepingMonth');
            tableBody.innerHTML='';
            const dataList = res.data;
            dataList.forEach(item => {
                const row = document.createElement('tr');
                const date = reversedDateString(item.shiftDetail.shift.date.date);
                const start = formatTime(item.shiftDetail.shift.shiftType.start);
                const end = formatTime(item.shiftDetail.shift.shiftType.end);
                const startInput = formatTime(item.start);
                const endInput = formatTime(item.end);
                const overTimeInput = item.overTime;
                const totalTime = calculateOverTime(item.end,item.start);
                const allowance = item.shiftDetail.staff.salary.allowance;
                console.log(allowance);
                const basic = item.shiftDetail.staff.salary.basic;
                const overtime = item.shiftDetail.staff.salary.overtime;
                
                let salary = overTimeInput*overtime+(totalTime-overTimeInput)*allowance;
                let note = item.note;
                if(note==null){
                    note=' ';
                }

                
                row.innerHTML =`
                <td style="text-align: center;">${countM}</td>
                                    
                <td style="text-align: center;">${date}</td>
                
                <td style="text-align: center;">
                    ${item.shiftDetail.shift.shiftType.name} (${start} - ${end} )
                </td>
                <td  style="text-align: center;">
                    ${item.shiftDetail.overTime}
                </td>
            
                <td style="text-align: center;">
                    ${startInput}
                </td>
                <td style="text-align: center;">
                    ${endInput}
                </td>
                <td style="text-align: center;">
                    ${overTimeInput}
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
                <td style="text-align: center;">
                    <div class="badge bg-success">Đã chấm công</div>
                </td>
    
    `
            tableBody.appendChild(row);
            countM=countM+1;
            
                
            })  }

            else{
                const tableBody = document.getElementById('timeKeepingMonth');
                tableBody.innerHTML='';
                
                console.log(1);
            }
            
        });
}



function displaySelectedMonth() {
        const currentMonthLabel = document.getElementById('currentMonthLabel');
        currentMonthLabel.textContent = `Tháng: ${currentMonth+1}`;

        const currentYearLabel = document.getElementById('currentYearLabel');
        currentYearLabel.textContent = `Năm: ${currentYear}`;

        // Add logic to display the selected month in your table
        console.log('Selected month:', currentMonth, 'Selected year:', currentYear);
        }

function changeMonth(change) {
        currentMonth += change;

        if (currentMonth < 0) {
                currentMonth = 11; // December
                currentYear--;
            } else if (currentMonth > 11) {
                currentMonth = 0; // January
                currentYear++;
            }

            displaySelectedMonth();
            countM=1;
            getAllScheduleTimekeepingStartAndEnd(currentYear,currentMonth);
            
        }

        // Initial display
        displaySelectedMonth();

  