import adataLogo from "../../assets/adata.png"
import aerocoolLogo from "../../assets/aerocool.png"
import aorusLogo from "../../assets/aorus.png"
import asrockLogo from "../../assets/asrock.png"
import coolermasterLogo from "../../assets/coolermaster.png"
import corsairLogo from "../../assets/corsair.jpg"
import evgaLogo from "../../assets/evga.png"
import gskillLogo from "../../assets/gskill.png"
import intelLogo from "../../assets/intel.png"
import lenovoLogo from "../../assets/lenovo.png"
import lgLogo from "../../assets/lg.png"
import logitechLogo from "../../assets/logitech.png"
import msiLogo from "../../assets/msi.png"
import ryzenLogo from "../../assets/ryzen.png"
import razerLogo from "../../assets/razer.png"
import samsungLogo from "../../assets/samsung.png"
import sapphireLogo from "../../assets/sapphire-logo.png"
import seagateLogo from "../../assets/seagate-logo.png"
import thermaltakeLogo from "../../assets/thermaltake.png"
import viewsonic from "../../assets/viewsonic.png"
import wdLogo from "../../assets/wd.png"


function BrandsCarousel() {

    const brandsLogos = [
        {
            logo: adataLogo
        },
        {
            logo: aerocoolLogo
        },
        {
            logo: aorusLogo
        },
        {
            logo: asrockLogo
        },
        {
            logo: coolermasterLogo
        },
        {
            logo: corsairLogo
        },
        {
            logo: evgaLogo
        },
        {
            logo: gskillLogo
        },
        {
            logo: intelLogo
        },
        {
            logo: lenovoLogo
        },
        {
            logo: lgLogo
        },
        {
            logo: logitechLogo
        },
        {
            logo: msiLogo
        },
        {
            logo: ryzenLogo
        },
        {
            logo: razerLogo
        },
        {
            logo: samsungLogo
        },
        {
            logo: sapphireLogo
        },
        {
            logo: seagateLogo
        },
        {
            logo: thermaltakeLogo
        },
        {
            logo: viewsonic
        },
        {
            logo: wdLogo
        },
        {
            logo: adataLogo
        },
        {
            logo: aerocoolLogo
        },
        {
            logo: aorusLogo
        },
        {
            logo: asrockLogo
        },
        {
            logo: coolermasterLogo
        },
        {
            logo: corsairLogo
        },
        {
            logo: evgaLogo
        },
        {
            logo: gskillLogo
        },
        {
            logo: intelLogo
        },
        {
            logo: lenovoLogo
        },
        {
            logo: lgLogo
        },
        {
            logo: logitechLogo
        },
        {
            logo: msiLogo
        },
        {
            logo: ryzenLogo
        },
        {
            logo: razerLogo
        },
        {
            logo: samsungLogo
        },
        {
            logo: sapphireLogo
        },
        {
            logo: seagateLogo
        },
        {
            logo: thermaltakeLogo
        },
        {
            logo: viewsonic
        },
        {
            logo: wdLogo
        }
    ]

    return (
        <article className="col-12 position-relative">

            <div className="slider bg-white">
                <div className="slide-track align-items-center pt-2">
                    {
                        brandsLogos.map((brand, index) => {
                            return (
                                <figure key={index} className="slide">
                                    <img src={brand.logo} alt={`${brand.logo}`} />
                                </figure>
                            )
                        })

                    }
                </div>
            </div>
        </article>

    )
}

export default BrandsCarousel