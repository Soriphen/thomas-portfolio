import React from 'react';
import {
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Link,
  IconButton,
  Box,
  VStack,
} from '@chakra-ui/react';

import { HamburgerIcon } from '@chakra-ui/icons';
import { navData } from '../constants';
import { resume } from '../assets/images';

export default function NavDrawer(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Box {...props}>
      <IconButton
        aria-label="Open Drawer"
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
        w={
          props.whatSection === 'Top' || props.whatSection === 'Contact'
            ? { base: 'full', md: null }
            : null
        }
        // colorScheme="teal"
      ></IconButton>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <VStack align="left">
              {navData.map((item, index) => (
                <Link
                  href={item.label === 'Resume' ? resume : undefined}
                  download={item.label === 'Resume' ? true : false}
                  key={item + '-' + index}
                >
                  <Button
                    variant="nav"
                    onClick={() => props.setWhatSectionHandler(item.label)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
