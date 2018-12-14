import re

def is_pangram(sentence):

    is_real_panagram = False

    new_string = re.sub(r'[^A-Za-z]', "", sentence).lower()
    s =  set(new_string)

    if (len(s) == 26):
        is_real_panagram = True

    return is_real_panagram