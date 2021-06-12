import React from "react";
import { useRouter } from "next/router";
import {
  chakra,
  Flex,
  Link,
  Icon,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { MdRateReview } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";

import { AppState } from "../context";

export default function Layout() {
  return (
    <HStack
      justify="space-between"
      bg="gray.200"
      width="100%"
      px={8}
      py={3}
      pos="relative"
    >
      <Flex align="center">
        <Icon as={MdRateReview} w={8} h={8} color="green.600" />
        <Link
          href="/"
          ml={4}
          fontSize="lg"
          fontWeight="bold"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          Restaurant Review
        </Link>
      </Flex>

      <AccountsModal />
    </HStack>
  );
}

function AccountsModal() {
  const router = useRouter();
  const { state, dispatch } = AppState();
  return (
    <Menu>
      <MenuButton
        bg="transparent"
        _expanded={{ bg: "blue.50" }}
        _focus={{ border: "none", bg: "transparent" }}
        as={Button}
        rightIcon={<BiUserCircle />}
      >
        <chakra.span pr={["33px", "5px", null]}>
          {state?.isLoggedIn ? state?.email : "Accounts"}
        </chakra.span>
      </MenuButton>
      <MenuList>
        {state?.isLoggedIn ? (
          <MenuItem
            onClick={() => {
              dispatch({ type: "logout" });
              router.push("/");
            }}
          >
            Logout
          </MenuItem>
        ) : (
          <>
            <MenuItem onClick={() => router.push("/")}>Sign in</MenuItem>
            <MenuItem onClick={() => router.push("/")}>Sign up</MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
}
