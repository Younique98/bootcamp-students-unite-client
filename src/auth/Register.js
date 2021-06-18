import React from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

export const Register = (props) => {
  const firstName = React.createRef();
  const lastName = React.createRef();
  const email = React.createRef();
  const bio = React.createRef();
  const password = React.createRef();
  const verifyPassword = React.createRef();
  const passwordDialog = React.createRef();
  const uploadProfileImg = React.createRef();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
      const newUser = {
        username: email.current.value,
        first_name: firstName.current.value,
        last_name: lastName.current.value,
        bio: bio.current.value,
        email: email.current.value,
        password: password.current.value,
        uploadProfileImg: uploadProfileImg.current.files[0],
      };

      return fetch(
        "https://bootcamp-students-unite-api.herokuapp.com/register",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("bc_token")}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newUser),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if ("token" in res) {
            localStorage.setItem("bc_token", res.token);
            localStorage.setItem("id", res.id);
            props.history.push("/");
          }
        });
    } else {
      passwordDialog.current.showModal();
    }
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <button
          className="button--close"
          onClick={(e) => passwordDialog.current.close()}
        >
          Close
        </button>
      </dialog>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
        <fieldset>
          <label htmlFor="firstName"> First Name </label>
          <input
            ref={firstName}
            type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            required
            autoFocus
          />
        </fieldset>
        <fieldset>
          <label htmlFor="lastName"> Last Name </label>
          <input
            ref={lastName}
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputEmail"> Email address </label>
          <input
            ref={email}
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="inputPassword"> Password </label>
          <input
            ref={password}
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="verifyPassword"> Verify Password </label>
          <input
            ref={verifyPassword}
            type="password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required
          />
        </fieldset>
        <fieldset>
          <label htmlFor="bio"> Bio </label>
          <textarea
            ref={bio}
            name="bio"
            className="form-control"
            placeholder="Let other users know a little bit about you..."
          />
        </fieldset>
        <fieldset>
          <label htmlFor="uploadProfileImg">Upload Profile Image</label>
          <input
            type="file"
            ref={uploadProfileImg}
            name="uploadProfileImg"
            className="form-control"
            placeholder="Please upload a profile image..."
          />
        </fieldset>
        <fieldset
          style={{
            textAlign: "center",
          }}
        >
          <button className="btn btn-1 btn-sep icon-send" type="submit">
            Register
          </button>
        </fieldset>
      </form>
      <section className="link--register">
        Already registered? <Link to="/login">Login</Link>
      </section>
    </main>
  );
};
