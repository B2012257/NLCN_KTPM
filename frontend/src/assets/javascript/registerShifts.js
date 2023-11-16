const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
const uid = userObject.uid;

let currentDay = '';






function setCurrentDay(day) {
    currentDay = day;
    //console.log(currentDay)
    const dateFreeTime = document.getElementById(currentDay).querySelector(".sttOfWeek").querySelector("small");
    const nameFreeTime = document.getElementById(currentDay).querySelector(".sttNameWeek");
    const status = document.getElementById("exampleModalLabel");
    status.innerText = "Đăng ký ca rảnh "+nameFreeTime.innerText+", ngày "+dateFreeTime.innerText
    const freeTimeArray=getFreeTime();
    //console.log(freeTimeArray)
    getAllShiftType(freeTimeArray);
    
}


function getFreeTime(){
    const dayCheckboxInfo = document.getElementById(currentDay + "-data");
    const divElement = dayCheckboxInfo.getElementsByTagName("div");
    const freeTimeArray = [];
    console.log(divElement.length);
    for(let i = 0; i<divElement.length;i++){
        const divElementId = divElement[i];
        const divElementText = divElementId.innerText;
        //console.log(divElementText)
        freeTimeArray.push(divElementText);
        
    }
    //console.log(freeTimeArray)
    return freeTimeArray;

}

function updateCheckboxInfo() {
    const checkboxInput = document.querySelectorAll(".checkbox-input");
    //console.log("CurrentDay",currentDay)
    const dateFreeTime = document.getElementById(currentDay).querySelector(".sttOfWeek").querySelector("small");
    //console.log(dateFreeTime.innerText);
    const dateFree = formatDay(dateFreeTime.innerText);
    const arrayDataFreeTime=[];
    for (let i = 0; i < checkboxInput.length; i++) {
        const checkBox = checkboxInput[i];
        
        if (checkBox.checked == true) {
            const dataFreeTime = {};
            const staff={};
            const shiftType={};
            const date ={}
            // console.log(checkBox)
            // console.log(checkBox.value)
            // const dayCheckboxInfo = document.getElementById(currentDay + "-data");
            // const newDiv = document.createElement("div");
            // newDiv.id = checkBox.id;
            // newDiv.classList.add('badge', 'rounded-pill', 'text-bg-secondary');
            
            // newDiv.textContent = checkBox.value;
           

            // dayCheckboxInfo.appendChild(newDiv);
            // const lineBreak = document.createElement("br");
            // dayCheckboxInfo.appendChild(lineBreak);
            

            date.date = dateFree;
            dataFreeTime.date=date;
            staff.uid=uid;
            dataFreeTime.staff=staff;
            shiftType.id=checkBox.id;
            dataFreeTime.shiftType=shiftType;
            dataFreeTime.isSchedule=false;
            console.log(dataFreeTime)
            arrayDataFreeTime.push(dataFreeTime);
        }
       
    }
    console.log(arrayDataFreeTime);
    workRegisterAPI(arrayDataFreeTime);
    alert("Đăng ký lịch rảnh thành công.");
    getFreeTimeOfWeek();
    
}





function getFreeTimeOfWeek() {
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    
    daysOfWeek.forEach(day => {
        //console.log(day);
        const dateFreeTime = document.getElementById(day).querySelector(".sttOfWeek").querySelector("small");
        const buttonAddFreeTime = document.getElementById(day).querySelector(".fa-pen");
        const buttonDeleteFreeTime = document.getElementById(day).querySelector(".fa-trash-can");
        const currentDate = new Date();
        const formatDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
        console.log("format : ",formatDate)
        if ((dateFormat(dateFreeTime.innerText))>formatDate) {
            buttonAddFreeTime.removeAttribute("disabled"); 
            buttonDeleteFreeTime.removeAttribute("disabled"); 
            
        } 
        else{
            
            buttonAddFreeTime.setAttribute("disabled", "disabled");
            buttonDeleteFreeTime.setAttribute("disabled", "disabled");
            
          
        }
        

        
        //console.log(dateFreeTime.innerText);
        const date = dateFormat(dateFreeTime.innerText);
        //console.log(date)
        //console.log(uid)
        getFreeTimeAPI(date,uid,day);


        
            } 
    );

}

document.addEventListener("DOMContentLoaded", function () {
    getFreeTimeOfWeek();
});


    
function getFreeTimeAPI(date,uid,day) {
    fetch(`http://localhost:8081/api/v1/staff/getFreeTimeOfStaffInDate?date=${date}&staff=${uid}`, {
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

             
                //console.log(res)
                //const tableBody = document.getElementById('shiftDetail');
                const dayCheckboxInfo = document.getElementById(day+ "-data");
                dayCheckboxInfo.innerHTML = '';
                const dataList = res.data;
                //console.log(dataList)
                //const dayCheckboxInfo = document.getElementById(day + "-data");
                // dayCheckboxInfo.innerHTML=' ';

                dataList.forEach(item => {

                    const dayCheckboxInfo = document.getElementById(day + "-data");
                    const newDiv = document.createElement("div");
                    newDiv.id = item.id;

                    if(item.isSchedule){
                        newDiv.classList.add('badge', 'rounded-pill', 'text-bg-success');
                    }
                    newDiv.classList.add('badge', 'rounded-pill', 'text-bg-secondary');
                    
                    newDiv.textContent = "Ca "+item.shiftType.name+" ("+formatTime(item.shiftType.start)+" - "+formatTime(item.shiftType.end)+")";
                    newDiv.setAttribute("data-value",item.isSchedule)
                    newDiv.style.marginLeft = "10px";

                    dayCheckboxInfo.appendChild(newDiv);
                    // const lineBreak = document.createElement("br");
                    // dayCheckboxInfo.appendChild(lineBreak);
                    

                })
            }

            else {

                const dayCheckboxInfo = document.getElementById(day + "-data");
                dayCheckboxInfo.innerHTML='';
                
            }
        });
}









// function fetchStaffInfo() {
//     fetch(`http://localhost:8081/api/v1/staff/info?Uid=${uid}`, {
//         method: "GET",
//         mode: "cors",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error("Network response was not ok");
//             }
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             document.getElementById("helloUserName").innerText = "Xin chào " + data.data.fullName;
//         })
//         .catch((error) => {
//             console.error("Error:", error);
//         });
// }

// fetchStaffInfo();








function getAllShiftType(freeTimeArray) {
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
                const html = data.map(function (shiftType) {
                    console.log("shiftDetail", shiftType)
                    const uniqueId = `${shiftType.id}`;
                    const valueId = `Ca ${shiftType.name} (${formatTime(shiftType.start)} - ${formatTime(shiftType.end)})`;
                    console.log(valueId);
                    if (!Array.isArray(freeTimeArray) || freeTimeArray.length === 0) {
                        console.log("Mảng freeTimeArray không tồn tại hoặc trống.");
                        return `
                            <div>
                                <input type="checkbox" class="checkbox-input" name="${shiftType.name}" id=${uniqueId} value="${valueId}"  style="width: 16px; height: 16px;">
                                <label for="${uniqueId}">Ca ${shiftType.name} (${formatTime(shiftType.start)} - ${formatTime(shiftType.end)})</label>
                            </div>
      
                        `;
                    
                    }else{
                    const isValueInArray = freeTimeArray.some(value => value === valueId);
                    console.log(isValueInArray)
                    if(isValueInArray){
                        return `
                            <div style="background-color: #ccfbbc;">
                                <input type="checkbox" class="" name="${shiftType.name}" id=${uniqueId} value="${valueId}" disabled  style="width: 16px; height: 16px;"> Ca ${shiftType.name} (${formatTime(shiftType.start)} - ${formatTime(shiftType.end)})
                                <span style="font-size: smaller; font-style: italic; color: blue;">(Đã đăng ký)</span>                           
                            </div>
                            
      
                        `;

                    }
                    else{
                        return `
                            <div>
                                <input type="checkbox" class="checkbox-input" name="${shiftType.name}" id=${uniqueId} value="${valueId}"  style="width: 16px; height: 16px;"> 
                                <label for="${uniqueId}">Ca ${shiftType.name} (${formatTime(shiftType.start)} - ${formatTime(shiftType.end)})</label>
                            </div>
      
                        `;
                    }
                    
            }});
                shiftType.innerHTML = html.join("");
            }
            updateButtonAddStatus();
        });
}







function dateFormat(dateString) {
    // Sử dụng phương pháp split() để tách ngày, tháng và năm từ chuỗi
    const [day, month, year] = dateString.split('/');

    // Tạo chuỗi mới với định dạng yyyy/mm/dd
    const newDateString = `${year}/${month}/${day}`;

    return newDateString;
}

function formatDay(dateString) {
    // Sử dụng phương pháp split() để tách ngày, tháng và năm từ chuỗi
    const [day, month, year] = dateString.split('/');

    // Tạo chuỗi mới với định dạng yyyy/mm/dd
    const newDateString = `${year}-${month}-${day}`;

    return newDateString;
}



function formatTime(time) {
    const hoursMinutes = time.split(':');
    const formattedTime = hoursMinutes[0] + ':' + hoursMinutes[1];
    return formattedTime;

}








function reversedDateString(dateString) {
    const parts = dateString.split('-');
    if (parts.length !== 3) {
        throw new Error('Invalid date format. Expected format: yyyy-mm-dd');
    }

    const day = parts[2];
    const month = parts[1];
    const year = parts[0];

    return `${day}/${month}/${year}`;
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
        item.querySelector("small").innerText = reversedDateString(formatDateString(thisWeek[index].day));
    });
}

function showStartAndEndWeek(weekList) {
    let startDay = weekList[0].day;
    let endDay = weekList[weekList.length - 1].day;

    //     let startToEndDay = document.querySelector(".startToEndDay");
    //     startToEndDay.innerText = `${reversedDateString(formatDateString(startDay))} -> ${reversedDateString(formatDateString(endDay))}`;
}

// Call the showStartAndEndWeek and showDayUnderSttOfWeekTh functions to display the week information
let currentDate = new Date(); // Use the current date
showStartAndEndWeek(getWeekList(currentDate));
showDayUnderSttOfWeekTh(currentDate);


const prevWeekButton = document.getElementById('prevWeekButton');
const nextWeekButton = document.getElementById('nextWeekButton');

    // Add click event listeners to the buttons
prevWeekButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() - 7); // Go back one week
    showStartAndEndWeek(getWeekList(currentDate));
    showDayUnderSttOfWeekTh(currentDate);
    getFreeTimeOfWeek();
    
});

nextWeekButton.addEventListener('click', () => {
    currentDate.setDate(currentDate.getDate() + 7); // Advance one week
    showStartAndEndWeek(getWeekList(currentDate));
    showDayUnderSttOfWeekTh(currentDate);
    console.log("Tiến 1 tuần")
    getFreeTimeOfWeek();
    
    
});


const currentWeekButton = document.getElementById('currentWeekButton');

// Add a click event listener to the button
currentWeekButton.addEventListener('click', () => {
  // Set the currentDate to the current date
  currentDate = new Date();
  showStartAndEndWeek(getWeekList(currentDate));
  showDayUnderSttOfWeekTh(currentDate);
  getFreeTimeOfWeek();
});





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
            
        })
        .catch(error => console.error('Error:', error));

}





function getFreeTimeDelete(currentDay){
    const dayCheckboxInfo = document.getElementById(currentDay + "-data");
    const divElements = dayCheckboxInfo.getElementsByTagName("div");
    const deleteCheckbox = document.getElementById("deleteFreeTime");
    deleteCheckbox.innerHTML=''
    console.log(divElements.length);
    if(divElements.length==0){
        const statusDelete = document.createElement("div");
        statusDelete.innerText="Chưa đăng ký lịch rảnh."
        deleteCheckbox.appendChild(statusDelete)
    }
    for (let i = 0; i < divElements.length; i++) {
        const divElement = divElements[i].getAttribute("data-value");
        if (divElement == 'false') {
            const divValue = divElements[i].innerText;
            const checkBoxDiv = document.createElement("button");
    
            checkBoxDiv.style.border = 'none';
            checkBoxDiv.classList.add('checkbox-delete', 'fa-solid', 'fa-trash-can');
            checkBoxDiv.style.color="red"
            checkBoxDiv.id = divElements[i].id;
    
            checkBoxDiv.addEventListener("click", function () {
                if (confirm("Bạn có muốn xóa ca rảnh này không?")) {
                    const dataDelete={};
                    deleteDiv(this.id); // Gọi hàm xóa thẻ div cụ thể
                    console.log(this.id)
                    dataDelete.id=this.id;
                    deleteFreeTimeAPI(dataDelete)
                    getFreeTimeDelete(currentDay)
                }
            });
    
            const lineBreak = document.createElement("br");
    
            deleteCheckbox.appendChild(checkBoxDiv);
            deleteCheckbox.appendChild(document.createTextNode(" " + divValue));
            deleteCheckbox.appendChild(lineBreak);
        } else {
            const divValue = divElements[i].innerText;
            const checkBoxDiv = document.createElement("button");

            checkBoxDiv.style.border = 'none';
            checkBoxDiv.classList.add('checkbox-delete', 'fa-solid', 'fa-trash-can');
            checkBoxDiv.id = divElements[i].id;

            checkBoxDiv.setAttribute("disabled", "disabled");

            const lineBreak = document.createElement("br");

            deleteCheckbox.appendChild(checkBoxDiv);
            deleteCheckbox.appendChild(document.createTextNode(" " + divValue));

            // Tạo một phần tử <span> cho chữ "ca làm việc đã sắp lịch"
            const spanElement = document.createElement("span");
            spanElement.style.fontSize = "smaller";
            spanElement.style.fontStyle = "italic";
            spanElement.style.color = "blue";
            spanElement.innerText = " (ca rảnh đã được sắp lịch.)";

            deleteCheckbox.appendChild(spanElement);
            deleteCheckbox.appendChild(lineBreak);
        }
    }
    
    

}

function deleteDiv(divId) {
    const divToDelete = document.getElementById(divId);
    divToDelete.remove();
}



function deleteFreeTimeAPI(data) {
    fetch(`http://localhost:8081/api/v1/staff/deleteFreeTime`,
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
            // alert("Xóa thành công")
        })
        .catch(error => console.error('Error:', error));

}




function registerLastWeek(){
   
    const registerLastWeek=document.querySelector(".registerLastWeek");
    const buttonEditRegisterLastWeek=document.querySelector(".buttonEditRegisterLastWeek")
    const buttonGroup = document.querySelector('.btn-group.editWeek');
    const buttons = buttonGroup.querySelectorAll('button');

    const noteRegister=document.getElementById("noteRegister")
    const noteRegisterLastWeek=document.getElementById("noteRegisterLastWeek");

    noteRegister.style.display="none"
    noteRegisterLastWeek.style.display="block"
    
    buttons.forEach(function(button) {
        button.disabled = true;
    });
    registerLastWeek.style.display="none";
    buttonEditRegisterLastWeek.style.display="block"

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let count=0;
    daysOfWeek.forEach(day => {
        console.log(day);
       
        const dateFreeTime = document.getElementById(day).querySelector(".sttOfWeek").querySelector("small");
        const buttonAddFreeTime = document.getElementById(day).querySelector(".fa-pen");
        const buttonDeleteFreeTime = document.getElementById(day).querySelector(".fa-trash-can");
        const currentDate = new Date();
        const formatDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
        buttonAddFreeTime.setAttribute('disabled','disabled')
        buttonDeleteFreeTime.setAttribute('disabled','disabled')
        
        if ((dateFormat(dateFreeTime.innerText))<=formatDate) {
            console.log(`Skipping ${day} as dateFreeTime is in the past.`);
            console.log(count)
            count=count+1;
            if(count == 6){
                alert("Đã hết thời gian đăng ký tuần này");
               
                
                const noteRegister=document.getElementById("noteRegister")
                const noteRegisterLastWeek=document.getElementById("noteRegisterLastWeek");
            
                noteRegister.style.display="block"
                noteRegisterLastWeek.style.display="none"
                buttons.forEach(function(button) {
                    button.disabled = false;
                });
                registerLastWeek.style.display="block";
                buttonEditRegisterLastWeek.style.display="none"
            }
            return; // Skip the rest of the code for this iteration
        }

        console.log(dateFreeTime.innerText);
        const date = dateFormat(dateFreeTime.innerText);
        const dateLastWeek=getPreviousWeekDay(date)
        console.log("ngày tuần trước:",formatDateStringToYYYYMMDD(dateLastWeek))
        console.log("ngày tuần này:",date)
        console.log(uid)
        
        const dataLastWeekPromise = getFreeTimeLastWeekAPI(formatDateStringToYYYYMMDD(dateLastWeek), uid, day);
        const dataNowWeekPromise = getFreeTimeLastWeekAPI(date, uid, day);
        Promise.all([dataLastWeekPromise, dataNowWeekPromise])
            .then(([dataLastWeek, dataNowWeek]) => {
            console.log("Data Last Week:", dataLastWeek);
            console.log("Data Now Week:", dataNowWeek);
            getAllShiftTypeLastWeek(day, dataLastWeek, dataNowWeek);
            
        })


        
            .catch(error => {
            console.error("Error:", error);
    });
        
        
        
            }
             
    );

    
    
}








function getPreviousWeekDay(inputDateString) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const currentDate = new Date(inputDateString);

    // Kiểm tra xem chuyển đổi có thành công không
    if (isNaN(currentDate.getTime())) {
        return "Invalid Date";
    }

    // Sao chép ngày để không làm thay đổi giá trị ban đầu
    const previousWeekDay = new Date(currentDate);

    // Giảm đi 7 ngày để lấy ngày của tuần trước
    previousWeekDay.setDate(previousWeekDay.getDate() - 7);

    return previousWeekDay;
}


function formatDateStringToYYYYMMDD(inputDateString) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    const currentDate = new Date(inputDateString);

    // Kiểm tra xem chuyển đổi có thành công không
    if (isNaN(currentDate.getTime())) {
        return "Invalid Date";
    }

    // Lấy thông tin năm, tháng và ngày từ đối tượng Date
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 phía trước nếu tháng chỉ có một chữ số
    const day = currentDate.getDate().toString().padStart(2, '0'); // Thêm số 0 phía trước nếu ngày chỉ có một chữ số

    // Tạo chuỗi định dạng "yyyy/mm/dd"
    const formattedDateString = `${year}/${month}/${day}`;

    return formattedDateString;
}









function getFreeTimeLastWeekAPI(date, uid) {
    return fetch(`http://localhost:8081/api/v1/staff/getFreeTimeOfStaffInDate?date=${date}&staff=${uid}`, {
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
                const dataList = res.data;

                // Use map to extract ids directly
                const idArray = dataList.map(item => item.shiftType.id);

                return idArray;
            } else {
                return []; // or null, depending on your needs
            }
        });
}







function getAllShiftTypeLastWeek(day,dataLastWeek,dataNowWeek) {
    fetch(`http://localhost:8081/api/v1/manager/allShiftType`, {
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
            const dayCheckboxInfo = document.getElementById(day + "-data");
            dayCheckboxInfo.innerHTML = '';
            const dataList = res.data;

            
            dataList.forEach(item => {
                const dayCheckboxInfo = document.getElementById(day + "-data");
                //console.log(item)
                // Tạo thẻ input checkbox
                const newCheckbox = document.createElement("input");
                newCheckbox.type = "checkbox";
                newCheckbox.id = item.id+day;
               

                
                
               

                
                // Tạo nhãn cho checkbox
                const label = document.createElement("label");
                label.textContent = "Ca " + item.name + " (" + formatTime(item.start) + " - " + formatTime(item.end) + ")";
                label.setAttribute("for", item.id+day);
                newCheckbox.value=item.id;
                
                
                if (dataLastWeek.includes(item.id)) {
                    newCheckbox.checked = true;
                    label.style.backgroundColor = "#FFFF99";
                    updateButtonStatus();
                }

                if (dataNowWeek.includes(item.id)) {
                    newCheckbox.disabled = true;
                    // const spanElement = document.createElement("span");
                    // spanElement.style.fontSize = "smaller";
                    // spanElement.style.fontStyle = "italic";
                    // spanElement.style.color = "blue";
                    // spanElement.innerText = " (đã đăng ký.)";
                    // label.appendChild(spanElement)
                    label.style.backgroundColor="#ccfbbc"
                    newCheckbox.checked=false;
                }

                newCheckbox.addEventListener("change", function () {
                    if (this.checked) {
                        label.style.backgroundColor = "#FFFF99";
                    } else {
                        label.style.backgroundColor = ""; // Bỏ màu nền khi checkbox không được chọn
                    }
                });

                // Thêm checkbox và nhãn vào container
                newCheckbox.style.marginLeft ="30px";
                
                dayCheckboxInfo.appendChild(newCheckbox);
                dayCheckboxInfo.appendChild(label);

                //const lineBreak = document.createElement("br");
                // dayCheckboxInfo.appendChild(lineBreak);

                
            });

            
        } else {
            const dayCheckboxInfo = document.getElementById(day + "-data");
            dayCheckboxInfo.innerHTML = '';
        }

        
               
    });
}



function registerLastWeekCanCel(){
    getFreeTimeOfWeek();
    const registerLastWeek=document.querySelector(".registerLastWeek");
    const buttonEditRegisterLastWeek=document.querySelector(".buttonEditRegisterLastWeek")
    const buttonGroup = document.querySelector('.btn-group.editWeek');
    const buttons = buttonGroup.querySelectorAll('button');

    const noteRegister=document.getElementById("noteRegister")
    const noteRegisterLastWeek=document.getElementById("noteRegisterLastWeek");

    noteRegister.style.display="block"
    noteRegisterLastWeek.style.display="none"

    buttons.forEach(function(button) {
        button.disabled = false;
    });
    registerLastWeek.style.display="block";
    buttonEditRegisterLastWeek.style.display="none"
   
}


function registerLastWeekAdd(){
    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    const arrayDataFreeTimeLastWeek=[];
    daysOfWeek.forEach(day => {
        const dateFreeTime = document.getElementById(day).querySelector(".sttOfWeek").querySelector("small");
        const dataCheckInfo=document.getElementById(day).querySelector('.'+day+'-data');
        console.log(dataCheckInfo)
        const buttonAddFreeTime = document.getElementById(day).querySelector(".fa-pen");
        const buttonDeleteFreeTime = document.getElementById(day).querySelector(".fa-trash-can");
        const currentDate = new Date();
        const formatDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
        console.log("format : ",formatDate)
        const dateId = formatDay(dateFreeTime.innerText);
        console.log("ngayId",dateId)
        
        if(dataCheckInfo){
            const checkboxs = dataCheckInfo.querySelectorAll('input[type="checkbox"]');
            checkboxs.forEach(function(checkbox){
                if(checkbox.checked){
                    const dataRegister={};
                    const staff={};
                    const shiftType={};
                    const dateRegister={};
                    staff.uid=uid;
                    dataRegister.staff=staff;
                    shiftType.id=checkbox.value;
                    dataRegister.shiftType=shiftType;
                    dateRegister.date=dateId;
                    dataRegister.date=dateRegister;
                    dataRegister.isSchedule=false;
                    console.log(dataRegister)
                    arrayDataFreeTimeLastWeek.push(dataRegister)
                }
            
            })
        }

    } 
    );
    console.log(arrayDataFreeTimeLastWeek);
    workRegisterAPI(arrayDataFreeTimeLastWeek);
    alert("Đăng ký lịch rảnh thành công.");
    const registerLastWeek=document.querySelector(".registerLastWeek");
    const buttonEditRegisterLastWeek=document.querySelector(".buttonEditRegisterLastWeek")
    const buttonGroup = document.querySelector('.btn-group.editWeek');
    const buttons = buttonGroup.querySelectorAll('button');

    const noteRegister=document.getElementById("noteRegister")
    const noteRegisterLastWeek=document.getElementById("noteRegisterLastWeek");

    noteRegister.style.display="block"
    noteRegisterLastWeek.style.display="none"

    buttons.forEach(function(button) {
        button.disabled = false;
    });
    registerLastWeek.style.display="block";
    buttonEditRegisterLastWeek.style.display="none"
   
    
    getFreeTimeOfWeek();
}




function updateButtonStatus() {
    const buttonGroup = document.querySelector('.registerLastWeekAdd');
    

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log("Checkbox",checkboxes)
    const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    
    buttonGroup.disabled = !atLeastOneChecked;
    
}

// Attach the function to checkbox change events using event delegation
document.addEventListener('change', function(event) {
    const target = event.target;
    if (target.matches('input[type="checkbox"]')) {
        updateButtonStatus();
    }
});


function updateButtonAddStatus() {
    const buttonGroup = document.getElementById("addButton")
    

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    console.log("Checkbox",checkboxes)
    const atLeastOneChecked = Array.from(checkboxes).some(checkbox => checkbox.checked);

    
    buttonGroup.disabled = !atLeastOneChecked;
    
}

// Attach the function to checkbox change events using event delegation
document.addEventListener('change', function(event) {
    const target = event.target;
    if (target.matches('input[type="checkbox"]')) {
        updateButtonAddStatus();
    }
});