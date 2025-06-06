export function App() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Card Background & Card Image */}
      <div className="relative w-full h-full">
        <img src="./bg-main-mobile.png" alt="background" className="h-full w-full md:hidden" />

        <img src="./bg-main-desktop.png" alt="background" className="hidden md:block h-screen" />

        <img src="./bg-card-back.png" alt="card back" className="w-sm absolute top-10 left-20 md:top-120 md:left-80" />
        <img src="./bg-card-front.png" alt="card front" className="w-sm absolute top-40 left-5 md:top-60 md:left-60" />
      </div>

      {/* Card Info */}
      <div className="max-w-md m-auto flex flex-col gap-5 font-display mt-26 md:max-w-lg">

        <div className="flex flex-col gap-1 ">
          <p className="uppercase text-purple-950 font-semibold">cardholder name</p>
          <input type="text" placeholder="e.g. Jane Appleseed" className="border-1 border-gray-200 py-3 rounded-md px-4 focus:outline-2 focus:outline-purple-950 hover:bg-gray-100 focus:bg-gray-100" />
        </div>

        <div className="flex flex-col gap-1 ">
          <p className="uppercase text-purple-950 font-semibold">card number</p>
          <input type="number" placeholder="e.g. 1234 5678 9123 0000" className="border-1 border-gray-200 py-3 rounded-md px-4 focus:outline-2 focus:outline-purple-950 hover:bg-gray-100 focus:bg-gray-100" />
        </div>

        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-1 w-full">
            <p className="uppercase text-purple-950 font-semibold">exp. date (mm/yy)</p>
            <input type="date" placeholder="e.g. Jane Appleseed" className="border-1 border-gray-200 py-3 rounded-md px-4 focus:outline-2 focus:outline-purple-950 hover:bg-gray-100 focus:bg-gray-100" />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <p className="uppercase text-purple-950 font-semibold">cvc</p>
            <input type="number" placeholder="e.g. 123" className="border-1 border-gray-200 py-3 rounded-md px-4 focus:outline-2 focus:outline-purple-950 hover:bg-gray-100 focus:bg-gray-100" />
          </div>
        </div>

        <button type="submit" className="bg-purple-950 text-gray-200 py-4 rounded-md hover:bg-purple-800 hover:cursor-pointer">Confirm</button>

      </div>
    </div>
  )
}

