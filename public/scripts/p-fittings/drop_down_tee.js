document.addEventListener("DOMContentLoaded", function () {
    const materialDropdown = document.getElementById("material");
    const sizeDropdown = document.getElementById("size");
    const poundsDropdown = document.getElementById("pounds");
  
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
      sizeDropdown.innerHTML = `<option value="">Select Size</option>`; // Reset
      poundsDropdown.innerHTML = `<option value="">Select Pounds</option>`;
      poundsDropdown.disabled = true;
  
      fetch(`/products/get-sizes?name=${productName}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
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
  });
  