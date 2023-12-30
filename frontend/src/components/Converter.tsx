import React, { useEffect, useState } from "react";
import { currencyList, convert, cryptoList } from "../handlers/apiCalls";

interface Currency {
  [code: string]: string;
}

interface Crypto {
  id: string;
  name: string;
  symbol: string;
}

const Converter = () => {
  const [currencies, setCurrenciesList] = useState<Currency[]>([]);
  const [cryptos, setCryptosList] = useState<Crypto[]>([]);
  const [currency, setCurrency] = useState("usd");
  const [amount, setAmount] = useState("0");
  const [crypto, setCrypto] = useState("");
  const [result, setResult] = useState("");
  const [show, setShow] = useState(false);
  const [miss, setMiss] = useState("");

  useEffect(() => {
    // Fetch currency list
    currencyList()
      .then((res) => res.status && setCurrenciesList(res.data))
      .catch((err) => {
        console.error("Error fetching currencies:", err);
        throw err;
      });

    // Fetch crypto list
    cryptoList()
      .then((res) => res.status && setCryptosList(res.data))
      .catch((err) => {
        console.error("Error fetching cryptos:", err);
        throw err;
      });
  }, []);

  const convertCurrency = async () => {
    console.log("Inside click", currency, crypto, amount);

    if (crypto === "") {
      setShow(true);
      setMiss("Crypto is missing");
      return;
    }

    if (amount === "0") {
      setShow(true);
      setMiss("Amount should be greater than 0");
      return;
    }

    const query = {
      currency,
      crypto,
      amount,
    };

    convert(query)
      .then((res) => res.status && setResult(res.data))
      .catch((err) => {
        console.error("Error in converting:", err);
        throw err;
      });
  };

  return (
    <>
      {show && (
        <div style={{ zIndex: "1000000000", borderRadius: "30px", border: "2px solid white" }}>
          <h1 style={{ fontSize: "30px" }}>{miss}</h1>
          <button style={{ height: "20px", fontSize: "20px", border: "2px solid white" }} onClick={() => setShow(false)}>OK</button>
        </div>
      )}
      <div>
        <h1>Crypto Converter</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <div style={{ marginRight: "50px" }}>
          <label style={{ marginRight: "5px" }}>Currency *</label>
          <select onChange={(e) => setCurrency(e.target.value)} name="currency">
            <option value="usd">USD</option>
            {currencies.map((item) => {
              const currencyCode = Object.keys(item)[0];
              const currencyName = item[currencyCode];
              return (
                <option key={currencyCode} value={currencyCode}>
                  {currencyName}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ marginLeft: "50px", display: "flex" }}>
          <label style={{ marginRight: "5px" }}>Crypto *</label>
          <select onChange={(e) => setCrypto(e.target.value)}>
            <option value="" disabled>Select Crypto</option>
            {cryptos.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {result !== "" && <div><label>{result}</label></div>}
      <input type="number" name="amount" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
      <button style={{ border: "2px solid white", marginLeft: "20px" }} onClick={convertCurrency}>Convert</button>
    </>
  );
};

export default Converter;
