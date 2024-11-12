let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
const generateBtn = document.getElementById("generateBtn");

generateBtn.innerText = "Generuj kod QR";

// funkcja generująca kod QR
function generateQR() {
	if (qrText.value.length > 0) {
		qrImage.src =
		"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
		qrText.value;
		imgBox.classList.add("show-img");
		generateBtn.innerText = "Wygenerowany kod QR";
		setTimeout(() => {
			imgBox.classList.remove("show-img");
			qrText.value = "";
			generateBtn.innerText = "Generuj kod QR";
		}, 10000);
	} else {
		qrText.classList.add("error");
		setTimeout(() => {
			qrText.classList.remove("error");
		}, 1000);
	}
}

// funkcja pobierająca plik kod QR
async function downloadQR() {
	if (qrText.value.length > 0) {
		const response = await fetch(qrImage.src);
		const blob = await response.blob();
		const downloadLink = document.createElement("a");
		downloadLink.href = URL.createObjectURL(blob);
		downloadLink.download = "qrcode.png";
		downloadLink.click();
	} else {
		qrText.classList.add("error");
		setTimeout(() => {
			qrText.classList.remove("error");
		}, 1000);
	}
}

// uruchamiamy funkcję generateQR() przyciskiem Enter
const enterCheck = e => {
	if (e.keyCode === 13) {
		generateQR();
	}
};
qrText.addEventListener("keyup", enterCheck);