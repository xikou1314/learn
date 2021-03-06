## 正则基础

1. 正则表达式BRE集合

   |  符号  |                           作用                            |
   | :----: | :-------------------------------------------------------: |
   |   ^    | 尖角号，用于模式的最左侧，如果"^oldboy", 匹配以oldboy开头 |
   |   $    | 美元符，用于模式的最右侧，如果"^oldboy", 匹配以oldboy结尾 |
   |   ^$   |                     组合符，表示空行                      |
   |   .    |         匹配任意一个且只有一个字符，不能匹配空行          |
   |   \    |                         转义字符                          |
   |   *    |               匹配一个字符连续出现0次或多次               |
   |   .*   |                   组合符，匹配所有内容                    |
   |  ^.*   |            组合符，匹配任意多个字符开头的内容             |
   |  .*$   |            组合符，匹配任意多个字符结尾的内容             |
   | [abc]  |       匹配[]集合内的任意一个字符，或a或b或c，[a-c]        |
   | [^abc] |                      表示对[abc]取反                      |

2. 扩展正则表达式ERE集合

   |  字符  |                 作用                 |
   | :----: | :----------------------------------: |
   |   +    |       匹配前一个字符1次或多次        |
   | [:/]+  |    匹配括号内的":"或"/"1次或多次     |
   |   ?    |        匹配前一个字符0次或1次        |
   |   \    |                                      |
   |   ()   | 分组过滤，被括起来的内容表示一个整体 |
   | a{n,m} |    匹配前一个字符最少n次，最多m次    |
   | a{n,}  |        匹配前一个字符最少n次         |
   |  a{n}  |          匹配前一个字符n次           |
   | a{,m}  |        匹配前一个字符最多m次         |
   |   -o   |         只显示匹配到的关键字         |

3. grep正则表达式练习题

   1. 把 /etc/passwd 文件重定向到 /home/vue/passwd 文件内

      ```
      cat /etc/passwd > /home/vue/passwd
      ```

   2. 找到 /home/vue/passwd 文件内 root 单词, 忽略大小写，显示行号

      ```
      grep -i -n "root" /home/vue/passwd
      ```

   3. 找出所有的空行, 显示行号

      ```
      grep "^$" /home/vue/passwd -n
      ```

   4. 找出所有的非空行, 显示行号

      ```
      grep "^$" /home/vue/passwd -nv
      ```

   5. 找出所有以 # 开头的内容, 显示行号

      ```
      grep "^#" /home/vue/passwd -n
      ```

   6. 找出所有不以 # 开头的内容, 显示行号,  并且过滤空行

      ```
      grep "^#" /home/vue/passwd -nv | grep "^$" -v
      ```

   7. 输出所有以m开头的文件,忽略大小写

      ```
      grep -i "^m" /home/vue/passwd
      ```

   8. 找出以 . 结尾的行

      ```
      grep -n "\.$" /home/vue/passwd
      ```

   9. 找出所有允许登录的用户，解释器是 /bin/bash, 显示行号

      ```
      grep -n "/bin/bash$" /home/vue/passwd
      ```

   10. 找到anker.txt 文件中所有字母，不区分大小写

       ```
       grep "[a-zA-Z]" anker.txt
       ```

   11. 显示 anker.txt 文件中所有数字

       ```
       grep "[0-9]" anker.txt
       ```

   12. 只显示 anker.txt 文件中所有数字

       ```
       grep "[0-9]" anker.txt -o
       ```

   13. 找出包含 good 和 gald 的行

       ```
       grep -E "(good|gald)" anker.txt
       ```

4. Sed 练习题

   | 命令 |               作用               |
   | :--: | :------------------------------: |
   | grep |     对文本内容进行过滤，筛选     |
   | sed  |   对文件或数据流，进行加工处理   |
   | awk  | 更适合编辑，处理匹配到的文本内容 |

   1. sed过滤参数说明

      | options |                       作用                       |
      | :-----: | :----------------------------------------------: |
      |   -n    |   取消默认sed的输出，常余sed内置命令p一起使用    |
      |   -i    | 直接将修改结果写入文件，不用-i，数据是写入内存中 |
      |   -e    |             多次编辑，不需要管道符了             |
      |   -r    |                   支持正则扩展                   |

   2. 输出文件anker.txt 第2行，第3行的内容

      ```
      sed "2,3p" anker.txt -n;
      ```

   3. 输出文件anker.txt 第2行，然后向下来3行的内容

      ```
      sed "2,+3p" anker.txt -n;
      ```

   4. 输出还有TTT的行

      ```
      sed "/TTT/p" anker.txt -n;			// p打印
      ```

   5. 删除还有game的行

      ```
      sed "/game/d" anker.txt -i；	 //	 不加i是在内存中删除，不是删除文件中的
      ```

   6. 删除从第4行开始到结尾

      ```
      sed '4,4d' anker.txt -i;
      ```

   7. 把 wuhan 替换成 hangzhou

      ```
      sed "s/wuhan/hangzhou/g" anker.txt -i;
      ```

   8. 多次替换

      ```
      sed -e "s/I/My/g" -e "s/shanghai/beijing/g" anker.txt -i	
      ```

   9. 在每一行后面添加“------”

      ```
      sed "a ------" anker.txt -i;
      ```