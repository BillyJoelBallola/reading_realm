import axios from "axios";
import * as userAPI from "./user.js";
import * as booksAPI from "./books.js";
import * as bookShelfAPI from "./bookShelf.js";
import * as authAPI from "./auth.js";

axios.defaults.baseURL = "http://localhost:5000";

export { userAPI, booksAPI, bookShelfAPI, authAPI };
