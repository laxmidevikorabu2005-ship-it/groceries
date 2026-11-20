const { createApp } = Vue;

const homeApp = document.querySelector("#home-app");
if (homeApp) {
    createApp({
        data() {
            return {
                cartCount: 0,
                message: "",
                categories: [
                    { name: "Fresh vegetables", detail: "Picked at their crispest", icon: "🥬", tone: "green", link: "products.html", image: "vegetables.jpeg" },
                    { name: "Kitchen essentials", detail: "Tools for better cooking", icon: "🍳", tone: "peach", link: "products.html", image: "kitchen tool.jpeg" },
                    { name: "Pantry staples", detail: "The everyday foundation", icon: "🌾", tone: "yellow", link: "products.html", image: "rice andgrains.jpeg" },
                    { name: "Home care", detail: "A cleaner kind of clean", icon: "🧼", tone: "blue", link: "products.html", image: "cleaning kit.jpg" }
                ],
                featuredProducts: [
                    { name: "Market vegetable basket", unit: "Seasonal selection · 1 kg", price: "₹149", tag: "FRESH TODAY", image: "vegetables.jpeg" },
                    { name: "Everyday kitchen tool set", unit: "5 useful essentials", price: "₹399", tag: "BESTSELLER", image: "kitchen tool.jpeg" },
                    { name: "Premium rice bag", unit: "Long grain · 5 kg", price: "₹499", tag: "SAVE 10%", image: "rice bag.jpeg" }
                ]
            };
        },
        methods: {
            addToCart(product) {
                this.cartCount += 1;
                this.message = `${product.name} added to your cart`;
                window.setTimeout(() => { this.message = ""; }, 2400);
            },
            showCartMessage() {
                this.message = this.cartCount ? `${this.cartCount} item${this.cartCount === 1 ? "" : "s"} in your cart` : "Your cart is ready for good things";
                window.setTimeout(() => { this.message = ""; }, 2400);
            }
        }
    }).mount(homeApp);
}

const homeProduce = [
    { name: "Tomato", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=240", position: "produce-one" },
    { name: "Carrot", image: "carrot.jpeg", position: "produce-two" },
    { name: "Apple", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=240", position: "produce-three apple-fall" },
    { name: "Banana", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=240", position: "produce-four banana-swing" },
    { name: "Broccoli", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=240", position: "produce-five" }
];

const produceApp = document.querySelector("#home-produce-app");
if (produceApp) {
    createApp({
        data() {
            return { homeProduce };
        },
        template: `
            <div class="milk-pour" aria-label="Milk pouring animation">
                <div class="milk-source">🥛</div>
                <div class="milk-stream"></div>
                <span class="milk-drop drop-one"></span>
                <span class="milk-drop drop-two"></span>
                <span class="milk-drop drop-three"></span>
                <div class="milk-splash"></div>
            </div>
            <img
                v-for="item in homeProduce"
                :key="item.name"
                class="floating-produce"
                :class="item.position"
                :src="item.image"
                :alt="item.name"
            >
        `
    }).mount(produceApp);
}

const productFilterApp = document.querySelector("#product-filter-app");
if (productFilterApp) {
    createApp({
        data() {
            return {
                selectedCategory: "all",
                searchTerm: ""
            };
        },
        mounted() {
            this.categoryButtons = [...document.querySelectorAll(".category-button")];
            this.productCards = [...document.querySelectorAll(".products .card")];
            this.searchInput = document.querySelector(".search-box input");
            this.searchButton = document.querySelector(".search-box button");
            this.noResults = document.querySelector(".no-results");

            this.categoryButtons.forEach((button) => {
                button.addEventListener("click", () => {
                    this.selectedCategory = button.dataset.category;
                    this.filterProducts();
                });
            });

            this.searchInput?.addEventListener("input", (event) => {
                this.searchTerm = event.target.value.trim().toLowerCase();
                this.filterProducts();
            });

            this.searchButton?.addEventListener("click", () => this.filterProducts());
            this.filterProducts();
        },
        methods: {
            filterProducts() {
                let visibleProducts = 0;
                const searchTerm = this.searchTerm;

                this.categoryButtons.forEach((button) => {
                    button.classList.toggle("active", button.dataset.category === this.selectedCategory);
                });

                this.productCards.forEach((card) => {
                    const matchesCategory = this.selectedCategory === "all" || card.dataset.category === this.selectedCategory;
                    const matchesSearch = !searchTerm || card.textContent.toLowerCase().includes(searchTerm);
                    const isVisible = matchesCategory && matchesSearch;
                    card.hidden = !isVisible;
                    if (isVisible) visibleProducts += 1;
                });

                if (this.noResults) this.noResults.hidden = visibleProducts > 0;
            }
        }
    }).mount(productFilterApp);
}
