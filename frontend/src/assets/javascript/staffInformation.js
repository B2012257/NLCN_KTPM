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
  fetch('http://localhost:8081/api/v1/staff/info?Uid=NS1290')
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
}


fetchStaffInfo();