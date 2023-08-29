import Header from "./Header";
import Main from "./Main";

export default function ProtectedPage(props) {
  return(
    <>
      <Header
        name = 'homePage'
        userEmail = {props.userEmail}
      />
      <Main
        name = 'homePage'
        {...props}
      />
    </>
  )
}
