
import styles from './floating.module.css';                  
const FloatingBar = () => {
  return (
    <>
    <div className={styles.wrapper}>
      {/*  row */}
      <div className='row'>
        {/* col 1 */}
        <div className='col'> 
          <div className='  fs-5 text-secondary'>Comfort</div>
          <div className='text-secondary'>
            <img src='/Location.png' className='m-1'/>
            Cozy seating
          </div>
        </div>
          {/* col 2 */}
          <div className='col'> 
          <div className=' fs-5 text-secondary'>Quality assurance</div>
          <div className='text-secondary'>
            <img src='/like.png' className='m-1'/>
            Cozy seating
          </div>
        </div>
          {/* col 3 */}
          <div className='col'> 
          <div className='  fs-5 text-secondary'>Free Shipping</div>
          <div className='text-secondary'>
            <img src='/cost.png' className='m-1'/>
            No-Cost Delivery
          </div>
        </div>
          {/* col 4 */}
          <div className='col'> 
          <div className='  fs-5 text-secondary'>Secure checkout</div>
          <div className='text-secondary'>
            <img src='/verify.png' className='m-1'/>
            Secure Payments 
          </div>
        </div>

        {/* col 5 */}
        {/* <div className='col'>
          <ButtonLayout placeholder="See More"/>

        </div> */}


{/* end row */}
      </div>

    </div>
  
    </>
  )
}

export default FloatingBar