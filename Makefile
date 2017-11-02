# CITO_OPT = -D GIF_DICTIONARY

ImageDecoder.js: Image.ci ImageDecoder.ci GifDecoder.ci PngDecoder.ci JpegDecoder.ci
	cito -o $@ -l js-ta $(CITO_OPT) $^
