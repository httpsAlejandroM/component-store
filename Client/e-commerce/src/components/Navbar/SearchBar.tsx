import SuggestionContainer from "../Cards/SuggestionContainer"
import { ResponseBackend } from "../../interfaces"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import { setFetchFilters } from "../../redux/slices/search.slice"
import axios from "axios"

interface props {
    styles?: string
}

function SearchBar({ styles }: props) {

    const [sugerencias, setSugerencias] = useState<ResponseBackend>({ error: false, data: [], total: 0 })
    const [input, setInput] = useState("")
    const fetchFilters = useAppSelector((state) => state.searchReducer)
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const inputRef = useRef<any>(null)

    const [inputWidth, setInputWidth] = useState(inputRef.current)

    useEffect(() => {
        const getSuggestions = async () => {
            const newSuggestions = (await axios.get(`http://localhost:3000/components?title=${input}`)).data
            setSugerencias(newSuggestions)
        }
        getSuggestions()

        const handleResize = () => {
            if (inputRef.current) {
                const inputWidth = inputRef.current.clientWidth;
                setInputWidth(inputWidth)
            }
        }
        handleResize()

    }, [input])

    const setInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setInput(value)
    }

    const searchHandler = (event: any) => {
        event.preventDefault()
        dispatch(setFetchFilters({ title: input, category: "", brand: "", order: fetchFilters.order, page:1, perPage:12 }))
        setInput("")
        navigate("/shop")
    }

    return (
        <form
            className={styles}
            role="search">
            <input
                ref={inputRef}
                className="form-control me-3"
                type="search"
                value={input}
                onChange={setInputHandler}
                placeholder="Buscar componentes"
                aria-label="Search"
            />

            {
                input !== "" && <SuggestionContainer setInput={setInput} inputWidth={inputWidth} input={input} sugerencias={sugerencias}></SuggestionContainer>
            }
            <button
                className="btn btn-outline-success ms-1"
                onClick={(event) => searchHandler(event)}
                type="submit">
                Buscar
            </button>
        </form>
    )
}

export default SearchBar