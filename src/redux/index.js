import {store} from './store'
import { useDispatch,useSelector } from 'react-redux'
 export const useSharedDispatch = ()=>useDispatch();
export const useSharedSelector = useSelector
export default{
    store,
    
}