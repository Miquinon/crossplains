document.addEventListener("DOMContentLoaded", function () {
    const sizeDropdownGauges = document.getElementById("size-gauge");
    const poundsDropdownGauges = document.getElementById("pounds-gauge");
    const selectedSize = document.getElementById("selected-size");
    const selectedPounds = document.getElementById("selected-pounds");
    const cartForm = document.getElementById("cartForm");

    const productNameGauges = "gauges";

    // Fetch Sizes
    fetch(`/products/get-sizesB7?name=${productNameGauges}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const option = document.createElement("option");
                option.value = item.size;
                option.textContent = item.size;
                sizeDropdownGauges.appendChild(option);
            });
            sizeDropdownGauges.disabled = false;
        });

    // Fetch Pounds when Size is Selected
    sizeDropdownGauges.addEventListener("change", function () {
        selectedSize.value = this.value; // Store selected value in hidden input
        poundsDropdownGauges.innerHTML = `<option value="">Select Pounds</option>`; // Reset dropdown

        fetch(`/products/get-pounds-gauges?name=${productNameGauges}&size=${this.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((item) => {
                    const option = document.createElement("option");
                    option.value = item.pounds;
                    option.textContent = item.pounds;
                    poundsDropdownGauges.appendChild(option);
                });
                poundsDropdownGauges.disabled = false;
            });
    });

    // Update Hidden Inputs Before Form Submission
    cartForm.addEventListener("submit", function (event) {
        if (!sizeDropdownGauges.value || !poundsDropdownGauges.value) {
            event.preventDefault();
            alert("Please select both Size and Type before adding to cart.");
            return;
        }
        selectedSize.value = sizeDropdownGauges.value;
        selectedPounds.value = poundsDropdownGauges.value;
    });
});

    

// document.addEventListener("DOMContentLoaded", function () {
//     const sizeDropdownGauges = document.getElementById("size-gauge");
//     const poundsDropdownGauges = document.getElementById("pounds-gauge"); // Changed from type to pounds

//     const productNameGauges = "gauges"; // Set dynamically if needed

//     // Fetch Sizes First
//     fetch(`/products/get-sizesB7?name=${productNameGauges}`)
//         .then((res) => res.json())
//         .then((data) => {
//             data.forEach((item) => {
//                 const option = document.createElement("option");
//                 option.value = item.size;
//                 option.textContent = item.size;
//                 sizeDropdownGauges.appendChild(option);
//             });
//             sizeDropdownGauges.disabled = false;
//         });

//     // Fetch Pounds when Size is Selected
//     sizeDropdownGauges.addEventListener("change", function () {
//         poundsDropdownGauges.innerHTML = `<option value="">Select Pounds</option>`; // Reset

//         fetch(`/products/get-pounds-gauges?name=${productNameGauges}&size=${this.value}`)
//             .then((res) => res.json())
//             .then((data) => {
//                 data.forEach((item) => {
//                     const option = document.createElement("option");
//                     option.value = item.pounds;
//                     option.textContent = item.pounds;
//                     poundsDropdownGauges.appendChild(option);
//                 });
//                 poundsDropdownGauges.disabled = false;
//             });
//     });
// });
