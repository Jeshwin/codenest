import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile} from "@fortawesome/free-regular-svg-icons";

export default function FileElement({
    displayName,
    fullName,
    onClick,
    onDragStart,
}) {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("text/plain", fullName);
        if (onDragStart) {
            onDragStart();
        }
    };

    return (
        <div
            onClick={onClick}
            draggable={true}
            onDragStart={handleDragStart}
            className={`flex flex-row my-1 items-center select-none text-[var(--fg-1)] hover:opacity-50 cursor-pointer`}
        >
            {/* {icon} */}
            <FontAwesomeIcon
                icon={faFile}
                className="h-5 w-5 text-[var(--fg-2)]"
            />
            <span className="ml-0.5 overflow-hidden">{displayName}</span>
        </div>
    );
}
