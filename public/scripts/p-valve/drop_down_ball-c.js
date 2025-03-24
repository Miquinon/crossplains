document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownBallC = document.getElementById("size-ballc");
    const poundsDropdownBallC = document.getElementById("pounds-ballc"); // Changed from type to pounds

    const productNameBallC = "ball check"; // Set dynamically if needed

    // Fetch Sizes First
    fetch(`/products/get-sizesB7?name=${productNameBallC}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownBallC.appendChild(option);
            });
            sizeDropdownBallC.disabled = false;
        });

    // Fetch Pounds when Size is Selected
    sizeDropdownBallC.addEventListener("change", function () {
        poundsDropdownBallC.innerHTML = `<option value="">Select Pounds</option>`; // Reset

        fetch(`/products/get-pounds-gauges?name=${productNameBallC}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.pounds;
                    option.textContent = item.pounds;
                    poundsDropdownBallC.appendChild(option);
                });
                poundsDropdownBallC.disabled = false;
            });
    });
});
