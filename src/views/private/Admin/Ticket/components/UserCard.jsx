import React from "react";

function SignInCard() {
  return (
    <>
      <div className="space-y-1 ">
        <div className="flex items-center justify-center max-w-xs p-1 h-8 bg-slate-300 rounded-t-lg shadow-2xl shadow-black">
          <h2 className="text-lg font-medium mb-1">User Card</h2>
        </div>
        <div className="max-w-xs p-6 bg-slate-300 rounded-b-lg shadow-md">
          <form>
            <div className="mb-1">
              <label htmlFor="name" className="block text-gray-700 h-6  mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="ilon Mask"
                id="name"
                className="w-full h-6 px-3 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="email" className="block text-gray-700 h-6  mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="ilon Mask@Tesla.com"
                id="email"
                className="w-full px-3 py-1 h-6 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="location"
                className="block text-gray-700 h-6  mb-1"
              >
                Location
              </label>
              <input
                type="text"
                placeholder="Frankfurt, Germany"
                id="location"
                className="w-full px-3 py-1 h-6 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="company" className="block text-gray-700 h-6 mb-1">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Tesla Germany"
                id="company"
                className="w-full px-3 py-1 h-6 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-1">
              <label htmlFor="tags" className="block text-gray-700 h-6 mb-1">
                Tags
              </label>
              <input
                type="text"
                placeholder="VIP"
                id="tags"
                className="w-full px-3 py-1 h-6 border border-gray-300 rounded-md"
              />
            </div>
          </form>
          <div>
            <p className="text-center text-sm/[5px] my-4 py-1">User Support Tickets History</p>
            <p className=" text-sm/[2px] my-4">
              🟥 &nbsp;&nbsp; 0000010 &nbsp;&nbsp; Map View &nbsp;&nbsp; May
              29,2023{" "}
            </p>
              <p className="font-medium text-sm mb-2">
                <br />
                Title: Map Problem
              </p>
            <div className="h-48 mt-2 overflow-y-scroll">
              <p className="text-xs/3">
                Hello! The Map Does Not Show A New <br />
                Connection Line,But Mobile Applications Shows Each Line
                Correctly. I Tried To Reinstall Desktop Application And The Map
                Does Not Show A New Connection Line,But Mobile Applications
                Shows Each Line Correctly. I Tried To Reinstall Desktop
                Application And N....{" "}
              </p>
              <table>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟥</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟦</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟦</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟥</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟥</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟥</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟥</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟥</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 text-xs">🟥</td>
                    <td className="px-2 py-1 text-xs">000005</td>
                    <td className="px-2 py-1 text-xs">Map View</td>
                    <td className="px-2 py-1 text-xs">May29,2023</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInCard;
