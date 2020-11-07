import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import axios from "axios";
import ItemCard from "./itemCard";
import backendServer from "../../webConfig"
import ReactPaginate from 'react-paginate';




class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            offset: 0,
            menu_items: [],
            perPage: 2,
            currentPage: 0
        };

        this.menuItems = this.menuItems.bind(this);
        this.getMenuItems();
        this.handlePageClick = this.handlePageClick.bind(this);

    }


    getMenuItems = () => {
        if (localStorage.getItem("type")==='restaurant'){
        axios.get(`${backendServer}/menu/items/${localStorage.getItem("user_id")}`)
            .then(response => {
                    const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                    this.state.menu_items = []
                    this.setState({
                        menu_items: this.state.menu_items.concat(slice),
                        pageCount: Math.ceil(response.data.length / this.state.perPage),
                    });
            })
        } else {
            axios.get(`${backendServer}/menu/items/${localStorage.getItem("resID")}`)
            .then(response => {
                const slice = response.data.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.state.menu_items = []
                this.setState({
                    menu_items: this.state.menu_items.concat(slice),
                    pageCount: Math.ceil(response.data.length / this.state.perPage),
                });
            })

        }
    };
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log(selectedPage)
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.getMenuItems()
        });

    };

    menuItems = () => {
        var itemsRender = [], items, item;
        if (this.state && this.state.menu_items && this.state.menu_items.length > 0) {
            items = this.state.menu_items
            console.log(items)
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
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </Container>
            
        );
    }
}

export default Menu;

