import { useNavigate } from "react-router-dom"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardHeader } from "../components/CardHeader"
import { useCard } from "../hooks/useCard"

const formValidateSchema = z.object({
  cardholderName: z.string().min(1, "Cardholder name is required").regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Only letters and spaces are allowed"),

  cardNumber: z.string()
    .refine((value) => /^[\d\s]*$/.test(value), { message: "Need to be a number" })
    .refine((value) => value.replace(/\s/g, "").length === 16, { message: "Card number must have at most 16 digits" }),

  expMonth: z.string().min(1, ""),
  expYear: z.string().min(1, ""),

  cvc: z.string()
    .refine((value) => /^[\d\s]*$/.test(value), { message: "Need to be a number" })
    .refine((value) => value.replace(/\s/g, "").length === 3, { message: "Can't be blank" })
}).refine((data) => {
  const month = Number(data.expMonth)
  const year = Number(data.expYear)
  return month >= 1 && month <= 12 && year >= 25 && year <= 99
}, {
  path: ["expDate"],
  message: "Invalid date"
})

type FormData = z.infer<typeof formValidateSchema>

export function Main() {
  const navigate = useNavigate()

  const { watch, handleSubmit, register, formState: { errors } } = useForm<FormData & { expDate?: string }>({ resolver: zodResolver(formValidateSchema) });

  // watch para pegar os valores digitados e atualizar CardHeader automaticamente
  const cardholderName = watch("cardholderName", "")
  const cardNumber = watch("cardNumber", "")
  const expMonth = watch("expMonth", "")
  const expYear = watch("expYear", "")
  const cvc = watch("cvc", "")

  function handleConfirm() {
    setCardData({
      cardholderName,
      cardNumber,
      expMonth,
      expYear,
      cvc
    })
    navigate("/completed")
  }

  const { setCardData } = useCard()

  return (
    <div className="flex flex-col lg:flex-row">
      <CardHeader cardholderName={cardholderName} cardNumber={cardNumber} expMonth={expMonth} expYear={expYear} cvc={cvc} />

      <form onSubmit={handleSubmit(handleConfirm)} className="max-w-md m-auto flex flex-col gap-5 font-display mt-26 md:max-w-lg lg:mt-auto">

        <div className="flex flex-col gap-1 ">
          <p className="uppercase text-purple-950 font-semibold">cardholder name</p>
          <input
            {...register("cardholderName")} type="text" placeholder="e.g. Jane Appleseed" className={`border-1  py-3 rounded-md px-4 focus:outline-2  hover:bg-gray-100 focus:bg-gray-100 ${errors.cardholderName ? 'border-red-400 focus:outline-red-400' : 'border-gray-200 focus:outline-purple-950'}`}
          />
          {errors.cardholderName && (
            <span className="text-red-400 text-sm">{errors.cardholderName.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <p className="uppercase text-purple-950 font-semibold">card number</p>
          <input
            {...register("cardNumber")} type="text" placeholder="e.g. 0000 0000 0000 0000" className={`border-1  py-3 rounded-md px-4 focus:outline-2  hover:bg-gray-100 focus:bg-gray-100 ${errors.cardNumber ? 'border-red-400 focus:outline-red-400' : 'border-gray-200 focus:outline-purple-950'}`} />
          {errors.cardNumber && (
            <span className="text-red-400 text-sm">{errors.cardNumber.message}</span>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex flex-col gap-1 w-[160px]">
            <p className="uppercase text-purple-950 font-semibold text-sm">exp. data (mm/yy)</p>
            <div className="flex flex-row gap-2">
              <input
                {...register("expMonth")}
                type="text"
                placeholder="MM"
                className={`w-full border py-3 rounded-md px-2 text-sm focus:outline-2 hover:bg-gray-100 focus:bg-gray-100 ${errors.expMonth ? 'border-red-400 focus:outline-red-400' : 'border-gray-200 focus:outline-purple-950'}`}
              />
              <input
                {...register("expYear")}
                type="text"
                placeholder="YY"
                className={`w-full border py-3 rounded-md px-2 text-sm focus:outline-2 hover:bg-gray-100 focus:bg-gray-100 ${errors.expYear ? 'border-red-400 focus:outline-red-400' : 'border-gray-200 focus:outline-purple-950'}`}
              />
            </div>
            {errors.expDate && (
              <span className="text-red-400 text-sm">{errors.expDate.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1 w-[200px]">
            <p className="uppercase text-purple-950 font-semibold text-sm">CVC</p>
            <input
              {...register("cvc")}
              type="text"
              placeholder="e.g. 000"
              className={`w-full border py-3 rounded-md px-4 text-sm focus:outline-2 hover:bg-gray-100 focus:bg-gray-100 ${errors.cvc ? 'border-red-400 focus:outline-red-400' : 'border-gray-200 focus:outline-purple-950'}`}
            />
            {errors.cvc && (
              <span className="text-red-400 text-sm">{errors.cvc.message}</span>
            )}
          </div>
        </div>


        <button type="submit" className="bg-purple-950 text-gray-200 py-4 rounded-md hover:bg-purple-800 hover:cursor-pointer">Confirm</button>

      </form>
    </div>
  )
}