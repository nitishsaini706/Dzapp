import { useEffect, useState } from "react";
import { currencyList, convert, cryptoList } from "../handlers/apiCalls";



interface Crypto {
  id: string;
  name: string;
  symbol: string;
}

const Converter = () => {
  const [currencies, setCurrenciesList] = useState({});
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
      .then((res) => { res.success && setCurrenciesList(res.data.currencies) })
      .catch((err) => {
        console.error("Error fetching currencies:", err);
        throw err;
      });
    // Fetch crypto list
    cryptoList()
      .then((res) => { res.success && setCryptosList(res.data) })
      .catch((err) => {
        console.error("Error fetching cryptos:", err);
        throw err;
      });
  }, []);

  const convertCurrency = async () => {

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
      .then((res) => res.success && setResult(res.data))
      .catch((err) => {
        console.error("Error in converting:", err);
        throw err;
      });
  };

  return (
    <>
      {/* {show && (
        <div style={{ zIndex: "1000000000", borderRadius: "30px", border: "2px solid white" }}>
          <h1 style={{ fontSize: "30px" }}>{miss}</h1>
          <button style={{ height: "20px", fontSize: "20px", border: "2px solid white" }} onClick={() => setShow(false)}>OK</button>
        </div>
      )} */}
      <div>
        <h1>Crypto Converter</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <div style={{ marginRight: "50px", display: "flex", flexDirection: 'column' }}>
          <div>

            <label style={{ marginRight: "5px" }}>Currency *</label>
            <select style={{ bottom: 0, maxWidth: "100px" }} onChange={(e) => { setCurrency(e.target.value) }} name="currency">
              <option value="usd" style={{ padding: "10px" }}>USD</option>
              {Object.entries(currencies).map(([currencyCode, currencyName]) => (
                <option style={{ maxWidth: "100px", padding: "5px" }} key={currencyCode} value={currencyCode}>
                  {currencyName as React.ReactNode}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginLeft: "50px", display: "flex", flexDirection: 'column' }}>
          <div>

            <label style={{ marginRight: "5px" }}>Crypto *</label>
            <select style={{ bottom: 0, maxWidth: "100px", border: { show } ? "2px solid red" : "none" }} onChange={(e) => { setShow(false); setCrypto(e.target.value) }}>
              <option value="" disabled>Select Crypto</option>
              {cryptos.map((item) => (
                <option style={{ maxWidth: "100px" }} key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {show && <label style={{ color: "red", fontSize: "10px" }}>required *</label>}

        </div>
      </div>
      <input type="number" style={{ border: { show } ? "2px solid red" : "none" }} name="amount" value={amount} placeholder="Amount" onChange={(e) => { setShow(false); setAmount(e.target.value) }} />
      <button style={{ border: "2px solid white", marginLeft: "20px" }} onClick={convertCurrency}>Convert</button>
      {result != "" && <div><label>{result}</label></div>}
    </>
  );
};

export default Converter;
