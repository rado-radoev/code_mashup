import functools
def square_of_sum(count):
    return functools.reduce(lambda x, y: x + y, range(1, count + 1))**2


def sum_of_squares(count):
    return sum(map(lambda x: x**2, range(1, count + 1)))


def difference(count):
    return square_of_sum(count) - sum_of_squares(count)


if __name__ == '__main__':
    # print(square_of_sum(100))
    # print(sum_of_squares(100))
    print(difference(5))