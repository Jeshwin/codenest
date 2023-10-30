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
            text-slate-900 dark:text-slate-50 
            hover:opacity-50 cursor-pointer`}
        >
            {/* {icon} */}
            <FontAwesomeIcon
                icon={faFile}
                className="h-5 w-5 text-slate-600 dark:text-slate-300"
            />
            <span className="ml-0.5">{name}</span>
        </div>
    )
}
