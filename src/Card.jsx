import { useContext, useState } from "react";
import Context from "./context/Context";
const unknowImage = "https://www.html6.es/img/rey_.png",
    useCard = (image) => {
        const [img, setImage] = useState(unknowImage),
            hiddenImage = () => setImage(unknowImage),
            discoverImage = () => setImage(image),
            id = crypto.randomUUID(),
            click = ctx=>{
                const {
                    memoryLength,
                    selectCard,
                    selectCard2,
                    myTry
                }=ctx;
                const length = memoryLength();
                switch(length){
                    case 0:
                        selectCard({
                            image,
                            id,
                            hiddenImage
                        });
                    break;
                    case 1:
                        selectCard2({
                            image,
                            id,
                            hiddenImage
                        });
                        myTry();

                    break;
                }
                discoverImage();
            };




        
        return {
            img,
            click
        };
    },


    Card = ({ image }) => {
        const {
            img,
            click
        } = useCard(image),
        ctx = useContext(Context);
        return (<div className="card">
            <img className="card-image" src={img} onClick={()=>click(ctx)} />
        </div>)
    };
export default Card;