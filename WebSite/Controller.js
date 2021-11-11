// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

// the link to your model provided by Teachable Machine export panel
const URL = "./model/";

let model, webcam, labelContainer, maxPredictions;
let imageLoaded = false;

// Load the image model and setup the webcam
async function init() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";
  modelLoaded = false;
  $('.progress-bar').show();
  console.log("Loading model...");
  // Cargar el modelo y los metadatos 
  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  // Mensaje de carga de modelo de forma correcta
  console.log("Model loaded.");
  $('.progress-bar').hide();
  modelLoaded = true;
}

async function loop() {
  webcam.update(); // update the webcam frame
  await predict();
  window.requestAnimationFrame(loop);
}

// run the webcam image through the image model
async function predict() {
  // predict can take in an image, video or canvas html element
  const prediction = await model.predict(webcam.canvas);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}

let modelLoaded = false;
$(async function () {
  // Se carga el modelo
  init();

  // Se establece funcionalidad para el selector de imágenes
  $("#image-selector").on('change', function () {
    imageLoaded = false;
    let reader = new FileReader();
    reader.onload = function () {
      let dataURL = reader.result;
      $("#selected-image").attr("src", dataURL);
      $("#prediction-list").empty();
      imageLoaded = true;
    }

    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);
  });

  //Se establece funcionalidad de predicción

  $("#predict-button").on('click', async function () {
    // Validación de que el modelo y la imágen estén cargadas.
    if (!modelLoaded) { alert("El modelo debe estar cargado primero"); return; }
    if (!imageLoaded) { alert("Por favor seleccione una imagen primero"); return; }

    //Se toma la imágen cargada en el sitio
    console.log('Cargando imagen...');
    let image = $('#selected-image').get(0);

    // Lanzamos la predicción al modelo
    console.log('Lanzamos predicción...');
    let predictions = await model.predict(image);

    // Mostramos en consola la predicción
    console.log("Predicción terminada: ", predictions);

    // Organizamos la información
    let SortPredictions = predictions.sort(function (a, b) { // Se ordena los resultador por probabilidad
      return b.probability.probability - a.probability.probability;
    });

    // Reorganizamos los objetos
    let top5 = Array.from(predictions)
      .sort(function (a, b) { // Se ordena los resultador por probabilidad
        return b.probability - a.probability;
      }).slice(0, 3); // Cortamos la cantidad de resultados (0,3) = Solo 3

    console.log("Predicciones ordenadas: ", top5);

    $("#prediction-list").empty();
    top5.forEach(function (p) {
      $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
    });
  });
});