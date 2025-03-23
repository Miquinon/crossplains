document.addEventListener("DOMContentLoaded", function () {
    const materialDropdown90 = document.getElementById("material90");
    const sizeDropdown90 = document.getElementById("size90");
    const poundsDropdown90 = document.getElementById("pounds90");
  
    const productName90 = "90"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials90?name=${productName90}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(1)
        console.log(data)
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.material;
          option.textContent = item.material;
          materialDropdown90.appendChild(option);
        });
        materialDropdown90.disabled = false;
      });
  
    // Fetch Sizes when Material is Selected
    materialDropdown90.addEventListener("change", function () {
      sizeDropdown90.innerHTML = `<option value="">Select Size</option>`; // Reset
      poundsDropdown90.innerHTML = `<option value="">Select Pounds</option>`;
      poundsDropdown90.disabled = true;
  
      fetch(`/products/get-sizes90?name=${productName90}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdown90.appendChild(option);
          });
          sizeDropdown90.disabled = false;
        });
    });
  
    // Fetch Pounds when Size is Selected
    sizeDropdown90.addEventListener("change", function () {
      poundsDropdown90.innerHTML = `<option value="">Select Pounds</option>`; // Reset
  
      fetch(
        `/products/get-pounds90?name=${productName90}&material=${materialDropdown90.value}&size=${this.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.pounds;
            option.textContent = item.pounds;
            poundsDropdown90.appendChild(option);
          });
          poundsDropdown90.disabled = false;
        });
    });
  });
  