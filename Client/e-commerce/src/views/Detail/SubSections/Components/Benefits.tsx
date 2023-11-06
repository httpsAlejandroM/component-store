
interface props {

}

function Benefits({}:props) {
  return (
    <div className="d-flex flex-column mt-3 gap-3 ">
                    <div className="d-flex flex-row gap-2 ">
                        <div><i className="bi bi-arrow-return-left fs-5"></i></div>
                        <div className="d-flex flex-column"><span className="text-success-alpha p-0 fw-bolder" >Devolución gratis</span><span className="text-dark p-0 fw-normal">Tenés 30 días desde que lo recibís.</span></div>
                    </div>
                    <div className="d-flex flex-row gap-2 ">
                        <div><i className="bi bi-shield-check fs-5"></i></div>
                        <div className="d-flex flex-column"><span className="text-success-alpha p-0 fw-bolder" >Compra Protegida, <span className="text-dark p-0 fw-normal">recibí el producto que esperabas o te devolvemos tu dinero.</span></span></div>
                    </div>
                    <div className="d-flex flex-row gap-2 ">
                        <div><i className="bi bi-trophy fs-5"></i></div>
                        <div className="d-flex flex-row align-items-center"><span className="text-dark p-0">12 meses de garantía de fábrica.</span></div>
                    </div>
                </div>
  )
}

export default Benefits