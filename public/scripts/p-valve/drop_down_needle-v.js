document.addEventListener("DOMContentLoaded", function () {
    const partDropdownNeedleV = document.getElementById("part-needlev");

    const productNameNeedleV = "needle"; // Set dynamically if needed

    // Fetch Part Numbers
    fetch(`/products/get-part-number?name=${productNameNeedleV}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.part_number; // Use part_number instead of size
                option.textContent = item.part_number;
                partDropdownNeedleV.appendChild(option);
            });
            partDropdownNeedleV.disabled = false;
        })
        .catch((error) => console.error("Error fetching part numbers:", error));
});
