var dateInput = document.getElementById("dateInput");
var resultDiv = document.getElementById("result");

// Lắng nghe sự kiện khi giá trị của thẻ input thay đổi
dateInput.addEventListener("input", function () {
  var selectedDate = dateInput.value;

  var selectDay = new Date(dateInput.value);

  var daysOfWeek = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  var dayOfWeek = daysOfWeek[selectDay.getDay()];

  resultDiv.textContent = dayOfWeek + ", " + selectedDate;
});
