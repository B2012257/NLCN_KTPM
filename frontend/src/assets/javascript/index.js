const dataSet = {
    status: "OK",
    message: "Phản hồi xóa chi tiết ca làm",
    data: {
        "Success: Phạm Quang Thái": "Xóa thành công nhân sự: Phạm Quang Thái ra khỏi ca Sáng 2023-03-10 07:00:00.0",
        "Error: Xóa chi tiết ca id: 2 không thành công": "Không tồn tại chi tiết ca có id: 2"
    }

}
let dataRsArray = Object.values(dataSet.data)
console.log(dataRsArray);
dataRsArray.forEach(item => {
    if (!(item.includes("thành công")))
        //Message thành công 
        // return  alert(item)
        //Message không thành công

        // return console.log(item);
})