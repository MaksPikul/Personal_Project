
interface HeaderProps {
    title: string | null | undefined;
}

export const Header = ({
    title
}:HeaderProps) => {

    

    return (
        <header className="items-center rounded-t-md justify-between p-3 bg-blue-500 text-2xl flex flex-row ">
            <div className="bg-red-500 p-0 ml-10">
                {title} / Project Page (if on one)
            </div>
            <div id="Socials?" className="bg-green-500 p-1 mr-10">
                Social sidenav? {/* toggle social side nav or component child, similar to sidenav? worry about this later */}
            </div>
            
        </header>
    )

}