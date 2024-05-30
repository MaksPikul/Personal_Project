
interface HeaderProps {
    title: string | null | undefined;
}

export const Header = ({
    title
}:HeaderProps) => {

    

    return (
        <header className="items-center rounded-t-md justify-between h-16 bg-blue-500 text-2xl flex flex-row border-solid border-b-2 border-black">
            <div className="bg-red-500 p-2 ml-10">
                {title} / Project Page (if on one)
            </div>
            <div id="Socials?" className="bg-green-500 p-2 mr-10">
                Social sidenav? {/* toggle social side nav or component child, similar to sidenav? worry about this later */}
            </div>
        </header>
    )

}