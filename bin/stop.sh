#!/usr/bin/env bash

if [ ! -e "`which forever`" ]; then	
	npm install forever -g
fi

forever stop app.js

