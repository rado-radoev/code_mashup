import requests
import urllib.request
import time
from bs4 import BeautifulSoup

url = "https://www.dischem.co.za/shop-by-department"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'lxml')