import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import './authentication.styles.scss';

const Authentication = () =>{
    return (
        <div className="authentication-container">
         <div className="in"><SignInForm /></div> 
          <div className="out"><SignUpForm /> </div>
        </div>
    )
}
export default Authentication;

    // useEffect(() => {
    //     async function fetchData() {
    //        const response = await getRedirectResult(auth);
    //        if(response){
    //            const userDocRef =  await createUserDocumentFromAuth(response.user);
    //        }
    //     }
    //     fetchData();
    //   }, [])