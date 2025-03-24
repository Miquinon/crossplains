document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownBull = document.getElementById("size-bull");
    const poundsDropdownBull = document.getElementById("pounds-bull"); // Changed from type to pounds

    const productNameBull = "bull plug"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameBull}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownBull.appendChild(option);
            });
            sizeDropdownBull.disabled = false;
        });

    // Fetch Pounds when Size is Selected
    sizeDropdownBull.addEventListener("change", function () {
        poundsDropdownBull.innerHTML = `<option value="">Select Pounds</option>`; // Reset

        fetch(`/products/get-pounds-gauges?name=${productNameBull}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.pounds;
                    option.textContent = item.pounds;
                    poundsDropdownBull.appendChild(option);
                });
                poundsDropdownBull.disabled = false;
            });
    });
});
