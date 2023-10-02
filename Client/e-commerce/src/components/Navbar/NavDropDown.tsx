
interface NavlinkDropwDown {
    linkName: string;
    submenu: string[];
  }

function NavDropDown({ linkName, submenu }:NavlinkDropwDown) {
  return (
    <li className="nav-item dropdown mx-3 fs-5">
          <button className="nav-link dropdown-toggle text-white link-success" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           {linkName}
          </button>
          <ul className="dropdown-menu second-color ">
            {
                submenu.map((item:string, index:number) => {
                    return (
                        <li key={index}><a key={index} className="dropdown-item text-white link-success" href="#">{item}</a></li>
                    )
                })
            }
          </ul>
        </li>
  )
}

export default NavDropDown