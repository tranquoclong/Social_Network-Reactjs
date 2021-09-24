export const signUp = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/signUp`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signIn = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/signIn`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (jwt, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(jwt));
    next();
  }
};

export const setName = (name, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("username", JSON.stringify(name));
    next();
  }
};

export const signOut = (next) => {
  if (typeof window !== "undefined") localStorage.removeItem("jwt");
  next();
  return fetch(`${process.env.REACT_APP_API_URL}/signOut`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};

export const forgotPassword = (email) => {
  console.log("email: ", email);
  return fetch(`${process.env.REACT_APP_API_URL}/forgot-password/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((response) => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const resetPassword = (resetInfo) => {
  return fetch(`${process.env.REACT_APP_API_URL}/reset-password/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(resetInfo),
  })
    .then((response) => {
      console.log("forgot password response: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const socialLogin = (user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/social-login/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      console.log("signin response: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
