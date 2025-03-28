document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const userDetail = document.getElementById("user-detail");
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );
      const user = await response.json();
      userDetail.innerHTML = `
              <h2>${user.name}</h2>
              <p>Email: ${user.email}</p>
              <p>Website: ${user.website}</p>
          `;
      document.getElementById("view-posts").addEventListener("click", () => {
        window.location.href = `user-posts.html?id=${userId}`;
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  });