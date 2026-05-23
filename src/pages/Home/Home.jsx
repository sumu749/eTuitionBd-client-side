import Hero from "../../components/Home/Hero";

import LatestTuitions from "../../components/Home/LatestTuitions";
import FeaturedTutors from "../../components/Home/FeaturedTutors";
import TrustedUniversities from "../../components/Home/TrustedUniversities";
// import HowItWorks from "../../components/Home/HowItWorks";
// import Testimonials from "../../components/Home/Testimonials";
// import CTASection from "../../components/Home/CTASection";

const Home = () => {
    return (
        <main className="relative overflow-hidden text-slate-100">
            <Hero />
            <TrustedUniversities />
            <LatestTuitions />
            <FeaturedTutors />
            {/* <HowItWorks />
            <Testimonials />
            <CTASection /> */}
        </main>
    );
};

export default Home;
