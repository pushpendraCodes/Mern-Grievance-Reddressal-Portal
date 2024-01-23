import React from "react";
import "./frontpage.css";
import { HiUserGroup } from "react-icons/hi";
import { MdManageAccounts } from "react-icons/md";
import { TiContacts } from "react-icons/ti";
import { FaBookReader } from "react-icons/fa";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { Link } from "react-router-dom";

const Frontpage = () => {
  return (
    <>
      <section  id="hero" class="d-flex align-items-center lg:h-screen">
        <div class="container">
          <div class="row">

            <div
              class="col-lg-6 col-sm-12 order-lg-2 hero-img order-1"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <div class="row ">
                <div class="col-lg-4 col-md-4 col-sm-6 my-2">
                  <div class="serviceBox ">
                    <div class="service-icon">
                      <span>
                        {" "}
                        <FaBookReader />{" "}
                      </span>
                    </div>
                    <Link to="/auth/sign-in">
                      {" "}
                      <h3 class="title">Student</h3>
                    </Link>
                    {/* <p class="description">Lorem ipsum dolor sit amet conse </p> */}
                  </div>
                </div>

                {/* <div class="col-lg-4  col-md-4 col-sm-6 my-2">
                  <div class="serviceBox cyan">
                    <div class="service-icon">
                      <span>
                        {" "}
                        <MdOutlineFamilyRestroom />{" "}
                      </span>
                    </div>
                    <Link to="/auth/sign-in">
                      <h3 class="title">Parent</h3>
                    </Link>

                  </div>
                </div> */}
                <div class="col-lg-4 col-md-4 col-sm-6 my-2">
                  <div class="serviceBox cyan">
                    <div class="service-icon">
                      <span>
                        {" "}
                        <GrUserAdmin />{" "}
                      </span>
                    </div>
                    <Link to="/auth/sign-in">
                      <h3 class="title">Admin</h3>
                    </Link>
                    {/* <p class="description">Lorem ipsum dolor sit amet conse ctetur .</p> */}
                  </div>
                </div>

                {/* <div class="col-lg-4 col-md-4 col-sm-6 my-2">
                  <div class="serviceBox cyan">
                    <div class="service-icon">
                      <span>
                        {" "}
                        <MdManageAccounts />{" "}
                      </span>
                    </div>
                    <Link to="/auth/sign-in">
                      <h3 class="title">Grievence /Management</h3>
                    </Link>

                  </div>
                </div> */}
                <div class="col-lg-4 col-md-4 col-sm-6 my-2">
                  <div class="serviceBox cyan">
                    <div class="service-icon">
                      <span>
                        <TiContacts />
                      </span>
                    </div>
                    <Link to="/auth/sign-in">
                      {" "}
                      <h3 class="title">Contact us</h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="col-lg-6 col-sm-12 d-flex flex-column pt-lg-0   mt-"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h1>Student E-grievance Reddresal Portal</h1>
              <h2>We are here to help You</h2>
              <div class="d-flex justify-content-center justify-content-lg-start">
                <img
                  style={{ width: "50%" }}
                  src="../img/hero-img.png"
                  class=" animated"
                  alt=""
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default Frontpage;
