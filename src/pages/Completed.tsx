import { useNavigate } from "react-router-dom"
import { CardHeader } from "../components/CardHeader"
import { useCard } from "../hooks/useCard"

export function Completed() {
  const navigate = useNavigate()
  const { cardData } = useCard()

  function handleGoBack() {
    navigate("/")
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <CardHeader cardholderName={cardData.cardholderName} cardNumber={cardData.cardNumber} expMonth={cardData.expMonth} expYear={cardData.expYear} cvc={cardData.cvc} />

      <div className="max-w-md m-auto flex flex-col gap-3 font-display mt-26 md:max-w-lg lg:mt-auto justify-center items-center">
        <img src="./icon-complete.svg" alt="Complete" className="h-20 w-20" />
        <h1 className="uppercase text-purple-950 text-3xl font-semibold">Thank you!</h1>
        <p className="text-gray-400">We've added your card details</p>
        <button onClick={handleGoBack} className="bg-purple-950 text-gray-200 py-4 w-full rounded-md hover:bg-purple-800 hover:cursor-pointer">Continue</button>
      </div>
    </div>
  )
}