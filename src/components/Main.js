import { Stack } from "@chakra-ui/react";

export default function Main(props) {
  return (
    <Stack
      spacing="1.5rem"
      width="100%"
      maxWidth="48rem"
      pt="4rem"
      px="1rem"
      {...props}
    />
  );
}
