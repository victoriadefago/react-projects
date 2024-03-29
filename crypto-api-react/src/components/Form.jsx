import { useState, useEffect } from "react"
import styled from "@emotion/styled"
import Error from "./Error"
import useSelect from "../hooks/useSelectCoins"
import { coins } from '../data/coins'

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    color: #FFF;
    padding: 10px;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color 3s ease;
    margin-top: 30px;
    &:hover {
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

const Form = ({setCoins}) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)

    useEffect( () => {
      const consultAPI = async () => {
        const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"
        const response = await fetch(url)
        const result = await response.json()
        const arrayCryptos = result.Data.map( (crypto) => {
          const object = {
            id: crypto.CoinInfo.Name,
            name: crypto.CoinInfo.FullName
          }
          return object
        })
        setCryptos(arrayCryptos)
      }
      consultAPI()
    }, [])

    const [ coin, SelectCoins ] = useSelect('Seleccione Moneda', coins)
    const [ crypto, SelectCryptos ] = useSelect('Seleccione Criptomoneda', cryptos)

    const handleSubmit = e => {
      e.preventDefault()
      if([coin, crypto].includes('')){
        setError(true)
        return
      }
      setError(false)
      setCoins({coin, crypto})
    } 

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}
      <form onSubmit={handleSubmit}>
        <SelectCoins />
        <SelectCryptos />
        <InputSubmit type="submit" value="Cotizar" />
      </form>
    </>
  )
}

export default Form