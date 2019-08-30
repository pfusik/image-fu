# CITO_OPT = -D GIF_DICTIONARY

ImageDecoder.js: ImageDecoder.ci GifDecoder.ci PngDecoder.ci JpegDecoder.ci
	cito1 -o $@ $(CITO_OPT) $^
