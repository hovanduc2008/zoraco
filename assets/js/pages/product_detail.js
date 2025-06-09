document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.woocommerce-tabs .tabs li');
    const tabPanels = document.querySelectorAll('.woocommerce-Tabs-panel'); // Lấy tất cả các panel content

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ 'a'

            // BƯỚC 1: Xóa trạng thái 'active' khỏi TAB và CONTENT PANEL HIỆN TẠI
            const currentActiveTab = document.querySelector('.woocommerce-tabs .tabs li.active');
            const currentActivePanel = document.querySelector('.woocommerce-Tabs-panel.active');

            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }
            if (currentActivePanel) {
                currentActivePanel.classList.remove('active');
            }

            // BƯỚC 2: Thêm trạng thái 'active' vào TAB MỚI VỪA CLICK
            this.classList.add('active');

            // BƯỚC 3: HIỂN THỊ CONTENT PANEL TƯƠNG ỨNG VỚI TAB VỪA CLICK
            // Lấy id của panel content mục tiêu từ thuộc tính href của thẻ <a> trong tab
            const targetPanelId = this.querySelector('a').getAttribute('href').substring(1); // Ví dụ: từ "#tab-description" lấy ra "tab-description"
            const targetPanel = document.getElementById(targetPanelId); // Tìm phần tử panel content có id này

            if (targetPanel) {
                targetPanel.classList.add('active'); // Thêm class 'active' để panel này được hiển thị
            }
        });
    });
});