def distance(strand_a, strand_b):

    if len(strand_a) != len(strand_b):
        raise ValueError("Not the same length")

    l = [i for i,j in zip(list(strand_a), list(strand_b)) if i !=j]
    return (len(l))
