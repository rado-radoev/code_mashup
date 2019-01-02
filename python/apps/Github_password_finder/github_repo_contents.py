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