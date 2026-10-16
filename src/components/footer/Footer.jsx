import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo.png";
import "./Footer.scss";

const browseLinks = [
  { to: "/explore/movie", label: "Movies" },
  { to: "/explore/tv", label: "TV Shows" },
];

const infoLinks = ["Terms Of Use", "Privacy Policy", "About", "Blog", "FAQ"];

const socials = [
  { label: "Facebook", icon: <FaFacebookF /> },
  { label: "Instagram", icon: <FaInstagram /> },
  { label: "Twitter", icon: <FaTwitter /> },
  { label: "LinkedIn", icon: <FaLinkedin /> },
];

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="footerTop">
          <div className="brand">
            <Link to="/" aria-label="Home">
              <img src={logo} alt="It's Jaydip" />
            </Link>
            <p className="infoText">
              Browse what&apos;s trending, find something new to watch, and
              dig into the cast, crew and trailers behind every title.
            </p>
          </div>

          <nav className="linkGroup" aria-label="Browse">
            <span className="eyebrow">Browse</span>
            <ul>
              {browseLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="menuItem">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="linkGroup" aria-label="Information">
            <span className="eyebrow">Information</span>
            <ul className="menuItems">
              {infoLinks.map((label) => (
                <li key={label}>
                  <a href="#" className="menuItem">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footerBottom">
          <p className="attribution">
            Data and images provided by TMDB. This product uses the TMDB API
            but is not endorsed or certified by TMDB.
          </p>
          <div className="socialIcons">
            {socials.map((social) => (
              <a
                key={social.label}
                href="#"
                className="icon"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
