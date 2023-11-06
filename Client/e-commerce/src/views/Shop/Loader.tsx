
interface props {
  isLoading: boolean
  fetchPageHandler: Function
}

function Loading({isLoading, fetchPageHandler}:props) {

  if (isLoading){
    return (<div className="spinner-border text-success d-flex align-self-center fs-6 my-4 col-md-4" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>)
  }
  else {
return (
  <button onClick={()=>fetchPageHandler()} className="text-white fs-6 btn btn-outline-success my-4 col-md-4 align-self-center text-align-start">Ver más productos</button>

)
  }


 
}

export default Loading