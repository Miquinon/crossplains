document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownSleeve = document.getElementById("size-sleeve");

    const productNameSleeve = "dresser sleeve"; // Set dynamically if needed

    // Fetch Sizes Only
    fetch(`/products/get-sizesB7?name=${productNameSleeve}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownSleeve.appendChild(option);
            });
            sizeDropdownSleeve.disabled = false;
        });
});
