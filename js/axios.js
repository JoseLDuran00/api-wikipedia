// axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=conejo&limit=20')
handleKeyPress = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    obtenerTexto();
  }
}

const obtenerTexto = () => {
const inputText = document.getElementById('search-text').value;
document.getElementById('error').style.display = 'none';
const regex = /^[a-zA-Z0-9 ]*$/;
if (regex.test(inputText)){
   // Definir los parámetros
const url = 'https://es.wikipedia.org/w/api.php';
const params = {
  action: 'query',
  list : 'search',
  srsearch: inputText,
  format: 'json',
  origin: '*'
};

  const obtenerData = async() => {
    try {
      const respuesta = await axios.get(url, { params });

      //Si la respuesta es correcta
      if(respuesta.status === 200){
        console.log('Conectado ! ')

        let articulos = '';
        respuesta.data.query.search.forEach((articulo,index) => {

          // obtenemos  el título, reemplazamos espacios en blanco por guíon bajo.
          titulo = articulo.title.split(" ").join("_") 

          //let link = `https://es.wikipedia.org/?curid=${respuesta.data.query.search[index].pageid}`;
          let link = `https://es.wikipedia.org/wiki/${titulo}`
          articulos+=`
            <article class="card cards__card">
              <h3 class="card__title" id="card-title">${articulo.title}</h3>
              <p class="card__content" id="card-content">${articulo.snippet}</p>
              <a href="${link}" target="_blank" class="card__link" id="card-link">Más información </a>
            </article>
          `
          document.getElementById('cards').innerHTML=articulos;
        });
      }
      
    } catch (error) {
      console.log(error);
    }
  }

obtenerData();

}else{
  console.log('texto ingresado no válido');
  document.getElementById('error').style.display = 'block';
  document.getElementById('errorMensaje').innerHTML='<span>❌</span> El texto ingresado no es válido, por favor ingrese un nuevo texto. 🦉';
}

}