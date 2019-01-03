import json, requests, queue, re
from multiprocessing.pool import  ThreadPool
"""
browse the contents of the repo
if type is dir -> store url
for each url store type file
keep going through each url while there are no more parent urls

contents -> all parent urls
each parent url check for more folders and cycle through all of them
etc.

store all file download_url in a list
parse through each download url searching for passwords


"""

repo_url = 'https://api.github.com/repos/superklamer/Android/contents/Whatsapp?ref=master'
parent_contents_queue = queue.Queue()
files_download_url_list = []
response = requests.get(repo_url)
json_response = response.json()



def get_parent_dirs():
    for dir in json_response:
        if dir['type'] == 'dir':
            parent_contents_queue.put(dir['url'])
        elif dir['type'] == 'file':
            files_download_url_list.append(dir['download_url'])

def traverse_directory_tree(directory_url):



def search_child_dirs():
    pool = ThreadPool()

    try:
        if parent_contents_queue.qsize() > 0:
            while not parent_contents_queue.empty():
                url = parent_contents_queue.get()

                



    except queue.Empty as empty:
        print("No more objects in parent queue")


def find_passwords(text):
    x = re.search('JAVA', text)
    if x:
        print(x.group())

get_parent_dirs()
# print(list(parent_contents_queue.queue))
print(files_download_url_list)

for txt in files_download_url_list:
    extracted_text = (requests.get(txt)).text
    find_passwords(extracted_text)