document.addEventListener("DOMContentLoaded", function () {
  const orders = [
    {
      id: "ORD001",
      name: "Nguyễn Văn A",
      phone: "0909123456",
      email: "a@example.com",
      address: "123 Đường A, Q.1, TP.HCM",
      note: "Giao buổi sáng",
      items: [
        { name: "Áo CLB 2025", qty: 2, price: 250000 },
        { name: "Áo Không Logo", qty: 1, price: 250000 }
      ],
      status: "pending"
    },
    {
      id: "ORD002",
      name: "Trần Thị B",
      phone: "0912345678",
      email: "b@example.com",
      address: "456 Đường B, Q.3, TP.HCM",
      note: "",
      items: [
        { name: "Áo Thiết Kế RO-25", qty: 1, price: 119000 }
      ],
      status: "done"
    }
  ];

  const tbody = document.getElementById("orderTableBody");

  function formatCurrency(num) {
    return num.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }

  function createProductTable(items) {
    let html = `<table class="product-table">
      <thead>
        <tr>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Thành tiền</th>
        </tr>
      </thead>
      <tbody>`;

    items.forEach(item => {
      html += `
        <tr>
          <td>${item.name}</td>
          <td>${item.qty}</td>
          <td>${formatCurrency(item.price)}</td>
          <td>${formatCurrency(item.qty * item.price)}</td>
        </tr>`;
    });

    html += `</tbody></table>`;

    return html;
  }

  function renderOrders() {
    tbody.innerHTML = ""; // Xóa hết trước khi render lại

    orders.forEach((order, index) => {
      const tr = document.createElement("tr");

      const total = order.items.reduce((sum, item) => sum + item.qty * item.price, 0);

      tr.innerHTML = `
        <td>${order.id}</td>
        <td>
          <strong>${order.name}</strong><br/>
          <small>Email: ${order.email}</small><br/>
          <small>Ghi chú: ${order.note ? order.note : '-'}</small>
        </td>
        <td>${order.address}</td>
        <td>${order.phone}</td>
        <td>${formatCurrency(total)}</td>
        <td>
          <span class="status ${order.status}">
            ${order.status === 'pending' ? 'Chờ xử lý' : order.status === 'done' ? 'Hoàn tất' : 'Đã huỷ'}
          </span>
        </td>
        <td class="actions">
          <button class="btn-view">Xem</button>
          <button class="btn-update">Cập nhật</button>
          <button class="btn-delete">Xoá</button>
        </td>
      `;

      tbody.appendChild(tr);

      // Tạo thêm hàng chứa bảng sản phẩm chi tiết, ẩn mặc định
      const detailTr = document.createElement("tr");
      detailTr.style.display = "none";
      const detailTd = document.createElement("td");
      detailTd.colSpan = 7;
      detailTd.innerHTML = createProductTable(order.items);
      detailTr.appendChild(detailTd);
      tbody.appendChild(detailTr);

      // Xử lý sự kiện nút xem
      const btnView = tr.querySelector(".btn-view");
      btnView.addEventListener("click", () => {
        if (detailTr.style.display === "none") {
          detailTr.style.display = "";
          btnView.textContent = "Ẩn";
        } else {
          detailTr.style.display = "none";
          btnView.textContent = "Xem";
        }
      });

      // Xử lý sự kiện xoá
      tr.querySelector(".btn-delete").addEventListener("click", () => {
        if (confirm(`Bạn có chắc muốn xoá đơn hàng ${order.id}?`)) {
          orders.splice(index, 1); // Xóa khỏi mảng
          renderOrders(); // Render lại danh sách
          alert(`Đơn hàng ${order.id} đã được xoá.`);
        }
      });

      // Xử lý cập nhật trạng thái
      tr.querySelector(".btn-update").addEventListener("click", () => {
        currentUpdatingOrderIndex = index;
        modalOrderId.textContent = `Đơn hàng: ${orders[currentUpdatingOrderIndex].id}`;
        statusSelect.value = orders[currentUpdatingOrderIndex].status;
        updateModal.classList.add("show");
      });
    });
  }

  // Modal cập nhật trạng thái
  const updateModal = document.getElementById("updateModal");
  const modalOrderId = document.getElementById("modalOrderId");
  const statusSelect = document.getElementById("statusSelect");
  const btnCancelUpdate = document.getElementById("btnCancelUpdate");
  const btnSaveUpdate = document.getElementById("btnSaveUpdate");

  let currentUpdatingOrderIndex = null;

  btnCancelUpdate.addEventListener("click", () => {
    updateModal.classList.remove("show");
  });

  btnSaveUpdate.addEventListener("click", () => {
    if (currentUpdatingOrderIndex === null) return;

    const newStatus = statusSelect.value;
    orders[currentUpdatingOrderIndex].status = newStatus;

    renderOrders(); // Render lại bảng sau khi cập nhật

    updateModal.classList.remove("show");
  });

  // Khởi tạo trang
  renderOrders();
});
