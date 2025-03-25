document.addEventListener("DOMContentLoaded", function () {
    const brandDropdown = document.getElementById("brand-scrub");

    const productNameScrubs = "hand scrub"; // Set dynamically if needed

    // Fetch Brands
    fetch(`/products/get-brands?name=${productNameScrubs}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Brands:", data);
            if (data.length === 0) {
                console.warn("No brands found for:", productNameScrubs);
                return;
            }

            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.brand;
                option.textContent = item.brand;
                brandDropdown.appendChild(option);
            });

            brandDropdown.disabled = false;
        })
        .catch((error) => {
            console.error("Error fetching brands:", error);
        });
});
