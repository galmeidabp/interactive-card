type CardHeaderProps = {
  cardholderName: string
  cardNumber: string
  expMonth: string
  expYear: string
  cvc: string
}

export function CardHeader({ cardholderName, cardNumber, expMonth, expYear, cvc }: CardHeaderProps) {
  return (
    <div className="relative">
      <img src="/bg-main-mobile.png" alt="background" className=" w-screen md:h-[300px] lg:hidden" />
      <img src="/bg-main-desktop.png" alt="background" className="hidden lg:h-screen lg:block" />

      <div
        className="absolute w-[370px] h-[200px] bg-[url('/bg-card-back.png')] bg-cover bg-center text-gray-300 rounded-lg
          top-[10%] left-[18%]
          md:left-[40%]
          lg:max-w-lg lg:top-[55%] lg:left-[50%]">

        <div className="flex justify-end items-center h-full px-12">
          <span>{cvc || "000"}</span>
        </div>
      </div>

      <div
        className="absolute w-[370px] h-[200px] bg-[url('/bg-card-front.png')] bg-cover bg-center text-gray-300 rounded-lg p-5
            top-[50%] left-[5%]
            md:top-[25%] md:left-[15%]
            lg:max-w-lg lg:top-[20%] lg:left-[35%]"
      >
        <img src="/card-logo.svg" alt="Logo do cartão" className="h-8" />

        <div className="flex flex-col mt-15 font-display">
          <p className="text-2xl tracking-widest">{cardNumber || '0000 0000 0000 0000'}</p>
          <div className="flex flex-row justify-between mt-2">
            <span className="uppercase text-sm">{cardholderName || "Jane Appleseed"}</span>
            <span className="text-sm">{expMonth && expYear ? `${expMonth}/${expYear}` : "00/00"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}