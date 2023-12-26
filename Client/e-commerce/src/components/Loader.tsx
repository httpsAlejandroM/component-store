import Spinner from './Spinner'

function Loader() {
  return (
   <main className='min-vh-100 d-flex justify-content-center w-100'>
    <Spinner styles={{width:"4.5rem", height: "4.5rem"}}/>
   </main>
  )
}

export default Loader