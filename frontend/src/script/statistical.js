const apiUrl = "http://localhost:8081/api/v1/manager/allStaff";
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
