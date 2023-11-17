
interface props {
    styles: string
}

function FavButton({styles}:props) {
    return (
        <div className={styles}>
            <button className="btn btn-sm p-1 mt-2 mt-lg-0"><i className="bi bi-heart fs-2 text-success-alpha"></i>
            </button>
        </div>
    )
}

export default FavButton