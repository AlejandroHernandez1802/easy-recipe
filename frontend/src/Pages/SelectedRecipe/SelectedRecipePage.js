import {useState, useEffect} from 'react';
import Axios from 'axios';

import AlterNav from '../../Components/Global/AlterNav';
import SelectedRecipe from '../../Components/SelectedRecipePage/SelectedRecipe';


const SelectedRecipePage = (props) => {

   const[recipeData, setRecipeData] = useState([]);
   const Name = props.location.state;

   useEffect(() => {
      Axios.get("http://localhost:3001/api/selected-recipe", {params:{Name:Name}}).then((response) => {
            setRecipeData(response.data);
         })
   }, [])


    return ( 
        <div className='selected-recipe-template'>
           <AlterNav />
           <SelectedRecipe recipeData={recipeData}/>
        </div>
     );
}
 
export default SelectedRecipePage;