document.addEventListener("DOMContentLoaded", function () {
    const partDropdownBallV = document.getElementById("part-ballv");

    const productNameBallV = "ball valve"; // Set dynamically if needed

    // Fetch Part Numbers
    fetch(`/products/get-part-number?name=${productNameBallV}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.part_number; // Use part_number instead of size
                option.textContent = item.part_number;
                partDropdownBallV.appendChild(option);
            });
            partDropdownBallV.disabled = false;
        })
        .catch((error) => console.error("Error fetching part numbers:", error));
});
