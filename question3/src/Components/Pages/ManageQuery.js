import { clearPage } from '../../utils/render';

const main = document.querySelector('main');
const  ManageQuery = async () => {

clearPage();
const queries = await fetch("/api/queries");
const reponse = await queries.json();

await reponse.forEach(r => {

    affichageQueries(r.subject)
    
});
};

function affichageQueries(queries){

    main.innerHTML += `<p>${queries} <select id="choixFruit" name="choixFruit">
    <option>requested</option>
    <option>accepted</option>
    <option>refused</option>
    <option>done</option>
    </select></p>`;
}

export default ManageQuery;
