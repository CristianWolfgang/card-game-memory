import {  useEffect, useState } from "react";
import Context from "./Context";
import { cuadros } from "../assets/datos";
const useMemory = ()=>{
    const [memory,useMemory]= useState([]),
    memoryLength =()=> memory.length,
    areEqual = ()=>(memory[0].image === memory[1].image) && memory[0].id != memory[1].id,
    selectCard = (obj)=>useMemory([obj]),
    selectCard2 = (obj)=>useMemory([...memory,obj]),
    reset = ()=>useMemory([]);

    return {
        memory,
        memoryLength,
        areEqual,
        selectCard,
        selectCard2,
        reset
    };
};



const useTries = () => {

    const [tries, setTries] = useState(0),
      myTry = () => setTries(tries + 1);
    return {
      tries, myTry
    };
  },
    useSuccess = () => {
      const [successValue, setSuccess] = useState(0),
        success = () => setSuccess(successValue + 1);
      return {
        success,
        successValue
      };
    };



const Provider= ({children})=>{


    
    
  const tries = useTries(),
  success = useSuccess(),
  [counter,setCounter] = useState(0);
    const myMemory = useMemory(),
    {memory} = myMemory;
    useEffect(()=>{
        if(myMemory.memoryLength()===2){
            if(myMemory.areEqual()){
                success.success();
                setCounter(counter+1);
            }else{

                setTimeout(()=>{
                    memory.forEach(obj=>obj.hiddenImage());
                },1000)
            }
        }
    },[memory]);


    useEffect(()=>{
        if(myMemory.memoryLength()===2){
            
            myMemory.reset();
        }
    },[memory]);
    
    
    return (<Context.Provider value={{
        ...myMemory,
        ...tries,
        ...success,
        counter
    }}>
        {children}
    </Context.Provider>);
};
export default Provider;