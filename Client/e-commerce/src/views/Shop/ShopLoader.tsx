import Spinner from "../../components/Spinner"

interface props {
  isLoading: boolean
  fetchPageHandler: Function
}

function Loading({isLoading, fetchPageHandler}:props) {

  if (isLoading){
    return (<Spinner styles={{width:"2.4rem", height: "2.4rem"}}/>)
  }
  else {
return (
  <button onClick={()=>fetchPageHandler()} className="text-white fs-6 btn btn-outline-success my-4 col-md-4 align-self-center text-align-start">Ver más productos</button>

)
  }


 
}

export default Loading