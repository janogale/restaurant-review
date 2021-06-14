import {
     Td,
    Button,
    ButtonGroup
} from "@chakra-ui/react"

import DeleteUserModal from './DeleteUserModal'

export default function SingleUser({ user = {} }) {

    return (
        <>
            <Td>{user.email}</Td>
            <Td>{(new Date(user.creationTime).toDateString())}</Td>
            <Td>{(new Date(user.lastSignInTime).toDateString())}</Td>
            <Td><ButtonGroup size="xs" variant="outline" spacing="6" isAttached variant="outline">
                <Button colorScheme="green">make admin</Button>
                <DeleteUserModal uid={user.uid}/>
            </ButtonGroup></Td>
        </>
    )
}