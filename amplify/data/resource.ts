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
    Projects: a
        .model({
            title: a.string().required(),
            description: a.string(),
            templateId: a.id(),
            template: a.belongsTo("Templates", "templateId"),
            author: a.string(), // Override with ownerDefinedIn
            icon: a.url(),
        })
        .authorization((allow) => [
            allow.authenticated().to(["read"]),
            allow.ownerDefinedIn("author"),
        ]),
    Templates: a
        .model({
            title: a.string().required(),
            description: a.string(),
            projects: a.hasMany("Projects", "templateId"),
            author: a.string(), // Override with ownerDefinedIn
            icon: a.url(),
            language: a.string(),
            usage: a.integer(),
            deleted: a.boolean(),
        })
        .authorization((allow) => [
            allow.authenticated().to(["read"]),
            // Allow signed-in user to create, read, and update their __OWN__ info.
            allow.ownerDefinedIn("author").to(["create", "read", "update"]),
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
