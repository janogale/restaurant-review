import { Flex, useColorMode } from "@chakra-ui/react";

const Container = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.100", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Flex
      direction="column"
      minH="100vh"
      alignItems="center"
      justifyContent="flex-start"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};

export default Container;
