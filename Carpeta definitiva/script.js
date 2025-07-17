// CONFIGURA TU FIREBASE AQUÍ (Copia esta info desde tu consola Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyBlhs77lPS1I9m2VvXEAptoOi1E_B4Np10",
  authDomain: "alimentos-app-8fd6d.firebaseapp.com",
  projectId: "alimentos-app-8fd6d",
  storageBucket: "alimentos-app-8fd6d.firebasestorage.app",
  messagingSenderId: "225480729463",
  appId: "1:225480729463:web:45a18298429e345f27f772",
  measurementId: "G-0018KLZJBV"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();

// Evento submit para guardar datos en Firestore
document.getElementById("formulario").addEventListener("submit", async e => {
  e.preventDefault();

  const comida = document.getElementById("comida").value.trim();
  const sintomas = document.getElementById("sintomas").value;
  const mensaje = document.getElementById("mensaje");

  if (!comida || !sintomas) {
    mensaje.textContent = "❌ Por favor llena todos los campos.";
    return;
  }

  try {
    await db.collection("registros").add({
      comida,
      sintomas,
      fecha: new Date()
    });

    mensaje.textContent = "✅ Datos guardados correctamente.";
    e.target.reset();

  } catch (error) {
    mensaje.textContent = "❌ Error al guardar los datos.";
    console.error("Error guardando en Firestore:", error);
  }
});

// Mensajes sorpresa sin números
const mensajes = [
  "Eres el amor de mi vida.",
  "Eres mi mundo.",
  "Eres mi vida.",
  "Espero que te siente bien la comida, te amo.",
  "Sin ti no soy nada.",
  "Te amo de aquí al infinito a pasitos de tortuga.",
  "Te amo infinito elevado al infinito.",
  "Si te sientes mal, llámame.",
  "Contigo, lo quiero todo.",
  "Si no es contigo, no es con nadie.",
  "Si te vieras con mis ojos nunca apartarías la mirada sobre ti misma.",
  "Me haces el hombre más feliz del mundo.",
  "Eres tan perfecta que la perfección te envidia mivida.",
  "Cuando estamos juntos no hace falta más.",
  "Te juro que no hay un segundo que no piense en ti.",
  "You & me.",
  "29-07-2023.",
  "Tú lo eres todo.",
  "Eres mi todo.",
  "Estoy tan agradecido de tenerte.",
  "Eres lo mejor que me ha pasado.",
  "Siempre estás en mi corazón.",
  "No puedo dejar de pensar en ti.",
  "Me haces sentir lleno.",
  "Contigo soy yo al 100%.",
  "Eres mi razón de ser.",
  "Te necesito en mi vida.",
  "Mi vida es 100000 mejor contigo.",
  "Eres mi persona favorita.",
  "Eres mi sol en los días nublados.",
  "Estoy loco por ti.",
  "Eres mi sueño hecho realidad.",
  "No quiero estar sin ti.",
  "Eres mi refugio gordaa.",
  "Eres mi alma gemela miamor.",
  "Te admiro y te adoro enana.",
  "Eres mi alegría día a día.",
  "Por ti sonrío siempre.",
  "Me haces sentir especial.",
  "Estoy tan tan tan tan enamorado de ti.",
  "Estoy muy orgulloso de la mujer que eres amor.",
  "Mi corazón late por ti jsjsjsj.",
  "Me haces mejor persona.",
  "Encontrarte es lo mejor que me ha pasado nunca.",
  "Gracias por aparecer en mi vida.",
  "No hay nadie como tú.",
  "Solamente tú.",
  "Eres mi destino.",
  "Eres mi hogar.",
  "Eres mi lugar favorito.",
  "Eres mi tesoro más valioso.",
  "Juntos estamos tan bien.",
  "No es casualidad, es conexión, es feeling.",
  "Tú y yo para siempre.",
  "Eres mi otro yo.",
  "Me das paz en este mundo de estrés y guerra.",
  "Eres la luz que ilumina mi vida.",
  "Sabes que te amo pero nunca podrás imaginarte lo mucho que lo hago.",
  "Te amo cariño, si lees esto, llámame y simplemente dime yo más.",
  "❤️ Eres todo lo que necesito."
];

function mostrarMensaje() {
  const aleatorio = mensajes[Math.floor(Math.random() * mensajes.length)];
  const mensajeElemento = document.getElementById("mensaje-aleatorio");
  const sonido = document.getElementById("sonido-sorpresa");

  mensajeElemento.textContent = aleatorio;
  mensajeElemento.classList.remove("oculto");
  mensajeElemento.classList.remove("mostrar");

  // Trigger reflow para reiniciar animación
  void mensajeElemento.offsetWidth;

  mensajeElemento.classList.add("mostrar");
  sonido.currentTime = 0;
  sonido.play();
}


async function cargarDatosYGraficar() {
  const snapshot = await db.collection("registros").get();
  const sintomasCount = {};

  snapshot.forEach(doc => {
    const data = doc.data();
    const sintoma = data.sintomas || "Desconocido";
    sintomasCount[sintoma] = (sintomasCount[sintoma] || 0) + 1;
  });

  const labels = Object.keys(sintomasCount);
  const data = Object.values(sintomasCount);

  const ctx = document.getElementById('graficoSintomas').getContext('2d');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Cantidad de registros por síntoma',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          precision: 0
        }
      }
    }
  });
}

window.addEventListener('load', cargarDatosYGraficar);