#!/bin/bash

a="abc"
b="efg"

if [ $a = $b ]
then
    echo "a和b是相等的"
else
    echo "a和b是不相等的"
fi

if [ $a != $b ]
then
    echo "a和b是不相等的"
else
    echo "a和b是相等的"
fi

if [ -z $a ]
then
    echo "a是空的"
else
    echo "a不是空的"
fi

if [ -n $a ]
then
    echo "a不是空的"
else
    echo "a是空的"
fi

if [ $a ]
then
    echo "a不是空的"
else
    echo "a是空的"
fi
