from collections import Counter
import re

def word_count(phrase):
    s = re.sub(r'[.,\/#!$%@\^&\*;:{}=\-_`~()\n\t\']', " ", phrase)
    cleaned = re.sub('\s{1,}', " ", s)
    cleaned = re.sub('\s{1,}$|^\s{1,}', '', cleaned)


    c =  Counter(cleaned.lower().split(' '))
    return  dict(c)


if __name__ == '__main__':
    print(word_count(" multiple   whitespaces"))