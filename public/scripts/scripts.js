document.addEventListener('DOMContentLoaded', (event) => {
  const logInButton = document.querySelector('#logInButton');
  logInButton.addEventListener('click', change_to_login);

  const signUpButton = document.querySelector('#singUpButton');
  signUpButton.addEventListener('click', change_to_singup);

  const loginSubmit = document.querySelector('#loginSubmit');
  if (loginSubmit) {
    loginSubmit.addEventListener('click', (event) => {
      event.preventDefault();
      login_post();
    });
  }

  const singupSumit = document.querySelector('#singupForm');
  if (singupSumit) {
    singupSumit.addEventListener('submit', (event) => {
      event.preventDefault();
      singup_post();
    });
  }
});

function change_to_login() {
  window.location.href = '/users/login';
  console.log(`Changing to /users/login`);
}

function change_to_singup() {
  window.location.href = '/users/singup';
  console.log(`Changing to /users/singup`);
}

function change_to_successful_singup() {
  console.log(`Changing to /users/successful-singup`);
  window.location.href = '/users/successful-singup';
}

function singup_post() {
  const username = document.querySelector('#usernameInputSingup').value;
  const email = document.querySelector('#emailInputSingup').value;
  const password = document.querySelector('#passwordInputSingup').value;

  console.log(`${username}`);
  console.log(`${email}`);
  console.log(`${password}`);

  fetch('/users/singup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: username,
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.body}`);
      }
      //   console.log(`AAAAAA`);
      return response.json();
    })
    .then((response) => {
      console.log(`Successful singup_post - ${response}`);
      change_to_successful_singup();
    })
    .catch((e) => {
      console.log(`Something wrong singup_post - ${e}`);
    });
}

function login_post() {
  const email = document.querySelector('#emailInputLogin').value;
  const password = document.querySelector('#passwordInputLogin').value;

  console.log(`${email}`);
  console.log(`${password}`);

  fetch('/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      console.log(`Successful login_post - ${response.token}`);
      localStorage.setItem('token', response.token);
      console.log(`Changing to /users/successful-singup`);
      window.location.href = '/';
    })
    .catch((e) => {
      console.log(`Something wrong login_post - invalid credential ${e}`);
      alert(`${e}`);
    });
  //   console.log(`Log in post`);
}
