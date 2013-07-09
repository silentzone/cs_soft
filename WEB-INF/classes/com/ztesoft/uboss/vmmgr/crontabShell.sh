LIB_PATH=/home/ztesoft/cs_soft/WEB-INF/lib/
export LIB_PATH

JAVA_HOME=/usr/java/jdk1.7.0_25
JRE_HOME=/usr/java/jdk1.7.0_25/jre
PATH=$PATH:/usr/java/jdk1.7.0_25/bin:/usr/java/jdk1.7.0_25/jre/bin
CLASSPATH=/usr/java/jdk1.7.0_25/lib/dt.jar:/usr/java/jdk1.7.0_25/lib/tools.jar:/usr/java/jdk1.7.0_25/jre/lib
CLASSPATH=/home/ztesoft/cs_soft/WEB-INF/classes:$LIB_PATH/log4j-1.2.14.jar:$LIB_PATH/dom4j-1.5.2.jar:$LIB_PATH/ws-commons-util-1.0.2.jar:$LIB_PATH/c3p0-0.9.1.jar:$LIB_PATH/xmlrpc-client-3.1.jar:$LIB_PATH/xmlrpc-common-3.1.jar:$LIB_PATH/mysql-connector-java-5.1.5-bin.jar:$CLASSPATH

export JAVA_HOME JRE_HOME PATH CLASSPATH 

#nohup java com.ztesoft.uboss.vmmgr.crontabCall >./log/crontabCall.log &

java com.ztesoft.uboss.vmmgr.crontabCall >./log/crontabCall.log
