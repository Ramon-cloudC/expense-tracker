
import Login from "./Login";
import styles from "./css-modules/HomePage.module.css"

const HomePage = () => {
    return (
        <>
           <div className={styles.mainDiv}> 
             <div className={styles.h1Div}>
              <div>
                <h1 className={styles.h1}>MoneyWatch</h1>     
              </div>  
              <div>
                <p className={styles.p}>Take control of your finances with our all-in-one application.</p>
              </div>
             </div> 
             <div className={styles.loginDiv}>
              <Login/>
             </div>
           </div>
        </>
    )
}

export default HomePage;