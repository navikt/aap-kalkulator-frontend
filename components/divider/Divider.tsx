import React from "react"

const Divider = ({ isTitle }: { isTitle?: boolean }) => {
    return isTitle ? (
        <div className={`border-t-2 border-solid border-border w-16 h-0`} />
    ) : (
        <div
            className={`border-t-2 border-solid border-border w-3/5 md:w-4/5 h-0`}
        />
    )
}
export default Divider
