# CITO_OPT = -D STANDALONE_DICTIONARY

GifDecoder.js: GifDecoder.ci
	cito -o $@ -l js-ta $(CITO_OPT) $<
