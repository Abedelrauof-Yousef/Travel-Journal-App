import TravelsList from "../fetchingData/TravelsHomeCards";
import Testimonials from "../components/testimonials/Testimonials";

const Home = () => {
    return(
    <div>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Capture Your Journeys</h1>
          <p>Document your travels, share your stories, and inspire others. Keep track of your adventures and memories</p>
        </div>
      </div>
      <br/>
      <TravelsList/>
      <div className="journal" >
      </div>
      <div>
        <Testimonials/>
      </div>
    </div>
    )
}

export default Home;