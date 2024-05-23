"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var axios_1 = __importDefault(require("axios"));
require("./ChatApp.css");
var ChatApp = function () {
    var _a = (0, react_1.useState)(''), userQuery = _a[0], setUserQuery = _a[1];
    var _b = (0, react_1.useState)(''), response = _b[0], setResponse = _b[1];
    var _c = (0, react_1.useState)([]), questions = _c[0], setQuestions = _c[1];
    var _d = (0, react_1.useState)(''), errorMessage = _d[0], setErrorMessage = _d[1];
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post('/api/chat', { userQuery: userQuery })];
                case 2:
                    result = _a.sent();
                    setResponse(result.data.response);
                    setQuestions(result.data.questions);
                    setErrorMessage('');
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error fetching chat response:', error_1);
                    setErrorMessage('Error fetching chat response');
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "chatbox-container", children: [(0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "chatbox-form", children: [(0, jsx_runtime_1.jsx)("textarea", { value: userQuery, onChange: function (e) { return setUserQuery(e.target.value); }, placeholder: "Ask your question...", className: "chatbox-input" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "chatbox-submit", children: "Submit" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "chatbox-response", children: [errorMessage && (0, jsx_runtime_1.jsx)("p", { className: "error-message", children: errorMessage }), (0, jsx_runtime_1.jsx)("h3", { className: "response-heading", children: "Response:" }), (0, jsx_runtime_1.jsx)("p", { className: "response-text", children: response }), (0, jsx_runtime_1.jsx)("h3", { className: "suggested-questions-heading", children: "Suggested Questions:" }), (0, jsx_runtime_1.jsx)("ul", { className: "suggested-questions-list", children: questions.map(function (question, index) { return ((0, jsx_runtime_1.jsx)("li", { className: "suggested-question", children: question }, index)); }) })] })] }));
};
exports.default = ChatApp;
