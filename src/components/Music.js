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
  Spacer,
  Center,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

import * as Tone from 'tone';

import { cabal, dresser, helm, statuesque } from '../assets/music';

import { statuesquePic, maskPic, blackPic } from '../assets/images';
import { songsText } from '../constants';

import { FaPlayCircle, FaStopCircle } from 'react-icons/fa';
import Nav from './Nav';

function MusicBox({ songsText, pic, song, dividerCol }) {
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
    <GridItem
      ref={ref}
      justifyContent="space-between"
      position="relative"
      overflow="hidden"
      display="flex"
      bgColor="black"
      borderTopLeftRadius={5}
      borderBottomLeftRadius={5}
    >
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
      <Center position="relative" w="full">
        <Box position="relative">
          <Image
            position="relative"
            h={300}
            src={pic}
            objectFit="cover"
            objectPosition="center"
            align="left"
          />
        </Box>
        <MotionBox
          position="absolute"
          top="0"
          bottom="0"
          right="0"
          left="0"
          h="full"
          bgColor={customBgCol}
          opacity={isPlaying ? 1 : 0}
          whileHover={{
            opacity: 1,
          }}
          onTap={
            !isPlaying ? (isMobile ? toggleOpacityState : undefined) : undefined
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
      </Center>
    </GridItem>
  );
}

function Producer({ dividerCol }) {
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Heading size="md">
        <Text letterSpacing={10} mt={10}>
          Past Work
        </Text>
      </Heading>
      <Divider borderColor={dividerCol} />
      <Grid
        templateColumns={{
          base: 'repeat(1, minmax(100px, 100%))',
          md: 'repeat(2, minmax(100px, 100%))',
        }}
        w="full"
        gap={6}
      >
        <MusicBox
          songsText={songsText.statuesqueTxt}
          pic={statuesquePic}
          song={statuesque}
          dividerCol={dividerCol}
        />
        <MusicBox
          dividerCol={dividerCol}
          songsText={songsText.cabalTxt}
          pic={maskPic}
          song={cabal}
        />
        <MusicBox
          dividerCol={dividerCol}
          songsText={songsText.helmTxt}
          pic={blackPic}
          song={helm}
        />
        <MusicBox
          songsText={songsText.dresserTxt}
          pic={blackPic}
          song={dresser}
          dividerCol={dividerCol}
        />
      </Grid>
    </>
  );
}

export default function MusicSection({
  dividerCol,
  whatSection,
  setWhatSection,
}) {
  if (whatSection === 'Music') {
    return (
      <VStack
        w="full"
        border={{ base: 0, md: 0, lg: '4px' }}
        p={{ base: 0, md: 0, lg: 10 }}
        mt={{ base: 5, lg: 0 }}
        mb={{ base: 5, lg: 0 }}
        alignItems="flex-start"
      >
        <Flex w="full">
          <Heading>Producer</Heading>
          <Spacer />
          <Nav setWhatSection={setWhatSection} />
        </Flex>

        <Heading size="md">
          <Text letterSpacing={10}>Of the Music Variety</Text>
        </Heading>
        <Divider borderColor={dividerCol} />
        <Producer dividerCol={dividerCol} />
        <Divider borderColor={dividerCol} />

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
  } else {
    return null;
  }
}
