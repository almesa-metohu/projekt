import "./featured.css";
import useFetch from "../../hooks/useFetch";

const Featured = () => {

    const { data, loading, error } = useFetch('http://localhost:8000/api/countByCity?cities=athens,vlore,berlin')

    return (
        <div className="featured">
            {loading ? 'Loading please wait': <><div className="featuredItem">
                <img
                    src="/images/athens.png"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Athin&euml;</h1>
                    <h2>2 vende</h2>
                </div>
            </div>

            <div className="featuredItem">
                <img
                    src="/images/vlore.jpg"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Vlor&euml;</h1>
                    <h2>14 vende</h2>
                </div>
            </div>
            <div className="featuredItem">
                <img
                    src="/images/berlin.png"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Berlin</h1>
                    <h2>9 vende</h2>
                </div>
            </div></>}
        </div>
    );
};

export default Featured;