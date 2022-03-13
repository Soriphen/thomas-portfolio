import React from 'react';
import {
  HStack,
  Link,
  Button,
  Drawer,
  useBreakpointValue,
} from '@chakra-ui/react';
import NavDrawer from './NavDrawer';
import { navData } from '../constants';
import { resume } from '../assets/images';

export default function Nav(props) {
  const setWhatSectionHandler = label => {
    if (label === 'Resume') {
      return;
    }
    props.setWhatSection(label);
  };

  return (
    <>
      <HStack
        // border="1px"
        display={
          props.whatSection === 'Top' || props.whatSection === 'Contact'
            ? { base: 'none', sm: 'flex' }
            : { base: 'none', md: 'flex', lg: 'flex' }
        }
        // display={isMobile ? 'flex' : 'none'}
        as="nav"
        spacing={2}
        // position="relative"
        // top={-10}
        mt={
          props.whatSection === 'Top' || props.whatSection === 'Contact' ? 5 : 0
        }
        marginX={'auto'}
        {...props}
      >
        {navData.map((item, index) => (
          <Link
            href={item.label === 'Resume' ? resume : undefined}
            download={item.label === 'Resume' ? true : false}
            key={item + '-' + index}
          >
            <Button
              variant="nav"
              onClick={() => setWhatSectionHandler(item.label)}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </HStack>
      <NavDrawer
        alignItems="center"
        display={
          props.whatSection === 'Top' || props.whatSection === 'Contact'
            ? { base: 'flex', sm: 'none' }
            : { base: 'flex', md: 'none', lg: 'none' }
        }
        setWhatSectionHandler={setWhatSectionHandler}
        {...props}
      />
    </>
  );
}
