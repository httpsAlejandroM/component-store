
interface props {
    styles: string
}

function FavButton({styles}:props) {
    return (
        <div className={styles}>
            <button className="btn btn-sm"><i className="bi bi-heart fs-2 text-success-alpha"></i>
            </button>
        </div>
    )
}

export default FavButton