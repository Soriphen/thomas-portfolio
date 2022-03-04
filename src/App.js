import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Image,
  Grid,
  Heading,
  Container,
  Flex,
  Divider,
  useColorModeValue,
  useOutsideClick,
  extendTheme,
  GridItem,
  Button,
  useBreakpointValue,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Wrap,
  WrapItem,
  Spacer,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import { motion } from 'framer-motion';

import * as Tone from 'tone';

import { cabal, dresser, helm, statuesque } from './assets/music';

import { ColorModeSwitcher } from './ColorModeSwitcher';

import {
  sequencerPic,
  exerciseTrkPic,
  spacestagramPic,
  aircallPic,
  statuesquePic,
  maskPic,
  blackPic,
} from './assets/images';
import { songsText, worksText } from './constants';
import { siteLinks, codeLinks } from './constants';

import { FaArrowRight, FaPlayCircle, FaStopCircle } from 'react-icons/fa';

const theme = extendTheme({
  styles: {
    global: props => ({
      body: {
        bg: mode('#ede8e9', '#5a464c')(props),
        color: mode('#53131e', 'gray.50')(props),
      },
    }),
  },
  components: {
    Divider: {
      sizes: {
        lg: {
          borderBottomWidth: '3px',
        },
        md: {
          borderBottomWidth: '2px',
        },
      },
      variants: {
        primary: props => ({
          // borderColor: mode('black', 'pink')(props),
          // position: 'absolute',
          bgColor: 'blue',
          height: '1px',
          // borderBottomWidth: '1px',
          // border: 0,
          // opacity: 0.6,
        }),
      },
    },
    Button: {
      variants: {
        solid: props => ({
          borderRadius: '0',
          border: '1px',
          // borderColor: mode('blue', 'purple')(props),
          // outline: 'blue',
        }),
        outline: {
          borderRadius: '0',
        },
      },
    },
  },
});

// const marqueeVariants = {
//   animate: {
//     x: [500, -1035],
//     transition: {
//       x: {
//         repeat: Infinity,
//         repeatType: 'loop',
//         duration: 5,
//         ease: 'linear',
//       },
//     },
//   },
// };

const line1 = 'I am';
const line2 = ' Thomas';
const line3 = ' Soriphen';

const sentence = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

function WorksBox({ worksText, pic, siteLink, codeLink }) {
  const MotionBox = motion(Box);
  const MotionGridItem = motion(GridItem);
  const customBgCol = useColorModeValue('#BFDCBC', '#CA8953');

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [opacityState, setOpacityState] = React.useState(0);
  const toggleOpacityState = () => {
    setOpacityState(opacityState === 0 ? 1 : 0);
  };

  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setOpacityState(0),
  });

  return (
    <MotionGridItem ref={ref} position="relative" overflow="hidden" w="full">
      <Image w="full" h={300} src={pic} objectFit="cover" align="left" />

      <MotionBox
        position="absolute"
        top="0"
        bottom="0"
        right="0"
        left="0"
        h="full"
        w="full"
        bgColor={customBgCol}
        opacity={0}
        whileHover={{
          opacity: 1,
        }}
        onTap={isMobile ? toggleOpacityState : undefined} // This might cause issues for mobile screens with width resolutions higher than 1400px or so
        animate={{ opacity: opacityState }}
      >
        <VStack
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <Text textAlign="center">{worksText}</Text>
          {/* Perhaps turn this into a component down the road */}
          <Divider size="md" />
          <Wrap justify="center" spacing="10px">
            <WrapItem>
              <Link
                _hover={{ textTransform: 'none' }}
                href={siteLink}
                position="relative"
                top={1}
                isExternal
              >
                <Button rightIcon={<FaArrowRight />} variant="outline">
                  View Live
                </Button>
              </Link>
            </WrapItem>
            <WrapItem>
              <Link
                _hover={{ textTransform: 'none' }}
                href={codeLink}
                position="relative"
                top={1}
                isExternal
              >
                <Button rightIcon={<FaArrowRight />} variant="outline">
                  View Code
                </Button>
              </Link>
            </WrapItem>
          </Wrap>
        </VStack>
      </MotionBox>
    </MotionGridItem>
  );
}

function Works() {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Heading size="md">
        <Text letterSpacing={10} mt={10}>
          Recent Work
        </Text>
      </Heading>
      <Divider />
      <Grid templateColumns={!isMobile ? 'repeat(2, 1fr)' : undefined} gap={6}>
        <WorksBox
          worksText={worksText.sequencerTxt}
          pic={sequencerPic}
          siteLink={siteLinks.sequencerLink}
          codeLink={codeLinks.sequencerLink}
        />
        <WorksBox
          worksText={worksText.exerciseTxt}
          pic={exerciseTrkPic}
          siteLink={siteLinks.exerciseLink}
          codeLink={codeLinks.exerciseLink}
        />
        <WorksBox
          worksText={worksText.spacestagramTxt}
          pic={spacestagramPic}
          siteLink={siteLinks.spacestagramLink}
          codeLink={codeLinks.spacestagramLink}
        />
        <WorksBox
          worksText={worksText.aircallTxt}
          pic={aircallPic}
          siteLink={siteLinks.aircallLink}
          codeLink={codeLinks.aircallLink}
        />
      </Grid>
    </>
  );
}

function MusicBox({ songsText, pic, siteLink, codeLink, song }) {
  const vol = React.useRef();
  if (!vol.current) {
    vol.current = new Tone.Volume(-5).toDestination();
  }
  const player = React.useRef();
  if (!player.current) {
    player.current = new Tone.Player(song).connect(vol.current);
    player.current.volume.value = -10;
    // console.log('exists');
  }

  const [volState, setVolState] = React.useState(player.current.volume.value);

  const timer = React.useRef();
  const secondsRef = React.useRef();
  if (!secondsRef.current) {
    secondsRef.current = 0;
  }

  const [isPlaying, setIsPlaying] = React.useState(false);

  const MotionBox = motion(Box);
  const customBgCol = useColorModeValue('#BFDCBC', '#CA8953');

  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [opacityState, setOpacityState] = React.useState(0);
  const toggleOpacityState = () => {
    setOpacityState(opacityState === 0 ? 1 : 0);
  };

  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setOpacityState(0),
  });

  const playMusic = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      await player.current.stop();
      clearInterval(timer.current);
      secondsRef.current = 0;
      return;
    }

    timer.current = setInterval(() => {
      secondsRef.current += 0.1;
      if (secondsRef.current >= player.current.buffer.duration) {
        setIsPlaying(false);
        player.current.stop();
        secondsRef.current = 0;
        clearInterval(timer.current);
      }
      // console.log(secondsRef.current);
    }, 100);

    setIsPlaying(true);
    await player.current.start();
  };

  const handleVolChange = value => {
    player.current.volume.value = value;
    setVolState(value);
  };

  // console.log(player.current);

  return (
    <GridItem ref={ref} position="relative" overflow="hidden" w="full">
      <Flex>
        <Slider
          orientation="vertical"
          aria-label="slider-volume"
          min={-45}
          max={0}
          defaultValue={player.current.volume.value}
          onChange={handleVolChange}
          value={volState}
          bgGradient={`linear(to-r, ${customBgCol}, black)`}
          borderTopLeftRadius={5}
          borderBottomLeftRadius={5}
          w={14}
          h={300}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Box w="full" position="relative">
          <Image w="full" h={300} src={pic} objectFit="cover" align="left" />

          <MotionBox
            position="absolute"
            top="0"
            bottom="0"
            right="0"
            left="0"
            h="full"
            w="full"
            bgColor={customBgCol}
            opacity={isPlaying ? 1 : 0}
            whileHover={{
              opacity: 1,
            }}
            onTap={
              !isPlaying
                ? isMobile
                  ? toggleOpacityState
                  : undefined
                : undefined
            }
            animate={!isPlaying ? { opacity: opacityState } : undefined}
          >
            <VStack
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <Text textAlign="center">{songsText}</Text>
              {/* Perhaps turn this into a component down the road */}
              <Divider size="md" />
              <Button
                top={1}
                rightIcon={isPlaying ? <FaStopCircle /> : <FaPlayCircle />}
                variant="outline"
                onClick={() => playMusic()}
              >
                {isPlaying ? 'Stop' : 'Play'}
              </Button>
            </VStack>
          </MotionBox>
        </Box>
      </Flex>
    </GridItem>
  );
}

function Producer() {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Heading size="md">
        <Text letterSpacing={10} mt={10}>
          Past Work
        </Text>
      </Heading>
      <Divider />
      <Grid
        templateColumns={!isMobile ? 'repeat(2, 1fr)' : undefined}
        w="100%"
        gap={6}
      >
        <MusicBox
          songsText={songsText.statuesqueTxt}
          pic={statuesquePic}
          song={statuesque}
        />
        <MusicBox songsText={songsText.cabalTxt} pic={maskPic} song={cabal} />
        <MusicBox songsText={songsText.helmTxt} pic={blackPic} song={helm} />
        <MusicBox
          songsText={songsText.dresserTxt}
          pic={blackPic}
          song={dresser}
        />
      </Grid>
    </>
  );
}

function TopHeading() {
  const nameChange = useColorModeValue(line2, line3);
  const MotionText = motion(Text);
  const MotionHeading = motion(Heading);

  return (
    <Container position={'relative'} maxW="container.xl">
      <Flex mt={10} mb={5} position="relative">
        <ColorModeSwitcher />
        <MotionHeading
          as="h1"
          fontSize={60}
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {line1.split('').map((char, index) => {
            return (
              <MotionText as="span" key={char + '-' + index} variants={letter}>
                {char}
              </MotionText>
            );
          })}
          <Divider variant="solid" />
          {nameChange.split('').map((char, index) => {
            return (
              <MotionText as="span" key={char + '-' + index} variants={letter}>
                {char}
              </MotionText>
            );
          })}
        </MotionHeading>
      </Flex>
      <VStack w="full" border="4px" p={10} alignItems="flex-start">
        <Heading>Developer</Heading>
        <Heading size="md">
          <Text letterSpacing={10}>MERN Stack</Text>
        </Heading>
        <Divider />
        <Works />
        <Divider />
        <Box display="flex" justifyContent="center" w="full">
          <Link
            _hover={{ textTransform: 'none' }}
            href={'https://github.com/Soriphen'}
            isExternal
          >
            <Button h={20} mt={5} size="lg">
              See more on Github
            </Button>
          </Link>
        </Box>
      </VStack>
      <VStack
        mt={20}
        mb={10}
        w="full"
        border="4px"
        p={10}
        alignItems="flex-start"
      >
        <Heading>Producer</Heading>
        <Heading size="md">
          <Text letterSpacing={10}>Of the Music Variety</Text>
        </Heading>
        <Divider />
        <Producer />
        <Divider />

        <Box display="flex" justifyContent="center" w="full">
          <Link
            _hover={{ textTransform: 'none' }}
            href={'https://soundcloud.com/soriphen'}
            isExternal
          >
            <Button h={20} mt={5} size="lg">
              Listen to more on Soundcloud
            </Button>
          </Link>
        </Box>
      </VStack>
    </Container>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TopHeading />
    </ChakraProvider>
  );
}

export default App;
