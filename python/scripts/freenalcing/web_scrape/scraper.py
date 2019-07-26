import requests
import urllib.request
import bs4 as bs

url = 'https://www.dischem.co.za/shop-by-department/'
sause = requests.get(url)
soup = bs.BeautifulSoup(sause.text, 'lxml')

print(soup)

items = [item for item in soup.find_all(class_='product-item')]
item = items[0]
item_img = item.findAll('img')[0]['data-original']
item_name = item.find('a', class_='product-item-link').text
item_link = item.find('a', class_='product-item-link').get('href')

item_sauce = requests.get(item_link)
item_soup = bs.BeautifulSoup(item_sauce.text, 'lxml')

price = item_soup.find(class_='product-info-price')
product_id = price.attrs.get('data-product-id')
old_price = price.find('div', {'id': "old-price-{}".format(product_id)}).find(class_='price').text
