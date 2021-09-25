//JS to handle collecting user input from login page
const loginFormHandler = async (event) => {
  event.preventDefault();
  try {
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
    console.log(email);
    console.log(password);

    //Conditional statement to check if email and password match in database
    if (email & password) {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-type": "application/json" },
      });
      console.log(response);
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("failed to log in");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const singUpFormhandler = async (event) => {
  // console.log("function working");
  event.preventDefault();

  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  console.log(email);
  console.log(password);

  if (email && password) {
    // console.log("IF STATEMENT WORKING");
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};
