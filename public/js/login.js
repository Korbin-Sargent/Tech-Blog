//JS to handle collecting user input from login page
async function loginFormHandler(event) {
  event.preventDefault();
  // console.log("hello");
  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
  console.log(username);
  console.log(password);

  //Conditional statement to check if username and password match in database
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("failed to log in");
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

// const singUpFormhandler = async (event) => {
//   // console.log("function working");
//   event.preventDefault();

//   const email = document.querySelector("#email-signup").value.trim();
//   const password = document.querySelector("#password-signup").value.trim();
//   console.log(email);
//   console.log(password);

//   if (email && password) {
//     // console.log("IF STATEMENT WORKING");
//     const response = await fetch("/api/users/signup", {
//       method: "POST",
//       body: JSON.stringify({ email, password }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       document.location.replace("/");
//     } else {
//       alert("Failed to sign up.");
//     }
//   }
// };
