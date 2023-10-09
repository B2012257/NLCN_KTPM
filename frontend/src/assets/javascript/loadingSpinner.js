//2 hàm ẩn hiện loading xoay vòng
// loadingElementClassName là tên class chứa phần tử loading của boostrap

//Cấu trúc HTML, các thẻ có thể thay đổi chỉ cần đầy đủ tên class là được
/// Salary-loading có thể thay đổi 
/*                     <tr class="loading--Element-class-name d-none">
                                <td colspan="6">
                                    <div class="spinner-border text-primary " role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </td>
                        </tr> */
function turnOnLoadingFunction(loadingElementClassName) {

    let loadingParentElement = document.querySelector(`.${loadingElementClassName}`)
    loadingParentElement.classList.remove("d-none")

}
function turnOffLoadingFunction(loadingElementClassName) {

    let loadingParentElement = document.querySelector(`.${loadingElementClassName}`)
    loadingParentElement.classList.add("d-none")

}