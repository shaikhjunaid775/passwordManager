import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import eye from "../assets/eye.svg";
import eyeHide from "../assets/eye-hide.svg";
import { BsCopy, BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const ref = useRef();
  const passRef = useRef();

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
    
  }, []);
  const showPassword = () => {
    if (ref.current.src.includes(eye)) {
      ref.current.src = eyeHide;
      passRef.current.type = "password";
    } else {
      ref.current.src = eye;
      passRef.current.type = "text";
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    console.log(text);
  };

  const savePassword = () => {
    if(form.site.length > 0 && form.username.length > 0 && form.password.length > 0){

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log(passwordArray);
      setform({ site: "", username: "", password: "" });
      toast("Password saved !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast("field is empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = (id) => {
    console.log(id);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id !== id))
    );
    toast("Password deleted !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const editPassword = (id) => {
    console.log(id);
    setform(passwordArray.filter(i=>i.id===id)[0]);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
    
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="max-w-screen-xl mx-auto w-3/4">
        <div className="mx-3">

        <div className="my-5">
          <label
            htmlFor="site"
            className="block mb-2 text-sm font-medium text-gray-900 "
            >
            Site Name
          </label>
          <input
            type="site"
            id="Site"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder=""
            required
            name="site"
            value={form.site}
            onChange={handleChange}
            />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900 "
            
          >
            Your Username
          </label>
          <input
            type="username"
            id="username"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
            name="username"
            value={form.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className=" shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              name="password"
              value={form.password}
              onChange={handleChange}
              ref={passRef}
            />
            <img
              className="w-5 h-5 rounded-full absolute top-3 right-3 cursor-pointer"
              ref={ref}
              onClick={showPassword}
              src={eyeHide}
              alt="user photo"
            />
          </div>
        </div>
        <div className="flex items-start mb-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={savePassword}
          >
            Save
          </button>
        </div>
        {passwordArray.length === 0 && <div>No Passwords</div>}
        {passwordArray.length != 0 && (
          <div className="relative overflow-x-auto">
            <table className=" w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs md:text-lg text-gray-700 uppercase bg-gray-50 ">
                <tr className="">
                  <th scope="col" className="px-6 py-3">
                    Website
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="">
                {passwordArray.map((item, index) => (
                  <tr key={index} className="text-gray-900 border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      <div className="flex justify-center items-center text-xs md:text-lg  md:gap-4 gap-2 items-center">
                        <span className="">{item.site}</span>
                        <div className="flex items-center gap-3">
                          <BsCopy
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => copyText(item.site)}
                          />
                        </div>
                      </div>
                    </th>

                    <td className="fex justify-around px-6 py-4 ">
                      <div className="flex justify-center text-xs md:text-lg  md:gap-4 gap-2 items-center">
                        <span className="">{item.username}</span>
                        <div className="flex items-center gap-3">
                          <BsCopy
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => copyText(item.username)}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="flex justify-around px-6 py-4">
                      <div className="flex justify-center w-full text-xs md:text-lg md:gap-4 gap-2 items-center" >
                        <span className="">{item.password}</span>
                        <div className="flex items-center gap-3">
                          <BsCopy
                            className="w-6 h-6 cursor-pointer"
                            onClick={() => copyText(item.password)}
                          />
                          
                          
                        </div>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="flex gap-3 justify-center">
                        <span>
                          <BsPencilFill className="w-6 h-6 cursor-pointer" onClick={() => editPassword(item.id)} />
                        </span>
                        <span>
                          <BsFillTrashFill className="w-6 h-6 cursor-pointer" onClick={() => deletePassword(item.id)} />
                        </span>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default Form;
