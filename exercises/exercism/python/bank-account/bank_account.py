import threading
import functools

class BankAccount(threading.Thread):

    lock = threading.Lock()

    def __init__(self):
        self.balance = 0
        self.opened = False

    def get_balance(self):
        """Get current balance"""
        if self.opened:
            return self.balance
        else:
            raise ValueError('Not an existing account')

    def open(self):
        self.lock.acquire()

        try:
            if self.opened:
                raise ValueError('Account already exists. Open new account.')
            else:
                self.opened = True
                self.balance = 0
        finally:
            self.lock.release()

    def deposit(self, amount):
        self.lock.acquire()

        try:
            if not self.check_amount_valid(amount):
                raise ValueError(f'Amount deposited cannot be {amount}. It must be a positive amount.')
            else:
                self.balance = self.get_balance() + amount
        finally:
            self.lock.release()

    def withdraw(self, amount):
        self.lock.acquire()

        try:
            if self.check_amount_valid(amount):
                if self.get_balance() < amount:
                    raise ValueError(f'Cannot withdraw {amount}. Current balance is {self.balance}. Over draft not allowed')
                else:
                    self.balance -= amount
            else:
                raise ValueError(f'Cannot withdraw {amount}. Current balance is {self.balance}. Over draft not allowed')
        finally:
            self.lock.release()

    def close(self):
        if self.opened:
           self.opened = False
           self.balance = 0
        else:
            raise ValueError('Not an existing account')

    @classmethod
    def check_amount_valid(cls, amount):
        return None != amount > 0
