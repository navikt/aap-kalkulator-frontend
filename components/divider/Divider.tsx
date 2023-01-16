const Divider = ({ isTitle }: { isTitle?: boolean }) => {
    return isTitle ? (
        <div
            className={`border-t-2 border-solid border-border-strong w-16 h-0`}
            aria-hidden="true"
        />
    ) : (
        <div
            className={`border-t-2 border-solid border-border-strong w-3/5 md:w-4/5 h-0`}
            aria-hidden="true"
        />
    )
}
export default Divider
