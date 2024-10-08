import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';
import anecdotes from './services/anecdotesService';
import anecdoteReducer, { intializeAnecdotes} from './reducers/anecdoteReducer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';


const App = () => {
    const dispatch = useDispatch()
    useEffect (() => {
        dispatch(intializeAnecdotes())
    }, [])
    return (
        <div>
            <h2>Anecdotes</h2>
            <Notification/>
            <Filter/>  
            <AnecdoteList/>
            <AnecdoteForm/>
        </div>
    );
};

export default App;
