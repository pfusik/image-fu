# FUFLAGS = -D GIF_DICTIONARY

browser: jsimage.html ImageDecoder.js
	$(LOCALAPPDATA)/Programs/Opera/launcher --allow-file-access-from-files file:///$(shell cygpath -am $<)

ImageDecoder.js: ImageDecoder.fu GifDecoder.fu PngDecoder.fu JpegDecoder.fu
	fut -o $@ $(FUFLAGS) $^
