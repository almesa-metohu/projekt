import { useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className="footer">
            <div className="fLists">
                <ul className="fList d-flex justify-content-evenly">
                    <li onClick={() => navigate('/clientService')} className="fListItem">Sh&euml;rbim Klienti</li>
                    <li onClick={() => navigate('/careers')} className="fListItem">Mund&euml;si pun&euml;simi</li>
                </ul>
            </div>
            <p className="copyright">Copyright © 2024 BooClo.</p>
        </div>
    );
};

export default Footer;