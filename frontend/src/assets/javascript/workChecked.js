const currentDate = new Date();
const formatDate = currentDate.toISOString().split('T')[0].replace(/-/g, '/');
const dateNow = currentDate.toISOString().split('T')[0];

document.getElementById("current-time").value = dateNow;


const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
const uid = userObject.uid;
console.log(uid);

getAllShiftType();
fetchStaffInfo();

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
  



function reversedDateString(dateString) {
    const dateParts = dateString.split('-');
    const reversedDateString = dateParts.reverse().join('/');
    return reversedDateString;
}





document.addEventListener('DOMContentLoaded', () => {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.rowCheckbox');

    // Check all individual checkboxes when "Select All" is checked initially
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
});

function selectAllRows() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const checkboxes = document.querySelectorAll('.rowCheckbox');

    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAllCheckbox.checked;
    });
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
          console.log("shiftDetail",shiftType)
          const uniqueId = `${shiftType.id}`; 
          return `
          <div class="form-check form-check-inline">
          <input class="form-check-input" type="radio" name="inlineRadioOptions" id="${uniqueId}"
              value="${shiftType.name}">
          <label class="form-check-label" for="${uniqueId}">${shiftType.name}</label>
      </div>
      
          `;
        });
        shiftType.innerHTML = html.join("");
      }
      const radioButtons = document.querySelectorAll(".form-check-input");
      console.log(radioButtons);
      radioButtons.forEach((radio) => {
        radio.addEventListener("change", function () {
          console.log("Selected value:", this.value);
          console.log("select Id :",this.id)
          console.log(formatDate)
          const shiftDetailID = this.id;
          
          getAllShiftDetail(formatDate,shiftDetailID);
          
        });
      });
    });
}



function getAllShiftDetail(date,shiftDetailID) {
    fetch(`http://localhost:8081/api/v1/manager/getScheduleOfShiftOfDate?date=${date}&shiftType=${shiftDetailID}`, {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
    })
        .then(res => res.json())

        .then(res => {
            if(res.data !==null){
           
            console.log(res)
            const tableBody = document.getElementById('shiftDetail');
            tableBody.innerHTML = '';
            const dataList = res.data;
            console.log(dataList)
            document.getElementById("shiftDetailType").innerText="Ca "  ;
            const row = document.createElement('tr');
            dataList.forEach(item => {
            const overTime = item.overTime;
            let startInput = item.shift.shiftType.start;
            let endInput = item.shift.shiftType.end;

            row.innerHTML =`

                    <td style="text-align: center;">${item.staff.fullName}</td>                  
                    <td>
                        <div class="badge bg-primary" style="text-align: center;">${item.staff.type.name}</div>
                    </td>
                    <td style="text-align: center;">
                        ${overTime}
                    </td>
                
                    <td style="text-align: center;"> 
                        <input type="time" class="form-control" style="text-align: center;"
                            value="${startInput}">
                    </td>
                    <td style="text-align: center;">
                        <input type="time" class="form-control" style="text-align: center;"
                            value="${endInput}">
                    </td>
                    <td style="text-align: center;">
                        3 giờ
                    </td>
                    <td style="text-align: center;">
                        8
                    </td>
                    <td style="text-align: center;">
                        2400000
                    </td>
                    <td style="text-align: center;">
                        8
                    </td>
                    <td style="text-align: center;">
                        <input type="checkbox" class="rowCheckbox">
                    </td>
                            
    
    `
            tableBody.appendChild(row);
            selectAllRows();
            
                
            }) }

            else{
                const tableBody = document.getElementById('shiftDetail');
                tableBody.innerHTML = '';
                const row = document.createElement('tr');
                row.innerHTML=`
                <td colspan="10">
                <div style="text-align: center;">Không có dữ liệu</div>
                </td>`
                tableBody.appendChild(row);
            }
            
            
                
            
            
        });
}