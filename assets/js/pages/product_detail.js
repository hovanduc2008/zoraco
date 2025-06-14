function notifyAndRedirect(event) {
    event.preventDefault(); // Ngăn chuyển trang ngay lập tức
    alert("Sản phẩm đã được thêm vào giỏ hàng!");
    window.location.href = "./cart.html";
}

document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtn = document.querySelector(".add-to-cart");

    addToCartBtn.addEventListener("click", () => {
        const title = document.querySelector(".product-title").textContent.trim();
        const oldPrice = document.querySelector(".old-price").textContent.trim();
        const currentPrice = document.querySelector(".current-price").textContent.trim();
        const image = document.querySelector(".product-images img").getAttribute("src");
        const category = document.querySelector(".product-category").textContent.replace("Danh mục:", "").trim();

        const product = {
            title: title,
            oldPrice: oldPrice,
            currentPrice: currentPrice,
            image: image,
            category: category,
            quantity: 1 
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const existingIndex = cart.findIndex(p => p.title === product.title);
        if (existingIndex !== -1) {
            cart[existingIndex].quantity += 1;
        } else {
            cart.push(product);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Đã thêm sản phẩm vào giỏ hàng!");
    });



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