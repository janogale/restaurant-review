import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";

// context provider
import AppContentProvider from "../context";

import theme from "../theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: false,
        }}
      >
        <AppContentProvider>
          <Component {...pageProps} />
        </AppContentProvider>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
