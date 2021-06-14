/* eslint-disable import/no-unresolved */
import admin from "@/lib/firebase-admin";

// authentication middleware
import withAuth from "middlewares/withAuth";

// // authorization middleware
import isAuthorized from "middlewares/isAuthorized";


export const config = {
    api: {
        externalResolver: true,
    },
};

const UsersHandler = (req, res) => {

    // get http method
    const { method } = req;

    switch (method) {
        case "GET":
            getAllUsers(req, res);
            break;
        case "DELETE":
            deleteUser(req, res);
            break;
        // case "POST":
        //     makeAdmin(req, res);
        //     break;
        case "PUT":
            makeRemoveAdmin(req, res);
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
};

export default withAuth(isAuthorized(UsersHandler));




// get all Users
async function getAllUsers(req, res) {

    const { method } = req;

   const {isAdmin} = res?.locals

   if (!isAdmin) return res.status(401).send({ message: "Unauthorized, only admins can access" });

    if (method !== 'GET') return res.status(401).send({ message: "Method not allowed" });

    try {
        const listUsersResult = await admin.auth().listUsers(20)

        let users = listUsersResult.users.reduce((acc, userRecord) => {
            const { email, uid, customClaims, metadata } = userRecord.toJSON()

            // don't add super admin user
            if (email === 'admin@gmail.com') return acc;

            acc.push({ email, uid, customClaims, ...metadata })

            return acc;
        }, []);

        res.status(200).json(users);
    } catch (error) {
        res.status(400).json(error);
    }
};



// make user admin

async function makeRemoveAdmin(req, res) {
    const { email } = req.body;

    if (!email) return res.status(401).send({ message: "email is required" });

    try {
        const userRecord = await admin.auth().getUserByEmail(email)

        const { uid, customClaims } = userRecord.toJSON()


        if (customClaims?.admin) {
            // remove admin if already user is admin
            await admin
                .auth()
                .setCustomUserClaims(uid, { ...customClaims, admin: false });
        } else {
            // // make admin
            await admin
                .auth()
                .setCustomUserClaims(uid, { ...customClaims, admin: true });
        }

        // fetch the new user records.
        const newUserRecord = await admin.auth().getUserByEmail(email)

        res.status(200).json(newUserRecord.toJSON());
    } catch (error) {
        res.status(400).json(error);
    }
};


// remove admin privileges

async function removeAdmin(req, res) {
    const { email } = req.body;

    if (!email) return res.status(401).send({ message: "email is required" });

    try {
        const userRecord = await admin.auth().getUserByEmail(email)

        const { uid } = userRecord.toJSON()

        // // make admin
        await admin
            .auth()
            .setCustomUserClaims(uid, { admin: false, owner: true });



        res.status(200).json(userRecord.toJSON());
    } catch (error) {
        res.status(400).json(error);
    }
};


// delete user

async function deleteUser(req, res) {
    const { uid } = req.body;

    if (!uid) return res.status(401).send({ message: "user id is required" });

    try {
        await admin.auth().deleteUser(uid)



        res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
        res.status(400).json(error);
    }
}

