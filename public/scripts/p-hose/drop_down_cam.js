document.addEventListener("DOMContentLoaded", function () {
    const materialDropdown = document.getElementById("material-cam");
    const sizeDropdownCam = document.getElementById("size-cam");
  
    const productNameCam = "cam lock"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials?name=${productNameCam}`)
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
      sizeDropdownCam.innerHTML = `<option value="">Select Size</option>`; // Reset
  
      fetch(`/products/get-sizesB7?name=${productNameCam}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdownCam.appendChild(option);
          });
          sizeDropdownCam.disabled = false;
        });
    });
});
