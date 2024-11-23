// Menampilkan pesan selamat datang saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
	alert("Selamat datang di portfolio saya!");
});

// Menampilkan alert ketika tombol diklik
const welcomeButton = document.getElementById('welcome-btn');
if (welcomeButton) {
	welcomeButton.addEventListener('click', () => {
		alert('Hello! Thank you for visiting my project.');
	});
}

// Tambahan: Ubah teks header saat tombol diklik
const headerTitle = document.querySelector('header h1');
if (welcomeButton && headerTitle) {
	welcomeButton.addEventListener('click', () => {
		headerTitle.textContent = "Terima kasih sudah berkunjung!";
	});
}

// Tambahan: Animasi sederhana pada tombol saat diklik
if (welcomeButton) {
	welcomeButton.addEventListener('mousedown', () => {
		welcomeButton.style.transform = 'scale(0.95)';
	});
	welcomeButton.addEventListener('mouseup', () => {
		welcomeButton.style.transform = 'scale(1)';
	});
}
