
import React from "react";
import icon from './png.png'
import './loaderError.css'
const LoaderError = () => {
    return (
        <div className="error-contanier">
            <img src={icon} alt="Picture broken, sorry :(" className="error-img" />
            <span className="error-text">Woops, server broken, we will fixed this in one second</span>
            <span className="error-text">Please, try to refresh</span>
        </div>
    )
}
export default LoaderError