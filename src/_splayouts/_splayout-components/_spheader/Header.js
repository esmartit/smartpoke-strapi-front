import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Nav,
  NavItem,
  NavLink,
  Button,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Progress,
  Row,
  Col,
} from "reactstrap";
// import { LinkContainer } from 'react-router-bootstrap';
import { Link } from "react-router-dom";
import * as data from "../../../layouts/layout-components/header/Data";

/*--------------------------------------------------------------------------------*/
/* Import images which are need for the HEADER                                    */
/*--------------------------------------------------------------------------------*/
import logodarkicon from "../../../assets/images/logo-icon.png";
import logolighticon from "../../../assets/images/logo-light-icon.png";
import logodarktext from "../../../assets/images/logo-text.png";
import logolighttext from "../../../assets/images/logo-light-text.png";
import profilephoto from "../../../assets/images/users/esmartit.jpg";

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [collapse, setCollapse] = useState(false);

  const settings = useSelector((state) => state.settings);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const searchtoggle = () => {
    setCollapse(!collapse);
  };

  const showMobilemenu = () => {
    document.getElementById("main-wrapper").classList.toggle("show-sidebar");
  };

  const sidebarHandler = () => {
    let element = document.getElementById("main-wrapper");
    switch (settings.activeSidebarType) {
      case "full":
      case "iconbar":
        element.classList.toggle("mini-sidebar");
        if (element.classList.contains("mini-sidebar")) {
          element.setAttribute("data-sidebartype", "mini-sidebar");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;

      case "overlay":
      case "mini-sidebar":
        element.classList.toggle("full");
        if (element.classList.contains("full")) {
          element.setAttribute("data-sidebartype", "full");
        } else {
          element.setAttribute("data-sidebartype", settings.activeSidebarType);
        }
        break;
      default:
    }
  };

  return (
    <header className="topbar navbarbg" data-navbarbg={settings.activeNavbarBg}>
      <Navbar
        className={
          "top-navbar " +
          (settings.activeNavbarBg === "skin6" ? "navbar-light" : "navbar-dark")
        }
        expand="md"
      >
        <div
          className="navbar-header"
          id="logobg"
          data-logobg={settings.activeLogoBg}
        >
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="nav-toggler d-block d-md-none"
            onClick={() => showMobilemenu()}
          >
            <i className="ti-menu ti-close" />
          </span>
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/">
            <b className="logo-icon">
              <img src={logodarkicon} alt="homepage" className="dark-logo" />
              <img src={logolighticon} alt="homepage" className="light-logo" />
            </b>
            <span className="logo-text">
              <img src={logodarktext} alt="homepage" className="dark-logo" />
              <img src={logolighttext} className="light-logo" alt="homepage" />
            </span>
          </NavbarBrand>
          {/*--------------------------------------------------------------------------------*/}
          {/* Mobile View Toggler  [visible only after 768px screen]                         */}
          {/*--------------------------------------------------------------------------------*/}
          <span
            className="topbartoggler d-block d-md-none"
            onClick={toggle.bind(null)}
          >
            <i className="ti-more" />
          </span>
        </div>
        <Collapse
          className="navbarbg"
          isOpen={isOpen}
          navbar
          data-navbarbg={settings.activeNavbarBg}
        >
          <Nav className="float-left" navbar>
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-md-block"
                onClick={() => sidebarHandler()}
              >
                <i className="ti-menu" />
              </NavLink>
            </NavItem>
            <NavItem>
              <Link to="/_spanalytics/home" className="nav-link">
                Home
              </Link>
            </NavItem>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Configurations
              </DropdownToggle>
              <DropdownMenu end="true">
                <Link to="/_spconfigurations/spots" className="nav-link">
                  <DropdownItem>Spots</DropdownItem>
                </Link>
                <Link to="/_spconfigurations/zones" className="nav-link">
                  <DropdownItem>Zones</DropdownItem>
                </Link>
                <Link to="/_spconfigurations/sensors" className="nav-link">
                  <DropdownItem>Sensors</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                BigData Settings
              </DropdownToggle>
              <DropdownMenu end="true">
                <Link to="/_spsettings/_spbigdata/values" className="nav-link">
                  <DropdownItem>Values</DropdownItem>
                </Link>
                <Link to="/_spsettings/_spbigdata/devices" className="nav-link">
                  <DropdownItem>Devices</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                HotSpot Settings
              </DropdownToggle>
              <DropdownMenu end="true">
                <Link to="/_spsettings/_sphotspot/nas" className="nav-link">
                  <DropdownItem>Nas</DropdownItem>
                </Link>
                <Link to="/_spsettings/_sphotspot/hotspots" className="nav-link">
                  <DropdownItem>HotSpots</DropdownItem>
                </Link>
                <Link to="/_spsettings/_sphotspot/limitations" className="nav-link">
                  <DropdownItem>Limitations</DropdownItem>
                </Link>
                <DropdownItem divider />
                <Link to="/_spsettings/_sphotspot/customers" className="nav-link">
                  <DropdownItem>Customers</DropdownItem>
                </Link>
                <Link to="/_spsettings/_sphotspot/exportCustomers" className="nav-link">
                  <DropdownItem>Export Customers</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                Maintenances
              </DropdownToggle>
              <DropdownMenu end="true">
                <Link to="/_spmaintenance/brands" className="nav-link">
                  <DropdownItem>Brands</DropdownItem>
                </Link>
                <Link to="/_spmaintenance/businessTypes" className="nav-link">
                  <DropdownItem>Business Types</DropdownItem>
                </Link>
                <DropdownItem divider />
                <Link to="/_spmaintenance/_splocations/countries" className="nav-link">
                  <DropdownItem>Countries</DropdownItem>
                </Link>
                <Link to="/_spmaintenance/_splocations/states" className="nav-link">
                  <DropdownItem>States</DropdownItem>
                </Link>
                <Link to="/_spmaintenance/_splocations/cities" className="nav-link">
                  <DropdownItem>Cities</DropdownItem>
                </Link>
                <Link to="/_spmaintenance/_splocations/zipCodes" className="nav-link">
                  <DropdownItem>ZipCodes</DropdownItem>
                </Link>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav className="ml-auto float-right" navbar>
            <NavItem>
              <NavLink href="#" className="">
                <span onClick={searchtoggle.bind(null)}>
                  <i className="ti-search" />
                </span>
                <Collapse isOpen={collapse}>
                  <form className="app-search">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search & enter"
                    />
                    <span className="srh-btn" onClick={searchtoggle.bind(null)}>
                      <i className="ti-close"></i>
                    </span>
                  </form>
                </Collapse>
              </NavLink>
            </NavItem>
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Notifications Dropdown                                                   */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <i className="mdi mdi-message font-18" />
              </DropdownToggle>
              <DropdownMenu right className="mailbox">
                <div className="d-flex no-block align-items-center p-3 border-bottom">
                  <h4 className="mb-0">4 New Notifications</h4>
                </div>
                <div className="message-center notifications">
                  {/*<!-- Message -->*/}
                  {data.notifications.map((notification, index) => {
                    return (
                      <span href="" className="message-item" key={index}>
                        <span
                          className={
                            "btn btn-circle btn-" + notification.iconbg
                          }
                        >
                          <i className={notification.iconclass} />
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">
                            {notification.title}
                          </h5>
                          <span className="mail-desc">{notification.desc}</span>
                          <span className="time">{notification.time}</span>
                        </div>
                      </span>
                    );
                  })}
                </div>
                <a className="nav-link text-center mb-1 text-dark" href=";">
                  <strong>Check all notifications</strong>{" "}
                  <i className="fa fa-angle-right" />
                </a>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Notifications Dropdown                                                     */}
            {/*--------------------------------------------------------------------------------*/}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Messages Dropdown                                                        */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <i className="font-18 mdi mdi-email" />
              </DropdownToggle>
              <DropdownMenu right className="mailbox">
                <div className="d-flex no-block align-items-center p-3 border-bottom">
                  <h4 className="mb-0">5 New Messages</h4>
                </div>
                <div className="message-center message-body">
                  {/*<!-- Message -->*/}
                  {data.messages.map((message, index) => {
                    return (
                      <span href="" className="message-item" key={index}>
                        <span className="user-img">
                          <img
                            src={message.image}
                            alt="user"
                            className="rounded-circle"
                            width=""
                          />
                          <span
                            className={
                              "profile-status pull-right " + message.status
                            }
                          ></span>
                        </span>
                        <div className="mail-contnet">
                          <h5 className="message-title">{message.title}</h5>
                          <span className="mail-desc">{message.desc}</span>
                          <span className="time">{message.time}</span>
                        </div>
                      </span>
                    );
                  })}
                </div>
                <span className="nav-link text-center link text-dark" href="">
                  <b>See all e-Mails</b> <i className="fa fa-angle-right" />
                </span>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Messages Dropdown                                                          */}
            {/*--------------------------------------------------------------------------------*/}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Mega Menu Dropdown                                                       */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar className="mega-dropdown">
              <DropdownToggle nav>
                {" "}
                <i className="mdi mdi-view-grid font-18" />
              </DropdownToggle>
              <DropdownMenu>
                <Row>
                  {/*--------------------------------------------------------------------------------*/}
                  {/* Progress [Item-2]                                                              */}
                  {/*--------------------------------------------------------------------------------*/}
                  <Col xs="12" sm="12" md="12" lg="3">
                    <h5 className="mb-3 text-uppercase">Progress</h5>
                    <div className="d-flex no-block align-items-center mb-2">
                      <span>Sales</span>
                      <div className="ml-auto">
                        <span className="text-primary">
                          <i className="mdi mdi-chart-areaspline" />
                        </span>
                      </div>
                    </div>
                    <Progress className="mb-3" animated value={2 * 5} />
                    <div className="d-flex no-block align-items-center mb-2">
                      <span>Marketing</span>
                      <div className="ml-auto">
                        <span className="text-success">
                          <i className="mdi mdi-chart-line" />
                        </span>
                      </div>
                    </div>
                    <Progress
                      className="mb-3"
                      animated
                      color="success"
                      value="25"
                    />
                    <div className="d-flex no-block align-items-center mb-2">
                      <span>Accouting</span>
                      <div className="ml-auto">
                        <span className="text-danger">
                          <i className="mdi mdi-chart-arc" />
                        </span>
                      </div>
                    </div>
                    <Progress
                      className="mb-3"
                      animated
                      color="danger"
                      value={50}
                    />
                    <div className="d-flex no-block align-items-center mb-2">
                      <span>Sales Ratio</span>
                      <div className="ml-auto">
                        <span className="text-warning">
                          <i className="mdi mdi-chart-pie" />
                        </span>
                      </div>
                    </div>
                    <Progress
                      className="mb-3"
                      animated
                      color="warning"
                      value={70}
                    />
                  </Col>
                </Row>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Mega Menu Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Create New Dropdown                                                      */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <i className="flag-icon flag-icon-us"></i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <i className="flag-icon flag-icon-es"></i> Spain
                </DropdownItem>
                <DropdownItem>
                  <i className="flag-icon flag-icon-fr"></i> French
                </DropdownItem>
                <DropdownItem>
                  <i className="flag-icon flag-icon-it"></i> Italy
                </DropdownItem>
                <DropdownItem>
                  <i className="flag-icon flag-icon-de"></i> Dutch
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Create New Dropdown                                                        */}
            {/*--------------------------------------------------------------------------------*/}
            {/*--------------------------------------------------------------------------------*/}
            {/* Start Profile Dropdown                                                         */}
            {/*--------------------------------------------------------------------------------*/}
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </DropdownToggle>
              <DropdownMenu right className="user-dd">
                <div className="d-flex no-block align-items-center p-3 bg-info text-white mb-2">
                  <div className="">
                    <img
                      src={profilephoto}
                      alt="user"
                      className="rounded-circle"
                      width="60"
                    />
                  </div>
                  <div className="ml-2">
                    <h4 className="mb-0 text-white">SmartPoke User</h4>
                    <p className=" mb-0">info@esmartit.es</p>
                  </div>
                </div>
                <DropdownItem>
                  <i className="ti-user mr-1 ml-1" /> My Account
                </DropdownItem>
                <DropdownItem>
                  <i className="ti-email mr-1 ml-1" /> Inbox
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  <i className="ti-settings mr-1 ml-1" /> Account Settings
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="/_spauthentication/Login">
                  <i className="fa fa-power-off mr-1 ml-1" /> Logout
                </DropdownItem>
                <DropdownItem divider />
                <Button color="success" className="btn-rounded ml-3 mb-2 mt-2">
                  View Profile
                </Button>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*--------------------------------------------------------------------------------*/}
            {/* End Profile Dropdown                                                           */}
            {/*--------------------------------------------------------------------------------*/}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};
