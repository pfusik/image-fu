import { GifDecoder, PngDecoder, JpegDecoder } from "./ImageDecoder.js";

function image2canvas(input)
{
	if (input.length == 0) {
		alert("Not a PNG, GIF or JPEG");
		return;
	}
	let decoder;
	switch (input[0]) {
	case 0x47:
		decoder = new GifDecoder();
		break;
	case 0x89:
		decoder = new PngDecoder();
		break;
	case 0xff:
		decoder = new JpegDecoder();
		break;
	default:
		alert("Not a PNG, GIF or JPEG");
		return;
	}
	try {
		decoder.decode(input, input.length);
	} catch (e) {
		alert("Cannot load file: " + e.message);
		return;
	}

	const canvas = document.getElementById("canvas");
	const width = decoder.getWidth();
	const height = decoder.getHeight();
	canvas.width = width;
	canvas.height = height;
	const context = canvas.getContext("2d");
	const imageData = context.createImageData(width, height);
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			const rgb = decoder.getPixel(x, y);
			const i = y * width + x << 2;
			imageData.data[i] = rgb >> 16 & 0xff;
			imageData.data[i + 1] = rgb >> 8 & 0xff;
			imageData.data[i + 2] = rgb & 0xff;
			imageData.data[i + 3] = rgb >> 24 & 0xff;
		}
	}
	context.putImageData(imageData, 0, 0);

	document.getElementById("status").innerHTML = width + "x" + height;
}

function openFile()
{
	const reader = new FileReader();
	reader.onload = e => image2canvas(new Uint8Array(e.target.result));
	reader.readAsArrayBuffer(this.files[0]);
}

document.querySelector("input[type=file]").addEventListener("change", openFile);
