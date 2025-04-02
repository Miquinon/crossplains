document.addEventListener("DOMContentLoaded", function () {
    // Use querySelectorAll to select all elements with the 'remove-item' class
    document.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", function () {
        const userId = this.getAttribute("data_user_id");
        const itemName = this.getAttribute("data_item_name");
        const itemSize = this.getAttribute("data_item_size");
        const itemPounds = this.getAttribute("data_item_pounds");
  
        if (!userId || !itemName || !itemSize || !itemPounds) {
          alert("Missing user ID or item name");
          return;
        }
  
         // `/cart/remove?user_id=${userId}&item_name=${encodeURIComponent(itemName)}&item_size=${encodeURIComponent(itemSize)}&item_pounds=${encodeURIComponent(itemPounds)}`,
         
        fetch(
          `/cart/remove`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, item_name: itemName, item_size: itemSize, item_pounds: itemPounds}), // Corrected body placement
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              alert("Item removed from cart!");
              location.reload(); // Refresh the page
            } else {
              alert("Error removing item: " + data.message);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while removing the item.");
          });
      });
    });
  });
  





// document.addEventListener("DOMContentLoaded", function () {
//   document.getElementByClass(".remove-item").forEach((button) => {
//     button.addEventListener("click", function () {
//       const userId = this.getAttribute("data_user_id");
//       const itemName = this.getAttribute("data_item_name");

//       if (!userId || !itemName) {
//         alert("Missing user ID or item name");
//         return;
//       }

//       fetch(
//         `/cart/remove?user_id=${userId}&item_name=${encodeURIComponent(
//           itemName
//         )}`,
//         {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ user_id, item_name })
//           })
//             .then((response) => response.json())
//             .then((data) => console.log(data))
//             .catch((error) => console.error(error))
//             .then((response) => response.json())
//             .then((data) => {
//               if (data.success) {
//                 alert("Item removed from cart!");
//                 location.reload(); // Refresh the page
//               } else {
//                 alert("Error removing item: " + data.message);
//               }
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//               alert("An error occurred while removing the item.");
//             }),
          
//         });
// });
// });
