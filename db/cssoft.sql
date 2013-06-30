drop table if exists tapp_desktop_data;

drop table if exists tapp_desktop_data_ins;

drop table if exists tapp_desktop_param_ins;

drop table if exists tapp_ms_chat;

drop table if exists tapp_ms_chat_his;

drop table if exists tapp_ms_check;

drop table if exists tapp_ms_leave;

drop table if exists tapp_ms_leave_his;

drop table if exists tapp_ms_online_cust;

drop table if exists tapp_ms_online_server;

drop table if exists tapp_ms_push;

drop table if exists tapp_ms_push_accept;

drop table if exists tapp_ms_roll;

drop table if exists tapp_ms_score;

drop table if exists tapp_ms_templet_chat;

drop table if exists tapp_ms_templet_type;

drop table if exists tapp_sys_seq;

drop table if exists tapp_user;

drop table if exists tapp_user_attr;

drop table if exists tapp_user_attr_group;

drop table if exists tapp_user_bill;

drop table if exists tapp_user_bill_bank;

drop table if exists tapp_user_info;

drop table if exists tapp_user_log;

drop table if exists tapp_user_pay_log;

drop table if exists tapp_user_pwd_find;

drop table if exists tapp_user_pwd_his;

drop table if exists tapp_user_rc_log;

drop table if exists tapp_user_role;

drop table if exists tapp_user_role_def;

drop table if exists tvlapp_desktop_action;

drop table if exists tvlapp_desktop_action_param;

drop table if exists tfm_services;

drop table if exists tvlapp_user_power_atom;

drop table if exists tvlapp_user_register;

/*==============================================================*/
/* table: tapp_desktop_data                                     */
/*==============================================================*/
create table tapp_desktop_data
(
   app_id               varchar(6) not null,
   app_type             varchar(4) comment '001:管理级应用 002:客户级应用 同时存在的用逗号分隔',
   up_app_id            varchar(6) comment 'root级别为null',
   app_title            varchar(30),
   app_title_en         varchar(300),
   app_name             varchar(50),
   app_name_en          varchar(500),
   app_code             varchar(20),
   app_note             varchar(2000),
   app_icon             varchar(500),
   app_image            varchar(500),
   app_action           varchar(500),
   app_action_type      varchar(3) comment '001:内部链接动作 002:外部服务动作',
   app_sort             varchar(3),
   primary key (app_id)
);

/*==============================================================*/
/* table: tapp_desktop_data_ins                                 */
/*==============================================================*/
create table tapp_desktop_data_ins
(
   app_ins_id           varchar(10) not null,
   app_id               varchar(6) not null,
   app_type             varchar(4),
   up_app_id            varchar(6),
   app_title            varchar(30),
   app_title_en         varchar(300),
   app_name             varchar(50),
   app_name_en          varchar(500),
   app_code             varchar(20),
   app_note             varchar(2000),
   app_icon             varchar(500),
   app_image            varchar(500),
   app_action           varchar(500),
   app_action_type      varchar(3),
   app_position         varchar(3) comment '001:主面板 002:快捷面板 003......',
   app_sort             varchar(3),
   staff_id             varchar(6) not null,
   staff_job_id         varchar(6),
   create_time          date,
   state                varchar(3) not null comment '000:无效 001:有效 ',
   primary key (app_ins_id)
);

alter table tapp_desktop_data_ins comment '每次正常退出登录进行实例化操作/隔段时间实例一次/完全实例进cooke  情况待定';

/*==============================================================*/
/* table: tapp_desktop_param_ins                                */
/*==============================================================*/
create table tapp_desktop_param_ins
(
   app_ins_id           varchar(10) not null,
   app_action_type      varchar(3),
   app_action_type_param varchar(10),
   param_code           varchar(50),
   param_note           varchar(200),
   param_value          varchar(50),
   primary key (app_ins_id)
);

/*==============================================================*/
/* table: tapp_ms_chat                                          */
/*==============================================================*/
create table tapp_ms_chat
(
   chat_no              varchar(20) not null,
   entry_no             varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据',
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   sequ                 integer comment '聊天顺序，实时更新',
   v_entry_no           varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据',
   v_entry_user_id      varchar(10),
   v_user_type          varchar(1) comment 'a   普通客户 b   客服',
   v_entry_user_name    varchar(60),
   send_date            datetime,
   is_read              varchar(1) comment '1:未读取 0:已读取',
   read_date            datetime,
   send_flag            varchar(1) comment 'a   客户发送  b   客服人员发送',
   content              text,
   primary key (chat_no)
);

/*==============================================================*/
/* table: tapp_ms_chat_his                                      */
/*==============================================================*/
create table tapp_ms_chat_his
(
   chat_no              varchar(20) not null,
   entry_no             varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据',
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   sequ                 integer comment '聊天顺序，实时更新',
   v_entry_no           varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据',
   v_entry_user_id      varchar(10),
   v_user_type          varchar(1) comment 'a   普通客户 b   客服',
   v_entry_user_name    varchar(60),
   send_date            datetime,
   is_read              varchar(1) comment '1:未读取 0:已读取',
   read_date            datetime,
   send_flag            varchar(1) comment 'a   客户发送  b   客服人员发送',
   content              text,
   create_time          datetime,
   create_user_id       varchar(10),
   primary key (chat_no)
);

/*==============================================================*/
/* table: tapp_ms_check                                         */
/*==============================================================*/
create table tapp_ms_check
(
   entry_no             varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据'
);

/*==============================================================*/
/* table: tapp_ms_leave                                         */
/*==============================================================*/
create table tapp_ms_leave
(
   leave_no             varchar(20) not null,
   content              text,
   send_time            datetime,
   entry_no             varchar(20),
   send_user_id         varchar(32) comment '游客留言记录ip',
   send_user_name       varchar(60),
   leave_type           varchar(1) comment '1 一对一留言 2  对网站所有客服留言',
   need_as_type         varchar(1) comment '1 网站答复 2 短信答复 3 电话答复  9 其它',
   send_mail            varchar(60),
   send_tel             varchar(60),
   send_addr            varchar(500),
   state                varchar(1) comment '0：未答复 1：已答复',
   as_entry_no          varchar(20),
   as_user_id           varchar(10) comment '如果是游客的留言，则随机由登陆的客服人员来获取留言信息',
   as_user_name         varchar(60),
   as_time              datetime,
   as_content           text,
   as_type              varchar(1) comment '1 网站答复 2 短信答复 3 电话答复  9 其它',
   send_ip_addr         varchar(128) comment '长度支持ipv6',
   as_ip_addr           varchar(128),
   primary key (leave_no)
);

/*==============================================================*/
/* table: tapp_ms_leave_his                                     */
/*==============================================================*/
create table tapp_ms_leave_his
(
   leave_no             varchar(20) not null,
   content              text,
   send_time            datetime,
   entry_no             varchar(20),
   send_user_id         varchar(32) comment '游客留言记录ip',
   send_user_name       varchar(60),
   leave_type           varchar(1) comment '1 一对一留言 2  对网站所有客服留言',
   need_as_type         varchar(1) comment '1 网站答复 2 短信答复 3 电话答复  9 其它',
   send_mail            varchar(60),
   send_tel             varchar(60),
   send_addr            varchar(500),
   state                varchar(1) comment '0：未答复 1：已答复',
   send_ip_addr         varchar(128) comment '长度支持ipv6',
   as_entry_no          varchar(20),
   as_user_id           varchar(10) comment '如果是游客的留言，则随机由登陆的客服人员来获取留言信息',
   as_user_name         varchar(60),
   as_time              datetime,
   as_content           text,
   as_type              varchar(1) comment '1 网站答复 2 短信答复 3 电话答复  9 其它',
   as_ip_addr           varchar(128),
   create_time          datetime,
   create_user_id       varchar(10),
   primary key (leave_no)
);

/*==============================================================*/
/* table: tapp_ms_online_cust                                   */
/*==============================================================*/
create table tapp_ms_online_cust
(
   entry_no             varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据',
   entry_time           datetime,
   exit_time            datetime,
   cur_time             datetime,
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   note_num             integer comment '实时更新，记录最大聊天记录数',
   read_num             integer comment '客服读取记录',
   cust_num             integer,
   state                varchar(1) comment '0 离线  1 有效',
   ip_addr              varchar(128) comment '长度支持ipv6',
   service_entry_no     varchar(20),
   service_user_id      varchar(10),
   service_user_name    varchar(60),
   primary key (entry_no)
);

/*==============================================================*/
/* table: tapp_ms_online_server                                 */
/*==============================================================*/
create table tapp_ms_online_server
(
   entry_no             varchar(20) not null comment '客服人员进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据',
   entry_time           datetime,
   exit_time            datetime,
   cur_time             datetime,
   note_num             integer comment '实时更新，记录最大聊天记录数',
   read_num             integer comment '客服读取记录',
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   cust_num             integer,
   online_num           integer,
   state                varchar(1) comment '0 离线 2 挂机  1 有效 只有客服有挂机状态',
   ip_addr              varchar(128) comment '长度支持ipv6',
   primary key (entry_no)
);

/*==============================================================*/
/* table: tapp_ms_push                                          */
/*==============================================================*/
create table tapp_ms_push
(
   ms_id                varchar(10) not null,
   ms_content           text,
   create_time          datetime,
   create_user_id       varchar(10),
   eff_time             datetime,
   exp_time             datetime,
   push_time            varchar(60) comment '用特殊格式表示',
   ms_type              varchar(1) comment '1:即时推送 2:周期推送（一个有效周期） 3:定时推送 4:定时周期推送',
   push_num             integer,
   person_num           integer,
   read_num             integer,
   state                varchar(1) comment '0：待发送 1：已部分发送 2：发送完毕 3：发送异常',
   primary key (ms_id)
);

/*==============================================================*/
/* table: tapp_ms_push_accept                                   */
/*==============================================================*/
create table tapp_ms_push_accept
(
   accept_id            varbinary(10) not null,
   ms_id                varchar(10) not null,
   a_user_id            varchar(10),
   a_time               datetime,
   r_time               datetime,
   a_num                integer,
   state                varchar(1) comment '0：未接收 1：已接收未读取 2：已读取 3：异常',
   primary key (accept_id)
);

/*==============================================================*/
/* table: tapp_ms_roll                                          */
/*==============================================================*/
create table tapp_ms_roll
(
   entry_no             varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据'
);

/*==============================================================*/
/* table: tapp_ms_score                                         */
/*==============================================================*/
create table tapp_ms_score
(
   entry_no             varchar(20) not null comment '客户进入通讯模块成功后,系统自动给其分配一个签到编号,签到编号作为本次进入数据的存储依据'
);

/*==============================================================*/
/* table: tapp_ms_templet_chat                                  */
/*==============================================================*/
create table tapp_ms_templet_chat
(
   templet_id           varchar(20) not null,
   templet_type         varchar(20),
   templet_name         varchar(100),
   templet_info         varchar(2000),
   templet_scope        varchar(1) comment '0：私有 1：公有',
   state                varchar(1) comment '1：有效 0：无效',
   eff_time             datetime,
   exp_time             datetime,
   create_time          datetime,
   create_user_id       varchar(10),
   primary key (templet_id)
);

/*==============================================================*/
/* table: tapp_ms_templet_type                                  */
/*==============================================================*/
create table tapp_ms_templet_type
(
   templet_type         varchar(20) not null,
   templet_type_name    varchar(100),
   state                varchar(1) comment '1：有效 0：无效',
   create_time          datetime,
   create_user_id       varchar(10),
   primary key (templet_type)
);

/*==============================================================*/
/* table: tapp_sys_seq                                          */
/*==============================================================*/
create table tapp_sys_seq
(
   seq_table            varchar(60),
   seq_filed            varchar(60),
   seq_value            int,
   seq_note             varchar(200)
);

/*==============================================================*/
/* table: tapp_user                                             */
/*==============================================================*/
create table tapp_user
(
   user_id              varchar(10) not null,
   user_name            varchar(60) comment '中文名称或平台的注册昵称',
   user_code            varchar(60) comment '平台登录名，需系统唯一，可用邮箱进行注册',
   user_reg_type        varchar(2) comment '1:网上注册 ',
   user_type            varchar(2) comment '01：普通用户 02：园区企业用户 03：园区外企业用户',
   pwd_id               varchar(20) not null,
   user_pwd             varchar(60),
   bill_id              varchar(10) not null comment '用户资料记录生成时同时生成，系统唯一存在，可直接使用用户id，此为基本账户id，实际上一个用户最多可有三个账户id，分别为基本账户、专用账户、辅助账户三类',
   create_time          datetime,
   login_fail           int,
   is_locked            varchar(1) comment '1:锁定 0 未锁定',
   user_state           varchar(1) comment '1:有效 0:无效 9:删除',
   state_time           datetime,
   lock_time            datetime comment '登陆失败但还未达到锁定次数时，记录的为登陆失败时间',
   lock_user_id         varchar(10) comment '登陆失败但还未达到锁定次数时，记录的为系统默认管理员',
   e_mail               varchar(50),
   primary key (user_id)
);

/*==============================================================*/
/* table: tapp_user_attr                                        */
/*==============================================================*/
create table tapp_user_attr
(
   attr_id              varchar(10) not null,
   attr_name            varchar(60),
   attr_code            varchar(60),
   attr_value           varchar(500),
   attr_value_text      varchar(500),
   attr_type            varchar(2) comment '01:文本框 02:下拉选择框 03:单选框 04:多选框',
   attr_source          varchar(500) comment '当类型为 02:下拉选择框 03:单选框 04:多选框
            用以下格式组织内容
            如：001:中国;002:美国;
            ',
   group_id             varchar(10) not null,
   user_type            varchar(60) comment '属于多个用户类型时用逗号分隔，为999说明属于所有用户类型',
   attr_notes           varchar(500),
   is_show              varchar(1) comment '1 是 0 否',
   other_control        varchar(60),
   state                varchar(1) comment '1 有效 0 无效',
   primary key (attr_id)
);

/*==============================================================*/
/* table: tapp_user_attr_group                                  */
/*==============================================================*/
create table tapp_user_attr_group
(
   group_id             varchar(10) not null,
   group_notes          varchar(60),
   up_group_id          varchar(10),
   is_multi             varchar(1) comment 'n 具体组数 ',
   is_show              varchar(1) comment '1 是 0 否',
   other_control        varchar(60),
   user_type            varchar(60) comment '属于多个用户类型时用逗号分隔，为999说明属于所有用户类型',
   state                char(10) comment '1 有效 0 无效',
   primary key (group_id)
);

/*==============================================================*/
/* table: tapp_user_bill                                        */
/*==============================================================*/
create table tapp_user_bill
(
   bill_id              varchar(10) not null comment '用户资料记录生成时同时生成，系统唯一存在，可直接使用用户id，此为基本账户id，实际上一个用户最多可有三个账户id，分别为基本账户、专用账户、辅助账户三类',
   user_id              varchar(10) not null,
   bill_name            varchar(200),
   bill_type            varchar(2) comment '01:基本账户、02:专用账户、03:辅助账户',
   bill_total           numeric(9,5),
   bill_balance         numeric(9,5),
   bill_locked_balance  numeric(9,5),
   bill_state           varchar(1) comment '1:有效 0:无效 2:锁定 9:删除',
   create_time          datetime,
   create_user_id       varchar(10),
   bill_notes           varchar(500),
   primary key (bill_id)
);

/*==============================================================*/
/* table: tapp_user_bill_bank                                   */
/*==============================================================*/
create table tapp_user_bill_bank
(
   relation_id          varchar(10) not null comment '用户资料记录生成时同时生成，系统唯一存在，可直接使用用户id',
   bill_id              varchar(10) comment '用户资料记录生成时同时生成，系统唯一存在，可直接使用用户id',
   user_id              varchar(10) not null,
   bank_name            varchar(500),
   bank_user            varchar(500),
   bank_code            varchar(60),
   card_type            varchar(1) comment '0:一般卡片 1:储蓄卡 2:信用卡 9:其它',
   create_time          datetime,
   create_user_id       varchar(10),
   state                varchar(1) comment '1:有效 0:无效 2:锁定 9:删除',
   notes                varchar(500),
   primary key (relation_id)
);

/*==============================================================*/
/* table: tapp_user_info                                        */
/*==============================================================*/
create table tapp_user_info
(
   info_id              varchar(11) not null,
   user_id              varchar(10) not null,
   seq                  int comment '从1开始，如果同一用户的同一资料参数有多个，以此字段作为排序，依次递增',
   attr_id              varchar(10) not null,
   attr_name            varchar(60),
   attr_code            varchar(60),
   attr_value           varchar(500),
   attr_value_text      varchar(500),
   create_time          datetime,
   create_user_id       varchar(10),
   group_id             varchar(10),
   state                varchar(1) comment '1 有效 0 失效 9:删除',
   primary key (info_id)
);

/*==============================================================*/
/* table: tapp_user_log                                         */
/*==============================================================*/
create table tapp_user_log
(
   login_no             varchar(20) not null,
   user_id              varchar(10) not null,
   login_time           datetime,
   login_result         varchar(2) comment '01 成功 00 失败',
   logout_time          datetime,
   logout_result        varchar(2) comment '01 成功 00 失败',
   login_desc           varchar(500),
   logout_desc          varchar(500),
   notes                varchar(500),
   login_ip             varchar(128),
   logout_ip            varchar(128),
   primary key (login_no)
);

alter table tapp_user_log comment '记录成功登录与退出的记录，正常情况为一一对应，通过事件扫描，如果登录时间超过12小时，则检查session，如sessi';

/*==============================================================*/
/* table: tapp_user_pay_log                                     */
/*==============================================================*/
create table tapp_user_pay_log
(
   pay_id               varchar(30) not null,
   bill_id              varchar(10) comment '用户资料记录生成时同时生成，系统唯一存在，可直接使用用户id，此为基本账户id，实际上一个用户最多可有三个账户id，分别为基本账户、专用账户、辅助账户三类',
   bill_s_id            varchar(10),
   pay_balance          numeric(9,5),
   pay_time             datetime,
   primary key (pay_id)
);

/*==============================================================*/
/* table: tapp_user_pwd_find                                    */
/*==============================================================*/
create table tapp_user_pwd_find
(
   user_id              varchar(10) not null,
   seq                  int comment '按操作递增,从1开始',
   find_request         varchar(60),
   find_response        varchar(60),
   find_time            datetime,
   result               varchar(1) comment '1成功 0 失败',
   find_result          varchar(200)
);

/*==============================================================*/
/* table: tapp_user_pwd_his                                     */
/*==============================================================*/
create table tapp_user_pwd_his
(
   pwd_id               varchar(20) not null,
   user_id              varchar(10) not null,
   seq                  int comment '按操作递增,从1开始',
   create_time          datetime,
   create_user_id       varchar(10),
   pwd_state            varchar(1) comment '1:有效 0:无效 2:锁定 9:删除',
   pwd_exp_date         datetime,
   user_pwd             varchar(60),
   notes                varchar(500),
   primary key (pwd_id)
);

/*==============================================================*/
/* table: tapp_user_rc_log                                      */
/*==============================================================*/
create table tapp_user_rc_log
(
   rc_id                varchar(30) not null,
   bill_id              varchar(10) comment '用户资料记录生成时同时生成，系统唯一存在，可直接使用用户id，此为基本账户id，实际上一个用户最多可有三个账户id，分别为基本账户、专用账户、辅助账户三类',
   rc_balance           numeric(9,5),
   rc_user_id           varchar(10),
   rc_time              datetime,
   notes                varchar(60),
   primary key (rc_id)
);

/*==============================================================*/
/* table: tapp_user_role                                        */
/*==============================================================*/
create table tapp_user_role
(
   user_id              varchar(10) not null,
   role_id              varchar(10),
   role_name            varchar(60),
   create_time          datetime,
   create_user_id       varchar(10),
   state                varchar(1) comment '1 有效 0 无效 9:删除'
);

/*==============================================================*/
/* table: tapp_user_role_def                                    */
/*==============================================================*/
create table tapp_user_role_def
(
   role_id              varchar(10) not null comment '系统默认的基本角色为 -1',
   role_name            varchar(60),
   power_atom           varchar(500) comment '多个权限用逗号,分隔 记录值为权限原子id',
   role_notes           varchar(500),
   primary key (role_id)
);

/*==============================================================*/
/* table: tvlapp_desktop_action                                 */
/*==============================================================*/
create table tvlapp_desktop_action
(
   app_action_type      varchar(3) not null,
   app_action_type_name varchar(20),
   app_action_type_note varchar(200),
   app_action_type_param varchar(10),
   primary key (app_action_type)
);

/*==============================================================*/
/* table: tvlapp_desktop_action_param                           */
/*==============================================================*/
create table tvlapp_desktop_action_param
(
   app_action_type      varchar(3),
   app_action_type_param varchar(10),
   param_code           varchar(50),
   param_note           varchar(200),
   param_def_value      varchar(50)
);

/*==============================================================*/
/* table: tfm_services                                          */
/*==============================================================*/
create table tfm_services
(
	service_name varchar(64) not null,
	definition varchar(128)
);

/*==============================================================*/
/* table: tvlapp_user_power_atom                                */
/*==============================================================*/
create table tvlapp_user_power_atom
(
   atom_id              varchar(4) not null,
   atom_name            varchar(60),
   atom_notes           varchar(500),
   primary key (atom_id)
);
