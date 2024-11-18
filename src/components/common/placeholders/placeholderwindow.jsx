export default function PlaceholderWindow({placeholderName}) {
    return (
        <div className="w-full h-full relative flex-grow grid place-content-center align-middle font-mono text-[var(--fg-1)]">
            {/* Resize Handles */}
            <div className="absolute top-0 w-[calc(100%-32px)] h-2 mx-4 hover:cursor-row-resize"></div>
            <div className="absolute bottom-0 w-[calc(100%-32px)] h-2 mx-4 hover:cursor-row-resize"></div>
            <div className="absolute left-0 h-[calc(100%-32px)] w-2 my-4 hover:cursor-col-resize"></div>
            <div className="absolute right-0 h-[calc(100%-32px)] w-2 my-4 hover:cursor-col-resize"></div>
            <span className="text-5xl text-center">{placeholderName}</span>
        </div>
    );
}
