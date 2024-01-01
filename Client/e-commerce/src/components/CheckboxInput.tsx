interface props {
    inputValue: string
    containerStyle: string
    inputStyle: string
    checkFunction: Function
    isChecked: boolean
}

function CheckboxInput({inputValue, containerStyle, inputStyle, checkFunction, isChecked}:props) {

    return (
        <div className={`form-check ${containerStyle}`}>
            <input 
            onChange={(event)=>checkFunction(event, inputValue)}
            className={`form-check-input  ${inputStyle}`}
            type="checkbox" 
            checked={isChecked}
            value={inputValue} 
            id={inputValue} />
        </div>
    )
}
export default CheckboxInput