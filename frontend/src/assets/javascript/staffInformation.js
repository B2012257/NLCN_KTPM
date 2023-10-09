const userData = localStorage.getItem("u");
const userObject = JSON.parse(userData);
const uid = userObject.uid;


function enableEdit() {
    const inputElements = document.querySelectorAll('.editInfo');
    inputElements.forEach(inputElement => {
      inputElement.removeAttribute('disabled');
    });


    const buttonCompleted = document.getElementById('buttonCompleted');
    buttonCompleted.style.display='block';

    const buttonEdit= document.getElementById('buttonEdit');
    buttonEdit.style.display='none';

    const buttonCancel= document.getElementById('buttonCancel');
    buttonCancel.style.display='block';
}


// Hàm gọi API và xử lý dữ liệu lấy thông tin nhân sự
function fetchStaffInfo() {
  fetch(`http://localhost:8081/api/v1/staff/info?Uid=${uid}`,{
    method: 'GET',
    mode:'cors',
    credentials:'include',
    headers:{
      'Content-Type': 'application/json'
    },
   
}) 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data)
      fillStaffInfo(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}




// Hàm hiển thị thông tin nhân  sự lên trang web
function fillStaffInfo(data) {
    document.getElementById('FullName').value = data.data.fullName;
    document.getElementById('gender').value=data.data.gender;
    document.getElementById('type').value = data.data.type.name;
    document.getElementById('phone').value=data.data.phone;
    document.getElementById('location').value=data.data.location;
    document.getElementById('bankAccount').value=data.data.bankAccount;
    document.getElementById('bankName').value=data.data.bankName;
    document.getElementById('avatar').src=data.data.urlAvatar;
    document.getElementById('beginWork').value=data.data.beginWork;
}

//Lấy thông tin từ giao diện thông tin cá nhân
function updateStaffInfoHandler(){
    const newFullName = document.getElementById('FullName').value;
    const newGender = document.getElementById('gender').value;
    const newPhone = document.getElementById('phone').value;
    const newLocation = document.getElementById('location').value;
    const newBankAccount = document.getElementById('bankAccount').value;
    const newBankName = document.getElementById('bankName').value;
    const newAvatar = document.getElementById('avatar').src;
    const beginWork = document.getElementById('beginWork').value;
    const dataUpdate = {};

    dataUpdate.fullName=newFullName;
    dataUpdate.gender=newGender;
    dataUpdate.phone=newPhone;
    dataUpdate.location=newLocation;
    dataUpdate.bankAccount=newBankAccount;
    dataUpdate.bankName= newBankName;
    dataUpdate.urlAvatar=newAvatar;
    dataUpdate.beginWork=beginWork;
    dataUpdate.uid=uid;

    console.log(uid);
    console.log(dataUpdate);
    

    updateStaffInfo(dataUpdate);

    
}

//Gọi api cập nhật thông tin cá nhân
function updateStaffInfo(dataUpdate){
    fetch('http://localhost:8081/api/v1/staff/editStaff', {
        method: 'PUT',
        mode:'cors',
        credentials:'include',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataUpdate)
    }) 
    .then(res => res.json())
        .then(res => {
            console.log(res);
            if (res.status === "OK") {
                console.log(res);
                return location.reload()
            }

            return console.log(res);
        })

        .then(data => {
          console.log('User data updated successfully:', data);
          alert('Thông tin đã được cập nhật thành công.'); // Thông báo khi cập nhật thành công
          
      })
      .catch(error => console.error('Error:', error));

}





//Lấy thông tin in ra giao diện
fetchStaffInfo();