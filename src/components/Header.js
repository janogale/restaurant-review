import React from "react";
import { useRouter } from "next/router";
import {
  Flex,
  Link,
  Icon,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { MdRateReview } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";

export default function Layout() {
  return (
    <HStack justify="space-between" bg="gray.200" width="100%" px={8} py={3}>
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
          Restaurant Review App
        </Link>
      </Flex>
      <Flex align="center">
        <AccountsModal />
      </Flex>
    </HStack>
  );
}

function AccountsModal() {
  const router = useRouter();
  return (
    <Menu>
      <MenuButton
        bg="transparent"
        _expanded={{ bg: "blue.50" }}
        _focus={{ border: "none", bg: "transparent" }}
        as={Button}
        rightIcon={<BiUserCircle />}
      >
        Accounts
      </MenuButton>
      <MenuList>
        <MenuItem>Profile</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => router.push("/login")}>Sign in</MenuItem>
        <MenuItem onClick={() => router.push("/login")}>Sign up</MenuItem>
        <MenuItem onClick={() => router.push("/login")}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
