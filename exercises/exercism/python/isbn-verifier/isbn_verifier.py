import re
def verify(isbn):
    data = [c for c in isbn if c in '0123456789Xx']
    if len(data) != 10: return False
    if data[-1] in 'Xx': data[-1] = 10
    try:
        return not sum((10 - i) * int(x) for i, x in enumerate(data)) % 11
    except ValueError:
        return False



