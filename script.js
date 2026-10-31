// Database 10 Soal IPS Ekonomi Kelas 7 (Pilihan A, B, C)
const quizData = [
    {
        question: "Segala usaha yang dilakukan manusia untuk memenuhi kebutuhan hidupnya disebut...",
        options: ["A. Tindakan Ekonomi", "B. Motif Ekonomi", "C. Prinsip Ekonomi"],
        answer: 0
    },
    {
        question: "Alasan yang mendorong manusia untuk melakukan tindakan ekonomi disebut...",
        options: ["A. Prinsip Ekonomi", "B. Motif Ekonomi", "C. Hukum Ekonomi"],
        answer: 1
    },
    {
        question: "Berusaha dengan pengorbanan tertentu untuk memperoleh hasil maksimal disebut...",
        options: ["A. Motif Ekonomi", "B. Prinsip Ekonomi", "C. Tindakan Ekonomi"],
        answer: 1
    },
    {
        question: "Kebutuhan manusia yang harus dipenuhi terlebih dahulu agar kelangsungan hidupnya tetap terjaga dinamakan...",
        options: ["A. Kebutuhan Sekunder", "B. Kebutuhan Primer", "C. Kebutuhan Tersier"],
        answer: 1
    },
    {
        question: "Berdasarkan sifatnya, kebutuhan manusia dibedakan menjadi...",
        options: ["A. Primer dan Sekunder", "B. Jasmani dan Rohani", "C. Sekarang dan Masa Depan"],
        answer: 1
    },
    {
        question: "Benda pemuas kebutuhan yang jumlahnya berlimpah serta didapatkan tanpa pengorbanan disebut...",
        options: ["A. Benda Ekonomi", "B. Benda Bebas / Illith", "C. Benda Produksi"],
        answer: 1
    },
    {
        question: "Barang yang penggunaannya saling melengkapi satu sama lain disebut barang...",
        options: ["A. Komplementer", "B. Substitusi", "C. Produksi"],
        answer: 0
    },
    {
        question: "Daging ayam menggantikan daging sapi saat harga daging sapi naik. Hubungan kedua barang ini disebut...",
        options: ["A. Komplementer", "B. Substitusi", "C. Illith"],
        answer: 1
    },
    {
        question: "Penyebab utama terjadinya kelangkaan sumber daya ekonomi adalah...",
        options: ["A. Kebutuhan manusia terbatas", "B. Alat pemuas kebutuhan tidak terbatas", "C. Pertumbuhan kebutuhan lebih cepat dibanding ketersediaan alat pemuas"],
        answer: 2
    },
    {
        question: "Tindakan manusia yang didorong oleh keinginan untuk mendapat keuntungan disebut motif...",
        options: ["A. Mencari keuntungan", "B. Sosial", "C. Memperoleh penghargaan"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;

// Variabel untuk menyimpan data profil siswa
let studentData = {
    name: "",
    class: "",
    school: ""
};

const profileScreen = document.getElementById("profile-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionNumber = document.getElementById("question-number");
const scoreTracker = document.getElementById("score-tracker");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const notification = document.getElementById("notification");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// Fungsi saat tombol "Mulai Kuis" ditekan
function startQuiz(event) {
    event.preventDefault(); // Mencegah reload halaman

    // Ambil data dari input form
    studentData.name = document.getElementById("student-name").value;
    studentData.class = document.getElementById("student-class").value;
    studentData.school = document.getElementById("student-school").value;

    // Sembunyikan form profil, tampilkan layar kuis
    profileScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    loadQuestion();
}

function loadQuestion() {
    isAnswered = false;
    notification.innerHTML = "";
    
    const currentData = quizData[currentQuestionIndex];
    questionNumber.innerText = `Soal ${currentQuestionIndex + 1} dari ${quizData.length}`;
    scoreTracker.innerText = `Skor: ${score}`;
    questionText.innerText = currentData.question;

    optionsContainer.innerHTML = "";
    currentData.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.classList.add("option-item");
        li.innerText = option;
        li.onclick = () => selectOption(index, li);
        optionsContainer.appendChild(li);
    });
}

function selectOption(selectedIndex, element) {
    if (isAnswered) return;
    isAnswered = true;

    const currentData = quizData[currentQuestionIndex];
    const allOptions = optionsContainer.children;

    if (selectedIndex === currentData.answer) {
        element.classList.add("correct");
        notification.innerHTML = "<span style='color: var(--success-color);'>✔ Jawaban Benar! (+10 Poin)</span>";
        score += 10;
    } else {
        element.classList.add("incorrect");
        allOptions[currentData.answer].classList.add("correct");
        notification.innerHTML = "<span style='color: var(--error-color);'>✖ Jawaban Salah! (-5 Poin)</span>";
        score -= 5; // Skor dikurangi 5 jika jawaban salah
    }

    scoreTracker.innerText = `Skor: ${score}`;

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    // Tampilkan data profil siswa di halaman hasil
    document.getElementById("res-name").innerText = studentData.name;
    document.getElementById("res-class").innerText = studentData.class;
    document.getElementById("res-school").innerText = studentData.school;

    finalScore.innerText = `${score} Poin`;

    if (score >= 80) {
        resultMessage.innerText = "Luar biasa! Pemahaman Anda tentang materi Ekonomi Kelas 7 sangat baik.";
    } else if (score >= 50) {
        resultMessage.innerText = "Bagus! Pertahankan dan tingkatkan lagi belajarnya ya.";
    } else {
        resultMessage.innerText = "Tetap semangat! Ayo pelajari kembali materi IPS Ekonomi kelas 7.";
    }
}