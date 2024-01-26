import { FC, HTMLProps, ReactNode } from "react"

type LinkButtonComponent = HTMLProps<HTMLButtonElement> & {
    children: ReactNode
}

const LinkButton: FC<LinkButtonComponent> = ({ children, ...rest }) => {
    return (
        <button {...rest}
            type="button"
            className="col-auto btn btn-link col-auto fs-7 text-start text-decoration-none">
            {children}
        </button>
    )
}
export default LinkButton