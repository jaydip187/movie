import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import "./Header.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/logo.png";

const navItems = [
  { to: "/explore/movie", label: "Movies" },
  { to: "/explore/tv", label: "TV Shows" },
];

const Header = () => {
  const [show, setShow] = useState("top");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const lastScrollY = useRef(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlenav = () => {
      const y = window.scrollY;
      if (y > 200) {
        setShow(y > lastScrollY.current && !mobileMenu && !showSearch ? "hide" : "show");
      } else {
        setShow(y > 8 ? "show" : "top");
      }
      lastScrollY.current = y;
    };
    handlenav();
    window.addEventListener("scroll", handlenav, { passive: true });
    return () => window.removeEventListener("scroll", handlenav);
  }, [mobileMenu, showSearch]);

  // Close overlays whenever the route changes.
  useEffect(() => {
    setMobileMenu(false);
    setShowSearch(false);
  }, [location.pathname]);

  useEffect(() => {
    if (showSearch) inputRef.current?.focus();
  }, [showSearch]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") {
        setShowSearch(false);
        setMobileMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggleSearch = () => {
    setShowSearch((open) => !open);
    setMobileMenu(false);
  };

  const toggleMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu((open) => !open);
  };

  const QueryHandler = (event) => {
    event.preventDefault();
    const value = query.trim();
    if (value.length > 0) {
      setQuery("");
      navigate(`/search/${encodeURIComponent(value)}`);
      setShowSearch(false);
    } else {
      toast.error("Type a title to search for.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const solid = show !== "top" || mobileMenu || showSearch;

  return (
    <header
      className={`header ${show} ${solid ? "solid" : ""} ${
        mobileMenu ? "mobileView" : ""
      }`}
    >
      <ContentWrapper>
        <NavLink to="/" className="logo" aria-label="Home">
          <img src={logo} alt="It's Jaydip" />
        </NavLink>

        <nav className="menuItems" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="menuItem">
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="headerActions">
          <button
            type="button"
            className={`iconBtn ${showSearch ? "active" : ""}`}
            onClick={toggleSearch}
            aria-label={showSearch ? "Close search" : "Search"}
            aria-expanded={showSearch}
          >
            {showSearch ? <FiX /> : <FiSearch />}
          </button>
          <button
            type="button"
            className="iconBtn menuToggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenu}
          >
            {mobileMenu ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </ContentWrapper>

      {mobileMenu && (
        <nav className="mobileMenu" aria-label="Mobile">
          <ContentWrapper>
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className="mobileMenuItem">
                {item.label}
              </NavLink>
            ))}
          </ContentWrapper>
        </nav>
      )}

      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <form className="searchInput" role="search" onSubmit={QueryHandler}>
              <FiSearch aria-hidden="true" />
              <input
                ref={inputRef}
                type="search"
                placeholder="Search movies and TV shows"
                aria-label="Search movies and TV shows"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <kbd className="hint">Enter</kbd>
            </form>
          </ContentWrapper>
        </div>
      )}

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </header>
  );
};
export default Header;
