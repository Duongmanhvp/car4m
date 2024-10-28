import type { NextPage } from 'next';
import Header from './header';
import Footer from './footer';
import Banner from './banner';
import Main from './main';

const PageHome: NextPage = () => {
    return (
        <>
            
            <section className="main flex flex-col justify-center items-center">
                <Header />
                <Banner />
                <Main />
                <Footer />
            </section>

            
        </>
    );
}

export default PageHome;
