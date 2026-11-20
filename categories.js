document.addEventListener("DOMContentLoaded", () => {
	const categoryButtons = document.querySelectorAll(".category-button");
	const productCards = document.querySelectorAll(".card");
	const noResults = document.querySelector(".no-results");

	categoryButtons.forEach((button) => {
		button.addEventListener("click", () => {
			const selectedCategory = button.dataset.category;
			let visibleProducts = 0;

			categoryButtons.forEach((categoryButton) => {
				categoryButton.classList.toggle("active", categoryButton === button);
			});

			productCards.forEach((card) => {
				const isVisible = selectedCategory === "all" || card.dataset.category === selectedCategory;
				card.hidden = !isVisible;
				if (isVisible) {
					visibleProducts += 1;
				}
			});

			noResults.hidden = visibleProducts > 0;
		});
	});
});
