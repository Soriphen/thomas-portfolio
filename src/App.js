import React from 'react';
import {
  ChakraProvider,
  Container,
  extendTheme,
  useColorModeValue,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import Top from './components/Top';
import WorksSection from './components/Works';
import MusicSection from './components/Music';
import Contact from './components/Contact';

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
          bgColor: 'blue',
          height: '1px',
        }),
        solid: props => ({
          borderColor: mode(
            'rgba(83, 19, 30, 0.16)',
            'rgba(255, 255, 255, 0.16)'
          )(props),
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

function Site() {
  const [whatSection, setWhatSection] = React.useState('Top');
  const dividerCol = useColorModeValue('rgb(83, 19, 30)', 'rgb(255, 255, 255)');

  return (
    <Container position={'relative'} maxW="container.xl">
      {/* Top heading title name */}
      <Top whatSection={whatSection} setWhatSection={setWhatSection} />

      {/* Works section */}
      <WorksSection
        dividerCol={dividerCol}
        whatSection={whatSection}
        setWhatSection={setWhatSection}
      />

      {/* Music section */}
      <MusicSection
        dividerCol={dividerCol}
        whatSection={whatSection}
        setWhatSection={setWhatSection}
      />

      {/* Contact section */}
      <Contact
        dividerCol={dividerCol}
        whatSection={whatSection}
        setWhatSection={setWhatSection}
      />
    </Container>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Site />
    </ChakraProvider>
  );
}

export default App;
