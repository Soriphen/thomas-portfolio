import React from 'react';
import {
  Box,
  Text,
  Link,
  VStack,
  Image,
  Grid,
  Heading,
  Divider,
  useColorModeValue,
  useOutsideClick,
  GridItem,
  Button,
  useBreakpointValue,
  Wrap,
  WrapItem,
  Flex,
  Spacer,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

import {
  sequencerPic,
  exerciseTrkPic,
  spacestagramPic,
  aircallPic,
} from '../assets/images';
import { worksText } from '../constants';
import { siteLinks, codeLinks } from '../constants';

import { FaArrowRight } from 'react-icons/fa';
import Nav from './Nav';

function WorksBox({ worksText, pic, siteLink, codeLink, work }) {
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
    <MotionGridItem
      bgColor={
        work === 'sequencer'
          ? 'rbg(222, 221, 223)'
          : work === 'exercise'
          ? 'rgb(30, 28, 31)'
          : work === 'spacestagram'
          ? 'rgb(250, 237, 187)'
          : work === 'aircall'
          ? 'rgb(38, 49, 64)'
          : undefined
      }
      ref={ref}
      // w={400}
      position="relative"
      display="flex"
      overflow="hidden"
      justifyContent="center"
    >
      <Image
        // left="calc(-10px + 20%)"
        position="relative"
        h={300}
        src={pic}
        // border="1px"
        objectFit="cover"
        objectPosition={work !== 'sequencer' ? 'center' : 'left'}
        // backgroundPosition="center"
        // align="left"
        transform={work === 'aircall' ? 'scale(1.1)' : undefined}
        top={work === 'aircall' ? -2 : undefined}
      />

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
      <Grid
        // w={500}

        templateColumns={{
          base: 'repeat(1, minmax(100px, 100%))',
          md: 'repeat(2, minmax(100px, 100%))',
        }}
        gap={6}
      >
        <WorksBox
          worksText={worksText.sequencerTxt}
          pic={sequencerPic}
          siteLink={siteLinks.sequencerLink}
          codeLink={codeLinks.sequencerLink}
          work="sequencer"
        />
        <WorksBox
          worksText={worksText.exerciseTxt}
          pic={exerciseTrkPic}
          siteLink={siteLinks.exerciseLink}
          codeLink={codeLinks.exerciseLink}
          work="exercise"
        />
        <WorksBox
          worksText={worksText.spacestagramTxt}
          pic={spacestagramPic}
          siteLink={siteLinks.spacestagramLink}
          codeLink={codeLinks.spacestagramLink}
          work="spacestagram"
        />
        <WorksBox
          worksText={worksText.aircallTxt}
          pic={aircallPic}
          siteLink={siteLinks.aircallLink}
          codeLink={codeLinks.aircallLink}
          work="aircall"
        />
      </Grid>
    </>
  );
}

export default function WorksSection({ whatSection, setWhatSection }) {
  if (whatSection === 'Works') {
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
          <Heading>Developer</Heading>
          <Spacer />
          <Nav setWhatSection={setWhatSection} />
        </Flex>

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
    );
  } else {
    return null;
  }
}
