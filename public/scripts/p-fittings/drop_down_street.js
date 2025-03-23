document.addEventListener("DOMContentLoaded", function () {
    const materialDropdownStreet = document.getElementById("material-street");
    const sizeDropdownStreet = document.getElementById("size-street");
    const poundsDropdownStreet = document.getElementById("pounds-street");
  
    const productNameStreet = "street 90"; // Set dynamically if needed
  
    // Fetch Materials
    fetch(`/products/get-materials?name=${productNameStreet}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(1)
        console.log(data)
        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.material;
          option.textContent = item.material;
          materialDropdownStreet.appendChild(option);
        });
        materialDropdownStreet.disabled = false;
      });
  
    // Fetch Sizes when Material is Selected
    materialDropdownStreet.addEventListener("change", function () {
      sizeDropdownStreet.innerHTML = `<option value="">Select Size</option>`; // Reset
      poundsDropdownStreet.innerHTML = `<option value="">Select Pounds</option>`;
      poundsDropdownStreet.disabled = true;
  
      fetch(`/products/get-sizes?name=${productNameStreet}&material=${this.value}`)
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.size;
            option.textContent = item.size;
            sizeDropdownStreet.appendChild(option);
          });
          sizeDropdownStreet.disabled = false;
        });
    });
  
    // Fetch Pounds when Size is Selected
    sizeDropdownStreet.addEventListener("change", function () {
      poundsDropdownStreet.innerHTML = `<option value="">Select Pounds</option>`; // Reset
  
      fetch(
        `/products/get-pounds?name=${productNameStreet}&material=${materialDropdownStreet.value}&size=${this.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.forEach((item) => {
            const option = document.createElement("option");
            option.value = item.pounds;
            option.textContent = item.pounds;
            poundsDropdownStreet.appendChild(option);
          });
          poundsDropdownStreet.disabled = false;
        });
    });
  });
  