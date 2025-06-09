document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.querySelector('tbody');
  const searchInput = document.getElementById('searchInput');
  const addBtn = document.getElementById('add-category-btn');

  // Xử lý xoá
  function handleDelete(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const name = row.children[1].textContent;
      if (confirm(`Bạn có chắc muốn xoá danh mục "${name}"?`)) {
        row.remove();
        alert('Đã xoá danh mục!');
      }
    });
  }

  // Xử lý sửa
  function handleEdit(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const id = row.children[0].textContent;
      const name = row.children[1].textContent;
      const desc = row.children[2].textContent;

      const form = document.createElement('div');
      form.innerHTML = `
        <div id="overlay" style="
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5); display: flex;
          justify-content: center; align-items: center; z-index: 9999;">
          <div style="
            background: white; padding: 20px; border-radius: 8px; width: 400px;
            box-sizing: border-box;">
            <h3>Chỉnh sửa danh mục ${id}</h3>
            <label for="edit-name">Tên danh mục:</label><br>
            <input type="text" id="edit-name" value="${name}" style="width:100%; margin-bottom: 10px;" /><br>
            <label for="edit-desc">Mô tả:</label><br>
            <textarea id="edit-desc" style="width:100%; height: 80px; margin-bottom: 10px;">${desc}</textarea><br>
            <button id="save-btn" style="background:#2ecc71; color:white; padding: 8px 12px; border:none; border-radius:4px;">Lưu</button>
            <button id="cancel-btn" style="margin-left: 10px; padding: 8px 12px; border:none; border-radius:4px; cursor:pointer;">Huỷ</button>
          </div>
        </div>
      `;
      document.body.appendChild(form);

      form.querySelector('#cancel-btn').onclick = () => form.remove();

      form.querySelector('#save-btn').onclick = () => {
        const newName = form.querySelector('#edit-name').value.trim();
        const newDesc = form.querySelector('#edit-desc').value.trim();

        if (!newName) {
          alert('Tên danh mục không được để trống!');
          return;
        }

        row.children[1].textContent = newName;
        row.children[2].textContent = newDesc;

        form.remove();
        alert('Cập nhật thành công!');
      };
    });
  }

  // Xử lý thêm mới danh mục
  addBtn.addEventListener('click', () => {
    const form = document.createElement('div');
    form.innerHTML = `
      <div id="overlay" style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5); display: flex;
        justify-content: center; align-items: center; z-index: 9999;">
        <div style="
          background: white; padding: 20px; border-radius: 8px; width: 400px;
          box-sizing: border-box;">
          <h3>Thêm danh mục mới</h3>
          <label for="new-id">ID:</label><br>
          <input type="text" id="new-id" placeholder="VD: #C03" style="width:100%; margin-bottom: 10px;" /><br>
          <label for="new-name">Tên danh mục:</label><br>
          <input type="text" id="new-name" placeholder="Tên danh mục" style="width:100%; margin-bottom: 10px;" /><br>
          <label for="new-desc">Mô tả:</label><br>
          <textarea id="new-desc" placeholder="Mô tả danh mục" style="width:100%; height: 80px; margin-bottom: 10px;"></textarea><br>
          <button id="add-save-btn" style="background:#2ecc71; color:white; padding: 8px 12px; border:none; border-radius:4px;">Thêm</button>
          <button id="add-cancel-btn" style="margin-left: 10px; padding: 8px 12px; border:none; border-radius:4px; cursor:pointer;">Huỷ</button>
        </div>
      </div>
    `;
    document.body.appendChild(form);

    form.querySelector('#add-cancel-btn').onclick = () => form.remove();

    form.querySelector('#add-save-btn').onclick = () => {
      const newId = form.querySelector('#new-id').value.trim();
      const newName = form.querySelector('#new-name').value.trim();
      const newDesc = form.querySelector('#new-desc').value.trim();

      if (!newId || !newName) {
        alert('ID và Tên danh mục không được để trống!');
        return;
      }

      // Tạo row mới
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${newId}</td>
        <td>${newName}</td>
        <td>${newDesc}</td>
        <td class="actions">
          <button class="btn-edit">Sửa</button>
          <button class="btn-delete">Xoá</button>
        </td>
      `;
      tbody.appendChild(newRow);

      // Gắn sự kiện cho nút mới thêm
      handleDelete(newRow.querySelector('.btn-delete'));
      handleEdit(newRow.querySelector('.btn-edit'));

      form.remove();
      alert('Đã thêm danh mục mới!');
    };
  });

  // Gắn sự kiện cho các nút sẵn có
  document.querySelectorAll('.btn-delete').forEach(handleDelete);
  document.querySelectorAll('.btn-edit').forEach(handleEdit);

  // Tìm kiếm
  searchInput.addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const rows = tbody.querySelectorAll('tr');

    rows.forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      const desc = row.cells[2].textContent.toLowerCase();

      row.style.display = (name.includes(filter) || desc.includes(filter)) ? '' : 'none';
    });
  });
});
