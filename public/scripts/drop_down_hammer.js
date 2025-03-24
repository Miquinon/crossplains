document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownHammer = document.getElementById("size-hammer");
    const pressureDropdownHammer = document.getElementById("pressure-hammer"); // Changed from type to pounds

    const productNameHammer = "hammer union"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameHammer}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownHammer.appendChild(option);
            });
            sizeDropdownHammer.disabled = false;
        });

    // Fetch Pounds when Size is Selected
    sizeDropdownHammer.addEventListener("change", function () {
        pressureDropdownHammer.innerHTML = `<option value="">Select Pressure</option>`; // Reset

        fetch(`/products/get-pressure?name=${productNameHammer}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.pressure;
                    option.textContent = item.pressure;
                    pressureDropdownHammer.appendChild(option);
                });
                pressureDropdownHammer.disabled = false;
            });
    });
});
