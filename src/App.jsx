import { useContext, useEffect, useState } from 'react';
import './App.css'
import Card from './Card';
import { cuadros } from './assets/datos'
import shuffleArray from './shuffle-array'
import Context from './context/Context';

const shuffledArr = shuffleArray(cuadros),
  shuffleArr2 = shuffleArray(shuffledArr),
  Cards = [...shuffledArr, ...shuffleArr2].map((image, index) => <Card image={image} key={index} />);

function App() {

  const { tries, successValue,counter } = useContext(Context),
    [statistic, setStatistic] = useState(0);
  useEffect(() => {
    const result = (successValue * 100) / tries;
    setStatistic(result);
  }, [successValue]);
  return (
    <>
      {
        counter === cuadros.length 
        && <div className='won-container'>        
          <h1>You have won!</h1>
          <button onClick={() => location.reload()}>Play again?</button>
          </div>
      }
      <div className='cards-container'>
        {Cards}
      </div>
      <h1>
        {
          tries + " tries, " + successValue + " success"
        }
        <br />
        {
          (statistic > 0) && Math.floor(statistic) + "% of success"
        }
      </h1>
    </>
  )
}

export default App
