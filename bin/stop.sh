#!/usr/bin/env bash

if [ ! -e "`which forever`" ]; then	
	npm install forever -g
fi

sudo forever stop app.js

