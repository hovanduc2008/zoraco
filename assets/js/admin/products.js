document.addEventListener("DOMContentLoaded", function () {
  const tbody = document.getElementById('product-table');
  const searchInput = document.getElementById('searchInput');
  const addBtn = document.getElementById('add-product-btn');

  function handleDelete(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const name = row.children[1].textContent;
      if (confirm(`Bạn có chắc muốn xoá sản phẩm "${name}"?`)) {
        row.remove();
        alert('Đã xoá sản phẩm!');
      }
    });
  }

  function handleEdit(button) {
    button.addEventListener('click', function () {
      const row = this.closest('tr');
      const imgSrc = row.querySelector('img').src;
      const name = row.children[1].textContent;
      const oldPrice = row.children[2].textContent.replace(/[^0-9]/g, '');
      const newPrice = row.children[3].textContent.replace(/[^0-9]/g, '');

      const form = document.createElement('div');
      form.innerHTML = `
        <div id="overlay" style="
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0, 0, 0, 0.5); display: flex;
          justify-content: center; align-items: center; z-index: 9999;">
          <div style="
            background: white; padding: 20px; border-radius: 8px; width: 400px;
            box-sizing: border-box;">
            <h3>Chỉnh sửa sản phẩm</h3>
            <label>Tên sản phẩm:</label><br>
            <input type="text" id="edit-name" value="${name}" style="width:100%; margin-bottom: 10px;" /><br>
            <label>Giá gốc:</label><br>
            <input type="number" id="edit-old-price" value="${oldPrice}" style="width:100%; margin-bottom: 10px;" /><br>
            <label>Giá khuyến mãi:</label><br>
            <input type="number" id="edit-new-price" value="${newPrice}" style="width:100%; margin-bottom: 10px;" /><br>
            <label>URL hình ảnh:</label><br>
            <input type="text" id="edit-img" value="${imgSrc}" style="width:100%; margin-bottom: 10px;" /><br>
            <button id="save-btn" style="background:#2ecc71; color:white; padding: 8px 12px; border:none; border-radius:4px;">Lưu</button>
            <button id="cancel-btn" style="margin-left: 10px; padding: 8px 12px; border:none; border-radius:4px; cursor:pointer;">Huỷ</button>
          </div>
        </div>
      `;
      document.body.appendChild(form);

      form.querySelector('#cancel-btn').onclick = () => form.remove();

      form.querySelector('#save-btn').onclick = () => {
        const newName = form.querySelector('#edit-name').value.trim();
        const newOld = form.querySelector('#edit-old-price').value.trim();
        const newNew = form.querySelector('#edit-new-price').value.trim();
        const newImg = form.querySelector('#edit-img').value.trim();

        if (!newName || !newOld || !newNew) {
          alert('Vui lòng điền đầy đủ thông tin!');
          return;
        }

        row.querySelector('img').src = newImg;
        row.children[1].textContent = newName;
        row.children[2].innerHTML = `<s>${Number(newOld).toLocaleString()}₫</s>`;
        row.children[3].innerHTML = `<span style="color:red;">${Number(newNew).toLocaleString()}₫</span>`;

        form.remove();
        alert('Cập nhật thành công!');
      };
    });
  }

  function addProductRow(image, name, oldPrice, newPrice) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${image}" alt="${name}" class="product-img"></td>
      <td>${name}</td>
      <td><s>${Number(oldPrice).toLocaleString()}₫</s></td>
      <td style="color:red;">${Number(newPrice).toLocaleString()}₫</td>
      <td class="actions">
        <button class="btn-edit">Sửa</button>
        <button class="btn-delete">Xoá</button>
      </td>
    `;
    tbody.appendChild(row);
    handleEdit(row.querySelector('.btn-edit'));
    handleDelete(row.querySelector('.btn-delete'));
  }

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
          <h3>Thêm sản phẩm mới</h3>
          <label>Tên sản phẩm:</label><br>
          <input type="text" id="new-name" style="width:100%; margin-bottom: 10px;" /><br>
          <label>Giá gốc:</label><br>
          <input type="number" id="new-old-price" style="width:100%; margin-bottom: 10px;" /><br>
          <label>Giá khuyến mãi:</label><br>
          <input type="number" id="new-new-price" style="width:100%; margin-bottom: 10px;" /><br>
          <label>URL hình ảnh:</label><br>
          <input type="text" id="new-img" placeholder="VD: ../assets/images/ten.png" style="width:100%; margin-bottom: 10px;" /><br>
          <button id="add-save-btn" style="background:#2ecc71; color:white; padding: 8px 12px; border:none; border-radius:4px;">Thêm</button>
          <button id="add-cancel-btn" style="margin-left: 10px; padding: 8px 12px; border:none; border-radius:4px; cursor:pointer;">Huỷ</button>
        </div>
      </div>
    `;
    document.body.appendChild(form);

    form.querySelector('#add-cancel-btn').onclick = () => form.remove();

    form.querySelector('#add-save-btn').onclick = () => {
      const name = form.querySelector('#new-name').value.trim();
      const old = form.querySelector('#new-old-price').value.trim();
      const sale = form.querySelector('#new-new-price').value.trim();
      const img = form.querySelector('#new-img').value.trim();

      if (!name || !old || !sale || !img) {
        alert('Vui lòng điền đầy đủ thông tin!');
        return;
      }

      addProductRow(img, name, old, sale);
      form.remove();
      alert('Đã thêm sản phẩm!');
    };
  });

  document.querySelectorAll('.btn-edit').forEach(handleEdit);
  document.querySelectorAll('.btn-delete').forEach(handleDelete);

  searchInput.addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    tbody.querySelectorAll('tr').forEach(row => {
      const name = row.children[1].textContent.toLowerCase();
      row.style.display = name.includes(keyword) ? '' : 'none';
    });
  });
});
