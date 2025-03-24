document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownNipple = document.getElementById("size-nipple");
    const poundsDropdownNipple = document.getElementById("pounds-nipple"); // Changed from type to pounds

    const productNameNipple = "nipple"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameNipple}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownNipple.appendChild(option);
            });
            sizeDropdownNipple.disabled = false;
        });

    // Fetch Pounds when Size is Selected
    sizeDropdownNipple.addEventListener("change", function () {
        poundsDropdownNipple.innerHTML = `<option value="">Select Pounds</option>`; // Reset

        fetch(`/products/get-pounds-gauges?name=${productNameNipple}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.pounds;
                    option.textContent = item.pounds;
                    poundsDropdownNipple.appendChild(option);
                });
                poundsDropdownNipple.disabled = false;
            });
    });
});
