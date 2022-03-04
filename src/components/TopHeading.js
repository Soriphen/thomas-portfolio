import React from 'react';
import {
  Text,
  Heading,
  Flex,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';

import { motion } from 'framer-motion';

import { ColorModeSwitcher } from '../ColorModeSwitcher';

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
export default function TopHeading() {
  const nameChange = useColorModeValue(line2, line3);
  const MotionText = motion(Text);
  const MotionHeading = motion(Heading);

  return (
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
  );
}
