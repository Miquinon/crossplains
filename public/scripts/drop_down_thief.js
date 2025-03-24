document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownThief = document.getElementById("size-thief");

    const productNameThief = "theif hatch"; // Set dynamically if needed

    // Fetch Sizes Only
    fetch(`/products/get-sizesB7?name=${productNameThief}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownThief.appendChild(option);
            });
            sizeDropdownThief.disabled = false;
        });
});
