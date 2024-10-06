import Header from './header'
import Footer from './footer'
import Banner from './banner'
import Main from './main'

// CSS

export default function PageHome() {
    return (
        <>
            <Header />
            <section className="main">
                <Banner />
                <Main />
            </section>
            
            <Footer />
        </>
    )
}