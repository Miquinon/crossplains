document.addEventListener("DOMContentLoaded", function () {
    const brandDropdown = document.getElementById("brand-joe");
    const springRangeDropdown = document.getElementById("spring-range");
    const sizeDropdown = document.getElementById("size-joe");

    const productNameJoe = "big joe"; // Set dynamically if needed

    // Fetch Brands
    fetch(`/products/get-brands?name=${productNameJoe}`)
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
        });

    // Fetch Spring Ranges when Brand is Selected
    brandDropdown.addEventListener("change", function () {
        springRangeDropdown.innerHTML = `<option value="">Select Spring Range</option>`; // Reset
        sizeDropdown.innerHTML = `<option value="">Select Size</option>`; // Reset
        sizeDropdown.disabled = true;

        fetch(`/products/get-spring-ranges?name=${productNameJoe}&brand=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Spring Ranges:", data);
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.spring_range;
                    option.textContent = item.spring_range;
                    springRangeDropdown.appendChild(option);
                });
                springRangeDropdown.disabled = false;
            });
    });

    // Fetch Sizes when Spring Range is Selected
    springRangeDropdown.addEventListener("change", function () {
        sizeDropdown.innerHTML = `<option value="">Select Size</option>`; // Reset

        fetch(`/products/get-sizes-spring?name=${productNameJoe}&brand=${brandDropdown.value}&spring_range=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                console.log("Sizes:", data);
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.size;
                    option.textContent = item.size;
                    sizeDropdown.appendChild(option);
                });
                sizeDropdown.disabled = false;
            });
    });
});
