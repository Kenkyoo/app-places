import jQuery from 'jquery';
import store from 'store';
import $ from 'jquery';
import 'foundation-sites/dist/css/foundation.min.css';
import 'foundation-sites';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Swal from 'sweetalert2';

const url_base = 'https://api.unsplash.com/';
const client_id = '&client_id=_Lo9ruec1rqQ_-ERrp_NHgqbfBdANyAzPYaSLwGdXh0';
const search_endpoint = 'search/photos?&query=fondos+de+';

const container = document.getElementById('container');
const table = document.getElementById('table');

$('#searchBtn').click(function() {
  container.innerHTML = '';
  var searchTerm = $('#searchInput').val();
  fetch(`${url_base}${search_endpoint}${searchTerm}${client_id}`)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      createImage(results);
    })
    $('#searchInput').val('');
});

function createImage(images) {
    images.forEach(image => {
        const card = `
        <div class="cell" data-equalizer-watch>
          <div class="card">
            <div class="card-divider" style="background-color: ${image.color};">
              <label>
                <input data-tooltip tabindex="4" title="Escribe aqui el nombre de la ciudad o pais" class="name-place text-center" type="text" placeholder="Escribe aqui">
              </label>
            </div>
            <a href="${image.urls.thumb}" data-caption="${image.alt_description}">
              <img class="thumbail" src="${image.urls.regular}" alt="${image.alt_description}">
            </a>  
          </div>
        </div>
        `;
      container.innerHTML += card;   
    });
}

const drake = dragula([container, table]);

drake.on('drop', (el) => {
  const img = el.querySelector('img');
    img.setAttribute('data-fancybox', 'gallery');
});

Fancybox.bind("[data-fancybox]", {
  // Your custom options
});

function savePlaces() {
  store.set('places', table.innerHTML)
}

function getPlaces() {
  const savedPlaces = store.get('places');
  table.innerHTML = savedPlaces;
}

window.onload = function() {
  getPlaces();
};

$('#saveBtn').on('click', function() {
  savePlaces();
  savedAlert();
});

function savedAlert() {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Tus favoritos han sido guardados con exito",
    showConfirmButton: false,
    timer: 1500
  });
}

$('#tip').on('click', function () {
  Swal.fire("Las imagenes no estan fijas, puedes arrastrar e intercambiarlas a tu gusto");
})


