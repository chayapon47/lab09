document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get("id");
    const postsList = document.getElementById("posts-list");
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}/posts`
      );
      const posts = await response.json();
      postsList.innerHTML = posts
        .map(
          (post) => `
              <div class="post">
                  <h3>${post.title}</h3>
                  <p>${post.body}</p>
                  <button class="view-comments" data-id="${post.id}">ดูความคิดเห็น</button>
                  <div class="comments" id="comments-${post.id}" style="display:none;"></div>
              </div>
          `
        )
        .join("");
      document.querySelectorAll(".view-comments").forEach((button) => {
        button.addEventListener("click", async () => {
          const postId = button.dataset.id;
          const commentsDiv = document.getElementById(`comments-${postId}`);
          if (commentsDiv.style.display === "none") {
            const response = await fetch(
              `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
            );
            const comments = await response.json();
            commentsDiv.innerHTML = comments
              .map((comment) => `<p>${comment.body}</p>`)
              .join("");
            commentsDiv.style.display = "block";
            button.textContent = "ซ่อนความคิดเห็น";
          } else {
            commentsDiv.style.display = "none";
            button.textContent = "ดูความคิดเห็น";
          }
        });
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  });