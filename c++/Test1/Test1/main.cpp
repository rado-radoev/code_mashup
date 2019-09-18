//
//  main.cpp
//  Test1
//
//  Created by Radoslav Radoev on 9/3/19.
//  Copyright © 2019 Radoslav Radoev. All rights reserved.
//

#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> vector1;
    vector<int> vector2;
    
    vector1.push_back(10);
    vector1.push_back(20);
    
    cout << " --- Vector1 ---" << endl;
    cout << "At index 0: " << vector1.at(0) << endl;
    cout << "At index 1: " << vector1.at(1) << endl;
    cout << "Vector1 size: " << vector1.size() << endl;
    
}
