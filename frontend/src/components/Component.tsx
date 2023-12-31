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
  const [loading,setLoading]=useState(false);

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
    setLoading(true);
    convert(query)
      .then((res) => {res.success && setResult(res.data);setLoading(false);})
      .catch((err) => {
        console.error("Error in converting:", err);
        throw err;
      });
    
  };

  return (
    <>
    {loading && <div className="loader"></div>}
    {
      show && 
    
		<div
			onClick={()=>setShow(false)}
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<div
				style={{
					background: "white",
					height: 50,
					width: 240,
					margin: "auto",
					padding: "2%",
					border: "2px solid #000",
					borderRadius: "10px",
					boxShadow: "2px solid black",
				}}
			>
				{miss}
      <button style={{backgroundColor:'red',color:'white',marginLeft:"10px",width:"20px",height:"25px"}} onClick={()=>setShow(false)}></button>
			</div>
		</div>
    
      }
      <div>
        <h1>Crypto Converter</h1>
      </div>
      <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <div style={{ marginRight: "50px", display: "flex", flexDirection: 'column' }}>
          <div>

            <label style={{ marginRight: "5px" }}>Currency *</label>
            <select style={{ bottom: "0", maxWidth: "100px" }} onChange={(e) => { setCurrency(e.target.value) }} name="currency">
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
            <select style={{ bottom: "0", maxWidth: "100px", }} onChange={(e) => { setCrypto(e.target.value) }}>
              <option value="" disabled>Select Crypto</option>
              {cryptos.map((item) => (
                <option style={{ maxWidth: "100px" }} key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <input type="number" name="amount" value={amount} placeholder="Amount" onChange={(e) => { setAmount(e.target.value) }} />
      <button style={{ border: "2px solid white", marginLeft: "20px" }} onClick={convertCurrency}>Convert</button>
      {result != "0" && <div><label>{result}</label></div>}
    </>
  );
};

export default Converter;
