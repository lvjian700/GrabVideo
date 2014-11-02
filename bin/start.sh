#!/usr/bin/env bash

if [ ! -e "`which forever`" ]; then	
	npm install forever -g
fi

sudo PORT=80 forever start app.js
