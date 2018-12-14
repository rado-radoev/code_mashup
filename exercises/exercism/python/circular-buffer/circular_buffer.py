class BufferFullException(Exception):
    pass


class BufferEmptyException(Exception):
    pass


class CircularBuffer(object):
    def __init__(self, capacity):
        self.buffer = [0] * capacity
        self.size = 0
        self.capacity = capacity
        self.head_index = 0
        self.tail_index = 0

    def read(self):
        if self.size == 0:
            raise BufferEmptyException("Buffer is empty. Cannot read empty buffers. Add elements to buffer.")

        data = self.buffer[self.head_index]
        self.head_index = (self.head_index + 1) % self.capacity
        self.size -= 1

        return data


    def write(self, data):

        if self.size == self.capacity:
            raise BufferFullException("Buffer is full. Remove elements from buffer to add new elements.")

        self.buffer[self.tail_index] = data
        self.tail_index = (self.tail_index + 1) % self.capacity
        self.size += 1



    def overwrite(self, data):
        if self.size != self.capacity:
            self.write(data)
        else:
            self.buffer[self.head_index % self.capacity] = data
            self.head_index = (self.head_index + 1) % self.capacity


    def clear(self):
        self.buffer = [0] * self.capacity
        self.size = 0
        self.head_index = 0
        self.tail_index = 0