import requests
import urllib.request
import bs4 as bs
from product import Product

url = 'https://www.dischem.co.za/shop-by-department/'
sause = requests.get(url)
soup = bs.BeautifulSoup(sause.text, 'lxml')

products_list = {}
max_products = soup.find('p', id='toolbar-amount').findAll('span', class_='toolbar-number')
max_products = int(max_products[len(max_products) - 1].text)

items = [item for item in soup.find_all(class_='product-item')]

for item in items: 
    item_img = item.findAll('img')[0]['data-original']
    item_name = item.find('a', class_='product-item-link').text
    item_link = item.find('a', class_='product-item-link').get('href')

    item_sauce = requests.get(item_link)
    item_soup = bs.BeautifulSoup(item_sauce.text, 'lxml')

    product = item_soup.find(class_='product-info-price')
    on_sale = item_soup.find('div', class_='amasty-label-text')
    price = product.find('div', class_='price-final_price')
    product_id = price.attrs.get('data-product-id')
    if on_sale:
        old_price = price.find('div', {'id': "old-price-{}".format(product_id)}).find(class_='price').text
    final_price = price.find('div', {'id': "product-price-{}".format(product_id)}).find(class_='price').text
    # sku = item_soup.find('table', {'id': 'product-attribute-specs-table'}).tr.td.text

    for tr in item_soup.find('table'): 
        td = tr.findAll('td')
        for d in td:
            if d.get('data-th') == 'SKU':
                sku = d.text
            elif d.get('data-th') == 'Product Reference Number':
                product_reference_number = d.text

    pr = Product(
        item_name, 
        item_img,
        old_price,
        final_price,
        None,
        sku,
        product_reference_number)
    
    products_list[sku] = pr


'''
    add multithreading.
    50 threads
    divide 10 000 
'''
