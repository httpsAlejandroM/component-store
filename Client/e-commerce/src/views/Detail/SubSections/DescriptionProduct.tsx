
interface props {
    description: string[]
}

function DescriptionProduct({description}:props) {
  return (
    <section className="container"> 
            <h3 className="text-success-alpha p-1 fs-2 mt-0 mb-3">Descripción</h3>
            <ul className="bg-light list-group list-group-flush ">
            
            {
                description.map((description:string, index:number)=>{
                    return ( 
                        <li key={index} className="text-dark li-description fs-5 py-3 bg-light">{`${description}`}</li>
                    )
                })
            }
            </ul>
            <hr className="border-dark border-1  mt-2 col-12 p-0" />
        </section>
  )
}

export default DescriptionProduct