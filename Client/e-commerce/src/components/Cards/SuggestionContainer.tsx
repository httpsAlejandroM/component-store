import { ComponentInterface, ResponseBackend } from "../../interfaces"
import SuggestionCard from "./SuggestionCard"

interface props {
    input: string
    sugerencias: ResponseBackend | { error: boolean, data: ComponentInterface[] | any }
    inputWidth: number
    setInput: Function
}

function SuggestionContainer({ input, sugerencias, inputWidth, setInput }: props) {

    let contenido;

    if (sugerencias.error) {
        contenido = <div className="text-decoration-none d-flex align-items-center justify-content-start border-bottom-2">
            <p className="fs-5 m-0 noResults d-flex align-items-center justify-content-center ">{`No se encontraron resultados para "${input}"`}</p>
        </div>;
    } else if (sugerencias.data && sugerencias.data.length > 0) {
        contenido = sugerencias.data.map((componente: any) => (
            <SuggestionCard key={componente._id} id={componente._id} title={componente.title} image={componente.image} setInput={setInput} />
        ));
    }

    return (
        <div style={{width: inputWidth, minWidth:300}} className="searchResults position-absolute d-flex flex-column rounded-2  ">
            {contenido}
        </div>
    )

}

export default SuggestionContainer