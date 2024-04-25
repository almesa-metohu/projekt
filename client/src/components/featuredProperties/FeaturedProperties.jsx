import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";

const FeaturedProperties = () => {

    const { data, loading, error } = useFetch('http://localhost:8000/api/allListings?featured=true')

    return (
        <div className="fp">
            {loading ? 'Loading...' : 
            <>
            {data.length === 0 ? <></> : 
            <>
                <h1 className="homeTitle">Akomodime q&euml; turist&euml;t adhurojn&euml;</h1>
                {data.map((item,index) => (
                    <div className="fpItem" key={index}>
                    <img
                        src={item.photo}
                        alt="hotel"
                        className="fpImg"
                    />
                    <span className="fpName">{item.name}</span>
                    <span className="fpCity">{item.city}</span>
                    <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                    {item.ratings ? <div className="fpRating">
                        <button>{item.ratings}</button>
                    <span>Excellent</span>
                    </div> : ""}
                </div>
                ))}
            </>}
            </>
            }
        </div>
    );
};

export default FeaturedProperties;