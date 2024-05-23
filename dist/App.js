"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var antd_1 = require("antd");
var MainTable_1 = __importDefault(require("./Components/MainTable"));
var Analytics_1 = __importDefault(require("./Components/Analytics"));
var ChatApp_1 = __importDefault(require("./Components/ChatApp"));
require("./App.css");
var Header = antd_1.Layout.Header, Content = antd_1.Layout.Content;
var Title = antd_1.Typography.Title;
var App = function () {
    var _a = (0, react_1.useState)(null), selectedYear = _a[0], setSelectedYear = _a[1];
    var handleRowClick = function (year) {
        setSelectedYear(function (prevYear) { return (prevYear === year ? null : year); });
    };
    return ((0, jsx_runtime_1.jsxs)(antd_1.Layout, { style: { minHeight: '100vh' }, children: [(0, jsx_runtime_1.jsx)(Header, { style: { backgroundColor: '#001529', padding: '10px' }, children: (0, jsx_runtime_1.jsx)(Title, { level: 2, style: { color: 'white', margin: 0 }, children: "Salary Dashboard" }) }), (0, jsx_runtime_1.jsxs)(Content, { style: { padding: '20px' }, children: [(0, jsx_runtime_1.jsx)(MainTable_1.default, { onRowClick: handleRowClick }), (0, jsx_runtime_1.jsx)("h2", { children: "Line-Graph:" }), (0, jsx_runtime_1.jsx)(Analytics_1.default, { selectedYear: selectedYear }), " ", selectedYear !== null && ((0, jsx_runtime_1.jsxs)("h2", { style: { marginBottom: '10px' }, children: ["Selected Year: ", selectedYear] })), (0, jsx_runtime_1.jsx)("h2", { children: "Chat with Data Insights" }), (0, jsx_runtime_1.jsx)(ChatApp_1.default, {})] })] }));
};
exports.default = App;
