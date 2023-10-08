import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ButtonInverse from "../../../components/ButtonInverse";
import ButtonPrimary from "../../../components/ButtonPrimary";

import { ProductDTO } from "../../../models/product";
//import * as productService from '../../../services/product-service-mock';
import ProductDetailsCard from "../../../components/ProductDetailsCard";

export default function ProductDetails() {

    //const params = useParams();
    const [product, setProduct] = useState<ProductDTO>();

    useEffect(() => {
        axios.get("http://localhost:8080/products/1")
            .then(response => {
                console.log(response.data);
                setProduct(response.data);
            });
    }, []);

    return (
        <main>
            <section className="dsc-container dsc-mt20">
                {
                    // renderiza se for verdadeiro
                    product && <ProductDetailsCard product={product} />
                }

                <div className="dsc-btn-page-container">
                    <ButtonPrimary buttonPurchaseName="Comprar" />

                    <Link to="/">
                        <ButtonInverse buttonHomeName="Início" />
                    </Link>
                </div>

            </section>
        </main>
    );
}