# CITO_OPT = -D GIF_DICTIONARY

ImageDecoder.js: ImageDecoder.ci GifDecoder.ci PngDecoder.ci JpegDecoder.ci
	cito -o $@ $(CITO_OPT) $^
