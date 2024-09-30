import { useCallback, useEffect, useState,useRef } from "react";
import "./App.css";

function App() {
  const [Password,setPassword]=useState('🪄Magic happens here')
  const [length, setLength] = useState(8); 
  const[numberAllow,setNumberAllow]=useState(false);
  const[charactersAllow,setcharactersAllow]=useState(false);
  const[copyPassword,setCopyPassword]=useState('Copy')
  //refHook
  const passwordRef=useRef(null);
  //copyPasswordFunc
  const copyPwd=useCallback(()=>{
    window.navigator.clipboard.writeText(Password)
    setCopyPassword('💫COPIED')
    setTimeout(()=>{
      setCopyPassword('Copy')
    },3000)
  },[Password])

  const passwordGenerator=useCallback(()=>{
    let pass=''
    let string='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrst'
    if(numberAllow) string+='0123456789'
    if(charactersAllow) string+='!@#$%^&*()~{}[],.'
    for(let i=0;i<=length;i++){
      let char=Math.floor(Math.random()*string.length+1)
      pass+=string.charAt(char);
    }
    setPassword(pass)
  },[numberAllow,charactersAllow,length])  

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  useEffect(()=>{passwordGenerator()},[length,numberAllow,charactersAllow,passwordGenerator])

  
  return (
    <div className="flex justify-center items-center h-screen font-mono bg-blue-700">
      <div className="grid-cols-1 p-10 bg-white border-4 border-black text-black">
        <input className="text-4xl font-bold mb-6" ref={passwordRef} value={Password}/>

        <div className="flex items-center mb-4">
          <input 
          type="checkbox" 
          id="numbers" 
          className="mr-2 border-black" 
          onChange={()=>{
            setNumberAllow((prev)=>!prev)
          }}/>
          <label htmlFor="numbers" className="font-bold text-xl">
            Numbers
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="characters"
            className="mr-2 border-black"
            onChange={()=>{
            setcharactersAllow((prev)=>!prev)
          }}
          />
          <label htmlFor="characters" className="font-bold text-xl">
            Characters
          </label>
        </div>

        <div className="flex items-center mb-6">
      <label htmlFor="length" className="font-bold text-xl mr-4">
        Length:
      </label>
      <input
        type="range"
        id="length"
        min="1"
        max="30"
        value={length}
        onChange={handleLengthChange}
        className="slider w-full border-black"
      />
      <label className="font-semibold text-xl"> {length} </label>
    </div>

        <button className="bg-black text-white font-bold py-2 px-4 border-4 border-black w-full hover:shadow-2xl"
        onClick={()=>{passwordGenerator()}}>
          Generate
        </button>

        <button className="bg-black text-white font-bold py-2 px-4 my-3 border-4 border-black w-full hover:shadow-2xl"
        onClick={copyPwd}>
          {copyPassword}
        </button>

      </div>
    </div>
  );
}

export default App;
