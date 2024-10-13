import type { NextPage } from 'next';
import Header from './header';
import Footer from './footer';
import Banner from './banner';
import Main from './main';

const PageHome: NextPage = () => {
    return (
        <>
            <Header />
            <section className="main flex flex-col space-y-4">
                <Banner />
                <Main />
            </section>
            <a id="scrollUp" href="#top" style={{ position: 'fixed', zIndex: 2147483647 }}>
                <svg
                    aria-hidden="true"
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    ></path>
                </svg>
            </a>
            <Footer />
        </>
    );
}

export default PageHome;
