document.addEventListener("DOMContentLoaded", function () {
    const partDropdownStainless = document.getElementById("part-stainless");

    const productNameStainless = "stainless"; // Set dynamically if needed

    // Fetch Part Numbers
    fetch(`/products/get-part-number?name=${productNameStainless}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.part_number; // Use part_number instead of size
                option.textContent = item.part_number;
                partDropdownStainless.appendChild(option);
            });
            partDropdownStainless.disabled = false;
        })
        .catch((error) => console.error("Error fetching part numbers:", error));
});
