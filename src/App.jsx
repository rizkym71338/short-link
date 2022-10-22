import axios from "axios";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const Home = () => {
  const [result, setResult] = useState(null);
  const [alert, setAlert] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    try {
      const response = await axios({
        method: "POST",
        url: "https://api-ssl.bitly.com/v4/shorten",
        data: {
          domain: "bit.ly",
          long_url: e.target["longLink"].value,
        },
        headers: {
          Authorization: `Bearer 76de34b7f4292568e9f4ad07fa172c9cbb06b14d`,
        },
      });
      setResult(response.data.link);
    } catch (err) {
      alert("Something went wrong !");
      console.log(err);
    }
  };

  const onCopy = () => {
    setAlert(true);
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  };

  return (
    <>
      <div className={`bg-blue-50`}>
        <section
          className={`min-h-screen flex items-center justify-center px-4 flex-col`}
        >
          <div
            className={`p-4 rounded-2xl max-w-sm w-full flex flex-col items-center justify-center bg-white shadow-blue-700 drop-shadow-md border-slate-100 border space-y-10`}
          >
            <div className={`text-center`}>
              <h1 className={`text-3xl font-bold text-blue-700`}>Short Link</h1>
              <span className={`text-sm font-semibold text-blue-700`}>
                By Rizky Maulana
              </span>
            </div>
            <form
              onSubmit={handleGenerate}
              className={`w-full flex flex-col space-y-5`}
            >
              <textarea
                name={"longLink"}
                id={"longLink"}
                cols={"30"}
                rows={"3"}
                placeholder={"Enter Long Link"}
                className={`block p-2.5 w-full text-sm text-slate-900 bg-slate-50 rounded-lg border border-slate-200 focus:ring-4 focus:ring-blue-300 outline-none transition-all duration-500`}
                required
              ></textarea>
              <button
                type={`submit`}
                className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none transition-all duration-500 w-full`}
              >
                Generate Link
              </button>
              <CopyToClipboard text={result} onCopy={onCopy}>
                <div
                  className={`${
                    !result && "hidden"
                  } flex items-center overflow-hidden rounded-lg w-full bg-slate-50 border border-slate-300`}
                >
                  <span
                    className={`block text-sm text-slate-900 w-full px-2.5`}
                  >
                    {result}
                  </span>
                  <div
                    title={`Copy Link`}
                    className={`h-full aspect-square bg-blue-700 flex items-center justify-center p-3 cursor-pointer`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                      />
                    </svg>
                  </div>
                </div>
              </CopyToClipboard>
              <div
                className={`${
                  !alert && "hidden"
                } p-4 mb-4 text-sm font-medium text-blue-700 bg-blue-100 rounded-lg`}
              >
                Copied.
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
