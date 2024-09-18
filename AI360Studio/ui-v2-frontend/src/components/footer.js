// components/Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row text-muted">
          <div className="col-6 text-start">
            <p className="mb-0">
              <a href="https://dlytica.com/" target="_blank" className="text-muted" rel="noopener noreferrer">
                <strong>Dlytica Inc.</strong>
              </a> &copy;
            </p>
          </div>
          <div className="col-6 text-end">
            <ul className="list-inline">
              <li className="list-inline-item">
                <Link href="/support" className="text-muted">Support</Link>
              </li>
              <li className="list-inline-item">
                <Link href="/help-center" className="text-muted">Help Center</Link>
              </li>
              <li className="list-inline-item">
                <Link href="/privacy" className="text-muted">Privacy</Link>
              </li>
              <li className="list-inline-item">
                <Link href="/terms" className="text-muted">Terms</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
