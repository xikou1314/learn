#!/bin/bash

for loop in 1 2 3 4 5
do
  echo "the value is $loop"
done

for str in 'This is a string'
do
echo $str
done

for FILE in $HOME/.bash*
do
echo $FILE
done