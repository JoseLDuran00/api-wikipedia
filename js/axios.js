// axios.get('https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=conejo&limit=20')
handleKeyPress = (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    obtenerTexto();
}
}

const obtenerTexto = () => {
 const inputText = document.getElementById('search-text').value;
  
// Definir los parámetros
const url = 'https://es.wikipedia.org/w/api.php';
const params = {
  action: 'query',
  list : 'search',
  srsearch: inputText,
  format: 'json',
  prop : 'info | extracts',
  inprop: 'url',
  origin: '*'
};

  const obtenerData = async() => {
    try {
      const respuesta = await axios.get(url, { params });

      //Si la respuesta es correcta
      if(respuesta.status === 200){
        console.log('Conectado ! ')

        // console.log(respuesta)
        // console.log(respuesta.data.query.search)
        // console.log(respuesta.data.query.search[0].snippet)
        // console.log(`https://es.wikipedia.org/?curid=${respuesta.data.query.search[0].pageid}`)

        let articulos = '';
        respuesta.data.query.search.forEach((articulo,index) => {
          console.log('------------------------------------------------')
          console.log(articulo.title);
          console.log(articulo.snippet);
          console.log(`https://es.wikipedia.org/?curid=${respuesta.data.query.search[index].pageid}`);
          console.log('------------------------------------------------')
          let link = `https://es.wikipedia.org/?curid=${respuesta.data.query.search[index].pageid}`;
          articulos+=`
            <article class="cards__card">
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
}