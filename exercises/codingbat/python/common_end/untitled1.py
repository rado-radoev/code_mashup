#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Dec 21 22:02:53 2018

@author: superlamer
"""

"""
https://codingbat.com/prob/p147755
Given 2 arrays of ints, a and b, return True if they have the same first element or they have the same last element. Both arrays will be length 1 or more.
"""


def common_end(a, b):
    return a[0] == b[0] or a[-1] == b[-1]