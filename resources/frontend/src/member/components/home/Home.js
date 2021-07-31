import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './Home.scss';
import HomeTab from './HomeTab';
import HomeModal from './HomeModal';
import {publicImagePath, publicImagePathURL} from "../../../appConstant";
import {appSettingsKey, Routes} from "../../../constants";
import HeaderTitle from "../../../shared/header-title/HeaderTitle";
import {getCurrentMember} from "../../../admin/shared/sharedMethod";
import {fetchBooksByNameOrAuthors, fetchFeaturedBooks} from "../../store/actions/bookAction";
import {fetchTotalBooks} from "../../store/actions/tooalBookAction";
import {toggleModal} from "../../../store/action/modalAction";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {resetSearchBooks} from "../../store/actions/bookSearchAction";
import {Button} from 'reactstrap';
import ProgressBar from "../../../shared/progress-bar/ProgressBar";
import Truncate from "../../../shared/Truncate";
import {fetchHomeSettings} from "../../store/actions/homeSettingAction";
import _ from "lodash";
import {fetchTestimonials} from "../../store/actions/testimonialAction";
import {getAvatarName} from "../../../shared/sharedMethod";

const Home = (props) => {
    let myRef = useRef();
    const {
        appSetting,
        books,
        genres,
        aboutUsCard,
        searchBooks,
        totalRecordMember,
        totalBooks,
        resetSearchBooks,
        fetchTotalBooks,
        fetchFeaturedBooks,
        fetchBooksByNameOrAuthors,
        fetchTestimonials,
        toggleModal,
        fetchHomeSettings,
        homeSettings,
        isLoading,
        testimonials
    } = props;
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [searchBy, setSearchBy] = useState('book');
    const [book, setBook] = useState(null);
    const [isToggle, setToggle] = useState(false);
    const appName = appSetting[appSettingsKey.LIBRARY_NAME] ? appSetting[appSettingsKey.LIBRARY_NAME].value : null;
    const appLogo = appSetting[appSettingsKey.LIBRARY_LOGO] ? appSetting[appSettingsKey.LIBRARY_LOGO].logo_url : publicImagePath.APP_LOGO;
    let about = undefined;
    const modalOptions = {
        toggleModal,
        isToggle,
        book
    };
    useEffect(() => {
        fetchTotalBooks();
        fetchFeaturedBooks();
        fetchHomeSettings();
        fetchTestimonials();
    }, []);

    const openModal = (book) => {
        setToggle(true);
        toggleModal();
        setBook(book);
    };

    /**
     * Search books
     * @param searchBy
     * @param page
     */
    const onSearch = (searchBy = 'book', page = 0) => {
        setSearchBy(searchBy);
        const skip = 4 * page;
        let param = '?search=' + search + '&limit=4&by_books=1&skip=' + skip;
        if (searchBy === 'author') {
            param = '?search=' + search + '&limit=4&by_authors=1&skip=' + skip;
        }
        fetchBooksByNameOrAuthors(param);
    };

    const onPrev = (e) => {
        e.preventDefault();
        const prevPage = page - 1;
        setPage(prevPage);
        onSearch(searchBy, prevPage);
    };

    const onNext = (e) => {
        e.preventDefault();
        const nextPage = page + 1;
        setPage(nextPage);
        onSearch(searchBy, nextPage);
    };

    /**
     *  render pagination
     * @returns {string|*}
     */
    const renderPagination = () => {
        if (!totalRecordMember || totalRecordMember < 5) {
            return '';
        }

        return (
            <div className="row justify-content-center no-gutters">
                <nav aria-label="Page navigation">
                    <ul className="pagination mb-0 mt-3">
                        <li className="page-item">
                            <Button disabled={page === 0} className="page-link" onClick={(e) => onPrev(e)}>Previous
                            </Button>
                        </li>
                        <li className="page-item">
                            <Button disabled={totalRecordMember <= page * 4 + 4} className="page-link"
                                    onClick={(e) => onNext(e)}>Next
                            </Button>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    };

    // set search value while search
    const onChangeInput = (event) => {
        setSearch(event.target.value);
        resetSearchBooks();
    };

    // featured books slider options
    const bookSliderOption = {
        nav: true,
        rewind: true,
        autoplay: true,
        margin: 10,
        loop: true,
        responsive:{
        0:{
            items:1
        },
        450:{
            items:2
        },
        600:{
            items:3
        },
        1000:{
            items:6
        }
    }
    };

    // featured books slider options
    const mainSliderOption = {
        items: 1,
        nav: true,
        autoplay: true,
        margin: 10,
        loop: true,
    };

    /**
     *  Render Featured Books
     * @returns {*}
     */
    const renderFeaturedBooks = () => {
        return (
            <OwlCarousel className="owl-theme" {...bookSliderOption}>
                {books.map((item, i) => {
                    return (
                        <div className="item" key={i}>
                            <div className="popular-book__item-box">
                                <img alt={item.image_path}
                                     src={item.image_path ? item.image_path : publicImagePath.BOOK_AVATAR}/>
                                <span className={'book-name'}>{item.name}</span>
                            </div>
                        </div>
                    )
                })}
            </OwlCarousel>
        );
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }

        return color;
    }

    const renderGenres = () => {
        return (
            <section className={ `${ genres.length === 0 ? 'section-spacing--no-item' : 'section-spacing--top section-spacing--bottom' } category`}>
                <div className="container">
                    <h3 className="text-center">{homeSettings.genres_text ? homeSettings.genres_text.display_name : null }</h3>
                    <p className={ `${genres.length === 0 ? 'm-0' : 'section-header-row-spacing'} text-center text-description--white-section text-description section-width mx-auto`}>
                        {homeSettings.genres_text ? homeSettings.genres_text.value : '' }
                    </p>
                    <div className="row">
                        {
                            genres.map((genre, index) => {
                                let colorCode = getRandomColor();
                                return (
                                    <div className={`col-12 col-sm-6 col-lg-3`} key={index}>
                                        <div style={{borderColor: colorCode}} className="category__box">
                                            <div style={{backgroundColor: colorCode}} className="category__box-icon-wrapper position-relative">
                                                <div className="category__box-icon position-absolute">
                                                    <i className="fa fa-book"/>
                                                </div>
                                            </div>
                                            <hr/>
                                            <div className="text-center category__box-title">{genre.name}</div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        );
    };

    /**
     * Render Popular Books Section
     * @returns {string|*}
     */
    const renderPopularSection = () => {
        if (books.length < 1) {
            return '';
        }
        return (
            <section className="popular-book section-spacing--top section-spacing--bottom position-relative">
                <div className="popular-book__bg"/>
                <div className="container-fluid popular-book__container">
                    <h3 className="text-center">{homeSettings.popular_books_text ? homeSettings.popular_books_text.display_name : ''}</h3>
                    <p className="section-header-row-spacing text-center w-75 ml-auto mr-auto">
                        {homeSettings.popular_books_text ? homeSettings.popular_books_text.value : ''}
                    </p>
                    <div className="popular-book__book-item-slider-wrapper">
                        {renderFeaturedBooks()}
                    </div>
                </div>
            </section>
        );
    };

    /**
     * Render Book Card
     * @param book
     * @returns {*}
     */
    const renderBook = (book) => {
        return (
            <div className="card book-search-card">
                <div className="row no-gutters">
                    <div className="book-search-card__col-left">
                        <img alt={book.image_path} src={book.image_path ? book.image_path : publicImagePath.BOOK_AVATAR}
                             className="card-img"/>
                    </div>
                    <div className="book-search-card__col-right">
                        <div className="card-body">
                            <h5 className="card-title">{book.name}</h5>
                            <p className="card-text text-muted">By {book.authors_name}</p>
                            <p className="card-text">
                                <Truncate text={book.description} textLength={243}/>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Render searched books
     * @returns {string|*}
     */
    const renderSearchedBooks = () => {
        if (search === '' || searchBooks.length < 1) {
            return '';
        }

        setTimeout(() => {
            if (about) {
                about.scrollIntoView({behavior: "smooth"});
            }
        }, 400);

        return (
            <section className="book-search section-spacing--top section-spacing--bottom" ref={(el) => {
                about = el;
            }}>
                <div className="container">
                    <h2 className="book-search__result-heading text-description text-center">Result for</h2>
                    <h1 className="book-search__book-name text-center mb-5">"{search}"</h1>
                    <div className="row book-search-card-row">
                        {
                            searchBooks.map((item, i) => {
                                return (
                                    <div className="col-12 col-xl-6 book-search-card-container"
                                         onClick={() => openModal(item)} key={i}>
                                        {renderBook(item)}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {renderPagination()}
                </div>
            </section>
        );
    };

    const tabOptions = {onChangeInput, onSearch};
    /**
     * Render Footer
     * @returns {*}
     */
    const renderFooter = () => {
        return (
            <footer className="footer section-spacing--bottom section-spacing--top">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <a href="#"><img src={appLogo} alt="library" height="50"/></a>
                            <p className="mt-3">
                                {homeSettings.company_description ? homeSettings.company_description.value : ''}
                            </p>
                            <div className="space-10"/>
                            <ul className="list-inline list-unstyled social-list">
                                <li className="list-inline-item">
                                    <a href={homeSettings.facebook ? homeSettings.facebook.value : ''} target="_blank">
                                        <i className="fa fa-facebook" aria-hidden="true"/>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href={homeSettings.twitter ? 'https://twitter.com/' + homeSettings.twitter.value : ''}
                                       target="_blank">
                                        <i className="fa fa-twitter" aria-hidden="true"/>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href={homeSettings.linkedin ? homeSettings.linkedin.value : ''} target="_blank">
                                        <i className="fa fa-linkedin" aria-hidden="true"/>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href={homeSettings.github ? homeSettings.github.value : ''} target="_blank">
                                        <i className="fa fa-github"/>
                                    </a>
                                </li>
                            </ul>
                            <ul className="list-inline tip yellow">
                                <li><i className="icofont icofont-square"/></li>
                                <li><i className="icofont icofont-square"/></li>
                                <li><i className="icofont icofont-square"/></li>
                            </ul>
                        </div>
                        <div className="col-12 col-md-4 ml-auto">
                            <h4>Contact Us</h4>
                            <table className="table borderless addr-dt">
                                <tbody>
                                <tr>
                                    <td><i className="fa fa-map-marker"/></td>
                                    <td>
                                        <address className="mb-0">{appName}</address>
                                    </td>
                                </tr>
                                <tr>
                                    <td><i className="fa fa-envelope"/></td>
                                    <td>{homeSettings.contact_email ? homeSettings.contact_email.value : ''}</td>
                                </tr>
                                <tr>
                                    <td><i className="fa fa-phone"/></td>
                                    <td>{homeSettings.contact_phone ? homeSettings.contact_phone.value : ''}</td>
                                </tr>
                                <tr>
                                    <td><i className="fa fa-globe"/></td>
                                    <td>
                                        <a href={homeSettings.website ? homeSettings.website.value : ''}
                                           target="_blank">
                                            {homeSettings.website ? homeSettings.website.value.replace('https://', '') : ''}
                                        </a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </footer>
        );
    };

    /**
     *  Render what people says section
     * @returns {*}
     */
    const renderWhatPeopleSays = () => {

        return (
            <section className="what-people-say position-relative">
                <div className="what-people-say__bg position-absolute">
                    <img src="img/user/user-slider-bg.jpg" alt="what people say" className="img-fluid"/>
                </div>
                <div className="what-people-say__content section-spacing--top section-spacing--bottom">
                    <div className="container">
                        <h3 className="text-center">What People Say</h3>
                        <OwlCarousel className="what-people-say__owl-slider owl-theme" {...mainSliderOption}>
                            {
                                testimonials.map((people, i) => {
                                    return (
                                        <div className="item" key={i}>
                                            <div className="what-people-say__slider-section text-center mx-auto">
                                                <div className="mt-3">
                                                    <h6 className="text-uppercase">{people.name}</h6>
                                                    <h6 className="text-uppercase">{people.occupation}</h6>
                                                    <p className="text-center text-description--landing w-75 mx-auto section-header-row-spacing">
                                                        {people.description}
                                                    </p>
                                                    <div className="what-people-say__slider-avatar">
                                                        {people.image_path !== null ?
                                                            <img src={people.image_path} alt=""/> :
                                                            <span>{getAvatarName(people.name)}</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </OwlCarousel>
                    </div>
                </div>
            </section>
        );
    };

    /**
     *  Render About us Section
     * @returns {*}
     */
    const renderAboutUs = () => {
        return (
            <section className={ `${ aboutUsCard.length === 0 ? 'section-spacing--no-item' : 'section-spacing--top section-spacing--bottom' } about-us`}>
                <div className="container">
                    <h3 className="text-center">{homeSettings.about_us_text ? homeSettings.about_us_text.display_name : ''}</h3>
                    <p className={ `${aboutUsCard.length === 0 ? 'm-0' : 'section-header-row-spacing'} text-center text-description section-width mx-auto`}>
                        {homeSettings.about_us_text ? homeSettings.about_us_text.value : ''}
                     </p>
                    <div className="row">
                        {
                            aboutUsCard && aboutUsCard.map((card, i) => {
                                let colorCode = getRandomColor();
                                return (
                                    <div className="col-12 col-sm-6 col-lg-4 about-us__box-col" key={i}>
                                        <div className="about-us__box mb-4">
                                            <i style={{color: colorCode}} className="fa fa-book"/>
                                            <h4 className="mt-4">{card.title}</h4>
                                            <p>{card.description}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        );
    };
    const onToggleSidebar = () => {
        const element = document.getElementById('navbarSupportedContent');
        if (element) {
            element.classList.toggle('show');
        }
    };
    if (isLoading) {
        return <ProgressBar/>
    }
    return (
        <React.Fragment>
            <div className="animated fadeIn main-landing-page">
                <header className="header position-fixed">
                    <HeaderTitle title="Landing"/>
                    <div className="container">
                        <nav className="navbar navbar-expand-lg">
                            <a className="navbar-brand d-flex align-items-center" href="#"
                               onClick={(e) => e.preventDefault()}>
                                <img src={appLogo} alt="logo" className="header__logo"/>
                                <span className="pl-3">{appName}</span>
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    onClick={() => onToggleSidebar()} data-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <i className="fa fa-bars"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto text-uppercase">
                                    <li className="nav-item">
                                        <Link to={getCurrentMember() ? Routes.MEMBER_DEFAULT : Routes.MEMBER_LOGIN}
                                              className="nav-link">
                                            {getCurrentMember() ? 'Books' : 'Login'}
                                        </Link>
                                    </li>
                                    {getCurrentMember() ?
                                        '' : <li className="nav-item">
                                            <Link to={Routes.MEMBER_REGISTRATION} className="nav-link">
                                                Registration
                                            </Link>
                                        </li>}
                                </ul>
                            </div>
                        </nav>
                    </div>
                </header>
                <section className="landing position-relative">
                    <div className="position-absolute landing__slider">
                        <OwlCarousel className="owl-theme" {...mainSliderOption}>
                            <div className="item">
                                <img src="img/landing-slider/landing_slider-1.jpg" alt="slide one"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                            <div className="item">
                                <img src="img/landing-slider/landing_slider-2.jpg" alt="slide two"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                            <div className="item">
                                <img src="img/landing-slider/landing_slider-3.jpg" alt="slide three"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                            <div className="item">
                                <img src="img/landing-slider/landing_slider-4.jpg" alt="slide three"
                                     className="img-fluid landing__slider-img"/>
                            </div>
                        </OwlCarousel>
                    </div>
                    <div className="container">
                        <div className="landing__text-block">
                            <h1 className="landing__text-block-title">
                                {homeSettings.hero_image_title ? homeSettings.hero_image_title.value : ''}
                            </h1>
                            <p className="landing__text-block-desc text-description--landing">
                                {homeSettings.hero_image_description ? homeSettings.hero_image_description.value : ''}
                             </p>
                            <div className="landing-search-box mt-5">
                                <HomeTab {...tabOptions}/>
                            </div>
                        </div>
                    </div>
                </section>
                {renderSearchedBooks()}
                {renderAboutUs()}
                {renderGenres()}
                {renderPopularSection()}
                {renderWhatPeopleSays()}
                {renderFooter()}
            </div>
            <HomeModal {...modalOptions}/>
        </React.Fragment>
    );
};

Home.propTypes = {
    appSetting: PropTypes.object,
    books: PropTypes.array,
    searchBooks: PropTypes.array,
    totalRecordMember: PropTypes.number,
    totalBooks: PropTypes.number,
    fetchFeaturedBooks: PropTypes.func,
    toggleModal: PropTypes.func,
    resetSearchBooks: PropTypes.func,
    testimonials: PropTypes.array
};

const mapStateToProps = (state) => {
    const { appSetting, books, searchBooks, totalRecordMember, totalBooks, isLoading, homeSettings, testimonials, genres, aboutUsCard } = state;
    const settingsArray = Object.values(homeSettings);
    const settingsArr = _.mapKeys(settingsArray, 'key');
    return {
        appSetting,
        books,
        genres,
        aboutUsCard,
        searchBooks,
        totalRecordMember,
        totalBooks,
        isLoading,
        homeSettings: settingsArr,
        testimonials
    }
};

export default connect(mapStateToProps, {
    fetchFeaturedBooks,
    fetchHomeSettings,
    fetchTestimonials,
    toggleModal,
    fetchBooksByNameOrAuthors,
    resetSearchBooks,
    fetchTotalBooks
})(Home);
