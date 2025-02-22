import ButtonLayout from "../Button/buttonlayout";
import FloatingBar from "../floatingbar";


const Intro = () => {
  return (
    <>
      <div className="container m-5 position-relative " style={{height:'500px'}}>
      <div className="row mt-5">
        {/* text */}
        <aside className="col-md-5  col-12">
            {/* 1*/}
          <div className="fs-1 fw-bolder ">
            Perfect<br/>
            Harmony:<br/>
            Comfort & Style
          </div>
          {/* 2*/}
          <div className="text-secondary mt-3">
            Explore furniture that harmonously combine comfort <br/>
            and style to elevate your home
          </div>
            {/* 3*/}
          <div>
            
            <ButtonLayout placeholder="Explore Our Offers"/>


          </div>
        </aside>


        {/* image */}
        <aside className="col-md-6 d-none d-lg-block">
          <img src="/Rectangle 1.png"/>

        </aside>
      </div>

      {/* floatingbar */}
      <div className="d-none d-lg-block">
      <FloatingBar/>
      </div>
      </div>
    </>
  );
};

export default Intro;
