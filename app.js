
// Variables globales
let selectedQuestions = [];
let currentQuestionIndex = 0;
let numQuestions = 0;

// Variable para contar el número de aciertos
let score = 0;

// Inicia el quiz
function startQuiz() {
    numQuestions = parseInt(document.getElementById("numQuestions").value);
    if (isNaN(numQuestions) || numQuestions < 1 || numQuestions > questions.length) {
        alert("Por favor ingresa un número válido de preguntas.");
        return;
    }

    // Selecciona preguntas al azar
    selectedQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
    currentQuestionIndex = 0;

    document.getElementById("start").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("titulo").innerHTML = '<h4>📚 Simulador EGEL v1.5</h4>';
    //Esto deberia poder hacerse mejor
    document.getElementById("titulo").addEventListener("click", () => location.reload());
    showQuestion();
}

// Muestra la pregunta actual
function showQuestion() {
    const question = selectedQuestions[currentQuestionIndex];

    document.getElementById("question").innerHTML = `<p>Pregunta ${currentQuestionIndex + 1}/${numQuestions}</p><h3>${question.question}</h3>`;
    
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    question.options.forEach((option, index) => {
        optionsDiv.innerHTML += `
            <button class="option" id="${String.fromCharCode(65 + index)}" onclick="checkAnswer('${String.fromCharCode(65 + index)}')">
                ${option}
            </button>
        `;
    });
    document.getElementById("justification").innerHTML = `<h3></h3>`;
}

// Verifica la respuesta
function checkAnswer(selected) {
    const question = selectedQuestions[currentQuestionIndex];
    const correct = question.correct;

    // Verifica si la respuesta es correcta
    const isCorrect = selected === correct;
    if (isCorrect) {
        score++;
    }

    // Mensaje de resultado
    const result = isCorrect
        ? "✅ ¡Correcto!"
        : `❌ Incorrecto.<br>La respuesta correcta es: ${question.correct}) ${question.correct_text}`;

    // Muestra el resultado y la justificación
    document.getElementById("justification").innerHTML = `<h3>${result}</h3><h4>Justificación:</h4><p>${question.justification}</p>`;

    // Bloquea los botones de las opciones
    const buttons = document.querySelectorAll("#options button");
    buttons.forEach(button => {
        button.disabled = true;

        // Cambia el color del botón seleccionado a un color mas oscuro
        if (button.id === selected) {
            button.style.backgroundColor = "#d22a41";//"#253f59"; //"#094585"; 
        }
        if (button.id === correct) {
            button.style.backgroundColor = "#28a745";
        }
    });
    
    // Muestra el botón "Siguiente"
    document.getElementById("nextBtn").style.display = "block";

    // Scrollea hacia el div de justificacion "lo enfoca"
    document.getElementById("justification").scrollIntoView({ behavior: "smooth" });
}

// Pasa a la siguiente pregunta o muestra el puntaje final
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
        document.getElementById("nextBtn").style.display = "none";
    } else {
        // Muestra el puntaje final
        score_porcentaje = Math.round((score / selectedQuestions.length) * 100);
        score_mensaje = getScoreMessage(score_porcentaje);

        document.getElementById("quiz").innerHTML = `
            <h2>¡Simulación completada! ✅</h2>
            <p>Tu puntuación:   <strong>${score} / ${selectedQuestions.length}</strong>  (${score_porcentaje}%) ${score_mensaje}</p>
            <button id="restartBtn">🔄 Realizar nueva simulación</button>
        `;

        // Agrega funcionalidad al botón de reinicio
        document.getElementById("restartBtn").addEventListener("click", () => location.reload());
    }
}

function getScoreMessage(score_porcentaje){
    if (score_porcentaje <= 0) {
        return "🫏";
    } else if (score_porcentaje < 30 && score_porcentaje > 0) {
        return "😭";
    } else if (score_porcentaje >= 30 && score_porcentaje < 60) {
        return "😰"
    } else if(score_porcentaje >= 60 && score_porcentaje < 80) {
        return "👍";
    } else if(score_porcentaje >= 80 && score_porcentaje <100){
        return "🙌";
    } else {
        return "🐐";
    }
}