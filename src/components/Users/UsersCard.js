import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    ButtonGroup
} from "@chakra-ui/react"



export default function UsersCard({ users }) {


    return (
        <Table  colorScheme="blackAlpha" boxShadow="lg">
            <Thead>
                <Tr>
                    <Th>Email</Th>
                    <Th>Created</Th>
                    <Th>Last Login</Th>
                    <Th>Actions</Th>
                </Tr>
            </Thead>
            <Tbody>
                {users && users.map(user => (
                    <Tr key={user.uid}>
                        <SingleUser user={user} />
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}




function SingleUser({ user = {} }) {

    return (
        <>
            <Td>{user.email}</Td>
            <Td>{(new Date(user.creationTime).toDateString())}</Td>
            <Td>{(new Date(user.lastSignInTime).toDateString())}</Td>
            <Td><ButtonGroup size="xs" variant="outline" spacing="6" isAttached variant="outline">
                <Button colorScheme="green">make admin</Button>
                <Button colorScheme="red">Delete</Button>
            </ButtonGroup></Td>
        </>
    )
}