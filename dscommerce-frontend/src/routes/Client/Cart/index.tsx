import './styles.css';

import { useEffect } from 'react';
import * as cartService from '../../../services/cart-service';
import { OrderDTO, OrderItemDTO } from '../../../models/order';

const item1: OrderItemDTO = new OrderItemDTO(
    4, 1, "PC Gamer", 1200, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg"
)

const item2: OrderItemDTO = new OrderItemDTO(
    5, 2, "Rails for Dummies", 100.99, "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/5-big.jpg"
)

export default function Cart() {

    const cart: OrderDTO = new OrderDTO();

    useEffect(() => {
        cart.items.push(item1);
        cart.items.push(item2);

        cartService.saveCart(cart)
    }, []);

    return (
        <main>
            <section className="dsc-container dsc-mt20">
                <div className="dsc-card dsc-mb20">
                    {
                        cart.items.map(item => (

                            <div key={item.productId} className="dsc-cart-item-container dsc-line-bottom">
                                <div className="dsc-cart-item-left">
                                    <img src={item.imgUrl} alt={item.name} />

                                    <div className="dsc-cart-item-description">
                                        <h3>{item.name}</h3>
                                        <div className="dsc-cart-item-quantity-container">
                                            <div className="dsc-cart-item-quantity-btn">-</div>
                                            <p>{item.quantity}</p>
                                            <div className="dsc-cart-item-quantity-btn">+</div>
                                        </div>
                                    </div>

                                </div>

                                <div className="dsc-cart-item-right">
                                    R$ {(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))
                    }

                    <div className="dsc-cart-total-container dsc-line-bottom">
                        <h3>
                            R$ 15.000,00
                        </h3>
                    </div>
                </div>

                <div className="dsc-btn-page-container">
                    <div className="dsc-btn dsc-btn-blue">Finalizar pedido</div>
                    <div className="dsc-btn dsc-btn-white">Continuar comprando</div>
                </div>
            </section>
        </main>
    );
}