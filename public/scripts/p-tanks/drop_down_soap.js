document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownSoap = document.getElementById("size-stick");

    const productNameStick = "soap ticks"; // Set dynamically if needed

    // Fetch Sizes Only
    fetch(`/products/get-sizesB7?name=${productNameStick}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownSoap.appendChild(option);
            });
            sizeDropdownSoap.disabled = false;
        });
});
