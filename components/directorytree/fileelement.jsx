import FileIcons from "./icons/file/fileicons"

export default function FileElement({ name, onClick }) {
    const fileExtension = name.split(".").pop()

    let { icon } = FileIcons[fileExtension]
        ? FileIcons[fileExtension]
        : FileIcons.default
    return (
        <div
            onClick={onClick}
            className={`flex flex-row gap-1 my-1
            items-center select-none
            text-black dark:text-white 
            hover:opacity-50 cursor-pointer`}
        >
            {icon}
            <span className="">{name}</span>
        </div>
    )
}
