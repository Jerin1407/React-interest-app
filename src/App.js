import { TextField, Stack, Button } from '@mui/material';
import './App.css';
import { useState } from 'react';

function App() {
  const [interest, setInterest] = useState(0)
  const [principle, setPrinciple] = useState(0)
  const [rate, setRate] = useState(0)
  const [year, setYear] = useState(0)
  const [isPrincipleValid, setisPrincipleValid] = useState(true)
  const [isRateValid, setisRateValid] = useState(true)
  const [isYearValid, setisYearValid] = useState(true)

  const handleCalculate = (e) => {
    e.preventDefault()
    if (!principle || !rate || !year) {
      alert("Please fill the the form completely!!!")
    } else {
      setInterest(Math.floor(principle * rate / 100 * year))
    }
  }

  const validateUserInput = (e) => {
    //{key}=object
    const { name, value } = e.target
    if (!!value.match(/^[0-9]+$/)) {
      // valid expression
      if (name === "principle") {
        setPrinciple(value)
        setisPrincipleValid(true)
      } else if (name === 'rate') {
        setRate(value)
        setisRateValid(true)
      } else {
        setYear(value)
        setisYearValid(true)
      }
    } else {
      // invalid expression
      if (name === "principle") {
        setPrinciple(value)
        setisPrincipleValid(false)
      } else if (name === 'rate') {
        setRate(value)
        setisRateValid(false)
      } else {
        setYear(value)
        setisYearValid(false)
      }
    }
  }

  const handleReset = () => {
    setInterest(0)
    setPrinciple(0)
    setRate(0)
    setYear(0)
    setisPrincipleValid(true)
    setisRateValid(true)
    setisYearValid(true)
  }

  return (
    <div style={{ height: '100vh' }} className='w-100 bg-dark d-flex justify-content-center align-items-center'>
      <div style={{ width: '600px' }} className='bg-light p-5 rounded '>
        <h3>Simple Interest Calculator</h3>
        <p>Calculate your simple interest easily</p>
        <div style={{ height: '150px' }} className='interest-card w-100 bg-warning d-flex flex-column justify-content-center align-items-center rounded shadow text-light mt-5'>
          <h1> ₹ {' '} {interest}</h1>
          <p>Total Simple Interest</p>
        </div>
        <form className='mt-5' onSubmit={handleCalculate}>
          <div className='mb-3'>
            <TextField className='w-100' id="outlined-basic" label="₹ Principal Amount" variant="outlined" name='principle' value={principle || ""} onChange={(e) => validateUserInput(e)} />
          </div>
          {
            !isPrincipleValid &&
            <div className='mb-3 text-danger fw-bolder'>
              *Invalid Principle Amount
            </div>
          }
          <div className='mb-3'>
            <TextField className='w-100' id="outlined-basic" label="Rate of interest (p.a) %" variant="outlined" name='rate' value={rate || ""} onChange={(e) => validateUserInput(e)} />
          </div>
          {
            !isRateValid &&
            <div className='mb-3 text-danger fw-bolder'>
              *Invalid Rate Amount
            </div>
          }
          <div className='mb-3'>
            <TextField className='w-100' id="outlined-basic" label="Time Period (Yr)*" variant="outlined" name='year' value={year || ""} onChange={(e) => validateUserInput(e)} />
          </div>
          {
            !isYearValid &&
            <div className='mb-3 text-danger fw-bolder'>
              *Invalid Year input
            </div>
          }
          <Stack direction="row" spacing={2}>
            <Button type='submit' style={{ height: '70px', width: '250px' }} variant="contained" disabled={isPrincipleValid && isRateValid && isYearValid ? false : true} >Calculate</Button>
            <Button onClick={handleReset} style={{ height: '70px', width: '250px' }} variant="outlined">Reset</Button>
          </Stack>
        </form>
      </div>
    </div>
  )
}

export default App;
