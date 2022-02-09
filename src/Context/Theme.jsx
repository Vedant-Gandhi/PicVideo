import { createContext,useContext,useState } from "react";

const ThemeStore=createContext()
const themeColors={
    LIGHT:0,
    DARK:1
}
const ThemeStoreProvider=({children })=>{
    const [themeColor,setThemeColor]=useState(themeColors.LIGHT);
    const toggleTheme=()=>{
        (themeColor  === themeColors.DARK) ? setThemeColor(themeColors.LIGHT) : setThemeColor(themeColors.DARK)
    }
  return ( <ThemeStore.Provider value={{state:themeColor,toggleTheme:toggleTheme}} >
        {children}
    </ThemeStore.Provider>)
}
const ThemeStoreContext=()=>useContext(ThemeStore)
export  {themeColors,ThemeStoreProvider,ThemeStoreContext}