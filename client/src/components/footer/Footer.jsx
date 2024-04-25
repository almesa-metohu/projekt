import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="fLists">
                <ul className="fList d-flex justify-content-between">
                    <li className="fListItem">Sh&euml;rbim Klienti</li>
                    <li className="fListItem">Ofrim Partneriteti</li>
                    <li className="fListItem">Mund&euml;si pun&euml;simi</li>
                    <li className="fListItem">Media</li>
                    <li className="fListItem">Qendra e siguris&euml;</li>
                    <li className="fListItem">B&euml;hu nj&euml; investitor</li>
                    <li className="fListItem">Kushtet dhe termat e privat&euml;sis&euml;</li>
                </ul>
            </div>
            <p className="copyright">Copyright © 2024 BooClo.</p>
        </div>
    );
};

export default Footer;