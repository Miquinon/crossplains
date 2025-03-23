document.addEventListener("DOMContentLoaded", function () {
    const materialDropdown45 = document.getElementById("material45");
    const sizeDropdown45 = document.getElementById("size45");
    const poundsDropdown45 = document.getElementById("pounds45");
  
    const productName45 = "45"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials?name=${productName45}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(1)
        console.log(data)
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.material;
          option.textContent = item.material;
          materialDropdown45.appendChild(option);
        });
        materialDropdown45.disabled = false;
      });
  
    // Fetch Sizes when Material is Selected
    materialDropdown45.addEventListener("change", function () {
      sizeDropdown45.innerHTML = `<option value="">Select Size</option>`; // Reset
      poundsDropdown45.innerHTML = `<option value="">Select Pounds</option>`;
      poundsDropdown45.disabled = true;
  
      fetch(`/products/get-sizes?name=${productName45}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdown45.appendChild(option);
          });
          sizeDropdown45.disabled = false;
        });
    });
  
    // Fetch Pounds when Size is Selected
    sizeDropdown45.addEventListener("change", function () {
      poundsDropdown45.innerHTML = `<option value="">Select Pounds</option>`; // Reset
  
      fetch(
        `/products/get-pounds?name=${productName45}&material=${materialDropdown45.value}&size=${this.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.pounds;
            option.textContent = item.pounds;
            poundsDropdown45.appendChild(option);
          });
          poundsDropdown45.disabled = false;
        });
    });
  });
  