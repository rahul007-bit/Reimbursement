import React from "react";

const nptelform = () => {
  return (
    <div className="w-screen h-[100vh] flex justify-center items-center">
      <div className=" relative lg:w-1/2 h-5/6 shadow-md bg-white flex flex-col justify-evenly items-center">
        <div>
          <h1 className="content-center items-center grid grid-cols-3 gap-4 text-center bg-blue-600 absolute inset-x-0 top-0 h-8 text-white">
            NPTEL FORM
          </h1>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Course Name
            </label>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg shadow-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Course Name"
              required
            ></input>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
              Academic Year
            </label>
            <select
              id=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 shadow-md focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Select year</option>
              <option value="">First-Half</option>
              <option value="">Second-Half</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Start Date
            </label>
            <input
              type="text"
              id=""
              className="bg-gray-50 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Start Date"
              required
            ></input>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                End Date
              </label>
              <input
                type="text"
                id=""
                className="bg-gray-50 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter End Date"
                required
              ></input>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Exam Date
                </label>
                <input
                  type="text"
                  id=""
                  className="bg-gray-50 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Exam Name"
                  required
                ></input>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                    Class
                  </label>
                  <select
                    id=""
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected>Select Name</option>
                    <option value="">Elite</option>
                    <option value="">Gold</option>
                    <option value="">Silver</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Reimbursement Amount
                  </label>
                  <input
                    type="text"
                    id=""
                    className="bg-gray-50 border shadow-md border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Amount"
                    required
                  ></input>
                </div>

                <div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default nptelform;
