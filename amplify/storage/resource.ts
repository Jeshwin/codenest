import {defineStorage} from "@aws-amplify/backend";

export const storage = defineStorage({
    name: "amplifyTeamDrive",
    access: (allow) => ({
        "profile-pictures/{entity_id}/*": [
            allow.guest.to(["read"]),
            allow.entity("identity").to(["read", "write", "delete"]),
        ],
        "template-icons/*": [
            allow.guest.to(["read"]),
            allow.authenticated.to(["read", "write"]),
        ],
    }),
});
