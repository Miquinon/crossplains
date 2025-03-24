document.addEventListener("DOMContentLoaded", function () {
    const brandDropdown = document.getElementById("brand-level");

    if (!brandDropdown) {
        console.error("Dropdown element with ID 'brand-level' not found.");
        return;
    }

    const productNameLevelC = "level controller"; // Set dynamically if needed

    // Fetch Brands
    fetch(`/products/get-brands?name=${productNameLevelC}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Brands:", data);
            if (data.length === 0) {
                console.warn("No brands found for:", productNameLevelC);
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
