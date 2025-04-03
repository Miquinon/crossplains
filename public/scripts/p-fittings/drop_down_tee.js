document.addEventListener("DOMContentLoaded", function () {
    const materialDropdown = document.getElementById("material");
    const sizeDropdown = document.getElementById("size");
    const poundsDropdown = document.getElementById("pounds");

    const selectedMaterial = document.getElementById("selected-material-tee")
    const selectedSize = document.getElementById("selected-size-tee");
    const selectedPounds = document.getElementById("selected-pounds-tee");
    const cartForm = document.getElementById("cartForm");
  
    const productName = "Tee"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials?name=${productName}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(1)
        console.log(data)
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.material;
          option.textContent = item.material;
          materialDropdown.appendChild(option);
        });
        materialDropdown.disabled = false;
      });
  
    // Fetch Sizes when Material is Selected
    materialDropdown.addEventListener("change", function () {
      selectedMaterial.value = this.value;
      sizeDropdown.innerHTML = `<option value="">Select Size</option>`; // Reset
      poundsDropdown.innerHTML = `<option value="">Select Pounds</option>`;
      poundsDropdown.disabled = true;
  
      fetch(`/products/get-sizes?name=${productName}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(2)
          console.log(data)
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdown.appendChild(option);
          });
          sizeDropdown.disabled = false;
        });
    });
  
    // Fetch Pounds when Size is Selected
    sizeDropdown.addEventListener("change", function () {
      selectedSize.value = this.value;
      poundsDropdown.innerHTML = `<option value="">Select Pounds</option>`; // Reset
  
      fetch(
        `/products/get-pounds?name=${productName}&material=${materialDropdown.value}&size=${this.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.pounds;
            option.textContent = item.pounds;
            poundsDropdown.appendChild(option);
          });
          poundsDropdown.disabled = false;
        });
    });

    // Update Hidden Inputs Before Form Submission
    cartForm.addEventListener("submit", function (event) {
      if (!materialDropdown.value || !sizeDropdown.value || !poundsDropdown.value) {
        event.preventDefault();
        alert("Please select both Size and Type before adding to cart.");
        return;
    }
      selectedMaterial.value = materialDropdown.value;
      selectedSize.value = sizeDropdown.value;
      selectedPounds.value = poundsDropdown.value;
    });

  });
  