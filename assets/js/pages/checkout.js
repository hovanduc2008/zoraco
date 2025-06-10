document.addEventListener("DOMContentLoaded", function () {
    const confirmButton = document.querySelector(".btn-confirm");

    confirmButton.addEventListener("click", function (event) {
        event.preventDefault(); // Ngăn hành vi mặc định (nếu là submit form)
        
        // Tùy chọn: Kiểm tra dữ liệu đầu vào trước khi chuyển trang
        const fullname = document.getElementById("fullname").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const address = document.getElementById("address").value.trim();

        if (!fullname || !phone || !address) {
            alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
            return;
        }

        // Hiển thị thông báo xác nhận (tùy chọn)
        alert("Đặt hàng thành công! Đang chuyển đến trang hóa đơn...");

        // Chuyển đến trang hóa đơn
        window.location.href = "./invoice.html";
    });
});