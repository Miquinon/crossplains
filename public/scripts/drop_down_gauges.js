document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownGauges = document.getElementById("size-gauge");
    const poundsDropdownGauges = document.getElementById("pounds-gauge"); // Changed from type to pounds

    const productNameGauges = "gauges"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameGauges}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownGauges.appendChild(option);
            });
            sizeDropdownGauges.disabled = false;
        });

    // Fetch Pounds when Size is Selected
    sizeDropdownGauges.addEventListener("change", function () {
        poundsDropdownGauges.innerHTML = `<option value="">Select Pounds</option>`; // Reset

        fetch(`/products/get-pounds-gauges?name=${productNameGauges}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.pounds;
                    option.textContent = item.pounds;
                    poundsDropdownGauges.appendChild(option);
                });
                poundsDropdownGauges.disabled = false;
            });
    });
});
