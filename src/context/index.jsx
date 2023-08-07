import ThemeContextProvider from './ThemeContext'
import UserContextProvider from './UserContext'

export default function CombinedContextProvider(props){
    return(
        <ThemeContextProvider>
            <UserContextProvider>
                {props.children}
            </UserContextProvider>
        </ThemeContextProvider>
    )
}