document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownB7 = document.getElementById("size-gasket");
    const typeDropdownB7 = document.getElementById("type-gasket"); // Changed from pounds to type

    const productNameB7 = "gasket"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameB7}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownB7.appendChild(option);
            });
            sizeDropdownB7.disabled = false;
        });

    // Fetch Types when Size is Selected
    sizeDropdownB7.addEventListener("change", function () {
        typeDropdownB7.innerHTML = `<option value="">Select Type</option>`; // Reset

        fetch(`/products/get-types?name=${productNameB7}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.type;
                    option.textContent = item.type;
                    typeDropdownB7.appendChild(option);
                });
                typeDropdownB7.disabled = false;
            });
    });
});
