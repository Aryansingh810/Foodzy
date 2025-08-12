import { assets } from "../../assets/assets"
import "./AppDownload.css"

const AppDownload = () => {
  return (
    <div className="App-download" id="App-download">
        <p>For Better Experience Download <br /><h2 style={{color:"#49557e"}}>FOODZY</h2></p>
        <div className="App-download-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>

    </div>
  )
}

export default AppDownload