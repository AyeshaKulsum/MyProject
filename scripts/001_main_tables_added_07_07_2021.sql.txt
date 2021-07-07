start transaction;

create table if not exists designation(
	designation_id serial primary key,
	designation_name varchar(50),
	designation_status varchar(50)
);

create table if not exists subject (
	subject_id serial primary key,
	subject_name varchar(50),
	subject_status varchar(50)
);

create table if not exists people(
	people_id serial primary key,
	people_first_name varchar(50),
	people_last_name varchar(50),
	people_address varchar(100),
	people_phone_number bigint,
	people_designation_id bigint,
	foreign key(people_designation_id) references designation(designation_id)
);

create table if not exists class(
	class_id serial primary key,
	class_name varchar(50),
	class_status varchar(50),
	class_teacher bigint unique,
	foreign key(class_teacher) references people(people_id)
);

create table if not exists subject_class_teacher_mapping(
	class_subject_teacher_mapping_id serial primary key,
	class_id bigint,
	subject_id bigint,
	teacher_id bigint,
	foreign key(class_id) references class(class_id),
	foreign key(subject_id) references subject(subject_id),
	foreign key(teacher_id) references people(people_id)
);

commit;