document.addEventListener("DOMContentLoaded", function () {
  // Hàm xử lý xoá tài khoản
  function handleDelete(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const name = row.children[1].textContent;
      if (confirm(`Bạn có chắc muốn xoá tài khoản "${name}"?`)) {
        row.remove();
        alert('Đã xoá tài khoản!');
      }
    });
  }

  // Hàm xử lý sửa tài khoản
  function handleEdit(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const id = row.children[0].textContent;
      const name = row.children[1].textContent;
      const email = row.children[2].textContent;
      const role = row.children[3].textContent;
      const status = row.children[4].textContent;

      const form = document.createElement('div');
      form.innerHTML = `
        <div id="overlay" style="
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5); display: flex;
          justify-content: center; align-items: center; z-index: 9999;">
          <div style="
            background: white; padding: 20px; border-radius: 8px; width: 400px;
            box-sizing: border-box;">
            <h3>Chỉnh sửa tài khoản ${id}</h3>
            <label for="edit-name">Tên:</label><br>
            <input type="text" id="edit-name" value="${name}" style="width:100%; margin-bottom: 10px;" /><br>
            <label for="edit-email">Email:</label><br>
            <input type="email" id="edit-email" value="${email}" style="width:100%; margin-bottom: 10px;" /><br>
            <label for="edit-role">Vai trò:</label><br>
            <select id="edit-role" style="width:100%; margin-bottom: 10px;">
              <option value="Admin" ${role === "Admin" ? "selected" : ""}>Admin</option>
              <option value="Người dùng" ${role === "Người dùng" ? "selected" : ""}>Người dùng</option>
            </select><br>
            <label for="edit-status">Trạng thái:</label><br>
            <select id="edit-status" style="width:100%; margin-bottom: 10px;">
              <option value="Hoạt động" ${status === "Hoạt động" ? "selected" : ""}>Hoạt động</option>
              <option value="Khoá" ${status === "Khoá" ? "selected" : ""}>Khoá</option>
            </select><br>
            <button id="save-btn" style="background:#2ecc71; color:white; padding: 8px 12px; border:none; border-radius:4px;">Lưu</button>
            <button id="cancel-btn" style="margin-left: 10px; padding: 8px 12px; border:none; border-radius:4px; cursor:pointer;">Huỷ</button>
          </div>
        </div>
      `;
      document.body.appendChild(form);

      // Huỷ popup
      form.querySelector('#cancel-btn').onclick = () => form.remove();

      // Lưu thay đổi
      form.querySelector('#save-btn').onclick = () => {
        const newName = form.querySelector('#edit-name').value.trim();
        const newEmail = form.querySelector('#edit-email').value.trim();
        const newRole = form.querySelector('#edit-role').value;
        const newStatus = form.querySelector('#edit-status').value;

        if (!newName || !newEmail) {
          alert('Tên và Email không được để trống!');
          return;
        }

        // Cập nhật dữ liệu trên bảng
        row.children[1].textContent = newName;
        row.children[2].textContent = newEmail;
        row.children[3].textContent = newRole;
        row.children[4].textContent = newStatus;

        form.remove();
        alert('Cập nhật thành công!');
      };
    });
  }

  // Gắn sự kiện cho tất cả nút xoá
  document.querySelectorAll('.btn-delete').forEach(handleDelete);

  // Gắn sự kiện cho tất cả nút sửa
  document.querySelectorAll('.btn-edit').forEach(handleEdit);

  // Tìm kiếm theo tên hoặc email
  document.getElementById('searchInput').addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const username = row.cells[1].textContent.toLowerCase();
      const email = row.cells[2].textContent.toLowerCase();

      row.style.display = (username.includes(filter) || email.includes(filter)) ? '' : 'none';
    });
  });
});
