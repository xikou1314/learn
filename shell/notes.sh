#--------------------------------------------
# 这是一个自动打 ipa 的脚本，基于 webfrogs 的 ipa-build 书写：
# https://github.com/webfrogs/xcode_shell/blob/master/ipa-build
# 功能：自动为 etao ios app 打包，产出物为14个渠道的 ipa 包
# 特色：全自动打包，不需要输入任何参数
#--------------------------------------------
##### 用户配置区 开始 #####
#
#
# 项目根目录，推荐将此脚本放在项目的根目录，这里就不用改了
# 应用名，确保和 Xcode 里 Product 下的 target_name.app 名字一致
#
##### 用户配置区 结束 #####