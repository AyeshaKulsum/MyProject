--Fetch all data from teacher table
	SELECT p.people_first_name || ', ' ||p.people_last_name as full_name, p.people_address, p.people_phone_number,d.designation_name,
string_agg(distinct (s.subject_name) ,',') as subjects_handled_by_teacher,string_agg(distinct (c.class_name) ,',') as classes_teacher,
cl.class_name as class_teacher
FROM people p
inner join designation d on d.designation_id =p.people_designation_id and d.designation_name ='Teacher'
left join subject_class_teacher_mapping sctm on sctm.teacher_id =p.people_id 
left join subject s on s.subject_id = sctm.subject_id and s.subject_status='Active'
left join class c on c.class_id =sctm.class_id and c.class_status='Active'
left join class cl on cl.class_teacher =p.people_id and cl.class_status='Active'
group by p.people_first_name ,p.people_last_name , p.people_address, p.people_phone_number,d.designation_name,cl.class_name;

--Add 2 new rows to Subjects
INSERT INTO public.subject
(subject_name, subject_status)
VALUES('Hindi', 'Active');

INSERT INTO public.subject
(subject_name, subject_status)
VALUES('Tamil', 'Active');

--Delete 1 from Classes table
delete from class where class_name ='Class 4';

--Update 2 columns in teachers table
update people set people_address ='Cochin, Kerala', people_phone_number='9876543212' 
where people_first_name='Raymond' and people_last_name='Blake';

--Add new column age -to teacher table
alter table people add column age integer;
update people set age=30
where people_first_name='Raymond' and people_last_name='Blake';

update people set age=29
where people_first_name='Joe' and people_last_name='Root';

update people set age=28
where people_first_name='Rizvi' and people_last_name='Sana';

update people set age=25
where people_first_name='Anitha' and people_last_name='Anandh';

update people set age=12
where people_first_name='Richie' and people_last_name='Rich';
--Fetch all classes and respective class teacher's name and age
select c.class_name, p.people_first_name || ', ' ||p.people_last_name as class_teacher_name,p.age from class c
left join people p on p.people_id = c.class_teacher 

--Fetch teachers, their subjects (a teacher can handle multiple subjects)
SELECT p.people_first_name || ', ' ||p.people_last_name as teacher_name,
string_agg(distinct (s.subject_name) ,',') as subjects_handled_by_teacher
FROM people p
inner join designation d on d.designation_id =p.people_designation_id and d.designation_name ='Teacher'
left join subject_class_teacher_mapping sctm on sctm.teacher_id =p.people_id 
left join subject s on s.subject_id = sctm.subject_id and s.subject_status='Active'
group by p.people_first_name ,p.people_last_name;

--Add another table for teachers address
added address in people table

--Fetch all classes and respective class teacher's name, age and address
select c.class_name, p.people_first_name || ', ' ||p.people_last_name as class_teacher_name,p.age,p.people_address from class c
left join people p on p.people_id = c.class_teacher 

--Read about joins and other basic db terminologies.