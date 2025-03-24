document.addEventListener("DOMContentLoaded", function () {
    const partDropdownSquareV = document.getElementById("part-squarev");

    const productNameSquareV = "square body"; // Set dynamically if needed

    // Fetch Part Numbers
    fetch(`/products/get-part-number?name=${productNameSquareV}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.part_number; // Use part_number instead of size
                option.textContent = item.part_number;
                partDropdownSquareV.appendChild(option);
            });
            partDropdownSquareV.disabled = false;
        })
        .catch((error) => console.error("Error fetching part numbers:", error));
});
