document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownBrassV = document.getElementById("size-brassv");

    const productNameBrassV = "brass valve"; // Set dynamically if needed

    // Fetch Sizes Only
    fetch(`/products/get-sizesB7?name=${productNameBrassV}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownBrassV.appendChild(option);
            });
            sizeDropdownBrassV.disabled = false;
        });
});