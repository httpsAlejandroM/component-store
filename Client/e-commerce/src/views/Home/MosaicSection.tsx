import mosaico from "../../assets/mosaico.jpg"
import mosaico2 from "../../assets/mosaico2.jpg"
import mosaico3 from "../../assets/mosaico3.jpg"
import mosaico4 from "../../assets/mosaico4.jpg"
import mosaico5 from "../../assets/mosaico5.jpg"
import mosaico6 from "../../assets/mosaico6.jpg"


function MosaicSection() {
    return (
        <section className="container mt-5 d-flex flex-column justify-content-center align-items-center gap-4">
            <div className="row mosaico">
                <div className="col-6">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico} alt="Mosaico" /></a>
                </div>
                <div className="col-3">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico2} alt="Mosaico" /></a>
                </div>
                <div className="col-3">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico3} alt="Mosaico" /></a>
                </div>
            </div>
            <div className="row mosaico">
                <div className="col-3">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico4} alt="Mosaico" /></a>
                </div>
                <div className="col-3">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico5} alt="Mosaico" /></a>
                </div>
                <div className="col-6">
                    <a href="#"><img className="img-fluid rounded-1" src={mosaico6} alt="Mosaico" /></a>
                </div>
            </div>
        </section>
    )
}

export default MosaicSection