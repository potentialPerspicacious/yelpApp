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
        this.deleteItem = this.deleteItem.bind(this);
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
                    item = <ItemCard menu_item={items[i]} deleteItem={this.deleteItem}/>;
                    itemsRender.push(item);
                }
            }
            return itemsRender;
        }
    };

    deleteItem = (e) => {
        const data = {
            item_id: e.target.name,
        };
        axios.post(`http://localhost:3001/menu/items/${localStorage.getItem("user_id")}`, data)
            .then(response => {
                let new_menu_items = this.state.menu_items;
                let index = new_menu_items.map(menu_item => menu_item.item_id).indexOf(parseInt(data.item_id));
                if (index > -1) {
                    new_menu_items.splice(index, 1);
                }
                this.setState({
                    menu_items: new_menu_items,
                    message: response.data
                });
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    this.setState({
                        message: err.response.data
                    });
                }
            });

    };

    render() {
        let message = null,
            section,
            renderOutput = [];

        if (this.state.message === "ITEM_DELETED") {
            message = <Alert variant="warning">Item deleted successfully!</Alert>;
        }

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

