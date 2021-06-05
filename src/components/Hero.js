import { Flex, Heading } from "@chakra-ui/react";

export const Hero = ({ title }) => (
  <Flex justifyContent="center" alignItems="center" height="100vh">
    <Heading
      fontSize="3vw"
      bgGradient="linear(to-l, #7928CA, #FF0080)"
      bgClip="text"
    >
      {title}
    </Heading>
  </Flex>
);

Hero.defaultProps = {
  title: "Restaurant Review App",
};
