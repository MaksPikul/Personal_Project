

interface HeaderProps {
    title: string | null | undefined;
}

export const Header = ({
    title
}:HeaderProps) => {
    

    

    return (
        <header  className="items-center rounded-t-md justify-between p-0 bg-header text-2xl flex flex-row ">
            <div className=" p-4 flex justify-center w-1/5 rounded-tl-md border-r">
                {title} 
            </div>
            <div id="Socials?" className="bg-green-500 p-1 mr-10">
                Social sidenav? {/* toggle social side nav or component child, similar to sidenav? worry about this later */}
            </div>
            
        </header>
    )

}