import LandingLayout from 'layouts/landing/index';

import Features from './sections/Features';
import Intro from './sections/Intro';

const LandingPage = () => {
  return (
    <LandingLayout>
      <Intro />
      <Features />
    </LandingLayout>
  );
};

export default LandingPage;
