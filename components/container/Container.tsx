import {ReactNode} from "react";

const Container = ({children}:{children:ReactNode}) => {
    return (
    <div className="md:w-2/3 mx-auto">
        <section className="bg-component-background-light mt-8 pb-4 px-6">
            {children}
        </section>
    </div>
    )
}

export default Container