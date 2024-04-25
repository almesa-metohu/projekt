import {
    faCircleXmark, faLocationDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../components/context/SearchContext";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import Reserve from "../../components/reserve/Reserve";
import useFetch from "../../hooks/useFetch";
import "./hotel.css";

const Hotel = () => {
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const location = useLocation()
    const id = location.pathname.split("/")[2]
    const { data, loading, error } = useFetch(`http://localhost:8000/api/hotel/${id}`)
    const { dates, options } = useContext(SearchContext)
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    function dayDifference(date1, date2) {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    }

    const days = dayDifference(dates[0].endDate, dates[0].startDate);

    const bookHotel = () => {
        userId ? setOpenModal(true) : navigate('/register')
    }


    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? 'loading...' : <div className="hotelContainer">
                {open && (
                    <div className="slider">
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="close"
                            onClick={() => setOpen(false)}
                        />
                    </div>
                )}
                <div className="hotelWrapper">
                    <button className="bookNow" onClick={bookHotel}>Rezervo ose Prenoto TANI!</button>
                    <h1 className="hotelTitle">{data.name}</h1>
                    <div className="hotelAddress">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>{data.address}, {data.city}</span>
                    </div>
                    <span className="hotelDistance">
                        Excellent location – {data.distance}m from center
                    </span>
                    <span className="hotelPriceHighlight">
                        Prenoto mbi ${data.cheapestPrice} n&euml; k&euml;t&euml; hotel dhe p&euml;rfito sh&euml;rbim taxi falas nga aeroporti!
                    </span>
                    <div className="hotelDetails">
                        <div className="hotelDetailsTexts">
                            <p className="hotelDesc">{data.description}</p>
                            <div className="hotelImages">
                                <img width={"100%"} height={"100%"} src={data.photo} alt="" />
                            </div>
                        </div>
                        <div className="hotelDetailsPrice">
                            <h1>Perfect for a {days}-night stay!</h1>
                            <span>
                                E vendosur n&euml; {data.city}, kjo pron&euml; ofron nj&euml; ambient t&euml; bukur dhe nj&euml; sh&euml;rbim t&euml; shk&euml;lqyer. Me nj&euml; vler&euml;sim t&euml; lart&euml; t&euml; vizitor&euml;ve, kjo &euml;sht&euml; nj&euml; zgjedhje e preferuar p&euml;r pushime t&euml; shkurt&euml;ra.
                            </span>
                            <h2>
                                <b>${days * data.cheapestPrice * options.room}</b> ({days} net&euml;)
                            </h2>
                            <button onClick={bookHotel}>Rezervo ose Prenoto TANI!</button>
                        </div>
                    </div>
                </div>
                <MailList />
                <Footer />
            </div>
            }
            {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
        </div>
    );
};

export default Hotel;