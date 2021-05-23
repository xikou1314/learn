#!/bin/bash

NAME[0]="Zara"
NAME[1]="Qadir"
NAME[2]="Mahnaz"
NAME[3]="Ayan"
NAME[4]="Daisy"
echo "First Index: ${NAME[*]}"
echo "Second Index: ${NAME[@]}"
echo "数组的长度: ${#NAME[*]}"