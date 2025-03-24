document.addEventListener("DOMContentLoaded", function () {
    const partDropdownRegulator = document.getElementById("part-reg");

    const productNameRegulator = "regulators"; // Set dynamically if needed

    // Fetch Part Numbers
    fetch(`/products/get-part-number?name=${productNameRegulator}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.part_number; // Use part_number instead of size
                option.textContent = item.part_number;
                partDropdownRegulator.appendChild(option);
            });
            partDropdownRegulator.disabled = false;
        })
        .catch((error) => console.error("Error fetching part numbers:", error));
});
