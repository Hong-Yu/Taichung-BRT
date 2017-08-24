

CREATE TABLE accident_statement (
ID int IDENTITY(1,1) PRIMARY KEY,
latitude float,
longitude float,
license_plate nvarchar(50),
route nvarchar(50),
velocity_avg nvarchar(50),
intersection_near nvarchar(50),
reason nvarchar(50),
lane_closed int,
statement nvarchar(MAX)
)

CREATE TABLE route_list (
ID int IDENTITY(1,1) PRIMARY KEY,
name nvarchar(50),
color nvarchar(10),
intersection_max int
)

CREATE TABLE route_intersection (
ID int IDENTITY(1,1) PRIMARY KEY,
serial_number int,
route_id int,
intersection_id int
)

--something useful
TRUNCATE TABLE table-name
order by col-name desc

CREATE TABLE device_tc (
ID int IDENTITY(1,1) PRIMARY KEY,
intersection_id int,
latitude float,
longitude float,
address nvarchar(1000)
)

CREATE TABLE device_dsrc (
ID int IDENTITY(1,1) PRIMARY KEY,
intersection_id int,
latitude float,
longitude float,
address nvarchar(1000)
)

CREATE TABLE device_gps (
ID int IDENTITY(1,1) PRIMARY KEY,
intersection_id int,
latitude float,
longitude float,
address nvarchar(1000)
)

CREATE TABLE device_ipc (
ID int IDENTITY(1,1) PRIMARY KEY,
intersection_id int,
latitude float,
longitude float,
address nvarchar(1000)
)



CREATE TABLE user_account (
ID int IDENTITY(1,1),
email nvarchar(50) PRIMARY KEY,
password nvarchar(500),
level int
)

--
WHERE [NOT] EXISTS
( SELECT 1 FROM MyTable WHERE ... )

--priority table
CREATE TABLE priority_control (
equip_id int,
priority_id int,
past_east nvarchar(50),
past_west nvarchar(50),
door_trigger_up int,
door_trigger_down int,
headway_up int,
headway_down int,
lowspeed int,
percentage_east1 int,
percentage_east2 int,
percentage_east3 int,
percentage_east4 int,
percentage_east5 int,
percentage_east6 int,
percentage_west1 int,
percentage_west2 int,
percentage_west3 int,
percentage_west4 int,
percentage_west5 int,
percentage_west6 int,
primary key (equip_id, priority_id)
)

CREATE TABLE phase (
 ID int IDENTITY(1,1),
 phase_no nvarchar(2) PRIMARY KEY,
 phase_name nvarchar(50),
 phase_total int
 )

{"equip_id":1234,"priority_id":"2","past_east":"110000","past_west":"110000","door_trigger_up":"2","door_trigger_down":"0","headway_up":"50",
"headway_down":"0","lowspeed":"5","percentage_east1":"1","percentage_east2":"1","percentage_east3":"2","percentage_east4":"2","percentage_east5":
"3","percentage_east6":"3","percentage_west1":"1","percentage_west2":"1","percentage_west3":"2","percentage_west4":"2","percentage_west5":"3",
"percentage_west6":"5"}]}};

CREATE TABLE history_priority (
ID int IDENTITY(1,1) PRIMARY KEY,
user_name nvarchar(50) NOT NULL,
equip_id int,
seg_type int,
begin_time nvarchar(10),
priority_switch int,
operated_date datetime NOT NULL DEFAULT GETDATE()
)

CREATE TABLE history_strategy (
ID int IDENTITY(1,1) PRIMARY KEY,
equip_id int,
dir int,
strategy int,
create_time datetime NOT NULL DEFAULT GETDATE()
)

CREATE TABLE history_trigger_point (
ID int IDENTITY(1,1) PRIMARY KEY,
equip_id int,
dir int,
plate_number nvarchar(13),
point int,
label_time int,
create_time datetime NOT NULL DEFAULT GETDATE()
)

--permission level
CREATE TABLE permission_level
(
level int NOT NULL,
accident bit,
account_manager bit,
brt_performance bit,
device_control bit,
device_manager bit,
device_status bit,
device_status_table bit,
history bit,
intersection_info bit,
live_status bit,
live_status_sketch bit,
phase_lighting bit,
phase_modify bit,
route_manager bit,
scheduling bit,
time_space_diagram bit,
timing_plan bit,
timing_plan_query bit
)

--find mdf file
SELECT * FROM sys.database_files

TRUNCATE TABLE history_trigger_point

INSERT INTO history_trigger_point (equip_id, dir, plate_number, point)
VALUES (4800, 0, 'N1989', 1);