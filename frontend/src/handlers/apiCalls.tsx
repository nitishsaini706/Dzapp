import axios from "axios";
import{CURRENCY_LIST_URL,CRPTO_LIST_URL,CONVERT_URL} from "../constants/index";

export const currencyList = async() =>{
    try{
        const data = await axios.get(CURRENCY_LIST_URL);
        return data.data;
    }catch(err){
        console.log("Error while fetching currency list",err);
        throw err;
    }
}

export const cryptoList = async() =>{
    try{
        const data = await axios.get(CRPTO_LIST_URL);
        return data.data;
    }catch(err){
        console.log("Error while fetching currency list",err);
        throw err;
    }
}

export const convert = async(input:{currency:string,crypto:string}) =>{
    try{
        const data = await axios.get(CONVERT_URL+`?currency=${input.currency}&crypto=${input.crypto}`);
        return data.data;
    }catch(err){
        console.log("Error while fetching currency list",err);
        throw err;
    }
}