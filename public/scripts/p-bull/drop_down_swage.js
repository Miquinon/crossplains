document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownSwage = document.getElementById("size-swage");
    const poundsDropdownSwage = document.getElementById("pounds-swage"); // Changed from type to pounds

    const productNameSwage = "swages"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameSwage}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownSwage.appendChild(option);
            });
            sizeDropdownSwage.disabled = false;
        });

    // Fetch Pounds when Size is Selected
    sizeDropdownSwage.addEventListener("change", function () {
        poundsDropdownSwage.innerHTML = `<option value="">Select Pounds</option>`; // Reset

        fetch(`/products/get-pounds-gauges?name=${productNameSwage}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.pounds;
                    option.textContent = item.pounds;
                    poundsDropdownSwage.appendChild(option);
                });
                poundsDropdownSwage.disabled = false;
            });
    });
});
