import { useState } from "react";
import { useNavigate } from "react-router-dom";


// this is for get the contextAPI value :-
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });


// handle Navigate :-
// this is for navigate other pages after completion of one page
// simply rendering other pages
const navigate = useNavigate()

// store the contextAPI props value inn this function :-
const {storeTokenInLS} = useAuth()

// input handling :-

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handle form on submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);


    // Connect frontend to backend :-

    /* for coonecting frontend to backend there is a error regarding CORS Policy error
    which is nothing but its come due to the different different server port come from frontend(5173) and backend(1000)
    so we need to give the access of the frontend server port to backend server 
    by using a NPM Package "cors" . simply type "npm i cors"
    see the handle error part of this 
    */
    
    try {

    const response = await fetch(`http://localhost:1000/api/auth/register`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(user),
    })
    console.log(response)


    // after registeration part :-
    const res_data = await response.json()
    console.log("res from server", res_data.message)

    if(response.ok){
     

      // pass the toekn by this function:-
      storeTokenInLS(res_data.token)
      

      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
    }
    
  )
  toast.success("Registration succesfull")
    navigate("/login")// this is for login page naviagtion after register

    }else{
      toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
    }

    } catch(error) {
      console.log("register", error)
    }
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
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Creat an Account</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div className="">
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      value={user.username}
                      onChange={handleInput}
                      placeholder="username"
                    />
                  </div>
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
                    <label htmlFor="phone">phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={user.phone}
                      onChange={handleInput}
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
                    Register Now
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