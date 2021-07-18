#!/usr/bin/env bash
#使用方法#选择序号：auto-install#指定软件：auto-install redis
function auto-install(){

    local software=$1

    if [ -z "$software" ];then
        PS3="请选择安装: "
        select software in -init docker docker-compose redis lua zookeeper
        do
            if [ -n "$software" ];then
                echo "开始安装 $software ..."; break
            fi
        
        done
    fi    case "$software" in

        '-init') sudo apt install gcc libssl-dev curl wget
        ;;
        'docker')
            sudo apt install docker  docker.io
            sudo usermod -aG docker $USER
            docker --version
        ;;

        'docker-compose')
            sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
            sudo chmod +x /usr/local/bin/docker-compose
            docker-compose --version
        ;;

        'redis')
            
            local package='redis-6.0.0.tar.gz'
            local dir=${package%.tar*}
            sudo apt install gcc libssl-dev

            #如果目录不存在
            if [ ! -d "$dir" ];then
                #如果包不存在则下载
                if [ ! -f "$package" ];then  curl -R -O "http://download.redis.io/releases/${package}"; fi
                #解压
                tar -xvf $package
            fi
            rm $package
            cd $dir &&\
            make clean &&\
            sudo make MALLOC=libc BUILD_TLS=yes PREFIX=$PROGRAM/redis install
        
        ;;


        "zookeeper")

            local package='apache-zookeeper-3.6.2-bin.tar.gz'
            local dir=${package%.tar*}

            if [ ! -f "$package" ];then curl -R -O https://mirrors.bfsu.edu.cn/apache/zookeeper/zookeeper-3.6.2/${package}; fi
            rm -rf $dir
            sudo tar -xvf $package &&\
            sudo mv $dir $PROGRAM/$software  &&\
            cd $PROGRAM/$software
        ;;


        *) echo "没有安装步骤" ;;

    esac


}