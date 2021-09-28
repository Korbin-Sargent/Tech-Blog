async function newFormHandler(event) {
  event.preventDefault();
  console.log("hello");

  const title = document.querySelector('input[name="blog-title"]').value;
  const content = document.querySelector('input[name="content"]').value;

  const response = await fetch(`/api/blogs`, {
    method: "POST",
    body: JSON.stringify({
      title,
      content,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".create-btn")
  .addEventListener("submit", newFormHandler);
