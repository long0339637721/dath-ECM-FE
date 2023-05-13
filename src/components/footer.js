import React from "react";
import './footer.css'

const Footer = () => {
  // return (
  //   <div>
  //     <div className="flex justify-between items-center bg-black  bottom-0">
  //       <div className="float-right" style={{textAlign: 'center'}}>
  //         <div className="text-white font-bold text-2xl mx-11">Contact Us</div>
  //         <div className ='social-apps flex flex-1 justify-between mx-11'>
  //           <div>
  //             <a href='https://www.facebook.com/' target="_blank">
  //               <img src='fb.png' alt='facebook' className='pic-social-apps rounded-sm cursor-pointer'/>
  //             </a>
  //             <a href='https://www.linkedin.com/' target="_blank">
  //               <img src='linkedin.png' alt='linkedin' className='pic-social-apps cursor-pointer'/>
  //             </a>
  //             <a href='https://www.instagram.com/' target="_blank">
  //               <img src='ins.png' alt='instagram' className='pic-social-apps rounded-sm cursor-pointer'/>
  //             </a>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
      <footer className="footer_area section_padding_130_0">
        <div className="container" style={{textAlign: 'left'}}>
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-4">
              <div className="single-footer-widget section_padding_0_130">
                <div className="footer-logo mb-3" />
                <p>This web is an application to support attendance for the A+ English language center, developed by a group of BK students to serve the subject CO3105.</p>
                <div className="footer_social_area">
                  <a href='https://www.facebook.com/' target="_blank" data-toggle="tooltip" data-placement="top" title="true" data-original-title="Facebook">
                    <i className="fa fa-facebook" />
                  </a>
                  <a href="https://www.pinterest.com/" data-toggle="tooltip" data-placement="top" title="true" data-original-title="Pinterest">
                    <i className="fa fa-pinterest" />
                  </a>
                  <a href="https://www.skype.com/" target="_blank" data-toggle="tooltip" data-placement="top" title="true" data-original-title="Skype">
                    <i className="fa fa-skype" />
                  </a>
                  <a href="https://twitter.com/" target="_blank" data-toggle="tooltip" data-placement="top" title="true" data-original-title="Twitter">
                    <i className="fa fa-twitter" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <div className="single-footer-widget section_padding_0_130">
                <h5 className="widget-title">About</h5>
                <div className="footer_menu">
                  <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Corporate Sale</a></li>
                    <li><a href="#">Terms &amp; Policy</a></li>
                    <li><a href="#">Community</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <div className="single-footer-widget section_padding_0_130">
                <h5 className="widget-title">Support</h5>
                <div className="footer_menu">
                  <ul>
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Support</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Term &amp; Conditions</a></li>
                    <li><a href="#">Help &amp; Support</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg">
              <div className="single-footer-widget section_padding_0_130">
                <h5 className="widget-title">Contact</h5>
                <div className="footer_menu">
                  <ul>
                    <li><a href="#">Call Centre</a></li>
                    <li><a href="#">Email Us</a></li>
                    <li><a href="#">Term &amp; Conditions</a></li>
                    <li><a href="#">Help Center</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
};

export default Footer;