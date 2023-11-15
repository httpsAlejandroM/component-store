import Spinner from './Spinner'

function Loader() {
  return (
   <main className='min-vh-100 d-flex justify-content-center'>
    <Spinner styles={{width:"4.5rem", height: "4.5rem"}}/>
   </main>
  )
}

export default Loader