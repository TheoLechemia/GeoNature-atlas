#!/usr/bin/env python

from initAtlas import create_app

globalApp = create_app('development')
app = globalApp['app']
engine = globalApp['engine']


