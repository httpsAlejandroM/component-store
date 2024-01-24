import { Link } from "react-router-dom"
import { PublicRoutes } from "../../../../utilities/routes"
import { FC, HTMLProps, ReactNode } from "react"

type EmptySection = HTMLProps<HTMLDivElement> & {
  children: ReactNode
  textButton: string
}

const EmptyCart:FC<EmptySection> = ({children, textButton, ...rest}) => {
  return (
    <section {...rest} >
        <div className="bg-light p-4 d-flex flex-column align-items-center justify-content-center rounded-3">
        {children}
        <Link to={PublicRoutes.SHOP} className="btn btn-success">
           {textButton}
        </Link>
        </div>
    </section>
  )
}
export default EmptyCart