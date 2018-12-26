#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sat Dec 22 15:44:22 2018

@author: superlamer

search and find repositories
"""

import requests, json

url = 'https://api.github.com/search/repositories?q=java&sort=stars&order=asc'

response = requests.get(url)
response_json = response.json()






