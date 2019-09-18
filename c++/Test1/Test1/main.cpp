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
    
    
    vector2.push_back(100);
    vector2.push_back(200);
    
    cout << " --- Vector2 ---" << endl;
    cout << "At index 0: " << vector2.at(0) << endl;
    cout << "At index 1: " << vector2.at(1) << endl;
    cout << "Vector2 size: " << vector2.size() << endl;
    
    vector< vector<int> > vector_2d;
    vector_2d.push_back(vector1);
    vector_2d.push_back(vector2);
    
    cout << " --- Vector_2d ---" << endl;
    cout << "At index 0: " << vector_2d.at(0).at(0) << endl;
    cout << "At index 1: " << vector_2d.at(1).at(0) << endl;
    cout << "Vector_2d size: " << vector_2d.size() << endl;
    
    vector1.at(0) = 1000;
    cout << "\nUpdated value in vector1" << endl;
    
    cout << "At index 0: " << vector_2d.at(0).at(0) << endl;
    cout << "At index 1: " << vector_2d.at(1).at(0) << endl;
    
    cout << "\n --- Vector1 ---" << endl;
    cout << vector1.at(0) << endl;
    cout << vector1.at(1) << endl;
}
