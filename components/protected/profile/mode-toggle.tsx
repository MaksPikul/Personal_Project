import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export const ModeToggle = () => {
    const { theme, setTheme } = useTheme()

    const changeTheme = () => {
        if (theme === 'dark'){
            setTheme('light')
        }
        else {
            setTheme('dark')
        }
    }

    return(
        
        <button 
        className="hover:bg-slate-200 hover:text-indigo-800 p-2  rounded-md" 
        onClick={()=>{
            changeTheme()
            console.log(theme)}}>{theme === 'dark' ? <Moon className="size-5"/> : <Sun className="size-5"/>}    
        </button>
        
    )
}