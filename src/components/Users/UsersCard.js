import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,

} from "@chakra-ui/react"

import SingleUser from "./SingleUserCard"

export default function UsersCard({ users }) {


    return (
        <Table colorScheme="blackAlpha" boxShadow="lg">
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



