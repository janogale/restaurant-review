import {
    Td,
    Text,
    Box,
    Badge,
    Button,
    ButtonGroup
} from "@chakra-ui/react"

import DeleteUserModal from './DeleteUserModal'
import MakeAdminModal from "./MakeAdminModal"

export default function SingleUser({ user = {} }) {

    if(!user) return null;

    const { admin = false, owner } = user.customClaims;

    const roles = <Box >
        {admin && <Badge fontSize="0.6em" colorScheme="green">Admin</Badge>}
        {owner && <Badge fontSize="0.6em" colorScheme="blue">Owner</Badge>}
        {!admin && !owner && <Text fontSize="xs">Regular User</Text>}
    </Box>

    return (
        <>
            <Td>{user.email}</Td>
            <Td>{(new Date(user.creationTime).toDateString())}</Td>
            <Td>{roles}</Td>
            <Td>{(new Date(user.lastSignInTime).toDateString())}</Td>
            <Td><ButtonGroup size="xs" variant="outline" isAttached variant="outline">
                {admin ? (
                    <MakeAdminModal email={user.email} label="Remove Admin" />
                ) : (
                    <MakeAdminModal email={user.email} label="Make Admin" />
                )}
                <DeleteUserModal uid={user.uid} />
            </ButtonGroup></Td>
        </>
    )
}