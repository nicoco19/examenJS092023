import Navigate from '../Router/Navigate';

const main = document.querySelector('main');
const CreatQuery = () => {
  
  main.innerHTML = `<h1>Create a query Page</h1>
  <p>Subject of your query</p><br>
  <input type="text" id="id_text"/><br>
  <p>Please provide the subject of your query regarding some new content.</p>
  <button id="id_button">Submit</button>
  `;
  const button = document.querySelector('#id_button');
   button.addEventListener('click', addQueries)
  
};

async function addQueries(e){
  e.preventDefault();

  const subject = document.querySelector('#id_text').value; 
  // eslint-disable-next-line no-console
  console.log(subject);

  const option = {
    method: 'POST',
    body : JSON.stringify({
      subject,
      status : "requested"
    }),
    headers : {
      
      'Content-type' : 'application/json',
    }
  };

  const reponse = await fetch('/api/queries',option);
  if(!reponse.ok)throw new Error(`fetch error : ${reponse.status} : ${reponse.statusText}`);

  Navigate('/queries');
}

export default CreatQuery;
