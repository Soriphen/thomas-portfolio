import React from 'react';
import { ChakraProvider, Container, extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

import TopHeading from './components/TopHeading';
import WorksSection from './components/Works';
import MusicSection from './components/Music';

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

function Site() {
  return (
    <Container position={'relative'} maxW="container.xl">
      {/* Top heading title name */}
      <TopHeading />

      {/* Works section */}
      <WorksSection />

      {/* Music section */}
      <MusicSection />
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
