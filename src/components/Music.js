import React from 'react';
import {
  Box,
  Text,
  VStack,
  Image,
  Grid,
  Heading,
  Flex,
  Divider,
  useColorModeValue,
  useOutsideClick,
  GridItem,
  Button,
  useBreakpointValue,
  Slider,
  Link,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

import * as Tone from 'tone';

import { cabal, dresser, helm, statuesque } from '../assets/music';

import { statuesquePic, maskPic, blackPic } from '../assets/images';
import { songsText } from '../constants';

import { FaPlayCircle, FaStopCircle } from 'react-icons/fa';

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

export default function MusicSection() {
  return (
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
  );
}
