import { createContext, useState, type ReactNode } from "react"

type CardHeaderProps = {
  cardholderName: string
  cardNumber: string
  expMonth: string
  expYear: string
  cvc: string
}

//tipagem que o contexto vai fornecer
type CardContextType = {
  cardData: CardHeaderProps
  setCardData: (data: CardHeaderProps) => void
}

//criando o contexto
export const CardContext = createContext<CardContextType | undefined>(undefined)

//provider que vai envolver os componentes que precisam acessar o contexto
export const CardProvider = ({children}: {children: ReactNode}) => {
  const [cardData, setCardData] = useState<CardHeaderProps>({
    cardholderName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: ""
  })

  return (
    <CardContext.Provider value={{cardData, setCardData}}>
      {children}
    </CardContext.Provider>
  )
}

