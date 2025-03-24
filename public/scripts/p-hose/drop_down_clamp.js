document.addEventListener("DOMContentLoaded", function () {
    const materialDropdown = document.getElementById("material-clamp");
    const sizeDropdownClamp = document.getElementById("size-clamp");
  
    const productNameClamp = "clamps"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials?name=${productNameClamp}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(1);
        console.log(data);
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
      sizeDropdownClamp.innerHTML = `<option value="">Select Size</option>`; // Reset
  
      fetch(`/products/get-sizesB7?name=${productNameClamp}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdownClamp.appendChild(option);
          });
          sizeDropdownClamp.disabled = false;
        });
    });
});
