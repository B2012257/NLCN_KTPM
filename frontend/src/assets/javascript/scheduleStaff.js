//Lấy ra các người có ngày sắp xếp trong tuần
var dataTest = [
  { id: 1, name: "thái", dateGoWork: "10/10/2023" },
  { id: 2, name: "tring", dateGoWork: "6/10/2023" },
  { id: 3, name: "phong", dateGoWork: "6/10/2023" },
  { id: 4, name: "Linh", dateGoWork: "8/10/2023" },
  { id: 5, name: "phong", dateGoWork: "8/10/2023" },
  { id: 6, name: "phong", dateGoWork: "5/10/2023" },
  { id: 7, name: "phong", dateGoWork: "7/10/2023" },
];

var currentDate = new Date();
var firstDayOfWeek = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() - currentDate.getDay() + 1
);
var lastDayOfWeek = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth(),
  currentDate.getDate() + (7 - currentDate.getDay())
);

function parseDate(dateString) {
  var parts = dateString.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

var filteredData1 = dataTest.filter(function (item) {
  var dateGoWork = parseDate(item.dateGoWork);
  return dateGoWork >= firstDayOfWeek && dateGoWork <= lastDayOfWeek;
});

console.log("Ngày đầu tiên của tuần: " + firstDayOfWeek.toLocaleDateString());
console.log("Ngày cuối cùng của tuần: " + lastDayOfWeek.toLocaleDateString());

console.log(filteredData1);
