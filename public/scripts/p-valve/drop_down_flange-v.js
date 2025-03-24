document.addEventListener("DOMContentLoaded", function () {
    const partDropdownFlangeV = document.getElementById("part-flangev");

    const productNameFlangeV = "flange valve"; // Set dynamically if needed

    // Fetch Part Numbers
    fetch(`/products/get-part-number?name=${productNameFlangeV}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.part_number; // Use part_number instead of size
                option.textContent = item.part_number;
                partDropdownFlangeV.appendChild(option);
            });
            partDropdownFlangeV.disabled = false;
        })
        .catch((error) => console.error("Error fetching part numbers:", error));
});