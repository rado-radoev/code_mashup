import requests
import urllib.request
import bs4 as bs

url = 'https://www.dischem.co.za/shop-by-department/'
sause = requests.get(url)
soup = bs.BeautifulSoup(sause.text, 'lxml')

print(soup)

items = [item for item in soup.find_all(class_='product-item')]

for item in items: 
    item_img = item.findAll('img')[0]['data-original']
    item_name = item.find('a', class_='product-item-link').text
    item_link = item.find('a', class_='product-item-link').get('href')

    item_sauce = requests.get(item_link)
    item_soup = bs.BeautifulSoup(item_sauce.text, 'lxml')

    product = item_soup.find(class_='product-info-price')
    price = product.find('div', class_='price-final_price')
    product_id = price.attrs.get('data-product-id')
    old_price = price.find('div', {'id': "old-price-{}".format(product_id)})
    if old_price: 
        old_price = old_price.find(class_='price').text
    final_price = price.find('div', {'id': "product-price-{}".format(product_id)}).find(class_='price').text
    # sku = item_soup.find('table', {'id': 'product-attribute-specs-table'}).tr.td.text

    for tr in item_soup.find('table'): 
        td = tr.findAll('td')
        for d in td:
            if d.get('data-th') == 'SKU':
                sku = d.text
            elif d.get('data-th') == 'Product Reference Number':
                product_reference_number = d.text

    print(item_name)
    print(item_img)
    if old_price: 
        print(old_price)
    print(final_price)
    print(sku)
    print(product_reference_number)


'''
    check for sale. look for this div tag with text save. or two prices?
    <div class="amasty-label-text" style="font-size: 14px; color: rgb(255, 255, 255); padding-top: 10px; position: absolute; white-space: nowrap; width: 100%;">SAVE</div>

    for data structure. may be use dict. the key will be the sku number. or the prod ref number. they should be unique
'''
