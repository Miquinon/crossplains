document.addEventListener("DOMContentLoaded", function () {
    const brandDropdown = document.getElementById("brand-soap");
    const sizeDropdown = document.getElementById("size-soap");

    const productNameSoap = "hand soap"; // Set dynamically if needed

    // Fetch Brands
    fetch(`/products/get-brands?name=${productNameSoap}`)
        .then((res) => res.json())
        .then((data) => {
            console.log("Brands:", data);
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

    // Fetch Sizes when Brand is Selected
    brandDropdown.addEventListener("change", function () {
        sizeDropdown.innerHTML = `<option value="">Select Size</option>`; // Reset

        fetch(`/products/get-sizes-dope?name=${productNameSoap}&brand=${this.value}`)
            .then((res) => res.json())
            .then((data) => {

                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.size;
                    option.textContent = item.size;
                    sizeDropdown.appendChild(option);
                });

                sizeDropdown.disabled = false;
            })
            .catch((error) => {
                console.error("Error fetching sizes:", error);
            });
    });
});
