document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.querySelector('tbody');
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const addBtn = document.getElementById('add-post-btn');

  function handleDelete(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const title = row.children[1].textContent;
      if (confirm(`Bạn có chắc muốn xoá bài viết "${title}"?`)) {
        row.remove();
        alert('Đã xoá bài viết!');
      }
    });
  }

  function handleEdit(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const id = row.children[0].textContent;
      const title = row.children[1].textContent;
      const category = row.children[2].textContent;
      const date = row.children[3].textContent;
      const content = row.children[4].textContent;

      const form = document.createElement('div');
      form.innerHTML = `
        <div id="overlay" style="
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5); display: flex;
          justify-content: center; align-items: center; z-index: 9999;">
          <div style="background: white; padding: 20px; border-radius: 8px; width: 500px;">
            <h3>Chỉnh sửa bài viết ${id}</h3>
            <label>Tiêu đề:</label><br>
            <input type="text" id="edit-title" value="${title}" style="width:100%; margin-bottom: 10px;" /><br>
            <label>Danh mục:</label><br>
            <input type="text" id="edit-category" value="${category}" style="width:100%; margin-bottom: 10px;" /><br>
            <label>Ngày đăng:</label><br>
            <input type="date" id="edit-date" value="${formatDateInput(date)}" style="width:100%; margin-bottom: 10px;" /><br>
            <label>Nội dung:</label><br>
            <textarea id="edit-content" style="width:100%; height: 100px; margin-bottom: 10px;">${content}</textarea><br>
            <button id="save-btn" style="background:#2ecc71; color:white; padding: 8px 12px; border:none; border-radius:4px;">Lưu</button>
            <button id="cancel-btn" style="margin-left: 10px; padding: 8px 12px; border:none; border-radius:4px;">Huỷ</button>
          </div>
        </div>
      `;
      document.body.appendChild(form);

      form.querySelector('#cancel-btn').onclick = () => form.remove();

      form.querySelector('#save-btn').onclick = () => {
        const newTitle = form.querySelector('#edit-title').value.trim();
        const newCategory = form.querySelector('#edit-category').value.trim();
        const newDate = form.querySelector('#edit-date').value;
        const newContent = form.querySelector('#edit-content').value.trim();

        if (!newTitle || !newCategory || !newContent) {
          alert('Vui lòng điền đầy đủ thông tin!');
          return;
        }

        row.children[1].textContent = newTitle;
        row.children[2].textContent = newCategory;
        row.children[3].textContent = formatDateDisplay(newDate);
        row.children[4].textContent = newContent;

        form.remove();
        alert('Đã cập nhật bài viết!');
      };
    });
  }

  addBtn.addEventListener('click', () => {
    const form = document.createElement('div');
    form.innerHTML = `
      <div id="overlay" style="
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5); display: flex;
        justify-content: center; align-items: center; z-index: 9999;">
        <div style="background: white; padding: 20px; border-radius: 8px; width: 500px;">
          <h3>Thêm bài viết mới</h3>
          <label>ID:</label><br>
          <input type="text" id="new-id" placeholder="VD: #P03" style="width:100%; margin-bottom: 10px;" /><br>
          <label>Tiêu đề:</label><br>
          <input type="text" id="new-title" style="width:100%; margin-bottom: 10px;" /><br>
          <label>Danh mục:</label><br>
          <input type="text" id="new-category" style="width:100%; margin-bottom: 10px;" /><br>
          <label>Ngày đăng:</label><br>
          <input type="date" id="new-date" style="width:100%; margin-bottom: 10px;" /><br>
          <label>Nội dung:</label><br>
          <textarea id="new-content" style="width:100%; height: 100px; margin-bottom: 10px;"></textarea><br>
          <button id="add-save-btn" style="background:#2ecc71; color:white; padding: 8px 12px; border:none; border-radius:4px;">Thêm</button>
          <button id="add-cancel-btn" style="margin-left: 10px; padding: 8px 12px; border:none; border-radius:4px;">Huỷ</button>
        </div>
      </div>
    `;
    document.body.appendChild(form);

    form.querySelector('#add-cancel-btn').onclick = () => form.remove();

    form.querySelector('#add-save-btn').onclick = () => {
      const id = form.querySelector('#new-id').value.trim();
      const title = form.querySelector('#new-title').value.trim();
      const category = form.querySelector('#new-category').value.trim();
      const date = form.querySelector('#new-date').value;
      const content = form.querySelector('#new-content').value.trim();

      if (!id || !title || !category || !content || !date) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
      }

      const newRow = document.createElement('tr');
      newRow.innerHTML = `
        <td>${id}</td>
        <td>${title}</td>
        <td>${category}</td>
        <td>${formatDateDisplay(date)}</td>
        <td>${content}</td>
        <td class="actions">
          <button class="btn-edit">Sửa</button>
          <button class="btn-delete">Xoá</button>
        </td>
      `;
      tbody.appendChild(newRow);

      handleDelete(newRow.querySelector('.btn-delete'));
      handleEdit(newRow.querySelector('.btn-edit'));

      form.remove();
      alert('Đã thêm bài viết!');
    };
  });

  document.querySelectorAll('.btn-delete').forEach(handleDelete);
  document.querySelectorAll('.btn-edit').forEach(handleEdit);

  // Tìm kiếm
  searchInput.addEventListener('input', filterRows);
  categoryFilter.addEventListener('change', filterRows);

  function filterRows() {
    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value.toLowerCase();

    const rows = tbody.querySelectorAll('tr');
    rows.forEach(row => {
      const title = row.children[1].textContent.toLowerCase();
      const category = row.children[2].textContent.toLowerCase();
      const content = row.children[4].textContent.toLowerCase();
      const matchKeyword = title.includes(keyword) || content.includes(keyword);
      const matchCategory = !selectedCategory || category === selectedCategory;

      row.style.display = (matchKeyword && matchCategory) ? '' : 'none';
    });
  }

  function formatDateDisplay(dateStr) {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  }

  function formatDateInput(displayDate) {
    const [d, m, y] = displayDate.split("/");
    return `${y}-${m}-${d}`;
  }
});
