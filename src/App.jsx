import { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length,setLength]=useState("8")
  const [password,setPassword]=useState("")
  const [areNumbers,setNumbers]=useState("false")
  const [areCharacters,setCharacters]=useState("false")

  const passwordRef=useRef(null)

  const generatePassword =useCallback(()=>{
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(!areNumbers){str+="1234567890"}
    if(!areCharacters){str+="~`!@#$%^&*()_-=+[{]}\|:;.>,</?"}
    let pass=""
    for(var i=1;i<=length;i++)
    {
      var ind=Math.floor(((Math.random())*(str.length)))+1
      pass+=str.charAt(ind)
    }

    setPassword(pass)
  },[length,areNumbers,areCharacters,setPassword])

  const copyToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    generatePassword()
  },[length,areCharacters,areNumbers,generatePassword])

  return (
    <>
      <div class="bg-slate-800 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8">
        <h1 class="text-4xl text-slate-300 mb-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input class="h-[30px] w-[500px] p-2" type='text' placeholder='password' readOnly value={password} ref={passwordRef}/>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyToClipboard}>COPY</button>
        </div>
        <div class="flex text-sm gap-x-2 text-white">
          <div class="flex items-center gap-x-1">
            <input type='range' min={6} max={100} value={length} class="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}/>
            <label>length:{length}</label>
          </div>
          <div class="flex items-center gap-x-1">
            <input type="checkbox" class="cursor-pointer" onChange={()=>{setCharacters((prev)=>!prev)}}/>
            <label>Characters</label>
          </div>
          <div class="flex items-center gap-x-1">
            <input type="checkbox" class="cursor-pointer" onChange={()=>{setNumbers((prev)=>!prev)}}/>
            <label>Numbers</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
