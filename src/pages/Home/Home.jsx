import Hero from "../../components/Home/Hero";
import Stats from "../../components/Home/Stats";
import LatestTuitions from "../../components/Home/LatestTuitions";
// import FeaturedTutors from "../../components/Home/FeaturedTutors";
// import HowItWorks from "../../components/Home/HowItWorks";
// import Testimonials from "../../components/Home/Testimonials";
// import CTASection from "../../components/Home/CTASection";

const Home = () => {
    return (
        <>
            <Hero />
            <Stats />
            <LatestTuitions />
            {/* <FeaturedTutors />
            <HowItWorks />
            <Testimonials />
            <CTASection /> */}
        </>
    );
};

export default Home;
