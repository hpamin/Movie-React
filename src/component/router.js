import { createBrowserRouter } from "react-router-dom";
import MoviePage from "./MoviePage";
import Body from "./Body";
import Main from "./Main";

export const router = createBrowserRouter([

    {
        path : '/',
        element : <Main />,
    },
    {
        path : '/movie/:id',
        element : <MoviePage />,
    }

])
