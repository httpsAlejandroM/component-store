import { Link } from "react-router-dom"

interface SuggestionCard {
    title:string
    image:string
    id: string
    setInput: Function
}

function SuggestionCard({ title, image, id, setInput }: SuggestionCard) {
  return (
        <Link title={title} to={`/detail/${id}`} 
        onClick={()=>setInput("")}
        style={{textDecoration:"none"}} >
    <div className={`results text-decoration-none d-flex align-items-center justify-content-start`} > 
        <img className="img-fluid" src={image} alt={title}/>
        <span key={title} 
        className="ms-4 link-offset-1-hover link-underline link-success-dark link-underline-opacity-0 link-underline-opacity-75-hover ms-2">{title}
        </span>
    </div>
        </Link>
  )
}

export default SuggestionCard

