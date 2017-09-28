function image2canvas(input)
{
	var image = new Image();
	try {
		if (input.length == 0)
			throw "Not a PNG or GIF";
		var decoder;
		if (input[0] == 0x89)
			decoder = new PngDecoder();
		else if (input[0] == 0x47)
			decoder = new GifDecoder();
		else
			throw "Not a PNG or GIF";
		decoder.decode(image, input, input.length);
	} catch (e) {
		alert(e);
		return;
	}

	var canvas = document.getElementById("canvas");
	var width = image.getWidth();
	var height = image.getHeight();
	canvas.width = width;
	canvas.height = height;
	var context = canvas.getContext("2d");
	var imageData = context.createImageData(width, height);
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			var rgb = image.getPixel(x, y);
			var i = y * width + x << 2;
			imageData.data[i] = rgb >> 16 & 0xff;
			imageData.data[i + 1] = rgb >> 8 & 0xff;
			imageData.data[i + 2] = rgb & 0xff;
			imageData.data[i + 3] = rgb >> 24 & 0xff;
		}
	}
	context.putImageData(imageData, 0, 0);

	var status = document.getElementById("status");
	status.innerHTML = width + "x" + height;
}

function openFile(file)
{
	var reader = new FileReader();
	reader.onload = function (e) {
		image2canvas(new Uint8Array(e.target.result));
	};
	reader.readAsArrayBuffer(file);
}

function dragHelper(e)
{
	e.stopPropagation();
	e.preventDefault();
}

function onDrop(e)
{
	dragHelper(e);
	openFile(e.dataTransfer.files[0]);
}
