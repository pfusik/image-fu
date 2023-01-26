# CITO_OPT = -D GIF_DICTIONARY

browser: ImageDecoder.js
	$(LOCALAPPDATA)/Programs/Opera/launcher --allow-file-access-from-files file:///$(shell cygpath -am jsimage.html)

ImageDecoder.js: ImageDecoder.ci GifDecoder.ci PngDecoder.ci JpegDecoder.ci
	cito -o $@ $(CITO_OPT) $^
