interface props {
    inputValue: string
    containerStyle: string
    inputStyle: string
}

function CheckboxInput({inputValue, containerStyle, inputStyle}:props) {
    return (
        <div className={`form-check ${containerStyle}`}>
            <input 
            className={`form-check-input  ${inputStyle}`}
            type="checkbox" 
            value={inputValue} 
            id={inputValue} />
        </div>
    )
}
export default CheckboxInput