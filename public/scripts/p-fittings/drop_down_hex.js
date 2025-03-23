document.addEventListener("DOMContentLoaded", function () {
    const materialDropdownHex = document.getElementById("material-hex");
    const sizeDropdownHex = document.getElementById("size-hex");
    const poundsDropdownHex = document.getElementById("pounds-hex");
  
    const productNameHex = "hex union"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials?name=${productNameHex}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(1)
        console.log(data)
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.material;
          option.textContent = item.material;
          materialDropdownHex.appendChild(option);
        });
        materialDropdownHex.disabled = false;
      });
  
    // Fetch Sizes when Material is Selected
    materialDropdownHex.addEventListener("change", function () {
      sizeDropdownHex.innerHTML = `<option value="">Select Size</option>`; // Reset
      poundsDropdownHex.innerHTML = `<option value="">Select Pounds</option>`;
      poundsDropdownHex.disabled = true;
  
      fetch(`/products/get-sizes?name=${productNameHex}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdownHex.appendChild(option);
          });
          sizeDropdownHex.disabled = false;
        });
    });
  
    // Fetch Pounds when Size is Selected
    sizeDropdownHex.addEventListener("change", function () {
      poundsDropdownHex.innerHTML = `<option value="">Select Pounds</option>`; // Reset
  
      fetch(
        `/products/get-pounds?name=${productNameHex}&material=${materialDropdownHex.value}&size=${this.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.pounds;
            option.textContent = item.pounds;
            poundsDropdownHex.appendChild(option);
          });
          poundsDropdownHex.disabled = false;
        });
    });
  });
  