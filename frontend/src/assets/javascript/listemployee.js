const api = `http://localhost:8081/api/v1/manager/allStaff`;
let data = [];
function start() {
  getStaff(function (fetchedData) {
    data = fetchedData;
    filterStaffByRole(data, "tatca");
  });
}
start();

async function getStaff(callback) {
  try {
    const response = await fetch(api, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    const data = responseData.data; // Truy cập thuộc tính data từ response object
    console.log("Data from API:", data); // Log kết quả từ API
    callback(data);
  } catch (error) {
    console.error(error);
  }
}
const radioButtons = document.querySelectorAll(
  'input[name="inlineRadioOptions"]'
);

function renderStaff(staffs) {
  const listStaff = document.getElementById("list-staff");
  var htmls = staffs.map(function (staff) {
    const typeName = staff.type ? staff.type.name : "";

    const today = new Date();
    const beginWork = new Date(staff.beginWork);
    const monthsDiff =
      (today.getFullYear() - beginWork.getFullYear()) * 12 +
      today.getMonth() -
      beginWork.getMonth();

    // Tính số năm và số tháng
    const years = Math.floor(monthsDiff / 12);
    const months = monthsDiff % 12;
    const year = years > 0 ? `${years} năm ` : "";
    const returnHTML = `
        <tr style="text-align: center" role="button" title="Bấm để xem chi tiết" data-bs-toggle="modal"
        data-bs-target="#modal">
        <td>${staff.uid}</td>
        <td>${staff.fullName}</td>
        <td>${staff.gender}</td>
        <td>
            <div class="badge bg-primary">${typeName}</div>
        </td>
        <td>${staff.location}</td>
        <td>${staff.phone}</td>
        <td>${year} ${months} tháng</td>
   
        
    </tr>
        `;

    return returnHTML;
  });
  listStaff.innerHTML = htmls.join("");
}

function removeDiacriticsAndSpaces(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s/g, "")
    .toLowerCase();
}

function filterStaffByRole(data, role) {
  console.log("Role selected:", role);
  if (role === "tatca") {
    renderStaff(data);
  } else {
    const filteredStaff = data.filter((staff) => {
      let name = staff.type && staff.type.name;
      if (name) {
        let remove = removeDiacriticsAndSpaces(name);
        console.log(remove);
        return remove === role;
      }
    });
    renderStaff(filteredStaff);
  }
}

radioButtons.forEach((radio) => {
  radio.addEventListener("change", function () {
    filterStaffByRole(data, this.value); // Truyền thêm tham số data vào hàm filterStaffByRole
  });
});

function filterStaffByName(data, searchTerm) {
  return data.filter((staff) => {
    const fullName = staff.fullName.toLowerCase();
    return fullName.includes(searchTerm);
  });
}
const inputSearch = document.querySelector(".form-control");
const btnSearch = document.querySelector(".input-group-text");
btnSearch.addEventListener("click", function () {
  const searchTerm = inputSearch.value.trim().toLowerCase();
  console.log("input", searchTerm);
  const filteredStaff = filterStaffByName(data, searchTerm);
  renderStaff(filteredStaff);
});
