import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/Sessionservice";
import Navbar from "./Navbar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import axios from "axios";
import { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import { getUser } from "../services/Sessionservice";
import CardGroup from "react-bootstrap/CardGroup";
import Swal from "sweetalert2";
import Footer from "./Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselMenu=()=>{
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 5,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      };
      return(
        <>
        <Container fluid>
        <Row>
          <Col>
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={true}
              responsive={responsive}
              // itemClass="carousel-item-padding-40-px"
            >
              <div style={{ maxHeight: "400px" }}>
                <img
                  src="https://www.edugentutor.com/images/image-l.png"
                  className="d-block w-100"
                  style={{ height: "400px" }}
                  alt="..."
                />
              </div>
              <div>
                <img
                  src="https://www.schooleducationgateway.eu/files/png6/manusapon_stock_adobe.png"
                  className="d-block w-100"
                  style={{ height: "400px" }}
                  alt="..."
                />
              </div>
              <div>
                <img
                  src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa4L4ZVuw4sWnWkW2Z8YQLgClaQmd79KBCE6rrA95WCqtEX9JzJsz.jpg"
                  className="d-block w-100"
                  style={{ height: "400px" }}
                  alt="..."
                />
              </div>
              <div>
                <img
                  src="https://s3-ap-southeast-1.amazonaws.com/afterklassprodjava11stack-bucket83908e77-ov7eq3s0mv9d/uploads/images/post/0fb5c941-2f9f-48c0-9e24-3c8afbbbe98c_6359702195904958051263478761_studying.jpg"
                  className="d-block w-100"
                  style={{ height: "400px" }}
                  alt="..."
                />
              </div>
              <div>
                <img
                  src="https://astro.meemodel.com/image_dream/s/648ae.jpg"
                  className="d-block w-100"
                  style={{ height: "400px" }}
                  alt="..."
                />
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
      </>
      )
}
export default CarouselMenu ;