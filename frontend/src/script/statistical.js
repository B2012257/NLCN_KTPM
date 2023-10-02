const apiUrl = "http://localhost:8081/api/v1/manager/allStaff";
const apiUrlSalary = "http://localhost:8081/api/v1/manager/salaries";

// Gọi API bằng Axios

// Sử dụng fetch() để gọi API
axios
  .get(apiUrl)
  .then((response) => {
    // Xử lý dữ liệu nhận được từ API ở đây
    console.log(response.data);
  })
  .catch((error) => {
    // Xử lý lỗi nếu có
    console.error("API request error:", error);
  });

// Hàm để gọi API bằng Axios
function fetchData(url) {
  return axios
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API request error:", error);
      throw error;
    });
}

// Gọi cả hai API cùng một lúc và kết hợp dữ liệu sau khi cả hai đã hoàn thành
Promise.all([fetchData(apiUrl), fetchData(apiUrlSalary)])
  .then((data) => {
    const staffData = data[0];
    const salaryData = data[1];

    // Xử lý dữ liệu từ staffData và salaryData ở đây
    const combinedData = staffData.map((staff, index) => ({
      name: staff.name,
      email: staff.email,
      salary: salaryData[index].salary,
      rank: salaryData[index].rank,
    }));

    console.log(combinedData);
  })
  .catch((error) => {
    // Xử lý lỗi nếu có
    console.error("API request error:", error);
  });
