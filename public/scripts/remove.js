document.addEventListener("DOMContentLoaded", function () {
  document.getElementByClass(".remove-item").forEach((button) => {
    button.addEventListener("click", function () {
      const userId = this.getAttribute("data_user_id");
      const itemName = this.getAttribute("data_item_name");

      if (!userId || !itemName) {
        alert("Missing user ID or item name");
        return;
      }

      fetch(
        `/cart/remove?user_id=${userId}&item_name=${encodeURIComponent(
          itemName
        )}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, item_name })
          })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error(error))
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
            }),
        }
      );
    });
  });
});
