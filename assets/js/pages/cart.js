// Tính lại tổng giá khi số lượng thay đổi
function updateLineTotal(row, unitPrice) {
    const qty = parseInt(row.querySelector('.quantity-input').value);
    const total = unitPrice * qty;
    row.querySelector('.product-total').innerText = total.toLocaleString('vi-VN') + 'đ';
}

// Tính tổng tiền toàn bộ giỏ hàng
function updateCartTotal() {
    let total = 0;
    document.querySelectorAll('.product-total').forEach(cell => {
        const price = parseInt(cell.innerText.replace(/\D/g, ''));
        total += price;
    });
    document.getElementById('cart-total').innerText = total.toLocaleString('vi-VN') + 'đ';
}

// Khởi tạo sự kiện sau khi DOM đã tải
document.addEventListener("DOMContentLoaded", function () {
    // Giá mẫu cho từng sản phẩm, sau này nên lấy từ data attributes hoặc backend
    const DEFAULT_PRICE = 250000;

    // Sự kiện thay đổi số lượng
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function () {
            const row = this.closest('tr');
            updateLineTotal(row, DEFAULT_PRICE);
            updateCartTotal();
        });
    });

    // Sự kiện xóa sản phẩm
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            this.closest('tr').remove();
            updateCartTotal();
        });
    });

    // Tính tổng ban đầu khi load
    updateCartTotal();
});
