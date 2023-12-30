import { useEffect,useState } from "react";
import {currencyList,convert,cryptoList} from "../handlers/apiCalls";

interface Item{
    id:string,
    name:string,
    symbol:string
}
const Converter = () =>{
    const [currencies,setCurrenciesList] = useState([]);
    const [cryptos,setCryptosList] = useState([]);
    const [currency,setCurrency]=useState("");
    const [crypto,setCrypto]=useState("");
    const [result,setResult]=useState("");
    const [show,setShow]=useState(false);
    const [miss,setMiss] = useState("");

    useEffect(()=>{
        currencyList().then((res)=>{
            if(res.status){
                setCurrenciesList(res.data);
            }
        }).catch((err)=>{console.log(err);throw err;});

        cryptoList().then((res)=>{
            if(res.status){
                setCryptosList(res.data);
            }
        }).catch((err)=>{console.log(err);throw err;});
    },[])

    const convertCurrency = async()=>{
        if(currency == ""){
            setMiss("Currency is missing");
            return;
        }
        if(crypto == ""){
            setMiss("Crypto is missing");
            return;
        }
        const query:{currency:string,crypto:string} = {
            currency:currency,
            crypto:crypto
        }
        convert(query).then((res)=>{
            if(res.status){
                setResult(res.data);
            }
        }).catch((err)=>{console.log("error in converting",err);throw err;});
    }
    
    return (
        <>
       {show &&  <div>
            <h1>`{miss} is missing,`</h1>
            <button onClick={()=>{setShow(false)}}>OK</button>
        </div>}
        <div >

            <h1>Crypto Converter</h1>
        </div >
            <div style={{display:"flex",justifyContent:"center",margin:"20px"}}>
                <div style={{marginRight:"50px"}}>
                    
                    <label>Currency *</label>
                    <select onChange={(e)=>{setCurrency(e.target.value)}} name="currency">
                        {currencies.map((item)=>{
                            return (<option value={Object.keys(item)[0]}>{Object.keys(item)[0]}</option>)
                        })}
                    </select>

                </div>
                <div style={{marginLeft:"50px",display:"flex"}}>
                    <label>Crypto *</label>
                    <select onChange={(e)=>{setCrypto(e.target.value)}}>
                        {cryptos.map((item:Item)=>{
                            return (<option value={item.id}>{item.name}</option>)
                        })}
                    </select>
                </div>
            </div>
                {result != "" && <div>
                        <label>{result}</label>
                    </div>}
                <button onClick={convertCurrency}>Convert</button>

                
        </>
    )
}

export default Converter;