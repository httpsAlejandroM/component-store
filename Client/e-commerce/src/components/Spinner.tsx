
interface props {
  styles: object
  alpha?:boolean
}

function Spinner({styles, alpha}:props) {
  return (
    <div className={`${alpha? "text-success-main" : "text-success"} spinner-border  d-flex flex-row align-self-center fs-6 my-4 col-12`} style={styles} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
  )
}

export default Spinner