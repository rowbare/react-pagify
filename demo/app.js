'use strict';

require('highlight.js/styles/github.css');
require('react-ghfork/style.css');
require('./demo.css');
require('../style.css');

var React = require('react');
var Fork = require('react-ghfork');
var math = require('annomath');
var randomName = require('node-random-name');

var Paginator = require('../index.jsx');

var readme = require('../README.md');


module.exports = React.createClass({
    getInitialState() {
        var amount = 100;

        return {
            data: generateNames(amount),
            pagination: {
                page: 0,
                perPage: amount / 10
            },
        };
    },

    render() {
        var data = this.state.data || [];
        var pagination = this.state.pagination || {};
        var paginated = Paginator.paginate(data, pagination);

        return <article>
            <Fork project='bebraw/react-pagify'></Fork>

            <div dangerouslySetInnerHTML={{__html: readme}}></div>

            <hr></hr>

            <h2>Demo</h2>

            <div className='per-page-container'>
                Per page <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
            </div>

            <Paginator page={paginated.page} pages={paginated.amount} onSelect={this.onSelect}></Paginator>

            <div className='data'>
                <h3>Comics</h3>

                <ul>{paginated.data.map((comic, i) =>
                    <li key={'comic-' + i}>{comic.name}</li>
                )}</ul>
            </div>
        </article>;
    },

    onSelect(page) {
        var pagination = this.state.pagination || {};

        pagination.page = page;

        this.setState({
            pagination: pagination
        });
    },

    onPerPage(e) {
        var pagination = this.state.pagination || {};

        pagination.perPage = parseInt(event.target.value, 10);

        this.setState({
            pagination: pagination
        });
    },
});

function generateNames(amount) {
    return math.range(amount).map((i) => {
        return {
            name: randomName({
                seed: i,
            })
        }
    });
}