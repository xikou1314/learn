#!/bin/bash

a=10
b=20

if [ $a -eq $b ]
then
    echo "a和b是相等的"
else
    echo "a和b是不相等的"
fi

if [ $a -ne $b ]
then
    echo "a和b是不等的"
else
    echo "a和b是相等的"
fi

if [ $a -gt $b ]
then
    echo "a 大于 b"
else
    echo "a 小于或等于 b"
fi

if [ $a -lt $b ]
then
    echo "a 小于 b"
else
    echo "a 大于或等于 b"
fi

if [ $a -ge $b ]
then
    echo "a 大于等于 b"
else
    echo "a 小于 b "
fi

if [ $a -le $b ]
then
    echo "a 小于等于 b"
else
    ehco "a 大于 b"
fi

