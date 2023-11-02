import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-regular-svg-icons"

export default function FileElement({ name, onClick }) {
    // const fileExtension = name.split(".").pop()

    // let { icon } = FileIcons[fileExtension]
    //     ? FileIcons[fileExtension]
    //     : FileIcons.default
    return (
        <div
            onClick={onClick}
            className={`flex flex-row my-1
            items-center select-none
            text-[var(--light-fg-1)] dark:text-[var(--dark-fg-1)]
            hover:opacity-50 cursor-pointer`}
        >
            {/* {icon} */}
            <FontAwesomeIcon
                icon={faFile}
                className="h-5 w-5 text-[var(--light-fg-2)] dark:text-[var(--dark-fg-2)]"
            />
            <span className="ml-0.5">{name}</span>
        </div>
    )
}
