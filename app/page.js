"use client"
import { useEffect, useState } from "react"
import {ethers} from "ethers"
import abi from "./dbank.json";
import Header from "./components/Header";


export default function page(){
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState(null);
  const [bankbalance, setBankbalance] = useState(0);
  const [formdata, setFormdata] = useState({
    depositamount: "",
    withdrawamount: "",
    transferaddress: "",
    transferamount: "",
  });
  const contractaddress = "0x167caA634787E6a479fBB93838C76EB0Bd5A233E";
  useEffect(()=>{
    async function initialize(){
      if (typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
        const contract = new ethers.Contract(contractaddress,abi, signer);
        setContract(contract);
      }
    }
    initialize();
  },[])

  async function depositbro() {
    const mycon = await contract?.deposit({value: formdata.depositamount});
    console.log(mycon); 
  }
  async function withdrawbro() {
    const mycon = await contract?.withdraw(formdata.withdrawamount);
    console.log(mycon); 
  }
  async function transferbro() {
    const mycon = await contract?.transferTo(formdata.transferaddress, formdata.transferamount);
    console.log(mycon); 
  }
useEffect(()=>{
  async function balancebro() {
    const mycon = await contract?.getBalance();
    setBankbalance(mycon?.toNumber())
    console.log(mycon); 
  }
  balancebro();
},[contract])
  

  function onchangevalue(e){
     const {name, value} = e.target;
     setFormdata((data) => ({...data, [name]:value})); 
  }
  return(
    <>
    <div>
    <Header />
    <p className="text-blue-400 text-md md:text-lg lg:text-3xl text-center pt-20 pb-5">Hi,<span className="text-blue-400">{address?.slice(0,10)}...{address?.slice(-10)}</span> </p>
    <p className="text-green-400 text-md md:text-lg lg:text-3xl text-center pt-3 pb-3">My Bank Balance:<span >{bankbalance}</span> </p>
    <div className="bg-red-400 flex mx-5 flex-col py-10 lg:py-24 lg:space-y-8 rounded-xl lg:mx-[700px] md:justify-center">
    <p className="text-white text-center text-xl ">My deposit Section</p>
    <div className="flex flex-col px-10 lg:px-48 space-y-2  justify-center space-x-4">
    <input type="text" className="border border-black px-2" name="depositamount" value={formdata.depositamount} onChange={onchangevalue} />
    <button className="text-white bg-green-400 rounded-lg px-4 py-2" onClick={depositbro} >Deposit Here</button>
    </div>
    </div>
    <div className="bg-blue-400 flex mx-5 mt-5 flex-col py-10  lg:py-24 lg:space-y-8 rounded-xl lg:mx-[700px] lg:justify-center">
    <p className="text-white text-center text-xl ">My Withdraw Section</p>
    <div className="flex flex-col px-10  lg:px-48 space-y-2   justify-center space-x-4">
    <input type="text" className="border border-black px-2" name="withdrawamount" value={formdata.withdrawamount} onChange={onchangevalue} />
    <button className="text-white bg-green-400 rounded-lg px-4 py-2" onClick={withdrawbro} >Withdraw Here</button>
    </div>
    </div>
    <div className="bg-green-400 mb-20 flex mx-5 mt-5 flex-col py-10  lg:py-24 lg:space-y-8 rounded-xl lg:mx-[700px] lg:justify-center">
    <p className="text-white text-center text-xl ">My transfer Section</p>
    <div className="flex flex-col lg:flex-row px-10  lg:px-0 space-y-2  lg:space-y-0 justify-center space-x-4">
    <input type="text" className="border border-black px-2" name="transferaddress" placeholder="Transfer Address" value={formdata.transferaddress} onChange={onchangevalue} />
    <input type="text" className="border border-black px-2" name="transferamount" placeholder="Transfer Amount" value={formdata.transferamount} onChange={onchangevalue} />
    <button className="text-black bg-yellow-300 rounded-lg px-4 py-2" onClick={transferbro} >Transfer Here</button>
    </div>
    </div>
    </div>
    </>
  )
}