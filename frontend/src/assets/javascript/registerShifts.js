const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
const uid = userObject.uid;



function operationTimeInput(checkbox) {
    const timeInputs = checkbox.parentNode.parentNode.getElementsByTagName('input');

    for (var i = 0; i < timeInputs.length; i++) {
        if (timeInputs[i].type === 'time') {
            if (checkbox.checked) {
                timeInputs[i].removeAttribute('disabled');
            } else {
                timeInputs[i].setAttribute('disabled', 'disabled');
            }
        }
    }
}



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
            const timeInputs = document.getElementById(day).querySelectorAll("input[type='time']");
            const startTime = timeInputs[0].value+":00";
            const endTime = timeInputs[1].value+":00";

            const divValues = document.getElementById(day).querySelector(".sttOfWeek").innerText;
            const name = document.getElementById(day).querySelector(".sttNameWeek").innerText;
            const dateU ={};
            const staffID={};

            dateU.date=divValues;
            staffID.uid=uid;

            selectedDays.start=startTime;
            selectedDays.end=endTime;
            selectedDays.weekName=name;
            selectedDays.date=dateU;
            selectedDays.staff=staffID;


            console.log(selectedDays);
            workRegisterAPI(selectedDays);
        }
    });

        
    

}



function workRegisterAPI(selectedDays){
    fetch(`http://localhost:8081/api/v1/staff/registerSchedule`,
     {
            method: 'POST',
            mode:'cors',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedDays)
        })
        .then(response => response.json())
        .then(data => {console.log('API response:', data)
        alert('Đăng ký thành công.');
    })
        .catch(error => console.error('Error:', error));
    
}





