document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownStack = document.getElementById("size-stack");

    const productNameStack = "stack vent"; // Set dynamically if needed

    // Fetch Sizes Only
    fetch(`/products/get-sizesB7?name=${productNameStack}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownStack.appendChild(option);
            });
            sizeDropdownStack.disabled = false;
        });
});
