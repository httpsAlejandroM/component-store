
interface SuggestionCard {
    title:string
    image:string
}

function SuggestionCard({ title, image }: SuggestionCard) {
  return (
    <div className={`results text-decoration-none d-flex align-items-center justify-content-start activeSuggestion`} > 
        <img className="img-fluid" src={image} alt={title}/>
        <a key={title} href="#" 
        className="ms-4 link-offset-1-hover link-underline link-success-dark link-underline-opacity-0 link-underline-opacity-75-hover ms-2">{title}</a>
    </div>
  )
}

export default SuggestionCard

