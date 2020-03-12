import React from "react";
import { AuthContext } from "../App";

export const Login = () => {
  const { dispatch } = React.useContext(AuthContext);
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = e => {
    setData({
      ...data,
      [e.target.value.name]: e.target.value
    });
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    });
    fetch("https://hookedbe.herokuapp.com/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: data.email,
        password: data.password
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then(resJson => {
        dispatch({ type: "LOGIN", payload: resJson });
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };

  return (
    <div className="login-container">
      <div className="card">
        <div className="container"></div>
        <form>
          <h1>Login</h1>
          <label htmlFor="email">
            Email Address
            <input
              value={data.email}
              onChange={handleInputChange}
              type="text"
              name="email"
              id="email"
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              value={data.password}
              onChange={handleInputChange}
              type="password"
              name="password"
              id="password"
            />
          </label>
          {data.errorMessage && <span className="form-error"></span>}
          <button disabled={data.isSubmitting}>
            {data.isSubmitting ? "Loading..." : "Login"}
          </button>
          <button>"Login"</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
