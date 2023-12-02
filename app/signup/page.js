import Link from "next/link"

export default function Page() {
    return (
        <body className="overflow-hidden h-screen bg-[var(--dark-bg-3)]">
            <Link
                href="/"
                className="w-full pl-6 py-3
                flex flex-row justify-start items-center
                bg-[var(--dark-bg-1)] text-[var(--dark-fg-1)]"
            >
                <svg
                    className={`w-10 h-10 fill-[var(--dark-fg-1)]`}
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M184.194 165.744L124.724 5.568H146.876L206.346 165.744H184.194ZM274.439 165.744L214.969 5.568H237.121L296.591 165.744H274.439ZM197.144 337.448C179.877 332.904 166.529 324.895 157.1 313.422C147.671 301.834 142.957 287.748 142.957 271.162V240.32C142.957 229.414 145.115 219.531 149.432 210.67C153.862 201.696 160.11 194.085 168.176 187.837C176.355 181.475 186.011 176.818 197.144 173.864V194.823C190.442 196.414 184.591 199.31 179.593 203.514C174.708 207.717 170.959 212.942 168.346 219.19C165.734 225.438 164.427 232.482 164.427 240.32V271.162C164.427 278.774 165.734 285.703 168.346 291.951C170.959 298.086 174.708 303.254 179.593 307.458C184.591 311.547 190.442 314.387 197.144 315.978V337.448ZM255.865 318.534C247.913 318.534 240.984 317.057 235.077 314.103C229.283 311.036 224.739 306.776 221.445 301.323C218.264 295.757 216.673 289.225 216.673 281.727V258.553C216.673 251.055 218.264 244.58 221.445 239.127C224.739 233.561 229.283 229.301 235.077 226.347C240.984 223.28 247.913 221.746 255.865 221.746C263.931 221.746 270.861 223.28 276.654 226.347C282.448 229.301 286.935 233.561 290.116 239.127C293.41 244.58 295.057 250.998 295.057 258.382V281.727C295.057 289.225 293.41 295.757 290.116 301.323C286.935 306.776 282.448 311.036 276.654 314.103C270.861 317.057 263.931 318.534 255.865 318.534ZM255.865 299.96C261.545 299.96 265.919 298.426 268.986 295.359C272.167 292.178 273.757 287.634 273.757 281.727V258.553C273.757 252.532 272.167 247.988 268.986 244.921C265.919 241.854 261.545 240.32 255.865 240.32C250.299 240.32 245.925 241.854 242.745 244.921C239.564 247.988 237.973 252.532 237.973 258.553V281.727C237.973 287.634 239.564 292.178 242.745 295.359C245.925 298.426 250.299 299.96 255.865 299.96ZM307.941 307.458V287.862L357.357 265.028C359.629 264.006 361.844 263.154 364.003 262.472C366.275 261.677 368.036 261.166 369.285 260.938C368.036 260.711 366.275 260.314 364.003 259.746C361.731 259.064 359.516 258.212 357.357 257.19L307.941 234.186V214.249L384.28 250.203V271.503L307.941 307.458ZM197.144 507.448C179.877 502.904 166.529 494.895 157.1 483.422C147.671 471.834 142.957 457.748 142.957 441.162V410.32C142.957 399.414 145.115 389.531 149.432 380.67C153.862 371.696 160.11 364.085 168.176 357.837C176.355 351.475 186.011 346.818 197.144 343.864V364.823C190.442 366.414 184.591 369.31 179.593 373.514C174.708 377.717 170.959 382.942 168.346 389.19C165.734 395.438 164.427 402.482 164.427 410.32V441.162C164.427 448.774 165.734 455.703 168.346 461.951C170.959 468.086 174.708 473.254 179.593 477.458C184.591 481.547 190.442 484.387 197.144 485.978V507.448ZM287.389 507.448C270.122 502.904 256.774 494.895 247.345 483.422C237.917 471.834 233.202 457.748 233.202 441.162V410.32C233.202 399.414 235.361 389.531 239.677 380.67C244.108 371.696 250.356 364.085 258.421 357.837C266.601 351.475 276.257 346.818 287.389 343.864V364.823C280.687 366.414 274.837 369.31 269.838 373.514C264.953 377.717 261.205 382.942 258.592 389.19C255.979 395.438 254.673 402.482 254.673 410.32V441.162C254.673 448.774 255.979 455.703 258.592 461.951C261.205 468.086 264.953 473.254 269.838 477.458C274.837 481.547 280.687 484.387 287.389 485.978V507.448ZM314.587 507.448V485.978C321.403 484.387 327.253 481.547 332.138 477.458C337.023 473.254 340.772 468.086 343.384 461.951C345.997 455.703 347.304 448.774 347.304 441.162V410.32C347.304 402.482 345.997 395.438 343.384 389.19C340.772 382.942 337.023 377.717 332.138 373.514C327.253 369.31 321.403 366.414 314.587 364.823V343.864C325.833 346.818 335.489 351.475 343.555 357.837C351.62 364.085 357.812 371.696 362.128 380.67C366.559 389.531 368.774 399.414 368.774 410.32V441.162C368.774 457.748 364.06 471.834 354.631 483.422C345.202 494.895 331.854 502.904 314.587 507.448Z" />
                </svg>
                <span className="pt-2 text-xl font-mono">CodeNest</span>
            </Link>
            <div className="h-[calc(100vh-64px)] w-screen mx-auto flex flex-row">
                <div className="w-[45%] bg-gradient-to-b from-[var(--dark-bg-2)] via-[var(--dark-bg-1)] to-[var(--dark-bg-2)]"></div>
                <div className="w-[55%] bg-[var(--dark-bg-3)] grid place-content-center">
                    <div
                        className="w-96 h-[67vh] flex flex-col content-center
                    p-3 rounded-xl bg-[var(--dark-bg-2)] text-[var(--dark-fg-1)]"
                    >
                        <span className="pt-5 text-center text-3xl font-sans">
                            Sign Up
                        </span>
                    </div>
                </div>
            </div>
        </body>
    )
}
