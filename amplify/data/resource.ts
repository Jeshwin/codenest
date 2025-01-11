import {a, defineData, type ClientSchema} from "@aws-amplify/backend";

const schema = a.schema({
    UserInfo: a
        .model({
            username: a.string().required(),
            firstName: a.string().required(),
            lastName: a.string(),
            bio: a.string(),
            profilePhoto: a.string(),
        })
        .authorization((allow) => [
            // Allow any signed in user to read anyone's user info.
            allow.authenticated().to(["read"]),
            // Allow signed-in user to create, read, update,
            // and delete their __OWN__ info.
            allow.owner(),
        ]),
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: "userPool",
    },
});
