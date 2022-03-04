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

export default function WorksSection() {
  return (
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
  );
}
