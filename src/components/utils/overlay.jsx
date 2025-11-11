export const showWrongOverlay = () => {
  addOverlay(`
		<div class="overlay wrong d-flex flex-column">
			<h1>Salah!</h1>
			<p>Tidak ada dalam survey</p>
		</div>
	`);
};

export const showCorrectOverlay = () => {
  addOverlay(`
		<div class="overlay correct d-flex flex-column">
			<h1>Benar!</h1>
			<p>Jawaban ada dalam survey</p>
		</div>
	`);
};

export const showWaitOverlay = () => {
  addOverlay(`
		<div class="overlay wait d-flex flex-column">
			<p>Survey Membuktikan!</p>
		</div>
	`);
};

export const showTopSurveyOverlay = () => {
  addOverlay(`
		<div class="overlay top-survey d-flex flex-column">
			<h1>Top Survey!</h1>
			<p>Jawaban adalah top survey</p>
		</div>
	`);
};

export const showWinnerOverlay = (winner, points) => {
  addOverlay(
    `
		<div class="overlay top-survey d-flex flex-column">
			<h1>WINNER!</h1>
			<div class="row container my-1 point d-flex justify-content-center">
				<div class="col-md-6 d-flex justify-content-center">
					<div class="list-item">
						<div class="list-card card-78 ${winner}">
							<div>Skor Akhir</div>
							<div class="number-circle point">${points}</div>
						</div>
					</div>
				</div>
			</div>
			<p>tim ${winner} adalah pemenang!</p>
			<p class="small-text">Kembali [BACKSPACE]</p>
		</div>
	`,
    true
  );
};

// Fungsi utama untuk menambahkan overlay ke dalam .wrap-overlay dan menghapusnya setelah 3 detik
const addOverlay = (overlayHtml, isWinner = false) => {
  const wrapOverlay = document.querySelector(".wrap-overlay");
  if (!wrapOverlay) return;

  // Buat elemen div dan isi dengan overlayHtml
  const overlayElement = document.createElement("div");
  overlayElement.innerHTML = overlayHtml;

  // Tambahkan overlay ke dalam wrap-overlay
  wrapOverlay.appendChild(overlayElement.firstElementChild);

  // Hapus overlay setelah 3 detik
  if (!isWinner) {
    setTimeout(() => {
      wrapOverlay.innerHTML = "";
    }, 2500);
  }
};
