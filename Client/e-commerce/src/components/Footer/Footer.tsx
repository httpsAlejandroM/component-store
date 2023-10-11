
function Footer() {

    return (
        <footer className='second-color'>
            <div className="container-fluid text-white d-flex flex-column flex-lg-row justify-content-lg-evenly pt-3 mb-md-3 mb-xl-2">
                <div className="d-flex flex-column col-12 col-sm-12 col-lg-4 col-xl-3 col-xxl-2 text-start ms-2 ms-lg-0 mt-1 mt-lg-0">
                    <h4 className="text-success fs-5">Información</h4>
                    <ul className="navbar-nav">
                        <li ><a  className="text-white link-success fs-6" href="">Contacto</a></li>
                        <li ><a className="text-white link-success fs-6"  href="">Preguntas frecuentes</a></li>
                        <li ><a  className="text-white link-success fs-6" href="">Politica de privacidad</a></li>
                        <li ><a className="text-white link-success fs-6"  href="">Arrepentimiento de compra</a></li>
                    </ul>
                </div>
                <div className="d-flex flex-column col-12 col-sm-12 col-lg-4 col-xl-3 col-xxl-2 text-start ms-2 ms-lg-0 mt-3 mt-lg-0">
                   <h4 className="text-success fs-5">¿Dónde estamos?</h4>
                   <ul className="navbar-nav">
                        <li className="fs-6">Av. 9 de Julio s/n, C1043 CABA</li>
                        <li className="fs-6">Lunes a Viernes de 10:00 a 19:00 y Sábados de 10:00 a 14:00 Hs</li>
                       
                    </ul>
                    </div>
                <div className="d-flex flex-column col-12 col-sm-12 col-lg-4 col-xl-3 col-xxl-2 text-start ms-2 ms-lg-0 mt-3 mt-lg-0">
                    <h4 className="text-success fs-5">Seguinos en nustras redes</h4>
                    <ul className="navbar-nav d-flex flex-row justify-content-start gap-5">
                        <li><a className="link-success text-white px-1" href="https://facebook.com" target='_blank'><i className='bi bi-facebook fs-3'></i></a></li>
                        <li><a className="link-success text-white px-1" href="https://twitter.com" target='_blank'><i className='bi bi-twitter fs-3'></i></a></li>
                        <li><a className="link-success text-white px-1" href="https://instagram.com" target='_blank'><i className='bi bi-instagram fs-3'></i></a></li>
                    </ul>
                    </div>
            </div>
            <div className='text-start text-md-center mt-2 sbg-color py-1'>
                <small className='text-white'>&copy;2023 <a className="text-white link-success" href="https://www.linkedin.com/in/alejandro-medina-b4558419b/">Alejandro Medina.</a></small>
            </div>
        </footer>
    )
}

export default Footer

{/* <nav className='d-flex justify-content-center mb-1 gap-4'>
                <a className="btn fs-4" rel="noopener noreferrer" href="https://github.com/httpsAlejandroM" target='__BLANK'><i className='bi bi-github text-white'></i></a>
                <a className="btn fs-4" rel="noopener noreferrer" href="https://www.linkedin.com/in/alejandro-medina-b4558419b/" target='__BLANK'><i className='bi bi-linkedin text-white'></i></a>
            </nav> */}