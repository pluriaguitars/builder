document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const leftColumn = document.querySelector('.left-column');
    const accordionItems = document.querySelectorAll('.accordion-item h2');
    const productImages = document.querySelector('.product-images');
    const totalPrice = document.querySelector('.total-price');

    // Menu toggle functionality
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        leftColumn.classList.toggle('active');
    });

    // Accordion functionality
    accordionItems.forEach(item => {
        item.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const arrow = this.querySelector('.arrow');
            
            // Close all other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.nextElementSibling.classList.remove('active');
                    otherItem.querySelector('.arrow').classList.remove('active');
                }
            });

            content.classList.toggle('active');
            arrow.classList.toggle('active');
        });
    });

    // Product configuration and price calculation
    const images = {
        body: {
            paulownia: 'https://i.ibb.co/gvzBhFv/corpo-omni-paulownia.png'
        },
        top: {
            blue: 'https://i.ibb.co/N2ykDps/tampo-omni-buckeye-burl-azul.png',
            red: 'https://i.ibb.co/4VKmF4J/tampo-omni-buckeye-burl-vermelho.png'
        },
        pickup: {
            white: 'https://i.ibb.co/fvTbxhm/captador-humbucker-brac-o-branco.png',
            black: 'https://i.ibb.co/fNWgC9j/captador-humbucker-brac-o-preto.png'
        }
    };

    function updateProduct() {
        // Clear existing images
        productImages.innerHTML = '';
        
        // Add body image
        const bodyImg = document.createElement('img');
        bodyImg.src = images.body.paulownia;
        bodyImg.style.zIndex = '0';
        productImages.appendChild(bodyImg);

        // Add top image if selected
        const selectedTop = document.querySelector('input[name="top"]:checked').value;
        if (selectedTop !== '0') {
            const topImg = document.createElement('img');
            topImg.src = selectedTop === '50' ? 
                (document.querySelector('input[name="top"]:checked').nextSibling.textContent.includes('Blue') ? 
                    images.top.blue : images.top.red) : null;
            topImg.style.zIndex = '1';
            if (topImg.src) productImages.appendChild(topImg);
        }

        // Add pickup image
        const pickupImg = document.createElement('img');
        pickupImg.src = document.querySelector('input[name="pickup"]:checked').nextSibling.textContent.includes('White') ?
            images.pickup.white : images.pickup.black;
        pickupImg.style.zIndex = '2';
        productImages.appendChild(pickupImg);

        // Update total price
        const oldTotal = parseInt(totalPrice.textContent.match(/\d+/)[0]);
        const newTotal = calculateTotal();
        
        if (oldTotal !== newTotal) {
            totalPrice.classList.add('price-animation');
            totalPrice.textContent = `Total: R$${newTotal}`;
            setTimeout(() => totalPrice.classList.remove('price-animation'), 300);
        }

        // Close menu on mobile when selection is made
        if (window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            leftColumn.classList.remove('active');
        }
    }

    function calculateTotal() {
        const body = parseInt(document.querySelector('input[name="body"]:checked').value);
        const top = parseInt(document.querySelector('input[name="top"]:checked').value);
        const pickup = parseInt(document.querySelector('input[name="pickup"]:checked').value);
        return body + top + pickup;
    }

    // Add event listeners to all radio buttons
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', updateProduct);
    });

    // Initial product update
    updateProduct();
}); 