export default function LoadingSpinner({ width, height }) {
    return (
        <svg
            width={`${width}`}
            height={`${height}`}
            className="fill-[var(--primary-dark)] dark:fill-[var(--primary-light)]"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect
                className="loading-block block-offset-0"
                x="1"
                y="1"
                rx="1"
                width="10"
                height="10"
            />
            <rect
                className="loading-block block-offset-1"
                x="1"
                y="1"
                rx="1"
                width="10"
                height="10"
            />
            <rect
                className="loading-block block-offset-2"
                x="1"
                y="1"
                rx="1"
                width="10"
                height="10"
            />
        </svg>
    )
}
