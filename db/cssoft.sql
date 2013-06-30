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
   app_type             varchar(4) comment '001:����Ӧ�� 002:�ͻ���Ӧ�� ͬʱ���ڵ��ö��ŷָ�',
   up_app_id            varchar(6) comment 'root����Ϊnull',
   app_title            varchar(30),
   app_title_en         varchar(300),
   app_name             varchar(50),
   app_name_en          varchar(500),
   app_code             varchar(20),
   app_note             varchar(2000),
   app_icon             varchar(500),
   app_image            varchar(500),
   app_action           varchar(500),
   app_action_type      varchar(3) comment '001:�ڲ����Ӷ��� 002:�ⲿ������',
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
   app_position         varchar(3) comment '001:����� 002:������ 003......',
   app_sort             varchar(3),
   staff_id             varchar(6) not null,
   staff_job_id         varchar(6),
   create_time          date,
   state                varchar(3) not null comment '000:��Ч 001:��Ч ',
   primary key (app_ins_id)
);

alter table tapp_desktop_data_ins comment 'ÿ�������˳���¼����ʵ��������/����ʱ��ʵ��һ��/��ȫʵ����cooke  �������';

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
   entry_no             varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����',
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   sequ                 integer comment '����˳��ʵʱ����',
   v_entry_no           varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����',
   v_entry_user_id      varchar(10),
   v_user_type          varchar(1) comment 'a   ��ͨ�ͻ� b   �ͷ�',
   v_entry_user_name    varchar(60),
   send_date            datetime,
   is_read              varchar(1) comment '1:δ��ȡ 0:�Ѷ�ȡ',
   read_date            datetime,
   send_flag            varchar(1) comment 'a   �ͻ�����  b   �ͷ���Ա����',
   content              text,
   primary key (chat_no)
);

/*==============================================================*/
/* table: tapp_ms_chat_his                                      */
/*==============================================================*/
create table tapp_ms_chat_his
(
   chat_no              varchar(20) not null,
   entry_no             varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����',
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   sequ                 integer comment '����˳��ʵʱ����',
   v_entry_no           varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����',
   v_entry_user_id      varchar(10),
   v_user_type          varchar(1) comment 'a   ��ͨ�ͻ� b   �ͷ�',
   v_entry_user_name    varchar(60),
   send_date            datetime,
   is_read              varchar(1) comment '1:δ��ȡ 0:�Ѷ�ȡ',
   read_date            datetime,
   send_flag            varchar(1) comment 'a   �ͻ�����  b   �ͷ���Ա����',
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
   entry_no             varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����'
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
   send_user_id         varchar(32) comment '�ο����Լ�¼ip',
   send_user_name       varchar(60),
   leave_type           varchar(1) comment '1 һ��һ���� 2  ����վ���пͷ�����',
   need_as_type         varchar(1) comment '1 ��վ�� 2 ���Ŵ� 3 �绰��  9 ����',
   send_mail            varchar(60),
   send_tel             varchar(60),
   send_addr            varchar(500),
   state                varchar(1) comment '0��δ�� 1���Ѵ�',
   as_entry_no          varchar(20),
   as_user_id           varchar(10) comment '������ο͵����ԣ�������ɵ�½�Ŀͷ���Ա����ȡ������Ϣ',
   as_user_name         varchar(60),
   as_time              datetime,
   as_content           text,
   as_type              varchar(1) comment '1 ��վ�� 2 ���Ŵ� 3 �绰��  9 ����',
   send_ip_addr         varchar(128) comment '����֧��ipv6',
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
   send_user_id         varchar(32) comment '�ο����Լ�¼ip',
   send_user_name       varchar(60),
   leave_type           varchar(1) comment '1 һ��һ���� 2  ����վ���пͷ�����',
   need_as_type         varchar(1) comment '1 ��վ�� 2 ���Ŵ� 3 �绰��  9 ����',
   send_mail            varchar(60),
   send_tel             varchar(60),
   send_addr            varchar(500),
   state                varchar(1) comment '0��δ�� 1���Ѵ�',
   send_ip_addr         varchar(128) comment '����֧��ipv6',
   as_entry_no          varchar(20),
   as_user_id           varchar(10) comment '������ο͵����ԣ�������ɵ�½�Ŀͷ���Ա����ȡ������Ϣ',
   as_user_name         varchar(60),
   as_time              datetime,
   as_content           text,
   as_type              varchar(1) comment '1 ��վ�� 2 ���Ŵ� 3 �绰��  9 ����',
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
   entry_no             varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����',
   entry_time           datetime,
   exit_time            datetime,
   cur_time             datetime,
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   note_num             integer comment 'ʵʱ���£���¼��������¼��',
   read_num             integer comment '�ͷ���ȡ��¼',
   cust_num             integer,
   state                varchar(1) comment '0 ����  1 ��Ч',
   ip_addr              varchar(128) comment '����֧��ipv6',
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
   entry_no             varchar(20) not null comment '�ͷ���Ա����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����',
   entry_time           datetime,
   exit_time            datetime,
   cur_time             datetime,
   note_num             integer comment 'ʵʱ���£���¼��������¼��',
   read_num             integer comment '�ͷ���ȡ��¼',
   entry_user_id        varchar(10),
   entry_user_name      varchar(60),
   cust_num             integer,
   online_num           integer,
   state                varchar(1) comment '0 ���� 2 �һ�  1 ��Ч ֻ�пͷ��йһ�״̬',
   ip_addr              varchar(128) comment '����֧��ipv6',
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
   push_time            varchar(60) comment '�������ʽ��ʾ',
   ms_type              varchar(1) comment '1:��ʱ���� 2:�������ͣ�һ����Ч���ڣ� 3:��ʱ���� 4:��ʱ��������',
   push_num             integer,
   person_num           integer,
   read_num             integer,
   state                varchar(1) comment '0�������� 1���Ѳ��ַ��� 2��������� 3�������쳣',
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
   state                varchar(1) comment '0��δ���� 1���ѽ���δ��ȡ 2���Ѷ�ȡ 3���쳣',
   primary key (accept_id)
);

/*==============================================================*/
/* table: tapp_ms_roll                                          */
/*==============================================================*/
create table tapp_ms_roll
(
   entry_no             varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����'
);

/*==============================================================*/
/* table: tapp_ms_score                                         */
/*==============================================================*/
create table tapp_ms_score
(
   entry_no             varchar(20) not null comment '�ͻ�����ͨѶģ��ɹ���,ϵͳ�Զ��������һ��ǩ�����,ǩ�������Ϊ���ν������ݵĴ洢����'
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
   templet_scope        varchar(1) comment '0��˽�� 1������',
   state                varchar(1) comment '1����Ч 0����Ч',
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
   state                varchar(1) comment '1����Ч 0����Ч',
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
   user_name            varchar(60) comment '�������ƻ�ƽ̨��ע���ǳ�',
   user_code            varchar(60) comment 'ƽ̨��¼������ϵͳΨһ�������������ע��',
   user_reg_type        varchar(2) comment '1:����ע�� ',
   user_type            varchar(2) comment '01����ͨ�û� 02��԰����ҵ�û� 03��԰������ҵ�û�',
   pwd_id               varchar(20) not null,
   user_pwd             varchar(60),
   bill_id              varchar(10) not null comment '�û����ϼ�¼����ʱͬʱ���ɣ�ϵͳΨһ���ڣ���ֱ��ʹ���û�id����Ϊ�����˻�id��ʵ����һ���û������������˻�id���ֱ�Ϊ�����˻���ר���˻��������˻�����',
   create_time          datetime,
   login_fail           int,
   is_locked            varchar(1) comment '1:���� 0 δ����',
   user_state           varchar(1) comment '1:��Ч 0:��Ч 9:ɾ��',
   state_time           datetime,
   lock_time            datetime comment '��½ʧ�ܵ���δ�ﵽ��������ʱ����¼��Ϊ��½ʧ��ʱ��',
   lock_user_id         varchar(10) comment '��½ʧ�ܵ���δ�ﵽ��������ʱ����¼��ΪϵͳĬ�Ϲ���Ա',
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
   attr_type            varchar(2) comment '01:�ı��� 02:����ѡ��� 03:��ѡ�� 04:��ѡ��',
   attr_source          varchar(500) comment '������Ϊ 02:����ѡ��� 03:��ѡ�� 04:��ѡ��
            �����¸�ʽ��֯����
            �磺001:�й�;002:����;
            ',
   group_id             varchar(10) not null,
   user_type            varchar(60) comment '���ڶ���û�����ʱ�ö��ŷָ���Ϊ999˵�����������û�����',
   attr_notes           varchar(500),
   is_show              varchar(1) comment '1 �� 0 ��',
   other_control        varchar(60),
   state                varchar(1) comment '1 ��Ч 0 ��Ч',
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
   is_multi             varchar(1) comment 'n �������� ',
   is_show              varchar(1) comment '1 �� 0 ��',
   other_control        varchar(60),
   user_type            varchar(60) comment '���ڶ���û�����ʱ�ö��ŷָ���Ϊ999˵�����������û�����',
   state                char(10) comment '1 ��Ч 0 ��Ч',
   primary key (group_id)
);

/*==============================================================*/
/* table: tapp_user_bill                                        */
/*==============================================================*/
create table tapp_user_bill
(
   bill_id              varchar(10) not null comment '�û����ϼ�¼����ʱͬʱ���ɣ�ϵͳΨһ���ڣ���ֱ��ʹ���û�id����Ϊ�����˻�id��ʵ����һ���û������������˻�id���ֱ�Ϊ�����˻���ר���˻��������˻�����',
   user_id              varchar(10) not null,
   bill_name            varchar(200),
   bill_type            varchar(2) comment '01:�����˻���02:ר���˻���03:�����˻�',
   bill_total           numeric(9,5),
   bill_balance         numeric(9,5),
   bill_locked_balance  numeric(9,5),
   bill_state           varchar(1) comment '1:��Ч 0:��Ч 2:���� 9:ɾ��',
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
   relation_id          varchar(10) not null comment '�û����ϼ�¼����ʱͬʱ���ɣ�ϵͳΨһ���ڣ���ֱ��ʹ���û�id',
   bill_id              varchar(10) comment '�û����ϼ�¼����ʱͬʱ���ɣ�ϵͳΨһ���ڣ���ֱ��ʹ���û�id',
   user_id              varchar(10) not null,
   bank_name            varchar(500),
   bank_user            varchar(500),
   bank_code            varchar(60),
   card_type            varchar(1) comment '0:һ�㿨Ƭ 1:��� 2:���ÿ� 9:����',
   create_time          datetime,
   create_user_id       varchar(10),
   state                varchar(1) comment '1:��Ч 0:��Ч 2:���� 9:ɾ��',
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
   seq                  int comment '��1��ʼ�����ͬһ�û���ͬһ���ϲ����ж�����Դ��ֶ���Ϊ�������ε���',
   attr_id              varchar(10) not null,
   attr_name            varchar(60),
   attr_code            varchar(60),
   attr_value           varchar(500),
   attr_value_text      varchar(500),
   create_time          datetime,
   create_user_id       varchar(10),
   group_id             varchar(10),
   state                varchar(1) comment '1 ��Ч 0 ʧЧ 9:ɾ��',
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
   login_result         varchar(2) comment '01 �ɹ� 00 ʧ��',
   logout_time          datetime,
   logout_result        varchar(2) comment '01 �ɹ� 00 ʧ��',
   login_desc           varchar(500),
   logout_desc          varchar(500),
   notes                varchar(500),
   login_ip             varchar(128),
   logout_ip            varchar(128),
   primary key (login_no)
);

alter table tapp_user_log comment '��¼�ɹ���¼���˳��ļ�¼���������Ϊһһ��Ӧ��ͨ���¼�ɨ�裬�����¼ʱ�䳬��12Сʱ������session����sessi';

/*==============================================================*/
/* table: tapp_user_pay_log                                     */
/*==============================================================*/
create table tapp_user_pay_log
(
   pay_id               varchar(30) not null,
   bill_id              varchar(10) comment '�û����ϼ�¼����ʱͬʱ���ɣ�ϵͳΨһ���ڣ���ֱ��ʹ���û�id����Ϊ�����˻�id��ʵ����һ���û������������˻�id���ֱ�Ϊ�����˻���ר���˻��������˻�����',
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
   seq                  int comment '����������,��1��ʼ',
   find_request         varchar(60),
   find_response        varchar(60),
   find_time            datetime,
   result               varchar(1) comment '1�ɹ� 0 ʧ��',
   find_result          varchar(200)
);

/*==============================================================*/
/* table: tapp_user_pwd_his                                     */
/*==============================================================*/
create table tapp_user_pwd_his
(
   pwd_id               varchar(20) not null,
   user_id              varchar(10) not null,
   seq                  int comment '����������,��1��ʼ',
   create_time          datetime,
   create_user_id       varchar(10),
   pwd_state            varchar(1) comment '1:��Ч 0:��Ч 2:���� 9:ɾ��',
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
   bill_id              varchar(10) comment '�û����ϼ�¼����ʱͬʱ���ɣ�ϵͳΨһ���ڣ���ֱ��ʹ���û�id����Ϊ�����˻�id��ʵ����һ���û������������˻�id���ֱ�Ϊ�����˻���ר���˻��������˻�����',
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
   state                varchar(1) comment '1 ��Ч 0 ��Ч 9:ɾ��'
);

/*==============================================================*/
/* table: tapp_user_role_def                                    */
/*==============================================================*/
create table tapp_user_role_def
(
   role_id              varchar(10) not null comment 'ϵͳĬ�ϵĻ�����ɫΪ -1',
   role_name            varchar(60),
   power_atom           varchar(500) comment '���Ȩ���ö���,�ָ� ��¼ֵΪȨ��ԭ��id',
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
