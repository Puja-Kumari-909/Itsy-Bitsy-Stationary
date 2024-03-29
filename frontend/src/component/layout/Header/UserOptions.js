import React, { Fragment, useState } from 'react'
import './Header.css'
import {SpeedDial, SpeedDialAction} from "@material-ui/lab"
import Profile from "../../../images/Profile.png";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";
import { useAlert } from 'react-alert';
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@material-ui/core';

const UserOptions = ({user}) => {

    const {cartItems} = useSelector(state => state.cart)
    
    const [open, setOpen] = useState(false)

    const history = useHistory();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        { icon: <PersonIcon />, name: "Profile", func : account },
        { icon: <ListAltIcon />, name: "Orders", func : orders },
        { icon: <ShoppingCartIcon style={{color:cartItems.length>0 ? "tomato" : "unset"}}/>, name: "Cart", func: cart },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
    ]

    if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
    }

    function dashboard() {
        history.push("/admin/dashboard");
    }
    
    function orders() {
        history.push("/orders");
    }

    function account() {
        history.push("/account");
    }

    function cart() {
        history.push("/cart");
    }

    function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
    }
    
    return (
        <Fragment>
            <Backdrop open={open} style={{zIndex: "10"}}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                className="speedDial"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                icon={
                    <img
                      className="speedDialIcon"
                      src={user.avatar.url ? user.avatar.url : {Profile}}
                      alt="Profile"
                    />
                }
                direction="down"
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon}
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}

            </SpeedDial>
        </Fragment>
    )
}

export default UserOptions