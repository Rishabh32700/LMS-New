import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Navbar from "../../components/Navbar";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { homepageCourseChips } from '../../utils/constants';
import { styled as muiStyled } from '@mui/material/styles';
import video from "../../assets/introVideo.mp4"
import introVideoThumbnail from "../../assets/introVideoThumbnail.png"

// Styled Components
const Wrapper = styled.div``;

const DotBackgroundDiv = styled.div`
  background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 60'><text x='0' y='60' fill='%23E6E8EE' font-size='60px'>.</text></svg>") 0 0 / 35px 35px repeat rgb(241, 244, 249);
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 800px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
`;

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1266px;
  margin-top: 3rem;
`;

const Tagline = styled(motion.p)`
  border: 1px solid rgb(226, 226, 229);
  display: inline;
  padding: 8px 12px;
  color: rgb(26, 28, 30);
  font-size: 0.7rem;
  border-radius: 50px;
  background: rgb(241, 244, 249);
  font-weight: 600;
  margin: auto;
`;

const Highlight = styled.span`
  color: rgb(0, 99, 151);
  padding: 4px 12px;
  background: rgb(204, 229, 255);
  border-radius: 50px;
`;

const Heading = styled(motion.h1)`
  font-size: 57px;
  line-height: 1.123;
  letter-spacing: -0.55px;
  font-weight: 500;
  width: 700px;
  text-align: center;
  margin-top: 1rem;
`;

const UnderlineWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const StyledSVG = styled.svg`
  width: 122px;
`;

const Subheading = styled(motion.p)`
  font-size: 22px;
  color: rgb(66, 71, 78);
  width: 600px;
  text-align: center;
  margin: auto;
  font-weight: 300;
`;

const LoginButton = styled(motion.button)`
  padding: 14px 28px;
  background: #006397;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  margin-top: 3rem;
  font-size: 14px;
`;

const ChipWrapper = styled.div`
  display: flex;
  width: 65%;
  justify-content: space-between;
  margin-top: 1rem;
`;

const CustomChip = muiStyled(Chip)({
  height: 28, // Reduce height (default is around 32px)
  paddingLeft: '12px',
  paddingRight: '12px',
  fontSize: '0.75rem', // Optional: to make it look more compact
  borderRadius: '16px', // Optional: slightly more rounded if you prefer
  '& .MuiChip-label': {
    paddingLeft: '8px',
    paddingRight: '8px',
  },
  '& .MuiChip-icon': {
    paddingRight: '4px',
  },
  background: "rgb(241, 244, 249)"
});

const LoaderWrapper = styled.div`
  margin-top: 2rem;
`;

const Loader = styled.div`
  margin: 2rem;
  font-size: 1.2rem;
  color: #006397;
`;

const VideoSection = styled(motion.div)`
  width: 80%;
  height: 580px;
  border: 5px solid rgb(230, 232, 238);
  background: rgb(241, 244, 249);
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top:-280px;
  margin: auto;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50px;
`;

const fadeInUp = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut"
    }
  }
};

function Home() {
  const { loading } = useSelector((state) => state.courses);
  const loaderRef = useRef(null);

  const [isVisible, setIsVisible] = useState({
    tagline: false,
    heading: false,
    subheading: false,
    loginButton: false,
    chips: false,
    videoSection: false,
  });

  const observeVisibility = (ref, elementKey) => {
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          console.log(elementKey, entry.intersectionRatio);
          
          if (entry.isIntersecting) {
            if (elementKey === "videoSection" && entry.intersectionRatio >= 0.8) {
              console.log(elementKey, "into if");

              if (videoRef.current) videoRef.current.play();
            }
            setIsVisible((prev) => ({ ...prev, [elementKey]: true }));
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) observer.observe(ref.current);

      return () => observer.disconnect();
    }, [ref, elementKey]);
  };

  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const loginButtonRef = useRef(null);
  const chipsRef = useRef(null);
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  // Reuse the observeVisibility function
  observeVisibility(taglineRef, "tagline");
  observeVisibility(headingRef, "heading");
  observeVisibility(subheadingRef, "subheading");
  observeVisibility(loginButtonRef, "loginButton");
  observeVisibility(chipsRef, "chips");
  observeVisibility(videoSectionRef, "videoSection");

  return (
    <Wrapper>
      <Navbar />
      <DotBackgroundDiv>
        <Container
          initial="hidden"
          animate="visible"
          transition={{
            staggerChildren: 0.05,
            delayChildren: 0.1
          }}
        >
          <Tagline
            ref={taglineRef}
            variants={fadeInUp}
            initial="hidden"
            animate={isVisible.tagline ? "visible" : "hidden"}
          >
            One Kit, Endless &nbsp;&nbsp;
            <Highlight> 🎉 Possibilities</Highlight>
          </Tagline>

          <Heading
            ref={headingRef}
            variants={fadeInUp}
            initial="hidden"
            animate={isVisible.heading ? "visible" : "hidden"}
          >
            Welcome to Our Learning Platform
          </Heading>

          <UnderlineWrapper>
            <StyledSVG viewBox="0 0 122 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M1.46484 6.83613L4.45387 3.7103C7.74598 0.267505 13.38 0.760513 16.0241 4.72277L16.5428 5.50001C19.2423 9.54539 25.1877 9.54539 27.8873 5.5V5.5C30.5869 1.45461 36.5322 1.45461 39.2318 5.5V5.5C41.9314 9.54539 47.8768 9.54539 50.5764 5.5V5.5C53.2759 1.45461 59.2213 1.45461 61.9209 5.5V5.5C64.6205 9.54539 70.5658 9.54539 73.2654 5.5V5.5C75.965 1.45461 81.9104 1.45461 84.61 5.5V5.5C87.3096 9.54539 93.2549 9.54539 95.9545 5.5V5.5C98.6541 1.45461 104.599 1.45461 107.299 5.5V5.5C109.999 9.54539 115.944 9.54539 118.644 5.5L120.534 2.66667" stroke="#006397" strokeLinecap="round" />
            </StyledSVG>
          </UnderlineWrapper>

          <Subheading
            ref={subheadingRef}
            variants={fadeInUp}
            initial="hidden"
            animate={isVisible.subheading ? "visible" : "hidden"}
          >
            Discover courses taught by expert instructors and take your skills to the next level
          </Subheading>

          <LoginButton
            ref={loginButtonRef}
            variants={fadeInUp}
            initial="hidden"
            animate={isVisible.loginButton ? "visible" : "hidden"}
          >
            Explore Blocks
          </LoginButton>

          <ChipWrapper ref={chipsRef}>
            {homepageCourseChips?.length &&
              homepageCourseChips.map((ele, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  initial="hidden"
                  animate={isVisible.chips ? "visible" : "hidden"}
                >
                  <Stack>
                    <CustomChip
                      icon={<img src={ele.logo} width={17} height={17} alt={ele.name} />}
                      label={ele.name}
                      variant="outlined"
                    />
                  </Stack>
                </motion.div>
              ))}
          </ChipWrapper>

        </Container>

        <LoaderWrapper ref={loaderRef}>
          {loading && <Loader>Loading...</Loader>}
        </LoaderWrapper>

      </DotBackgroundDiv>
      <VideoSection
        ref={videoSectionRef}
        initial="hidden"
        animate={isVisible.videoSection ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <Video
          ref={videoRef}
          autoPlay={false}

          loop
          muted
          preload="metadata"
          poster={introVideoThumbnail}
        >
          {/* <source src={video} type="video/mp4" /> */}
        </Video>
      </VideoSection>
    </Wrapper>
  );
}

export default Home;
