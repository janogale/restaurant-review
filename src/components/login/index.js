import {
  Box,
  useColorMode,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import * as React from "react";
import { Card } from "./Card";
import { DividerWithText } from "./DividerWithText";
import { SignInForm } from "./SinginForm";
import { SignUpForm } from "./SignupForm";

const LoginComponent = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "gray.100", dark: "#061328" };
  const color = { light: "black", dark: "white" };

  return (
    <Box
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      py="2"
      px={{
        base: "3",
        lg: "6",
      }}
    >
      <Box maxW="md" mx="auto" textAlign="center">
        <Card>
          <Tabs align="center" variant="enclosed">
            <TabList>
              <Tab>Sign in</Tab>
              <Tab>Sign up</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <SignInForm />
              </TabPanel>
              <TabPanel>
                <SignUpForm />
              </TabPanel>
            </TabPanels>
          </Tabs>

          <DividerWithText mt="6">Restuarant Review App</DividerWithText>
        </Card>
      </Box>
    </Box>
  );
};

export default LoginComponent;
