import { useState } from "react";

export default function AccountSettings() {
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  );
  const dropDownColor = "bg-slate-300";

  const hanldeImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const ageGroup = [
    {
      id: 1,
      age: "20-30",
    },
    {
      id: 2,
      age: "30-40",
    },
    {
      id: 3,
      age: "40-50",
    },
    {
      id: 4,
      age: "Above 50",
    },
  ];
  return (
    <main className="w-full   mx-20 ">
      <div class="p-2 md:p-4">
        <div class="w-full px-6 pb-8  sm:rounded-lg">
          <h2 class="pl-6 text-2xl font-bold ">User Profile</h2>
          <div class="mt-4">
            <div class="flex flex-col items-center space-y-5 sm:flex-col sm:space-y-16 justify-center ">
              <label for="image">
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="hidden"
                  onChange={hanldeImageChange}
                />
                <img
                  class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500 "
                  src={image}
                  alt="Bordered avatar"
                />
              </label>

              <div class="flex flex-row w-1/3  justify-between ">
                <button
                  type="button"
                  class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                >
                  Change picture
                </button>
                <button
                  type="button"
                  class="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                >
                  Delete picture
                </button>
              </div>
            </div>

            <div class="items-center mt-8 sm:mt-8 text-[#202142] flex flex-col">
              <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label
                    for="first_name"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-red"
                  >
                    Your first name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div class="w-full">
                  <label
                    for="last_name"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-red"
                  >
                    Your last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your last name"
                    required
                  />
                </div>
              </div>

              <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label
                    for="ExisitingPassword"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-red"
                  >
                    Existing Password
                  </label>
                  <input
                    type="password"
                    id="ExisitingPassword"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Existing Password"
                    required
                  />
                </div>
                <div class="w-full mb-4">
                  <label
                    for="newPassword"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-red"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="New Password"
                    required
                  />
                </div>
                <div class="w-full">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-red"
                  >
                    Conform Password
                  </label>
                  <input
                    type="password"
                    id="conformPassword"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Conform Password"
                    required
                  />
                </div>
              </div>
              <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div class="w-full">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-red"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                    placeholder="your.email@mail.com"
                    required
                  />
                </div>
                <div class="w-full">
                  <label
                    for="dropdown"
                    class="block mb-2 text-sm font-medium text-indigo-900 dark:text-red"
                  >
                    Age
                  </label>
                  <select
                    id="dropdown"
                    class="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                  >
                    <option value="" class={dropDownColor}>
                      Please select
                    </option>
                    {ageGroup.map((data) => (
                      <option
                        value={data.age}
                        key={data.i} // Use key instead of index for better React handling
                        className={dropDownColor}
                      >
                        {data.age}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="flex justify-end w-full">
                <button
                  type="submit"
                  class="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
