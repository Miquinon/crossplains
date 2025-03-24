document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownFlange = document.getElementById("size-flange");
    const typeDropdownFlange = document.getElementById("type-flange"); // Changed from pounds to type

    const productNameFlange = "flange"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameFlange}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownFlange.appendChild(option);
            });
            sizeDropdownFlange.disabled = false;
        });

    // Fetch Types when Size is Selected
    sizeDropdownFlange.addEventListener("change", function () {
        typeDropdownFlange.innerHTML = `<option value="">Select Type</option>`; // Reset

        fetch(`/products/get-types?name=${productNameFlange}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.type;
                    option.textContent = item.type;
                    typeDropdownFlange.appendChild(option);
                });
                typeDropdownFlange.disabled = false;
            });
    });
});
