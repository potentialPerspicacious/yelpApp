import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import ItemCard from "./itemCard";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menu_items: []
        };

        this.menuItems = this.menuItems.bind(this);
        this.getMenuItems();
    }


    getMenuItems = () => {
        if (localStorage.getItem("isOwner")==='on'){
        axios.get(`http://localhost:3001/menu/items/${localStorage.getItem("user_id")}`)
            .then(response => {
                    this.setState({
                        menu_items: this.state.menu_items.concat(response.data)
                    });
            })
        } else {
            axios.get(`http://localhost:3001/menu/items/${localStorage.getItem("resID")}`)
            .then(response => {
                    this.setState({
                        menu_items: this.state.menu_items.concat(response.data)
                    });
            })

        }
    };

    menuItems = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.menu_items && this.state.menu_items.length > 0) {
            items = this.state.menu_items
            if (items.length > 0) {
                for (var i = 0; i < items.length; i++) {
                    item = <ItemCard menu_item={items[i]}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };



    render() {
        let message = null,
            section,
            renderOutput = [];

        if (this.state && this.state.menu_items && this.state.menu_items.length > 0) {
                section = this.menuItems(this.state.menu_items);
                renderOutput.push(section);
                    }
        return (
            <Container className="justify-content">
                <br />
                {/* <h3>Menu</h3> */}
                {message}
                {renderOutput}
            </Container>
        );
    }
}

export default Menu;

