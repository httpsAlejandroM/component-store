import { orderInterface } from "../../../interfaces/order.interface"
import ShoppingCardsContainer from "./Compras/ShoppingCardsContainer"
// import SuccessPayment from "./SuccessPayment/SuccessPayment"

function Compras() {

    const userOrders: orderInterface[] = [
        {
            id:1317393480,
            items: [
                {
                    id: "64eaa4b096581d6cffcb1b1b",
                    title: "PROCESADOR AMD RYZEN 3 3200G AM4",
                    description: "Procesadores",
                    picture_url: "https://http2.mlstatic.com/D_NQ_NP_672153-MLA75531741703_042024-F.jpg",
                    quantity: 1,
                    unit_price: 69.99
                },

            ],
            statusDetail: "Pagado",
            datePayment: "01/04/2024, 20:17",
            total: 69.99
        },
        {
            id: 1322171937,
            items:[
                {
					id: "64eaa4b096581d6cffcb1ae9",
					title: "ASUS Prime Z390-A Motherboard",
					description: "Motherboard",
					picture_url: "https://http2.mlstatic.com/D_NQ_NP_629055-MLA75531761155_042024-F.jpg",
					quantity: 1,
					unit_price: 189.99
				},
				{
					id: "64eaa4b096581d6cffcb1b53",
					title: "Sega Genesis Mini",
					description: "Consolas",
					picture_url: "https://http2.mlstatic.com/D_NQ_NP_851445-MLA75378376660_042024-F.jpg",
					quantity: 1,
					unit_price: 79.99
				}
            ],
            statusDetail: "Pagado",
            datePayment: "01/04/2024, 20:20",
            total: 269.98
        }
    ]

    return (
        <section className="container mt-5 w-100 h-100 rounded-3">
            {/* <SuccessPayment/> */}
            <ShoppingCardsContainer orders={userOrders}/>
        </section>
    )
}
export default Compras