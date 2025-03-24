document.addEventListener("DOMContentLoaded", function () {
    const partDropdownCheckV = document.getElementById("part-checkv");

    const productNameCheckV = "check valve"; // Set dynamically if needed

    // Fetch Part Numbers
    fetch(`/products/get-part-number?name=${productNameCheckV}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.part_number; // Use part_number instead of size
                option.textContent = item.part_number;
                partDropdownCheckV.appendChild(option);
            });
            partDropdownCheckV.disabled = false;
        })
        .catch((error) => console.error("Error fetching part numbers:", error));
});
