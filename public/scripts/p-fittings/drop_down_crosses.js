document.addEventListener("DOMContentLoaded", function () {
    const materialDropdownCross = document.getElementById("material-cross");
    const sizeDropdownCross = document.getElementById("size-cross");
    const poundsDropdownCross = document.getElementById("pounds-cross");
  
    const productNameCross = "cross"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials?name=${productNameCross}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(1)
        console.log(data)
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.material;
          option.textContent = item.material;
          materialDropdownCross.appendChild(option);
        });
        materialDropdownCross.disabled = false;
      });
  
    // Fetch Sizes when Material is Selected
    materialDropdownCross.addEventListener("change", function () {
      sizeDropdownCross.innerHTML = `<option value="">Select Size</option>`; // Reset
      poundsDropdownCross.innerHTML = `<option value="">Select Pounds</option>`;
      poundsDropdownCross.disabled = true;
  
      fetch(`/products/get-sizes?name=${productNameCross}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdownCross.appendChild(option);
          });
          sizeDropdownCross.disabled = false;
        });
    });
  
    // Fetch Pounds when Size is Selected
    sizeDropdownCross.addEventListener("change", function () {
      poundsDropdownCross.innerHTML = `<option value="">Select Pounds</option>`; // Reset
  
      fetch(
        `/products/get-pounds?name=${productNameCross}&material=${materialDropdownCross.value}&size=${this.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.pounds;
            option.textContent = item.pounds;
            poundsDropdownCross.appendChild(option);
          });
          poundsDropdownCross.disabled = false;
        });
    });
  });
  