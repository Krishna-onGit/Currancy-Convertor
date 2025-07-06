import React from 'react'
import AmountInput from '../Assest/AmountInput'
import Output from '../Assest/Output'


const CurrancyConvertor = () => {
  return (
    <div>  
        <div className='bg-white w-170 h-70 p-15 rounded-lg shadow-lg '>   
            <h1 className=' text-xl font-bold mb-2px'>Currancy Convertor</h1>
            {/* ider sab assest  ayega  */}
            <div className=''>
                <AmountInput />
            </div>
            <div className=''>
                 <Output />
            </div>
           

        </div>
    </div>
  )
}

export default CurrancyConvertor