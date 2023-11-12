
interface props {
    styles?: string
}

function ArrowTop({styles}: props) {
  return (
    <div className="position-absolute arrow-to-top p-0">
<a className={`btn z-3 p-0 ${styles}`}
    href="#shop">
      <i 
      className=" bi  bi-chevron-up menu-desplegable text-white display-2"
      >
      </i>
      </a>
    </div>

    
  )
}

export default ArrowTop