import Spinner from './Spinner'

function Loader() {
  return (
   <main className='min-vh-100 d-flex'>
    <Spinner styles={{width:"4.5rem", height: "4.5rem", marginLeft:"50%"}}/>
   </main>
  )
}

export default Loader