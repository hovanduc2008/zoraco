function notifyAndRedirect(event) {
    event.preventDefault(); // Ngăn chuyển trang ngay lập tức
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    window.location.href = "./cart.html";
}

document.addEventListener('DOMContentLoaded', function() {
    // Gắn sự kiện cho các nút thêm vào giỏ hàng
    const actionButtons = document.querySelectorAll('.product-actions .btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', notifyAndRedirect);
    });

    // Xử lý chuyển tab
    const tabs = document.querySelectorAll('.woocommerce-tabs .tabs li');
    const tabPanels = document.querySelectorAll('.woocommerce-Tabs-panel'); 

    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            event.preventDefault(); 
            const currentActiveTab = document.querySelector('.woocommerce-tabs .tabs li.active');
            const currentActivePanel = document.querySelector('.woocommerce-Tabs-panel.active');

            if (currentActiveTab) {
                currentActiveTab.classList.remove('active');
            }
            if (currentActivePanel) {
                currentActivePanel.classList.remove('active');
            }

            this.classList.add('active');

            const targetPanelId = this.querySelector('a').getAttribute('href').substring(1); 
            const targetPanel = document.getElementById(targetPanelId);

            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
});