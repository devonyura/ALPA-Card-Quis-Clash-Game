import SoundManager from "./SoundManager";

class ConfirmModal {
	static init() {
		// Buat elemen modal di dalam body jika belum ada
		if (!document.getElementById("custom-confirm-modal")) {
			const modalHTML = `
				<div id="custom-confirm-modal" class="modal">
					<div class="modal-dialog" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="btn-close" aria-label="Close">
									<span aria-hidden="true"></span>
								</button>
							</div>
							<div class="modal-body text-center">
								<h2 id="confirm-message"></h2>
							</div>
							<div class="modal-footer">
								<button id="confirm-yes" type="button" class="btn btn-success">YA [Y]</button>
								<button id="confirm-no" type="button" class="btn btn-danger">BATAL [N]</button>
							</div>
						</div>
					</div>
				</div>
			`;
			document.body.insertAdjacentHTML("beforeend", modalHTML);

			// Tambahkan event listener
			document.getElementById("confirm-yes").addEventListener("click", () => ConfirmModal.confirm(true));
			document.getElementById("confirm-no").addEventListener("click", () => ConfirmModal.confirm(false));
			document.querySelector("#custom-confirm-modal .btn-close").addEventListener("click", () => ConfirmModal.confirm(false));
			document.getElementById("custom-confirm-modal").addEventListener("click", (e) => {
				if (e.target.id === "custom-confirm-modal") ConfirmModal.confirm(false);
			});
			document.addEventListener("keydown", ConfirmModal.handleKeyPress);
		}
	}

	static call_confirm(msg, method) {
		this.init();
		this.method = method; // Simpan method yang akan dijalankan jika konfirmasi
		document.getElementById("confirm-message").innerText = msg;
		document.getElementById("custom-confirm-modal").style.display = "flex";
	}

	static confirm(isConfirmed) {
		document.getElementById("custom-confirm-modal").style.display = "none";
		if (isConfirmed && typeof this.method === "function") {
			this.method();
		}
	}

	static handleKeyPress(event) {
		if (event.key === "y" || event.key === "Y") {
			SoundManager.playClickSound();
			ConfirmModal.confirm(true);
		} else if (event.key === "n" || event.key === "N" || event.key === "Escape") {
			SoundManager.playClickSound();
			ConfirmModal.confirm(false);
		}
	}
}

// Inisialisasi modal saat halaman dimuat
// ConfirmModal.init();

// Ekspor utility
export default ConfirmModal;
