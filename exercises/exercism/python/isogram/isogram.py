import re
def is_isogram(string):
    new_string = re.sub(r'[^A-Za-z]', "", string).lower()
    s = set(new_string)

    return len(s) == len(new_string)
