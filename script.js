document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const leftColumn = document.getElementById('leftColumn');
    const accordionItems = document.querySelectorAll('.accordion-item h2');
    const productImages = document.getElementById('productImages');
    const totalPrice = document.getElementById('totalPrice');

    // Menu toggle
    menuButton.addEventListener('click', function() {
        document.body.classList.toggle('menu-open');
    });

    // Accordion functionality
    accordionItems.forEach(item => {
        item.addEventListener('click', function() {
            const parent = this.parentElement;
            const isActive = parent.classList.contains('active');

            // Close all accordion items
            accordionItems.forEach(otherItem => {
                otherItem.parentElement.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });

    // Product configuration
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
        const topValue = document.querySelector('input[name="top"]:checked').value;
        if (topValue !== '0') {
            const topImg = document.createElement('img');
            topImg.src = images.top[document.querySelector('input[name="top"]:checked').parentElement.textContent.toLowerCase().includes('blue') ? 'blue' : 'red'];
            topImg.style.zIndex = '1';
            productImages.appendChild(topImg);
        }

        // Add pickup image
        const pickupImg = document.createElement('img');
        pickupImg.src = images.pickup[document.querySelector('input[name="pickup"]:checked').parentElement.textContent.toLowerCase().includes('white') ? 'white' : 'black'];
        pickupImg.style.zIndex = '2';
        productImages.appendChild(pickupImg);

        // Update total price
        const oldPrice = totalPrice.textContent;
        const total = [...document.querySelectorAll('input[type="radio"]:checked')].reduce((sum, input) => sum + Number(input.value), 0);
        totalPrice.textContent = `Total: R$${total}`;
        
        if (oldPrice !== totalPrice.textContent) {
            totalPrice.classList.remove('price-animation');
            void totalPrice.offsetWidth; // Trigger reflow
            totalPrice.classList.add('price-animation');
        }

        // Close menu on mobile when selection is made
        if (window.innerWidth <= 768) {
            document.body.classList.remove('menu-open');
        }
    }

    // Add change event listeners to all radio inputs
    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener('change', updateProduct);
    });

    // Initial update
    updateProduct();
});