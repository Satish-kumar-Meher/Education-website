import { useState } from "react";

import { useNavigate } from "react-router-dom";

// from store Auth.js provide ContextAPI

import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const URL = "http://localhost:1000/api/auth/login"

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };
  const navigate = useNavigate()

  // Context API props
  const {storeTokenInLS} = useAuth()

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetch(URL, {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user)
      })

      console.log("login",response)

      const res_data = await response.json()
      if(response.ok) {

        storeTokenInLS(res_data.token)
        console.log("res from server", res_data)

        toast("Login succesful")
        setUser({
          email: "",
          password: "",
      })

     navigate("/")

      } else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
        console.log("invalid credentials")
      }

    } catch(error) {
      console.log(error)
    }

    console.log(user);
  };

  //  Help me reach 1 Million subs 👉 https://youtube.com/thapatechnical

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/login.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login 
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};