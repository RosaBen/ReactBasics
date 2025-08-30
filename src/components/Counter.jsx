import { useState } from 'react';
import BigNumber from "./BigNumber";

const Counter=()=>{
  const [number, setNumber] = useState(0);
  const handleClick = () =>{
    const currentNumber = number;
    setNumber(currentNumber+1);
  }

  return(
    <>
    <div>
      <BigNumber numberBg ={number}/>
        <button onClick={handleClick}>
          counter
        </button>
    </div>
    </>
  )
}

export default Counter;