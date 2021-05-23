#!/bin/bash
echo "Input a number between 1 to 4"
echo "Your number is:\c"
read aNum
case $aNum in
  1) echo "你选择1"
  ;;
  2) echo "你选择2"
  ;;
  3) echo "你选择3"
  ;;
  4) echo '你选择4'
  ;;
  *) echo "你选择了其他值"
  ;;
esac