document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const menuToggle = document.querySelector('.menu-toggle');
    const leftColumn = document.querySelector('.left-column');
    const totalPrice = document.querySelector('.total-price');
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    
    // Accordion functionality
    accordionItems.forEach(item => {
        const header = item.querySelector('h2');
        header.addEventListener('click', () => {
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        leftColumn.classList.toggle('active');
    });

    // Product configuration and price calculation
    function updateProduct() {
        const body = document.querySelector('input[name="body"]:checked');
        const top = document.querySelector('input[name="top"]:checked');
        const pickup = document.querySelector('input[name="pickup"]:checked');

        // Update images
        document.querySelector('.product-image.body').classList.add('visible');
        
        document.querySelectorAll('.product-image.top').forEach(img => {
            img.classList.remove('visible');
        });
        
        document.querySelectorAll('.product-image.pickup').forEach(img => {
            img.classList.remove('visible');
        });

        if (top.value !== "0") {
            const topColor = top.parentElement.textContent.trim().split(' ')[0].toLowerCase();
            document.querySelector(`.product-image.top.${topColor}`).classList.add('visible');
        }

        const pickupColor = pickup.parentElement.textContent.trim().split(' ')[0].toLowerCase();
        document.querySelector(`.product-image.pickup.${pickupColor}`).classList.add('visible');

        // Update price with animation
        const newTotal = parseInt(body.value) + parseInt(top.value) + parseInt(pickup.value);
        const oldText = totalPrice.textContent;
        const newText = `Total: R$${newTotal}`;
        
        if (oldText !== newText) {
            totalPrice.style.animation = 'priceChange 0.5s ease-in-out';
            setTimeout(() => {
                totalPrice.textContent = newText;
            }, 250);
            setTimeout(() => {
                totalPrice.style.animation = '';
            }, 500);
        }

        // Hide menu on mobile when selection is made
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            leftColumn.classList.remove('active');
        }
    }

    // Initial product update
    updateProduct();

    // Listen for changes
    radioInputs.forEach(input => {
        input.addEventListener('change', updateProduct);
    });
}); 