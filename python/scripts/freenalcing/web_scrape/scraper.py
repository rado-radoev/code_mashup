import requests
import cfscrape
import urllib.request
import math
import queue
import concurrent.futures
import time
import threading
import bs4 as bs
from product import Product

home_url = 'https://www.dischem.co.za/shop-by-department'

scraper = cfscrape.create_scraper(delay=20)
url = 'https://www.dischem.co.za/shop-by-department'
client_header = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
request_headers = {'User-Agent' : client_header}
scraper.headers = request_headers
sauce = scraper.get(url)
soup = bs.BeautifulSoup(sauce.content, 'lxml')


max_products = soup.find('p', id='toolbar-amount').findAll('span', class_='toolbar-number')
max_products = int(max_products[len(max_products) - 1].text)

products_list = queue.Queue()
missing_products_list = queue.Queue()

max_pages = math.ceil(max_products / 64)
MAX_THREADS = 30
pages_per_thread = math.ceil(max_pages / 20)

URLs = []
for addr in range(1, max_pages + 1):
    URLs.append(home_url + "?p=" + str(addr))

lock = threading.RLock()

def scraping(url):
    print('link served: ' + url)
    URLs.remove(url)
    with cfscrape.create_scraper() as scraper:
        scraper.headers = request_headers
        sauce = scraper.get(url)
        soup = bs.BeautifulSoup(sauce.content, 'lxml')

        items = [item for item in soup.find_all(class_='product-item')]

        # slice list to two lists
        splitted_items = split_list(items)
        with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
            # start = time.time()
            futures = [executor.submit(get_product, ls) for ls in splitted_items]
            # end = time.time()
            # print("Time Taken: {:.6f}s".format(end-start))


def split_list(list_to_split):
    half_items = len(list_to_split)//2
    return list_to_split[:half_items], list_to_split[half_items:]

def get_product(items_list):
    with cfscrape.create_scraper() as scraper:
        for item in items_list: 
            try:
                item_img = item.findAll('img')[0]['data-original']
                item_name = item.find('a', class_='product-item-link').text
                item_link = item.find('a', class_='product-item-link').get('href')

                item_sauce = scraper.get(item_link).content
                item_soup = bs.BeautifulSoup(item_sauce, 'lxml')

                product = item_soup.find(class_='product-info-price')

                if not product:
                    print('No product found')
                    missing_products_list.put(item_link)
                    continue

                price = product.find('div', class_='price-final_price')
                if price:
                    on_sale = item_soup.find('div', class_='amasty-label-text')
                    product_id = price.attrs.get('data-product-id')
                    old_price = price.find('div', {'id': "old-price-{}".format(product_id)})

                    if on_sale and old_price:
                        old_price = old_price.find(class_='price').text
                    final_price = price.find('div', {'id': "product-price-{}".format(product_id)}).find(class_='price').text
                    # sku = item_soup.find('table', {'id': 'product-attribute-specs-table'}).tr.td.text
                else:
                    old_price = 0
                    final_price = 0

                product_reference_number = 0 

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
                
                lock.acquire()
                products_list.put(pr)
                lock.release()
                # print('qsize is: ' + str(products_list.qsize()))
            except Exception as e:
                lock.acquire()
                missing_products_list.put(item_link)
                lock.release()
                print('Product skipped')
                print(str(e))
            finally:
                lock.release()


if __name__ == '__main__':
    with concurrent.futures.ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        start = time.time()
        futures = [ executor.submit(scraping, url) for url in URLs ]

        results = []
        for result in concurrent.futures.as_completed(futures):
            results.append(result)
        end = time.time()
        print("Time Taken: {:.6f}s".format(end-start))

        print(results)
        # for url in URLs:
        #     print('URLs len is: ' + str(len(URLs)))
        #     print('Starting thread with url: ' + url)
        #     for worker in range(MAX_THREADS):
        #         executor.submit(scraping(url))

    print('qsize is: ' + str(products_list.qsize()))
    print('qsize is: ' + str(missing_products_list.qsize()))

'''
    add multithreading.
    50 threads
    divide 10 000 
'''
